'use server'

import { ListBucketsCommand, ListObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"



const s3 = new S3Client({
  endpoint: 'https://s3.us-east-005.backblazeb2.com',
  region: 'us-west-005',
});

const bucket = "htb-x-s3"
export async function uploadToS3(formData: FormData) {
  const file = formData.get('file') as File
  console.log(file)

  const result = await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: file.name,
    Body: Buffer.from(await file.arrayBuffer())
  }))

  // list objects in the bucket
  const list = await s3.send(new ListObjectsCommand({
    Bucket: bucket
  }))
  console.log(list)
}
