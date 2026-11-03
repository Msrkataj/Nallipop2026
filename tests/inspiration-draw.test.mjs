import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { warsawDay, drawStatus, nextDraw, claimDraw, couponEmailText } from '../src/lib/inspiration-draw.mjs';
import { inspirationIdeas, couponIdea, inspirationContactHref, findInspiration } from '../src/data/inspiration-ideas.mjs';
const now = new Date('2026-11-03T12:00:00Z');
const initial = () => ({ _id: 'visitor', revision: 0, date: '2026-11-03', used: 0, coupon: null, recentDraws: [] });
const lose = max => max === 10000 ? 500 : 0;

test('three eligible attempts, then unlimited ideas without coupon checks', () => {
  let record = initial();
  for (let i=0; i<3; i++) {
    record = {...record, ...nextDraw(record, `draw-${i}`, { now, random: lose })};
    assert.equal(drawStatus(record, now).remaining, 2-i);
  }
  let previous = record.lastIdeaId;
  for (let i=0; i<25; i++) {
    record = {...record, ...nextDraw(record, `later-${i}`, { now, random: max => { assert.notEqual(max, 10000); return 0; } })};
    assert.notEqual(record.lastDrawnId, couponIdea.id);
    assert.notEqual(record.lastIdeaId, previous);
    assert.equal(record.used, 3);
    previous = record.lastIdeaId;
  }
});

test('coupon boundary and persistence without stacking', () => {
  const win = nextDraw(initial(), 'win', { now, random: () => 499, code: () => 'WOW10-TEST' });
  assert.equal(win.lastDrawnId, couponIdea.id);
  assert.equal(win.coupon.percent, 10);
  assert.equal(nextDraw(initial(), 'lose', { now, random: lose }).coupon, null);
  const secondWin = nextDraw(win, 'second', { now, random: () => 0, code: () => { throw new Error('Must reuse the award'); } });
  assert.deepEqual(secondWin.coupon, win.coupon);
  const afterMidnight = nextDraw(secondWin, 'tomorrow', { now: new Date('2026-11-03T23:00:00Z'), random: lose });
  assert.equal(afterMidnight.used, 1);
  assert.deepEqual(afterMidnight.coupon, win.coupon);
  assert.equal(couponEmailText(win.coupon), 'WOW10-TEST — rabat 10% na animacje');
  assert.equal(couponEmailText(null), '');
});

test('Warsaw midnight in winter and summer, including daylight saving change', () => {
  assert.equal(warsawDay(new Date('2026-11-03T22:59:59Z')), '2026-11-03');
  assert.equal(warsawDay(new Date('2026-11-03T23:00:00Z')), '2026-11-04');
  assert.equal(warsawDay(new Date('2026-07-03T21:59:59Z')), '2026-07-03');
  assert.equal(warsawDay(new Date('2026-07-03T22:00:00Z')), '2026-07-04');
  assert.equal(warsawDay(new Date('2026-10-25T22:59:59Z')), '2026-10-25');
  const record = { ...initial(), used: 3 };
  assert.equal(drawStatus(record, new Date('2026-11-03T23:00:00Z')).remaining, 3);
});

function fakeCollection() {
  let record = initial();
  return {
    async findOne() { return structuredClone(record); },
    async updateOne(filter, update) {
      if (filter.revision !== record.revision) return { matchedCount: 0 };
      record = { ...record, ...structuredClone(update.$set) };
      return { matchedCount: 1 };
    },
  };
}

test('concurrent requests cannot exceed three eligible attempts', async () => {
  const collection = fakeCollection();
  const results = await Promise.all(Array.from({ length: 8 }, (_, i) => claimDraw(collection, 'visitor', `request-${i}`, { now, random: () => 0 })));
  assert.equal(results.filter(result => result.drawnId === couponIdea.id).length, 3);
  assert.equal((await collection.findOne()).used, 3);
  assert.equal(new Set(results.filter(result => result.coupon).map(result => result.coupon.code)).size, 1);
});

test('retries, including concurrent duplicates, do not consume more attempts', async () => {
  const collection = fakeCollection();
  const results = await Promise.all(Array.from({ length: 4 }, () => claimDraw(collection, 'visitor', 'same-request', { now, random: lose })));
  assert.equal((await collection.findOne()).used, 1);
  assert.ok(results.every(result => result.drawnId === results[0].drawnId));
  await claimDraw(collection, 'visitor', 'new-request', { now, random: lose });
  const retried = await claimDraw(collection, 'visitor', 'same-request', { now, random: lose });
  assert.equal(retried.remaining, 1);
  assert.equal(retried.drawnId, results[0].drawnId);
});

test('all 21 ideas have local photos and safe links to the existing contact form', async () => {
  assert.equal(inspirationIdeas.length, 21);
  assert.equal(new Set(inspirationIdeas.map(idea => idea.id)).size, 21);
  for (const idea of inspirationIdeas) {
    await access(new URL(`../public${idea.image}`, import.meta.url));
    assert.equal(inspirationContactHref(idea.id), `/kontakt?pomysl=${idea.id}#formularz`);
  }
  assert.equal(findInspiration('idea-santa-globe').image, '/images/kula/mikolajowa.webp');
  assert.equal(inspirationContactHref('https://example.com'), '/kontakt#formularz');
  assert.equal(findInspiration('<script>'), null);
});
