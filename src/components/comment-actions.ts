'use server'
import { db } from "@/lib/db";

export async function createComment(content: string, documentId: string) {
  const comment = await db.comment.create({
    data: {
      content: content,
      documentId: documentId,
    }
  })
}
