import { MongoClient } from "mongodb";

const globalForMongo = globalThis;

export async function getReviewsCollection() {
  const uri = process.env.FIRESTORE_MONGODB_URI || process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "Brakuje FIRESTORE_MONGODB_URI dla bazy Firestore w trybie zgodności z MongoDB."
    );
  }

  if (!globalForMongo.nallipopMongoClientPromise) {
    const client = new MongoClient(uri, {
      appName: "nallipop-opinie",
      serverSelectionTimeoutMS: 8000,
    });
    globalForMongo.nallipopMongoClientPromise = client.connect();
  }

  const client = await globalForMongo.nallipopMongoClientPromise;
  const databaseName = process.env.FIRESTORE_MONGODB_DATABASE || "nallipop";

  return client.db(databaseName).collection("opinie");
}
