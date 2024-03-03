import { getThumbnail } from "@/components/s3-actions";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Connect to MongoDB
  try {
    // Insert a document
    const results = await db.document.findMany()
    console.log(results)
    return new Response(JSON.stringify(results), { status: 200 });
  } catch (e) {
    // Close the connection
    return new Response(e.message, { status: 500 });
  }
}
