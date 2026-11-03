import 'server-only';
import { randomUUID } from 'node:crypto';
import { adminDatabase } from './database';
import { digest, readLimited, safeSource } from './security.mjs';
import { optimizeImage, MAX_UPLOAD } from './images.mjs';
import { httpError } from './auth';

const BUCKET='nallipop-7d9e4.appspot.com';
const folders=['gallery','dmuchaniec','dmuchaniec/bubble'];
const mediaPattern=/\.(jpe?g|png|webp|avif|gif|mp4|webm|mov|m4v|ogv)$/i;
const videoPattern=/\.(mp4|webm|mov|m4v|ogv)(\?|$)/i;
const imageJobs=new Map();
let importJob;
export function galleryCollection(db){return db.collection('gallery_media');}
export function publicMedia(item){
  const imageUrl=`/api/gallery-image/${item._id}?v=${item.revision}`;
  const useProxy=item.type==='image' && (item.imageKey || safeSource(item.sourceUrl)) && !/\.gif(\?|$)/i.test(item.sourceUrl||'');
  const src=useProxy ? imageUrl : item.sourceUrl;
  return {id:item._id, sourceId:item.sourceId, folderName:item.folderName, src, image:src, thumbnail:useProxy ? `${imageUrl}&size=thumb` : (item.type==='video' ? null : src), type:item.type, title:item.title, alt:item.alt || item.title, category:item.category, createdAt:item.createdAt, width:item.width, height:item.height};
}
async function remoteJson(url){
  const res=await fetch(url,{signal:AbortSignal.timeout(10000),cache:'no-store'});
  if(!res.ok) throw new Error(`Remote metadata ${res.status}`);
  return res.json();
}
async function mapLimited(items,limit,fn){
  let cursor=0;
  const output=[];
  await Promise.all(Array.from({length:Math.min(limit,items.length)},async()=>{
    while(cursor<items.length){const i=cursor++;output[i]=await fn(items[i]);}
  }));
  return output;
}
async function listFolder(folder){
  const items=[];let pageToken;
  do{
    const url=new URL(`https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o`);
    url.searchParams.set('prefix',`${folder}/`);url.searchParams.set('delimiter','/');url.searchParams.set('maxResults','1000');
    if(pageToken)url.searchParams.set('pageToken',pageToken);
    const result=await remoteJson(url);
    items.push(...(result.items||[]).filter(item=>mediaPattern.test(item.name)).map(item=>({...item,folder})));
    pageToken=result.nextPageToken;
  }while(pageToken);
  return items;
}
function firestoreValue(value){return value?.stringValue ?? value?.timestampValue ?? value?.integerValue ?? value?.doubleValue;}
async function firestoreDocuments(){
  const docs=[];let pageToken;
  do{
    const url=new URL('https://firestore.googleapis.com/v1/projects/nallipop-7d9e4/databases/(default)/documents/gallery');
    url.searchParams.set('pageSize','1000');if(pageToken)url.searchParams.set('pageToken',pageToken);
    const result=await remoteJson(url);
    docs.push(...(result.documents||[]).map(doc=>({id:doc.name,...Object.fromEntries(Object.entries(doc.fields||{}).map(([key,value])=>[key,firestoreValue(value)]))})));
    pageToken=result.nextPageToken;
  }while(pageToken);
  return docs;
}
function sourcePath(url){
  try{const u=new URL(url); if(u.hostname==='firebasestorage.googleapis.com')return decodeURIComponent(u.pathname.split('/o/')[1]);if(u.hostname==='storage.googleapis.com')return decodeURIComponent(u.pathname.replace(`/${BUCKET}/`,''));}catch{}
  return url;
}
export async function importGallery(){
  if(importJob)return importJob;
  importJob=(async()=>{
    const db=await adminDatabase();const collection=galleryCollection(db);const warnings=[];let imported=0;
    const results=await Promise.allSettled(folders.map(listFolder));
    results.forEach((result,index)=>{if(result.status==='rejected')warnings.push(`Nie udało się odczytać folderu ${folders[index]}.`);});
    const items=results.flatMap(result=>result.status==='fulfilled'?result.value:[]);
    await mapLimited(items,6,async item=>{
      const id=digest(item.name);if(await collection.findOne({_id:id},{projection:{_id:1}}))return;
      try{
        const meta=await remoteJson(`https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(item.name)}`);
        const token=meta.downloadTokens?.split(',')[0];
        const sourceUrl=`https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(item.name)}?alt=media${token?`&token=${encodeURIComponent(token)}`:''}`;
        const category=item.folder.startsWith('dmuchaniec')?'Dmuchańce':'Nallipop';
        const title=item.folder==='dmuchaniec/bubble'?'Bubble House podczas wydarzenia Nallipop':item.folder==='dmuchaniec'?'Dmuchaniec podczas wydarzenia Nallipop':'Zabawa podczas wydarzenia Nallipop';
        const record={_id:id,sourceId:item.name,sourceUrl,folderName:item.folder,category,title,alt:title,type:videoPattern.test(item.name)?'video':'image',createdAt:Date.parse(meta.timeCreated)||Date.now(),updatedAt:Date.now(),revision:randomUUID(),hidden:false,deleted:false};
        const result=await collection.updateOne({_id:id},{$setOnInsert:record},{upsert:true});if(result.upsertedCount)imported++;
      }catch{warnings.push(`Nie udało się zaimportować pliku ${item.name}.`);}
    });
    try{
      for(const doc of await firestoreDocuments()){
        let sourceUrl=doc.url||doc.imageUrl||doc.photoUrl||doc.fileUrl||doc.src||doc.downloadURL;
        const path=doc.storagePath||doc.path;
        if(!sourceUrl&&path){const meta=await remoteJson(`https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(path)}`);sourceUrl=`https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(path)}?alt=media&token=${encodeURIComponent(meta.downloadTokens?.split(',')[0]||'')}`;}
        if(!sourceUrl||!/^https:\/\//.test(sourceUrl))continue;
        const sourceId=path||sourcePath(sourceUrl);const id=digest(sourceId);
        const title=String(doc.title||doc.alt||'Zdjęcie z wydarzenia').slice(0,160);
        const result=await collection.updateOne({_id:id},{$setOnInsert:{_id:id,sourceId,sourceUrl,folderName:sourceId.startsWith('dmuchaniec')?'dmuchaniec':'gallery',category:String(doc.category||doc.tag||'Nallipop').slice(0,60),title,alt:String(doc.alt||title).slice(0,240),type:doc.type==='video'||videoPattern.test(sourceUrl)?'video':'image',createdAt:Date.parse(doc.createdAt||doc.uploadedAt)||0,updatedAt:Date.now(),revision:randomUUID(),hidden:false,deleted:false}},{upsert:true});
        if(result.upsertedCount)imported++;
      }
    }catch{warnings.push('Nie udało się odczytać dodatkowej kolekcji Firestore. Zdjęcia z folderów są zachowane.');}
    if(!items.length&&results.every(result=>result.status==='rejected'))throw httpError('Nie udało się połączyć z dotychczasową galerią.',502);
    await db.collection('gallery_settings').updateOne({_id:'import'},{$set:{completedAt:Date.now(),warnings}},{upsert:true});
    return {imported,warnings};
  })().finally(()=>{importJob=null;});
  return importJob;
}
export async function ensureGallery(){
  const db=await adminDatabase();
  if(!await db.collection('gallery_settings').findOne({_id:'import'}))await importGallery();
  return db;
}
export async function listGallery({admin=false,deleted=false,limit=24,offset=0,category='',folder=''}={}){
  const db=await ensureGallery();const collection=galleryCollection(db);
  const base=admin?{deleted}:{deleted:false,hidden:false};
  const query={...base};if(category)query.category=category;if(folder)query.folderName=folder;
  const [items,total,categories]=await Promise.all([
    collection.find(query).sort({createdAt:-1,_id:1}).skip(offset).limit(limit).toArray(),
    collection.countDocuments(query),collection.distinct('category',base),
  ]);
  return {media:items.map(item=>({...publicMedia(item),...(admin?{hidden:item.hidden,deleted:item.deleted,revision:item.revision}:{} )})),total,categories:categories.filter(Boolean),hasMore:offset+items.length<total};
}
export function validateMetadata(input){
  const title=typeof input.title==='string'?input.title.trim():'';
  const category=typeof input.category==='string'?input.category.trim():'';
  const alt=typeof input.alt==='string'?input.alt.trim():title;
  if(!title||title.length>160)throw httpError('Wpisz tytuł zdjęcia (maks. 160 znaków).');
  if(!category||category.length>60)throw httpError('Wpisz kategorię (maks. 60 znaków).');
  if(alt.length>240)throw httpError('Opis alternatywny może mieć maks. 240 znaków.');
  return {title,category,alt:alt||title};
}
export async function saveImage(bytes,metadata,id,expectedRevision){
  const db=await adminDatabase();const collection=galleryCollection(db);
  const previous=id?await collection.findOne({_id:id}):null;
  if(id&&!previous)throw httpError('Nie znaleziono zdjęcia.',404);
  if(previous&&expectedRevision!==previous.revision)throw httpError('Zdjęcie zmieniło się w innym oknie. Odśwież listę.',409);
  if(previous?.type==='video')throw httpError('Film można ukryć lub usunąć. Nowe zdjęcie dodaj osobno.');
  const optimized=await optimizeImage(bytes);
  const mediaId=id||randomUUID();const revision=randomUUID();const imageKey=`${mediaId}-${revision}`;
  await db.collection('gallery_images').insertOne({_id:imageKey,...optimized,createdAt:Date.now()});
  const values={...metadata,type:'image',imageKey,revision,width:optimized.width,height:optimized.height,updatedAt:Date.now()};
  try{
    if(previous){
      const result=await collection.updateOne({_id:id,revision:expectedRevision},{$set:values});
      if(!result.matchedCount)throw httpError('Zdjęcie zmieniło się w innym oknie. Odśwież listę.',409);
    }
    else await collection.insertOne({_id:mediaId,...values,createdAt:Date.now(),folderName:'gallery',hidden:false,deleted:false});
  }catch(error){await db.collection('gallery_images').deleteOne({_id:imageKey});throw error;}
  return {...publicMedia(await collection.findOne({_id:mediaId})),revision};
}
export async function imageBytes(item,size){
  const db=await adminDatabase();const key=item.imageKey||`${item._id}-${item.revision}`;
  let image=await db.collection('gallery_images').findOne({_id:key},{projection:{[size==='thumb'?'thumbnail':'full']:1}});
  if(!image){
    if(!safeSource(item.sourceUrl))throw httpError('Nieprawidłowe źródło zdjęcia.',400);
    if(!imageJobs.has(key))imageJobs.set(key,(async()=>{
      const response=await fetch(item.sourceUrl,{signal:AbortSignal.timeout(25000),redirect:'error'});
      if(!response.ok)throw httpError('Zdjęcie jest chwilowo niedostępne.',502);
      if(Number(response.headers.get('content-length'))>MAX_UPLOAD)throw httpError('Zdjęcie źródłowe jest za duże.',413);
      const optimized=await optimizeImage(await readLimited(response.body,MAX_UPLOAD));
      await db.collection('gallery_images').updateOne({_id:key},{$setOnInsert:{_id:key,...optimized,createdAt:Date.now()}},{upsert:true});
      return optimized;
    })().finally(()=>imageJobs.delete(key)));
    image=await imageJobs.get(key);
  }
  const data=size==='thumb'?image.thumbnail:image.full;
  return Buffer.isBuffer(data)?data:Buffer.from(data.buffer);
}
export async function galleryItem(id){return galleryCollection(await adminDatabase()).findOne({_id:id});}
