import { randomBytes, randomInt } from 'node:crypto';
import { inspirationIdeas, couponIdea } from '../data/inspiration-ideas.mjs';

export const DAILY_ATTEMPTS = 3;

export function warsawDay(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function drawStatus(record, now = new Date()) {
  const date = warsawDay(now);
  const used = record?.date === date ? record.used : 0;
  return { date, remaining: Math.max(0, DAILY_ATTEMPTS - used), coupon: record?.coupon || null, drawnId: record?.lastDrawnId || null };
}

export function nextDraw(record, requestId, { now = new Date(), random = randomInt, code = () => `WOW10-${randomBytes(6).toString('hex').toUpperCase()}` } = {}) {
  const status = drawStatus(record, now);
  const eligible = status.remaining > 0;
  const won = eligible && random(10000) < 500;
  const choices = inspirationIdeas.filter(idea => idea.id !== record.lastIdeaId);
  const drawnId = won ? couponIdea.id : choices[random(choices.length)].id;
  const coupon = record.coupon || (won ? { code: code(), percent: 10, scope: 'animacje', issuedOn: status.date } : null);
  const used = DAILY_ATTEMPTS - status.remaining + (eligible ? 1 : 0);
  const result = { date: status.date, remaining: DAILY_ATTEMPTS - used, coupon, drawnId };
  return {
    date: status.date, used, coupon, lastDrawnId: drawnId,
    lastIdeaId: won ? record.lastIdeaId || null : drawnId,
    recentDraws: [...(record.recentDraws || []).filter(item => item.result.date === status.date).slice(-15), { requestId, result }],
    revision: record.revision + 1,
  };
}

// Compare-and-set protects the daily allowance across tabs and server instances.
export async function claimDraw(collection, visitorId, requestId, options = {}) {
  const now = options.now || new Date();
  for (let attempt = 0; attempt < 12; attempt++) {
    const record = await collection.findOne({ _id: visitorId });
    if (!record) throw new Error('Visitor session not found');
    const existing = record.recentDraws?.find(item => item.requestId === requestId && item.result.date === warsawDay(now));
    if (existing) return { ...existing.result, ...drawStatus(record, now), drawnId: existing.result.drawnId };
    const next = nextDraw(record, requestId, { ...options, now });
    const saved = await collection.updateOne({ _id: visitorId, revision: record.revision }, { $set: next });
    if (saved.matchedCount) return next.recentDraws.at(-1).result;
  }
  throw Object.assign(new Error('Losowanie jest już w toku. Spróbuj ponownie.'), { status: 409 });
}

export function couponEmailText(coupon) {
  return coupon ? `${coupon.code} — rabat 10% na animacje` : '';
}
