import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';  

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  // Connect to MongoDB
  const uri = 'mongodb+srv://htb:ENu83UbGynqpQ9E@cluster0.uyx8ms0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('htb');
    const collection = database.collection('File');

    // Insert a document
    const document = { name: 'John Doe', age: 30 };
    // const result = await collection.insertOne(document);
    // console.log('Inserted document:', result.insertedId);
  } finally {
    // Close the connection
    await client.close();
  }
}
