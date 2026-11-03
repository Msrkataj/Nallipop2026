import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { couponEmailText } from '../src/lib/inspiration-draw.mjs';
import { validateEventDetails } from '../src/lib/reservation-validation.js';
import { formatSeasonalPackage } from '../src/data/seasonal-packages.js';

// Exercise the real reservation route without sending emails or accessing the database.
async function submit(coupon, body = {}) {
  const sent = [];
  const context = vm.createContext({ process: { env: { GMAIL_USER: 'test@example.invalid', GMAIL_APP_PASSWORD: 'test-only' } }, console: { error() {} } });
  const mocks = {
    nodemailer: { default: { createTransport: () => ({ sendMail: async mail => sent.push(mail) }) } },
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/inspiration-session': { currentInspirationCoupon: async () => coupon },
    '@/lib/inspiration-draw.mjs': { couponEmailText },
    '@/lib/reservation-validation': { validateEventDetails },
    '@/data/seasonal-packages': { formatSeasonalPackage },
  };
  const source = await readFile(new URL('../src/app/api/rezerwacja/route.js', import.meta.url), 'utf8');
  const route = new vm.SourceTextModule(source, { context });
  await route.link(specifier => {
    const exports = mocks[specifier];
    assert.ok(exports, `Unexpected dependency ${specifier}`);
    return new vm.SyntheticModule(Object.keys(exports), function () {
      for (const [key, value] of Object.entries(exports)) this.setExport(key, value);
    }, { context });
  });
  await route.evaluate();
  const result = await route.namespace.POST({ json: async () => ({
    name: 'Test', phone: '500600700', email: 'test@example.invalid',
    eventDate: '2099-06-01', eventTime: '12:00', hours: '2 godziny', eventType: 'Urodziny',
    childrenCount: '10', childrenAge: '6', location: 'Warszawa', consent: true, ...body,
  }) });
  return { result, sent };
}

test('reservation includes the saved server coupon in both email formats', async () => {
  const { result, sent } = await submit({ code: 'WOW10-SERVER', percent: 10 }, { coupon: { code: 'FORGED', percent: 90 } });
  assert.equal(result.status, 200);
  assert.equal(sent.length, 1);
  for (const format of ['text', 'html']) {
    assert.match(sent[0][format], /Zweryfikowany kupon/);
    assert.match(sent[0][format], /WOW10-SERVER — rabat 10% na animacje/);
    assert.doesNotMatch(sent[0][format], /FORGED/);
  }
});

test('reservation without a saved award ignores submitted coupon fields', async () => {
  const { result, sent } = await submit(null, { coupon: { code: 'FORGED', percent: 90 } });
  assert.equal(result.status, 200);
  for (const format of ['text', 'html']) assert.doesNotMatch(sent[0][format], /Zweryfikowany kupon|FORGED/);
});

test('a saved coupon cannot bypass reservation date validation', async () => {
  const { result, sent } = await submit({ code: 'WOW10-SERVER', percent: 10 }, { eventDate: '2000-01-01' });
  assert.equal(result.status, 400);
  assert.equal(sent.length, 0);
});
