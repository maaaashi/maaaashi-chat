import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { AppSyncResolverHandler } from 'aws-lambda'

type Input = {
  filename: string
}

export const handler: AppSyncResolverHandler<Input, any> = async (event) => {
  const client = new S3Client({ region: process.env.S3_REGION })
  const filename = event.arguments.filename

  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
  })

  const url = await getSignedUrl(client, command, {
    expiresIn: 600,
  })

  return JSON.stringify({ url })
}
