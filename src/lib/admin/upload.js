import { httpError } from './auth';
import { readLimited } from './security.mjs';
import { MAX_UPLOAD } from './images.mjs';
export async function parseUpload(request){
  if(!request.headers.get('content-type')?.startsWith('multipart/form-data'))throw httpError('Wybierz zdjęcie do przesłania.');
  const bytes=await readLimited(request.body,MAX_UPLOAD+16384);
  const form=await new Response(bytes,{headers:{'Content-Type':request.headers.get('content-type')}}).formData();
  const file=form.get('file');
  if(!file||typeof file.arrayBuffer!=='function')throw httpError('Wybierz zdjęcie.');
  return {form,bytes:Buffer.from(await file.arrayBuffer())};
}
