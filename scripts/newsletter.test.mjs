import test from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { renderAutumnNewsletter, HERO_CID, LOGO_CID, TEST_RECIPIENT, CONTACT_URL } from '../src/lib/autumn-newsletter.mjs';

test('Newsletter zawiera ofertę, kontakt, CID i oznaczenie testowe', () => {
  const result = renderAutumnNewsletter();
  assert.equal(TEST_RECIPIENT, 'msrkataj@gmail.com');
  assert.ok(result.html.includes(`cid:${HERO_CID}`));
  assert.ok(result.html.includes(`cid:${LOGO_CID}`));
  assert.ok(result.html.includes('Animacje i warsztaty'));
  assert.ok(result.html.includes('31 PAŹDZIERNIKA 2026'));
  assert.ok(result.text.includes(CONTACT_URL));
  assert.ok(result.html.includes('WIADOMOŚĆ TESTOWA'));
  assert.ok(!result.html.includes('<script'));
});
test('Adres grafiki jest escapowany', () => {
  assert.ok(renderAutumnNewsletter({imageSrc:'x" onerror="bad'}).html.includes('x&quot; onerror=&quot;bad'));
});
test('MIME zawiera HTML, tekst oraz osadzoną grafikę; bez połączenia SMTP', async () => {
  const transport = nodemailer.createTransport({streamTransport:true,buffer:true});
  const mail = renderAutumnNewsletter();
  const result = await transport.sendMail({from:'test@example.com',to:TEST_RECIPIENT,...mail,attachments:[{filename:'hero.png',content:Buffer.from('test'),cid:HERO_CID,contentType:'image/png'},{filename:'logo.png',content:Buffer.from('test'),cid:LOGO_CID,contentType:'image/png'}]});
  const mime = result.message.toString();
  assert.match(mime,/multipart\/related/);
  assert.match(mime,/text\/plain/);
  assert.match(mime,/text\/html/);
  assert.ok(mime.includes(`Content-ID: <${HERO_CID}>`));
  assert.ok(mime.includes(`Content-ID: <${LOGO_CID}>`));
  assert.deepEqual(result.envelope.to,[TEST_RECIPIENT]);
});
