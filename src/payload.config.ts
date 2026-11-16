import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Articles } from "./cms/collections/Articles";
import { Media } from "./cms/collections/Media";
import { Organizations } from "./cms/collections/Organizations";
import { Pages } from "./cms/collections/Pages";
import { Products } from "./cms/collections/Products";
import { Users } from "./cms/collections/Users";
import { Footer } from "./cms/globals/Footer";
import { Header } from "./cms/globals/Header";
import { Homepage } from "./cms/globals/Homepage";
import { Settings } from "./cms/globals/Settings";
import { env } from "./lib/env";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const storagePlugins =
  env.s3.enabled
    ? [
        s3Storage({
          collections: {
            media: true,
          },
          bucket: env.s3.bucket,
          config: {
            credentials: {
              accessKeyId: env.s3.accessKeyId,
              secretAccessKey: env.s3.secretAccessKey,
            },
            region: env.s3.region,
            endpoint: env.s3.endpoint,
            forcePathStyle: env.s3.forcePathStyle,
          },
        }),
      ]
    : [];

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Pages, Products, Articles, Organizations],
  globals: [Header, Footer, Settings, Homepage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [...storagePlugins],
});
