'use server'

import { db } from "@/lib/db";
import { createEmbeddingVector } from "@/lib/embedding";
import { GetObjectCommand, ListBucketsCommand, ListObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Document } from "@prisma/client";
import PDFParser from "pdf2json";


const s3 = new S3Client({
  endpoint: 'https://s3.us-east-005.backblazeb2.com',
  region: 'us-west-005',
});

const bucket = "htb-x-s3"
export async function uploadToS3(formData: FormData) {
  const file = formData.get('file') as File
  //  const pdfparser = new PDFParser()
  const pdfParser = new (PDFParser as any)(null, 1);
  pdfParser.on("pdfParser_dataError", (errData: any) => console.error(errData.parserError))
  pdfParser.on("pdfParser_dataReady", async () => {
    const text = ((pdfParser as any).getRawTextContent());
    const vec = await createEmbeddingVector({ content: text })
    const document = await db.document.create({
      data: {
        filename: file.name,
        size: file.size,
        vector: vec,
      }
    })

    const result = await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: `${document.id}-${file.name}`,
      Body: Buffer.from(await file.arrayBuffer())
    }))

    // list objects in the bucket
    const list = await s3.send(new ListObjectsCommand({
      Bucket: bucket
    }))

  })
  pdfParser.parseBuffer(Buffer.from(await file.arrayBuffer()))
  //
}

export async function getPresignedUrl(document: Document) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: `${document.id}-${document.filename}`
  })

  return await getSignedUrl(s3, command, { expiresIn: 10 })
}
