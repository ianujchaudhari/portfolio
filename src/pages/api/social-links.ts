import { connectToDatabase } from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await connectToDatabase(); // Get the singleton MongoDB client
    const db = client.db("test"); // Replace with your database name
    const collection = db.collection("sociallinks"); // Replace with your collection name

    const socialLinks = await collection.find({}).toArray(); // Fetch all social links
    res.status(200).json(socialLinks); // Return the data as JSON
  } catch (err) {
    console.error("Error fetching social links:", err);
    res.status(500).json({ error: "Failed to fetch social links" });
  }
}
