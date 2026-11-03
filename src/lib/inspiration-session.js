import 'server-only';
import { randomBytes, createHash } from 'node:crypto';
import { cookies } from 'next/headers';
import { adminDatabase } from './admin/database';
import { drawStatus, warsawDay } from './inspiration-draw.mjs';

const COOKIE = 'nallipop_inspiration';
const digest = token => createHash('sha256').update(token).digest('hex');
const valid = token => typeof token === 'string' && /^[a-f0-9]{64}$/.test(token);

export async function inspirationSession() {
  const cookieStore = await cookies();
  const existingToken = cookieStore.get(COOKIE)?.value;
  const collection = (await adminDatabase()).collection('inspiration_visitors');
  if (valid(existingToken)) {
    const record = await collection.findOne({ _id: digest(existingToken) });
    if (record) return { collection, record, token: null };
  }
  const token = randomBytes(32).toString('hex');
  const record = { _id: digest(token), revision: 0, date: warsawDay(), used: 0, coupon: null, recentDraws: [], createdAt: Date.now() };
  await collection.insertOne(record);
  return { collection, record, token };
}

export function inspirationResponse(response, request, session) {
  response.headers.set('Cache-Control', 'private, no-store');
  const url = new URL(request.url);
  const hostname = new URL(`${url.protocol}//${request.headers.get('host') || url.host}`).hostname;
  if (session.token) response.cookies.set(COOKIE, session.token, {
    httpOnly: true, sameSite: 'lax', path: '/', maxAge: 365 * 24 * 60 * 60,
    secure: !['localhost', '127.0.0.1', '[::1]'].includes(hostname),
  });
  return response;
}

export async function currentInspirationCoupon() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!valid(token)) return null;
  const record = await (await adminDatabase()).collection('inspiration_visitors').findOne({ _id: digest(token) });
  return drawStatus(record).coupon;
}
