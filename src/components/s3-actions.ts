'use server'
import { db } from "@/lib/db";
import { createEmbeddingVector } from "@/lib/embedding";
import { GetObjectCommand, ListBucketsCommand, ListObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Document } from "@prisma/client";
import pdf2img from "pdf-img-convert";
import PDFParser from "pdf2json";

const s3 = new S3Client({
  endpoint: 'https://s3.us-east-005.backblazeb2.com',
  region: 'us-west-005',
});

const bucket = "htb-x-s3"
export async function uploadToS3(formData: FormData, tags: string[]) {
  const file = formData.get('file') as File

  const data = await pdf2img.convert(Buffer.from(await file.arrayBuffer()), {
    width: 1600,
    height: 1600,
    page_numbers: [1],
    base64: true
  })

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
        tags: tags
      }
    })

    const pdf = await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: `${document.id}-file.pdf`,
      ContentType: 'application/pdf',
      ACL: 'public-read',
      Body: Buffer.from(await file.arrayBuffer())
    }))


    const image = await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: `${document.id}-thumbnail.png`,
      ContentType: 'image/png',
      ACL: 'public-read',
      // @ts-ignore
      Body: Buffer.from(data[0], 'base64'),
    }))

    // list objects in the bucket
    const list = await s3.send(new ListObjectsCommand({
      Bucket: bucket
    }))

  })
  pdfParser.parseBuffer(Buffer.from(await file.arrayBuffer()))
  return data[0]
  //
}

export async function getThumbnail(documentId: string) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: `${documentId}-thumbnail.png`
  })

  return await getSignedUrl(s3, command, { expiresIn: 30 })
}

export async function getPdf(documentId: string) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: `${documentId}-file.pdf`
  })

  return await getSignedUrl(s3, command, { expiresIn: 30 })
}
