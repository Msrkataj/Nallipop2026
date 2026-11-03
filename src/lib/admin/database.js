import 'server-only';
import { MongoClient } from 'mongodb';
export async function adminDatabase() {
  const uri = process.env.FIRESTORE_MONGODB_URI || process.env.MONGODB_URI;
  if (!uri) throw new Error('Brak konfiguracji bazy danych panelu.');
  if (!globalThis.nallipopAdminDatabase) {
    const client = new MongoClient(uri, {appName:'nallipop-gallery', serverSelectionTimeoutMS:8000, maxPoolSize:10});
    globalThis.nallipopAdminDatabase = client.connect().catch(error => { globalThis.nallipopAdminDatabase = null; throw error; });
  }
  const client = await globalThis.nallipopAdminDatabase;
  return client.db(process.env.FIRESTORE_MONGODB_DATABASE || 'nallipop');
}
