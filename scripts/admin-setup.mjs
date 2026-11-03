import { readFile, writeFile, chmod } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { hashPassword } from '../src/lib/admin/security.mjs';
const envPath = new URL('../.env.local', import.meta.url);
let env = await readFile(envPath,'utf8').catch(()=>'');
if (/^ADMIN_PASSWORD_HASH=/m.test(env) && !process.argv.includes('--reset')) {
  console.log('Konto jest już skonfigurowane. Użyj --reset, aby zmienić hasło i unieważnić sesje.');
  process.exit(0);
}
const username = 'admin';
const password = randomBytes(18).toString('base64url');
const hash = await hashPassword(password);
env = env.replace(/^ADMIN_(USERNAME|PASSWORD_HASH)=.*\n?/gm,'');
await writeFile(envPath, `${env.trimEnd()}\nADMIN_USERNAME=${username}\nADMIN_PASSWORD_HASH=${hash}\n`, {mode:0o600});
await chmod(envPath,0o600);
const credentials = new URL('../.admin-access.txt',import.meta.url);
await writeFile(credentials, `Panel Nallipop: /admin\nLogin: ${username}\nHasło: ${password}\n\nPrzechowuj te dane w menedżerze haseł.\nPo wdrożeniu ustaw ADMIN_USERNAME i ADMIN_PASSWORD_HASH z .env.local na serwerze.\nNie publikuj tego pliku.\n`,{mode:0o600});
await chmod(credentials,0o600);
console.log('Konto skonfigurowane. Dane logowania zapisano w .admin-access.txt (tylko właściciel pliku). Zrestartuj serwer.');
