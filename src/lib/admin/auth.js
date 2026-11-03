import 'server-only';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { adminDatabase } from './database';
import { allowedOrigin, COOKIE_NAME, digest, SESSION_SECONDS } from './security.mjs';
export function httpError(message, status=400) { return Object.assign(new Error(message), {status}); }
export function privateJson(data, status=200) {
  return NextResponse.json(data, {status, headers:{'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff'}});
}
export function apiError(error) {
  if (!error.status) console.error('Admin request failed:', error.codeName || error.name);
  return privateJson({message:error.status ? error.message : 'Nie udało się wykonać operacji. Spróbuj ponownie.'}, error.status || 503);
}
export function checkOrigin(request) {
  const requestUrl = new URL(request.url);
  const host = request.headers.get('host');
  // Next can normalize request.url to localhost behind a custom server.
  // Host is the browser's destination; never trust a submitted Origin as a destination.
  const destination = host ? `${requestUrl.protocol}//${host}` : request.url;
  if (!allowedOrigin(destination, request.headers.get('origin'), process.env.NEXT_PUBLIC_SITE_URL)) throw httpError('Niedozwolone źródło żądania.',403);
  if (request.headers.get('sec-fetch-site') === 'cross-site') throw httpError('Niedozwolone źródło żądania.',403);
}
export async function currentAdmin() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token) || !process.env.ADMIN_PASSWORD_HASH) return null;
  const db = await adminDatabase();
  const session = await db.collection('admin_sessions').findOne({_id:digest(token)});
  if (!session || session.expiresAt <= Date.now() || session.version !== digest(process.env.ADMIN_PASSWORD_HASH)) return null;
  return {username:session.username, sessionId:session._id};
}
export async function requireAdmin(request) {
  if (request && !['GET','HEAD'].includes(request.method)) checkOrigin(request);
  const admin = await currentAdmin();
  if (!admin) throw httpError('Zaloguj się ponownie, aby kontynuować.',401);
  return admin;
}
export function sessionCookie(request, maxAge=SESSION_SECONDS) {
  const url = new URL(request.url);
  const hostname = new URL(`${url.protocol}//${request.headers.get('host') || url.host}`).hostname;
  return {httpOnly:true, secure: !['localhost','127.0.0.1','[::1]'].includes(hostname), sameSite:'strict', path:'/', maxAge};
}
export async function jsonBody(request) {
  const {readLimited} = await import('./security.mjs');
  try { return JSON.parse((await readLimited(request.body, 16384)).toString()); }
  catch(error) { if(error.status) throw error; throw httpError('Niepoprawne dane formularza.'); }
}
