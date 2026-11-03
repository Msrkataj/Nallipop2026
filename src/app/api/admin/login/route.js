import { adminDatabase } from '@/lib/admin/database';
import { apiError, checkOrigin, httpError, jsonBody, privateJson, sessionCookie } from '@/lib/admin/auth';
import { COOKIE_NAME, digest, newToken, SESSION_SECONDS, verifyPassword } from '@/lib/admin/security.mjs';
export const runtime = 'nodejs';
export async function POST(request) {
  try {
    checkOrigin(request);
    const {username,password} = await jsonBody(request);
    const hash = process.env.ADMIN_PASSWORD_HASH;
    const expectedUsername = process.env.ADMIN_USERNAME;
    if (!hash || !expectedUsername) throw httpError('Panel wymaga konfiguracji konta administratora.',503);
    if(typeof username !== 'string' || typeof password !== 'string' || username.length > 100 || password.length > 256) throw httpError('Nieprawidłowy login lub hasło.',401);
    const db = await adminDatabase();
    // Shared across instances; do not trust a client-provided IP to bypass throttling.
    const window = Math.floor(Date.now() / 900000);
    const attempts = await db.collection('admin_login_limits').findOneAndUpdate({_id:`login-${window}`}, {$inc:{count:1},$set:{expiresAt:Date.now()+900000}}, {upsert:true,returnDocument:'after'});
    if (attempts.count > 12) throw httpError('Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.',429);
    const valid = await verifyPassword(password,hash);
    if(!valid || username !== expectedUsername) throw httpError('Nieprawidłowy login lub hasło.',401);
    const token = newToken();
    await db.collection('admin_sessions').insertOne({_id:digest(token),username,version:digest(hash),expiresAt:Date.now()+SESSION_SECONDS*1000});
    await db.collection('admin_sessions').deleteMany({expiresAt:{$lt:Date.now()}});
    await db.collection('admin_login_limits').deleteMany({expiresAt:{$lt:Date.now()}});
    const response = privateJson({username});
    response.cookies.set(COOKIE_NAME,token,sessionCookie(request));
    return response;
  } catch(error) { return apiError(error); }
}
