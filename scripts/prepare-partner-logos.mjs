import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(
  process.env.USERPROFILE || process.env.HOME || "",
  ".cursor/projects/c-Users-andre-MyProjects-dios-cloud-web/assets",
);
const outDir = path.resolve(dirname, "../public/partners");

/** Keep original brand colors; strip only solid studio backgrounds. */
const logos = [
  { file: "mostostroy-63bf050c-7e2a-4597-818f-ac212ba875df.png", slug: "mostostroy", mode: "dark-bg" },
  { file: "purgaz-9ab83199-d1fd-463e-a150-3310345d5dd8.png", slug: "purgaz", mode: "dark-bg" },
  { file: "vodokanal-79ec9b0e-a8dd-4153-bd9a-899b6fcaa14f.png", slug: "vodokanal", mode: "dark-bg" },
  { file: "borovskaya__1_-66bc2956-93bc-4c34-a07b-fa18da730b9d.png", slug: "borovskaya", mode: "dark-bg" },
  { file: "orvd-e1afdbf0-363f-44de-ba60-0a309d83cbe9.png", slug: "orvd", mode: "dark-bg" },
  { file: "tfoms-1970a63c-2abd-4eac-a3c3-92bd0b18a98f.png", slug: "tfoms", mode: "dark-bg" },
  { file: "governor-7498a709-6a90-4cba-8a84-517fa36b7da1.png", slug: "tyumen-oblast", mode: "dark-bg" },
  { file: "fns-921c9c8c-8d65-4868-9181-e676875b4667.png", slug: "fns", mode: "dark-bg" },
];

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

fs.mkdirSync(outDir, { recursive: true });

for (const logo of logos) {
  const input = path.join(srcDir, logo.file);
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  let opaque = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    let alpha = data[i + 3] / 255;
    const L = lum(r, g, b);

    if (logo.mode === "dark-bg") {
      if (L < 16) alpha = 0;
      else if (L < 38) alpha *= (L - 16) / 22;
    } else if (logo.mode === "red-bg") {
      const isRedCanvas = r > 100 && r - Math.max(g, b) > 25 && L > 35;
      if (isRedCanvas) alpha = 0;
      else if (L < 95) alpha = Math.min(1, Math.max(alpha, (95 - L) / 55));
      else alpha = 0;
    }

    const strength = Math.min(1, Math.max(0, alpha));
    if (strength > 0.08) opaque += 1;

    out[i] = r;
    out[i + 1] = g;
    out[i + 2] = b;
    out[i + 3] = Math.round(strength * 255);
  }

  const outPath = path.join(outDir, `${logo.slug}.png`);
  await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 5 })
    .resize({ height: 160, width: 480, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  // Keep theme aliases pointing at the same color asset for CMS compatibility.
  fs.copyFileSync(outPath, path.join(outDir, `${logo.slug}-dark.png`));
  fs.copyFileSync(outPath, path.join(outDir, `${logo.slug}-light.png`));

  console.log(`${logo.slug}: opaque=${opaque} bytes=${fs.statSync(outPath).size}`);
}
