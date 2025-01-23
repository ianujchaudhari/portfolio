import { connectToDatabase } from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await connectToDatabase(); // Get the singleton MongoDB client
    const db = client.db("test"); // Replace with your database name
    const collection = db.collection("generalinfos"); // Replace with your collection name

    const generalInfo = await collection.find({}).toArray(); 
    res.status(200).json(generalInfo); // Return the data as JSON
  } catch (err) {
    console.error("Error fetching generalInfo:", err);
    res.status(500).json({ error: "Failed to fetch generalInfo" });
  }
}