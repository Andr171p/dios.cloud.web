import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(dirname, "assets");

const covers = [
  { name: "desk-cover.webp", color: "#bb252d", label: "DIO Desk" },
  { name: "ai-cover.webp", color: "#8b5e3c", label: "DIOS AI" },
  { name: "kb-cover.webp", color: "#3f5f4e", label: "DIOS KB" },
  { name: "courses-cover.webp", color: "#4a5568", label: "DIO Courses" },
];

await fs.mkdir(assetsDir, { recursive: true });

for (const cover of covers) {
  const out = path.join(assetsDir, cover.name);
  try {
    await fs.access(out);
    console.log(`skip existing ${out}`);
    continue;
  } catch {
    // generate placeholder
  }

  const svg = `
    <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1b1b1b"/>
          <stop offset="100%" stop-color="#2a2a2a"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#bg)"/>
      <rect x="120" y="120" width="1360" height="760" rx="28" fill="#151515" stroke="#3a3a3a" stroke-width="2"/>
      <rect x="120" y="120" width="1360" height="64" rx="28" fill="#202020"/>
      <circle cx="170" cy="152" r="8" fill="#5a5a5a"/>
      <circle cx="200" cy="152" r="8" fill="#5a5a5a"/>
      <circle cx="230" cy="152" r="8" fill="#5a5a5a"/>
      <rect x="180" y="240" width="280" height="520" rx="16" fill="#1c1c1c" stroke="#333" />
      <rect x="500" y="240" width="900" height="120" rx="16" fill="#1c1c1c" stroke="#333" />
      <rect x="500" y="400" width="430" height="360" rx="16" fill="#1c1c1c" stroke="#333" />
      <rect x="970" y="400" width="430" height="360" rx="16" fill="#1c1c1c" stroke="#333" />
      <rect x="500" y="260" width="220" height="18" rx="9" fill="${cover.color}" opacity="0.9"/>
      <text x="180" y="900" fill="#f5f5f2" font-family="Arial, sans-serif" font-size="42" font-weight="700">${cover.label}</text>
      <text x="180" y="950" fill="#9a9a9a" font-family="Arial, sans-serif" font-size="24">Placeholder product interface</text>
    </svg>`;

  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(out);
  console.log(`wrote ${out}`);
}
