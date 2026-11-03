import test from 'node:test';
import assert from 'node:assert/strict';
import { allowedOrigin, digest, hashPassword, newToken, readLimited, safeSource, validId, verifyPassword } from '../src/lib/admin/security.mjs';
import { optimizeImage } from '../src/lib/admin/images.mjs';
import sharp from 'sharp';

test('password hashes are salted and reject wrong passwords and malformed hashes',async()=>{
 const hash=await hashPassword('Correct-test-password-123');
 assert.equal(await verifyPassword('Correct-test-password-123',hash),true);
 assert.equal(await verifyPassword('incorrect',hash),false);
 assert.notEqual(await hashPassword('Correct-test-password-123'),hash);
 for(const value of ['',null,'scrypt:a:b','scrypt:'+':'.repeat(100)])assert.equal(await verifyPassword('x',value),false);
 assert.equal(await verifyPassword('x'.repeat(257),hash),false);
});
test('tokens are opaque and IDs do not accept path traversal',()=>{
 const a=newToken(),b=newToken();assert.match(a,/^[A-Za-z0-9_-]{43}$/);assert.notEqual(a,b);assert.equal(digest(a).length,64);assert.equal(validId(digest(a)),true);assert.equal(validId('../../etc/passwd'),false);
});
test('cross-origin or absent origins are rejected',()=>{
 assert.equal(allowedOrigin('http://127.0.0.1:3000/admin','http://127.0.0.1:3000'),true);
 assert.equal(allowedOrigin('https://nallipop.pl','https://attacker.example'),false);
 assert.equal(allowedOrigin('https://nallipop.pl',null),false);
 assert.equal(allowedOrigin('https://nallipop.pl','null'),false);
 assert.equal(allowedOrigin('http://internal:3000','https://nallipop.pl','https://nallipop.pl'),true);
});
test('remote optimization is restricted to the existing storage bucket',()=>{
 assert.equal(safeSource('https://firebasestorage.googleapis.com/v0/b/nallipop-7d9e4.appspot.com/o/gallery%2Fx.jpg?alt=media'),true);
 for(const url of ['http://127.0.0.1/admin','https://storage.googleapis.com/other-bucket/x','https://firebasestorage.googleapis.com.evil.example/v0/b/nallipop-7d9e4.appspot.com/o/x','https://user:pass@storage.googleapis.com/nallipop-7d9e4.appspot.com/x','file:///etc/passwd'])assert.equal(safeSource(url),false);
});
test('stream limit applies without trusting Content-Length',async()=>{
 const stream=new ReadableStream({start(controller){controller.enqueue(new Uint8Array(5));controller.enqueue(new Uint8Array(10));controller.close();}});
 await assert.rejects(()=>readLimited(stream,12),error=>error.status===413);
});
test('uploaded images are resized, stripped of metadata and converted to lightweight WebP',async()=>{
 const original=await sharp({create:{width:2600,height:1800,channels:3,background:'#16c9c3'}}).jpeg().withMetadata({exif:{IFD0:{Artist:'private metadata'}}}).toBuffer();
 const image=await optimizeImage(original);const full=await sharp(image.full).metadata();const thumb=await sharp(image.thumbnail).metadata();
 assert.equal(full.format,'webp');assert.equal(full.width,1920);assert.ok(thumb.width<=560);assert.equal(full.exif,undefined);assert.ok(image.full.length+image.thumbnail.length<=900000);
});
test('SVGs, non-images and oversized uploads cannot reach image storage',async()=>{
 await assert.rejects(()=>optimizeImage(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"></svg>')),error=>error.status===400);
 await assert.rejects(()=>optimizeImage(Buffer.from('not an image')),error=>error.status===400);
 await assert.rejects(()=>optimizeImage(Buffer.alloc(12*1024*1024+1)),error=>error.status===413);
});
