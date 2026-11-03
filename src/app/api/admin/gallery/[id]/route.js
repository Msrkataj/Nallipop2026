import { adminDatabase } from '@/lib/admin/database';
import { apiError, httpError, jsonBody, privateJson, requireAdmin } from '@/lib/admin/auth';
import { galleryCollection, galleryItem, publicMedia, saveImage, validateMetadata } from '@/lib/admin/gallery';
import { validId } from '@/lib/admin/security.mjs';
import { parseUpload } from '@/lib/admin/upload';
export const runtime='nodejs';
export async function PATCH(request,{params}){
  try{
    await requireAdmin(request);
    const {id}=await params;if(!validId(id))throw httpError('Nie znaleziono zdjęcia.',404);
    const data=await jsonBody(request);
    const previous=await galleryItem(id);if(!previous)throw httpError('Nie znaleziono zdjęcia.',404);
    if(data.revision!==previous.revision)throw httpError('Zdjęcie zmieniło się w innym oknie. Odśwież listę.',409);
    let update;
    if(data.action==='trash')update={deleted:true};
    else if(data.action==='restore')update={deleted:false};
    else if(data.action==='visibility'&&typeof data.hidden==='boolean')update={hidden:data.hidden};
    else if(data.action==='edit')update=validateMetadata(data);
    else throw httpError('Nieprawidłowa operacja.');
    // Metadata does not change the image revision, keeping thumbnail URLs cacheable.
    const result=await galleryCollection(await adminDatabase()).updateOne({_id:id,revision:data.revision},{$set:{...update,updatedAt:Date.now()}});
    if(!result.matchedCount)throw httpError('Zdjęcie zmieniło się w innym oknie. Odśwież listę.',409);
    return privateJson({media:publicMedia(await galleryItem(id))});
  }catch(error){return apiError(error);}
}
export async function POST(request,{params}){
  try{
    await requireAdmin(request);
    const {id}=await params;if(!validId(id))throw httpError('Nie znaleziono zdjęcia.',404);
    const {form,bytes}=await parseUpload(request);
    const previous=await galleryItem(id);if(!previous)throw httpError('Nie znaleziono zdjęcia.',404);
    if(form.get('revision')!==previous.revision)throw httpError('Zdjęcie zmieniło się w innym oknie. Odśwież listę.',409);
    return privateJson({media:await saveImage(bytes,validateMetadata(previous),id,form.get('revision'))});
  }catch(error){return apiError(error);}
}
