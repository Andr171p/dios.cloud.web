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
};

export function assertServerEnv() {
  required("DATABASE_URL", process.env.DATABASE_URL);
  required("PAYLOAD_SECRET", process.env.PAYLOAD_SECRET);
}
