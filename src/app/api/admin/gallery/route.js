import { apiError, privateJson, requireAdmin } from '@/lib/admin/auth';
import { listGallery, saveImage, validateMetadata } from '@/lib/admin/gallery';
import { parseUpload } from '@/lib/admin/upload';
export const runtime='nodejs';
export async function GET(request){
  try{
    await requireAdmin(request);
    const params=new URL(request.url).searchParams;
    const offset=Math.max(0,Math.min(100000,Number(params.get('offset'))||0));
    return privateJson(await listGallery({admin:true,deleted:params.get('trash')==='1',limit:48,offset}));
  }catch(error){return apiError(error);}
}
export async function POST(request){
  try{
    await requireAdmin(request);
    const {form,bytes}=await parseUpload(request);
    const metadata=validateMetadata(Object.fromEntries(['title','category','alt'].map(key=>[key,form.get(key)])));
    return privateJson({media:await saveImage(bytes,metadata)},201);
  }catch(error){return apiError(error);}
}
