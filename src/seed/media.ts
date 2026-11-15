import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { Payload } from "payload";
import type { Media } from "@/payload-types";

import { logSeed } from "./utils";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(dirname, "assets");

type SeedMediaInput = {
  seedKey: string;
  filename: string;
  alt: string;
  mimeType?: string;
};

async function findBySeedKey(payload: Payload, seedKey: string) {
  const result = await payload.find({
    collection: "media",
    where: {
      seedKey: {
        equals: seedKey,
      },
    },
    limit: 1,
    depth: 0,
  });

  return result.docs[0] ?? null;
}

export async function upsertMedia(
  payload: Payload,
  input: SeedMediaInput & { replace?: boolean },
): Promise<{ doc: Media; result: "created" | "updated" | "skipped" }> {
  const filePath = path.join(assetsDir, input.filename);
  const buffer = await fs.readFile(filePath);
  const file = {
    data: buffer,
    mimetype: input.mimeType || "image/webp",
    name: input.filename,
    size: buffer.byteLength,
  };

  const existing = await findBySeedKey(payload, input.seedKey);
  if (existing) {
    if (!input.replace) {
      logSeed("media", input.seedKey, "skipped");
      return { doc: existing, result: "skipped" };
    }

    const doc = await payload.update({
      collection: "media",
      id: existing.id,
      data: {
        alt: input.alt,
        seedKey: input.seedKey,
      },
      file,
      context: { disableRevalidate: true },
    });

    logSeed("media", input.seedKey, "updated");
    return { doc, result: "updated" };
  }

  const doc = await payload.create({
    collection: "media",
    data: {
      alt: input.alt,
      seedKey: input.seedKey,
    },
    file,
  });

  logSeed("media", input.seedKey, "created");
  return { doc, result: "created" };
}

export async function seedMedia(payload: Payload) {
  const desk = await upsertMedia(payload, {
    seedKey: "desk-cover-ui",
    filename: "desk-cover.webp",
    alt: "Интерфейс DIO Desk — доска задач",
  });

  const ai = await upsertMedia(payload, {
    seedKey: "ai-cover-ui",
    filename: "ai-cover.webp",
    alt: "Интерфейс DIOS AI — модели и подключения",
  });

  const kb = await upsertMedia(payload, {
    seedKey: "kb-cover",
    filename: "kb-cover.webp",
    alt: "Интерфейс DIOS KB — база знаний и статьи",
  });

  const courses = await upsertMedia(payload, {
    seedKey: "courses-cover",
    filename: "courses-cover.webp",
    alt: "Интерфейс DIO Courses — учебные материалы",
  });

  const articleEngineering = await upsertMedia(payload, {
    seedKey: "article-engineering",
    filename: "article-engineering.webp",
    alt: "Обложка инженерной статьи о автоматизации DIO Desk",
    replace: true,
  });

  const articleGuide = await upsertMedia(payload, {
    seedKey: "article-guide",
    filename: "article-guide.webp",
    alt: "Обложка руководства по управлению обращениями",
    replace: true,
  });

  const articleUpdate = await upsertMedia(payload, {
    seedKey: "article-update",
    filename: "article-update.webp",
    alt: "Обложка обновления DIOS AI",
    replace: true,
  });

  const articleCase = await upsertMedia(payload, {
    seedKey: "article-case",
    filename: "article-case.webp",
    alt: "Обложка истории внедрения сервисных процессов",
    replace: true,
  });

  return {
    deskCoverId: desk.doc.id,
    aiCoverId: ai.doc.id,
    kbCoverId: kb.doc.id,
    coursesCoverId: courses.doc.id,
    articleEngineeringId: articleEngineering.doc.id,
    articleGuideId: articleGuide.doc.id,
    articleUpdateId: articleUpdate.doc.id,
    articleCaseId: articleCase.doc.id,
  };
}
