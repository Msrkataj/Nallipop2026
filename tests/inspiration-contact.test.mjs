import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { couponEmailText } from '../src/lib/inspiration-draw.mjs';
import { findInspiration } from '../src/data/inspiration-ideas.mjs';

// Execute the real route with an in-memory mail transport. No network or real mail credentials.
async function submit(coupon, body) {
  const sent = [];
  const context = vm.createContext({ process: { env: { GMAIL_USER: 'test@example.invalid', GMAIL_APP_PASSWORD: 'test-only' } }, console: { error() {} } });
  const mocks = {
    nodemailer: { default: { createTransport: () => ({ sendMail: async mail => sent.push(mail) }) } },
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/inspiration-session': { currentInspirationCoupon: async () => coupon },
    '@/lib/inspiration-draw.mjs': { couponEmailText },
    '@/data/inspiration-ideas.mjs': { findInspiration },
  };
  const source = await readFile(new URL('../src/app/api/kontakt/route.js', import.meta.url), 'utf8');
  const route = new vm.SourceTextModule(source, { context });
  await route.link(specifier => {
    const exports = mocks[specifier];
    assert.ok(exports, `Unexpected dependency ${specifier}`);
    return new vm.SyntheticModule(Object.keys(exports), function () {
      for (const [key, value] of Object.entries(exports)) this.setExport(key, value);
    }, { context });
  });
  await route.evaluate();
  const result = await route.namespace.POST({ json: async () => ({ name: 'Test', email: 'test@example.invalid', topic: 'Inne pytanie', message: '<b>Test</b>', consent: 'on', ...body }) });
  return { result, sent };
}

test('contact email includes the server award and selected idea in text and HTML', async () => {
  const { result, sent } = await submit({ code: 'WOW10-SERVER', percent: 10 }, { inspirationId: 'idea-santa-globe', coupon: 'FORGED' });
  assert.equal(result.status, 200);
  assert.equal(sent.length, 1);
  for (const format of ['text', 'html']) {
    assert.match(sent[0][format], /WOW10-SERVER — rabat 10% na animacje/);
    assert.match(sent[0][format], /Kula mikołajowa/);
    assert.doesNotMatch(sent[0][format], /FORGED/);
  }
  assert.match(sent[0].html, /&lt;b&gt;Test&lt;\/b&gt;/);
});

test('a submitted coupon cannot create an award', async () => {
  const { result, sent } = await submit(null, { coupon: { code: 'FORGED', percent: 90 }, inspirationId: '<script>' });
  assert.equal(result.status, 200);
  assert.doesNotMatch(sent[0].text, /Zweryfikowany kupon|FORGED|Wybrany pomysł/);
  assert.doesNotMatch(sent[0].html, /Zweryfikowany kupon|FORGED|<script>/);
});

test('invalid contact submissions still cannot send mail', async () => {
  const { result, sent } = await submit({ code: 'WOW10-SERVER' }, { consent: false });
  assert.equal(result.status, 400);
  assert.equal(sent.length, 0);
});
