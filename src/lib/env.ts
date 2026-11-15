function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  databaseUrl: process.env.DATABASE_URL ?? "",
  payloadSecret: process.env.PAYLOAD_SECRET ?? "",
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  previewSecret: process.env.PREVIEW_SECRET || "preview-secret",
  nodeEnv: process.env.NODE_ENV || "development",
  allowProductionSeed: process.env.ALLOW_PRODUCTION_SEED === "true",
  s3: {
    enabled: process.env.S3_ENABLED !== "false",
    bucket: process.env.S3_BUCKET || "dios-media",
    region: process.env.S3_REGION || "us-east-1",
    endpoint: process.env.S3_ENDPOINT || "http://127.0.0.1:9000",
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "rustfsadmin",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "rustfsadmin",
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== "false",
  },
};

export function assertServerEnv() {
  required("DATABASE_URL", process.env.DATABASE_URL);
  required("PAYLOAD_SECRET", process.env.PAYLOAD_SECRET);
}

export function assertSeedEnv() {
  assertServerEnv();

  if (env.nodeEnv === "production" && !env.allowProductionSeed) {
    throw new Error(
      "Refusing to seed production. Set ALLOW_PRODUCTION_SEED=true if this is intentional.",
    );
  }
}
