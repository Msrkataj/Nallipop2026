import { NextResponse } from 'next/server';
import { listGallery } from '@/lib/admin/gallery';
import { digest } from '@/lib/admin/security.mjs';
export const runtime='nodejs';
export async function GET(request){
  try{
    const params=new URL(request.url).searchParams;
    const limit=Math.max(1,Math.min(72,Math.floor(Number(params.get('limit'))||24)));
    const offset=Math.max(0,Math.min(100000,Math.floor(Number(params.get('offset'))||0)));
    const data=await listGallery({limit,offset,category:(params.get('category')||'').slice(0,60),folder:(params.get('folder')||'').slice(0,100)});
    const etag=`"${digest(JSON.stringify(data))}"`;
    const headers={'Cache-Control':'public, max-age=0, must-revalidate',ETag:etag,'X-Content-Type-Options':'nosniff'};
    if(request.headers.get('if-none-match')===etag)return new Response(null,{status:304,headers});
    return NextResponse.json(data,{headers});
  }catch(error){console.error('Gallery list failed:',error.codeName||error.name);return NextResponse.json({media:[],message:'Galeria jest chwilowo niedostępna. Spróbuj ponownie za chwilę.'},{status:503,headers:{'Cache-Control':'no-store'}});}
}
