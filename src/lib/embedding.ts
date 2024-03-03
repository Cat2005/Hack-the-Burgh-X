"use server";
import OpenAI from "openai";
import * as mathjs from "mathjs";
import { db } from "./db";
import { getThumbnail } from "@/components/s3-actions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Note = {
  content: string;
};

export type SearchResults = Awaited<ReturnType<typeof search>>;

function vectorSimilarity(v1: number[], v2: number[]) {
  // @ts-ignore
  return mathjs.dot(v1, v2) / (mathjs.norm(v1) * mathjs.norm(v2));
}

export async function createEmbeddingVector(note: Note) {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: note.content,
  });
  const vector = res.data[0].embedding;
  return vector;
}

export async function search(query: string, n: number = 3) {
  const results = await db.document.findMany();
  const embeddings = results.map((r) => ({
    documentId: r.id,
    vector: r.vector,
  }));
  const queryEmbedding = await createEmbeddingVector({ content: query });
  const similarities = embeddings.map((e) => ({
    documentId: e.documentId,
    similarity: vectorSimilarity(queryEmbedding, e.vector),
  }));
  const topN = similarities
    .sort((a, b) => a.similarity - b.similarity)
    .slice(0, Math.min(similarities.length, n))


  const resultsWithThumbnails = await Promise.all(
    topN.map(async (r) => {
      const thumbnail = await getThumbnail(r.documentId);
      return {
        ...r,
        thumbnail,
      };
    })
  );
  return resultsWithThumbnails;




}
