import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nextEnv from '@next/env';
import nodemailer from 'nodemailer';
import { renderAutumnNewsletter, HERO_CID, LOGO_CID, TEST_RECIPIENT } from '../src/lib/autumn-newsletter.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (args.length > 1 || (args.length === 1 && args[0] !== '--send-test')) {
  console.error('Użyj npm run newsletter:preview albo npm run newsletter:test. Odbiorca testowy jest stały.');
  process.exit(1);
}

async function main() {
  const image = await fs.readFile(path.join(root, 'public/images/newsletter-jesienna-kula.png'));
  const logo = await fs.readFile(path.join(root, 'public/images/newsletter-logo.png'));
  if (args[0] !== '--send-test') {
    const outputDir = path.join(root, 'newsletter-preview');
    await fs.mkdir(outputDir, { recursive: true });
    const preview = renderAutumnNewsletter({ imageSrc: `data:image/png;base64,${image.toString('base64')}`, logoSrc: `data:image/png;base64,${logo.toString('base64')}` });
    await fs.writeFile(path.join(outputDir, 'jesienna-kula.html'), preview.html);
    await fs.writeFile(path.join(outputDir, 'jesienna-kula.txt'), preview.text);
    console.log(`Podgląd: ${path.join(outputDir, 'jesienna-kula.html')}`);
    console.log('Nic nie wysłano. Test: npm run newsletter:test');
    return;
  }
  nextEnv.loadEnvConfig(root);
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error('Brak GMAIL_USER lub GMAIL_APP_PASSWORD w .env.local. Użyj istniejącej konfiguracji poczty formularzy.');
  const newsletter = renderAutumnNewsletter();
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com', port: 465, secure: true,
    auth: { user, pass }, connectionTimeout: 15000, socketTimeout: 30000,
  });
  try {
    const info = await transport.sendMail({
      from: { name: 'Nallipop', address: user },
      to: TEST_RECIPIENT,
      replyTo: 'animacje@nallipop.pl',
      subject: `[TEST] ${newsletter.subject}`,
      html: newsletter.html, text: newsletter.text,
      attachments: [
        { filename: 'jesienna-kula.png', content: image, cid: HERO_CID, contentType: 'image/png', contentDisposition: 'inline' },
        { filename: 'logo-nallipop.png', content: logo, cid: LOGO_CID, contentType: 'image/png', contentDisposition: 'inline' },
      ],
    });
    if (!info.accepted?.includes(TEST_RECIPIENT)) throw new Error('Serwer nie potwierdził przyjęcia wiadomości dla odbiorcy testowego.');
    console.log(`Serwer przyjął test dla ${TEST_RECIPIENT}. Sprawdź Odebrane, Oferty i Spam. Nie jest to potwierdzenie dostarczenia.`);
  } finally { transport.close(); }
}

main().catch((error) => {
  // Do not print SMTP responses or credentials to public logs.
  console.error(error.code ? `Nie udało się wysłać testu (${error.code}). Sprawdź konfigurację SMTP i połączenie.` : error.message);
  process.exitCode = 1;
});
