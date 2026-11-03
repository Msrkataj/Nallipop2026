import sharp from 'sharp';
export const MAX_UPLOAD = 12 * 1024 * 1024;
export async function optimizeImage(bytes) {
  if (!bytes.length || bytes.length > MAX_UPLOAD) throw Object.assign(new Error('Wybierz zdjęcie o rozmiarze do 12 MB.'), {status:413});
  try {
    const input = sharp(bytes, {limitInputPixels:40000000, failOn:'error'});
    const meta = await input.metadata();
    if (!['jpeg','png','webp','avif','heif'].includes(meta.format) || (meta.pages || 1) > 1) throw new Error('format');
    let full;
    for (const [width,quality] of [[1920,80],[1600,70],[1280,60],[1000,50]]) {
      full = await input.clone().rotate().resize({width,height:width,fit:'inside',withoutEnlargement:true}).webp({quality}).toBuffer();
      if(full.length <= 750000) break;
    }
    const thumbnail = await sharp(full).resize({width:560,height:560,fit:'inside',withoutEnlargement:true}).webp({quality:72}).toBuffer();
    if(full.length + thumbnail.length > 900000) throw new Error('size');
    const result = await sharp(full).metadata();
    return {full, thumbnail, width:result.width, height:result.height, originalBytes:bytes.length};
  } catch { throw Object.assign(new Error('Nie można odczytać tego zdjęcia. Wybierz JPG, PNG, WebP lub AVIF (do 40 megapikseli).'), {status:400}); }
}
