import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

let client: MongoClient | null = null;
let db: Db | null = null;

const globalForMongo = globalThis as unknown as {
  _mongoClient?: MongoClient;
};

if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!globalForMongo._mongoClient) {
      globalForMongo._mongoClient = new MongoClient(uri);
    }
    client = globalForMongo._mongoClient;
  } else {
    client = new MongoClient(uri);
  }
  db = client.db();
}

export { client, db };
