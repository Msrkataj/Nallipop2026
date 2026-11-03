import { randomBytes, scrypt, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
const derive = promisify(scrypt);
export const SESSION_SECONDS = 8 * 60 * 60;
export const COOKIE_NAME = 'nallipop_admin';
export function digest(value) { return createHash('sha256').update(value).digest('hex'); }
export function newToken() { return randomBytes(32).toString('base64url'); }
export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const key = await derive(password, salt, 64, { N: 32768, maxmem: 64 * 1024 * 1024 });
  return `scrypt:${salt}:${key.toString('hex')}`;
}
export async function verifyPassword(password, hash) {
  if (typeof password !== 'string' || password.length > 256) return false;
  const parts = String(hash).split(':');
  if (parts.length !== 3 || parts[0] !== 'scrypt' || !/^[a-f0-9]{32}$/.test(parts[1]) || !/^[a-f0-9]{128}$/.test(parts[2])) return false;
  const key = await derive(password, parts[1], 64, { N: 32768, maxmem: 64 * 1024 * 1024 });
  return timingSafeEqual(key, Buffer.from(parts[2], 'hex'));
}
export function allowedOrigin(requestUrl, origin, configuredUrl) {
  if (!origin) return false;
  try {
    const trusted = new Set([new URL(requestUrl).origin]);
    if (configuredUrl) trusted.add(new URL(configuredUrl).origin);
    return trusted.has(origin);
  } catch { return false; }
}
export function validId(id) { return typeof id === 'string' && /^[a-f0-9-]{32,64}$/.test(id); }
export function safeSource(url) {
  try {
    const u = new URL(url);
    const bucket = 'nallipop-7d9e4.appspot.com';
    return u.protocol === 'https:' && !u.username && !u.password && !u.port && (
      (u.hostname === 'firebasestorage.googleapis.com' && u.pathname.startsWith(`/v0/b/${bucket}/o/`)) ||
      (u.hostname === 'storage.googleapis.com' && u.pathname.startsWith(`/${bucket}/`))
    );
  } catch { return false; }
}
export async function readLimited(stream, maxBytes) {
  if (!stream) return Buffer.alloc(0);
  const reader = stream.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      size += value.length;
      if (size > maxBytes) { await reader.cancel(); throw Object.assign(new Error('Plik jest za duży. Maksymalny rozmiar to 12 MB.'), {status:413}); }
      chunks.push(Buffer.from(value));
    }
    return Buffer.concat(chunks);
  } finally { reader.releaseLock(); }
}
