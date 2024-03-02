import OpenAI from "openai";
import * as mathjs from "mathjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Note = {
  content: string;
};

type Embedding = {
  note: Note;
  vector: number[];
};

function vectorSimilarity(v1: number[], v2: number[]) {
  // @ts-ignore
  return mathjs.dot(v1, v2) / (mathjs.norm(v1) * mathjs.norm(v2));
}

async function createEmbeddingVector(note: Note) {
  const res = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: note.content,
  });
  const vector = res.data[0].embedding;
  return vector;
}

async function search(query: string, embeddings: Embedding[]) {
  const queryEmbedding = await createEmbeddingVector({ content: query });
  const similarities = embeddings.map((e) =>
    vectorSimilarity(queryEmbedding, e.vector)
  );
  const maxSimilarityIndex = similarities.indexOf(Math.max(...similarities));
  return {
    note: embeddings[maxSimilarityIndex].note,
    similarity: similarities[maxSimilarityIndex],
  };
}

async function addNoteToEmbeddings(note: Note, embeddings: Embedding[]) {
  const vector = await createEmbeddingVector(note);
  embeddings.push({ note, vector });
}
