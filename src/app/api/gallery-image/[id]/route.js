import { currentAdmin } from '@/lib/admin/auth';
import { galleryItem, imageBytes } from '@/lib/admin/gallery';
import { validId } from '@/lib/admin/security.mjs';
export const runtime='nodejs';
export async function GET(request,{params}){
  try{
    const {id}=await params;
    if(!validId(id))return new Response(null,{status:404});
    const item=await galleryItem(id);
    if(!item||item.type!=='image')return new Response(null,{status:404});
    const privateImage=item.hidden||item.deleted;
    if(privateImage&&!await currentAdmin())return new Response(null,{status:404,headers:{'Cache-Control':'no-store'}});
    const query=new URL(request.url).searchParams;
    if(query.get('v')&&query.get('v')!==item.revision)return new Response(null,{status:404});
    const size=query.get('size')==='thumb'?'thumb':'full';
    const etag=`"${item._id}-${item.revision}-${size}"`;
    const headers={'Content-Type':'image/webp','Cache-Control':privateImage?'private, no-store':'public, max-age=3600',ETag:etag,'X-Content-Type-Options':'nosniff'};
    if(!privateImage&&request.headers.get('if-none-match')===etag)return new Response(null,{status:304,headers});
    const bytes=await imageBytes(item,size);
    return new Response(bytes,{headers:{...headers,'Content-Length':String(bytes.length)}});
  }catch(error){console.error('Gallery thumbnail failed:',error.codeName||error.name);return new Response(null,{status:error.status||503,headers:{'Cache-Control':'no-store'}});}
}
