import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Connect to MongoDB
  try {
    // Insert a document
    const results = await db.document.findMany()
    return new Response(JSON.stringify(results), { status: 200 });
  } catch (e) {
    // Close the connection
    // @ts-ignore
    return new Response(e.message, { status: 500 });
  }
}
