'use server'
import OpenAI from "openai";
import * as mathjs from "mathjs";
import { db } from "./db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Note = {
  content: string;
};

type Embedding = {
  documentId: string;
  vector: number[];
};

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

export async function search(query: string) {
  const results = await db.document.findMany()
  const embeddings = results.map((r) => ({ documentId: r.id, vector: r.vector }));
  const queryEmbedding = await createEmbeddingVector({ content: query });
  const similarities = embeddings.map((e) =>
    vectorSimilarity(queryEmbedding, e.vector)
  );
  const maxSimilarityIndex = similarities.indexOf(Math.max(...similarities));
  console.log("maxSimilarityIndex", maxSimilarityIndex);
  console.log("documentId", embeddings[maxSimilarityIndex].documentId);
  return {
    documentId: embeddings[maxSimilarityIndex].documentId,
    similarity: similarities[maxSimilarityIndex],
  };
}

