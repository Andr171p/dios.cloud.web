import type { Payload } from "payload";

export type SeedResult = "created" | "skipped" | "updated";

export function logSeed(entity: string, key: string, result: SeedResult) {
  const label = result.toUpperCase().padEnd(7);
  console.log(`[seed] ${label} ${entity}: ${key}`);
}

export async function ensureS3Bucket(payload: Payload) {
  const enabled = process.env.S3_ENABLED !== "false";
  if (!enabled) {
    console.log("[seed] S3 disabled, skipping bucket ensure");
    return;
  }

  const endpoint = process.env.S3_ENDPOINT || "http://127.0.0.1:9000";
  const region = process.env.S3_REGION || "us-east-1";
  const bucket = process.env.S3_BUCKET || "dios-media";
  const accessKeyId = process.env.S3_ACCESS_KEY_ID || "rustfsadmin";
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || "rustfsadmin";

  const { CreateBucketCommand, HeadBucketCommand, S3Client } = await import(
    "@aws-sdk/client-s3"
  );

  const client = new S3Client({
    region,
    endpoint,
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== "false",
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  try {
    await client.send(new HeadBucketCommand({ Bucket: bucket }));
    console.log(`[seed] S3 bucket ready: ${bucket}`);
  } catch {
    await client.send(new CreateBucketCommand({ Bucket: bucket }));
    console.log(`[seed] S3 bucket created: ${bucket}`);
  }

  payload.logger.info(`Using S3 endpoint ${endpoint}, bucket ${bucket}`);
}
