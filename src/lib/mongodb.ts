import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string; // Add this to your .env.local file

if (!uri) {
  throw new Error("Please add your MongoDB URI to your .env.local file");
}

let client: MongoClient | null = null; // Singleton MongoClient instance

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, { monitorCommands: true }); // Initialize client if not already initialized
    await client.connect(); // Establish the connection
  }
  return client;
}
