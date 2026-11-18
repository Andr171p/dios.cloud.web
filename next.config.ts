import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const s3Endpoint = process.env.S3_ENDPOINT || "http://127.0.0.1:9000";
let s3Hostname = "127.0.0.1";
let s3Port: string | undefined = "9000";
let s3Protocol: "http" | "https" = "http";

try {
  const parsed = new URL(s3Endpoint);
  s3Hostname = parsed.hostname;
  s3Port = parsed.port || undefined;
  s3Protocol = parsed.protocol.replace(":", "") as "http" | "https";
} catch {
  // keep defaults
}

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/media/file/**",
      },
      {
        pathname: "/brand/**",
      },
      {
        pathname: "/demos/**",
      },
      {
        pathname: "/partners/**",
      },
      {
        pathname: "/integrations/**",
      },
    ],
    remotePatterns: [
      {
        protocol: s3Protocol,
        hostname: s3Hostname,
        port: s3Port,
        pathname: "/**",
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };

    return webpackConfig;
  },
  turbopack: {
    root: path.resolve(dirname),
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
