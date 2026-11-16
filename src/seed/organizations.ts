import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { Payload } from "payload";
import type { Organization } from "@/payload-types";

import { logSeed } from "./utils";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const partnersDir = path.join(dirname, "../../public/partners");

type OrgSeed = {
  slug: string;
  name: string;
  relationship: "customer" | "partner" | "integration";
  sortOrder: number;
  lightFile: string;
  darkFile: string;
};

const seeds: OrgSeed[] = [
  {
    slug: "mostostroy-11",
    name: "Мостострой-11",
    relationship: "partner",
    sortOrder: 10,
    lightFile: "mostostroy-light.png",
    darkFile: "mostostroy-dark.png",
  },
  {
    slug: "purgaz",
    name: "ПУРГАЗ",
    relationship: "customer",
    sortOrder: 20,
    lightFile: "purgaz-light.png",
    darkFile: "purgaz-dark.png",
  },
  {
    slug: "vodokanal",
    name: "Водоканал",
    relationship: "customer",
    sortOrder: 30,
    lightFile: "vodokanal-light.png",
    darkFile: "vodokanal-dark.png",
  },
  {
    slug: "borovskaya",
    name: "Птицефабрика Боровская",
    relationship: "customer",
    sortOrder: 40,
    lightFile: "borovskaya-light.png",
    darkFile: "borovskaya-dark.png",
  },
  {
    slug: "orvd",
    name: "Госкорпорация по ОрВД",
    relationship: "partner",
    sortOrder: 50,
    lightFile: "orvd-light.png",
    darkFile: "orvd-dark.png",
  },
  {
    slug: "tfoms",
    name: "ТФОМС",
    relationship: "partner",
    sortOrder: 60,
    lightFile: "tfoms-light.png",
    darkFile: "tfoms-dark.png",
  },
  {
    slug: "tyumen-oblast",
    name: "Тюменская область",
    relationship: "partner",
    sortOrder: 70,
    lightFile: "tyumen-oblast-light.png",
    darkFile: "tyumen-oblast-dark.png",
  },
  {
    slug: "fns",
    name: "Федеральная налоговая служба",
    relationship: "partner",
    sortOrder: 80,
    lightFile: "fns-light.png",
    darkFile: "fns-dark.png",
  },
];

async function upsertLogoMedia(payload: Payload, seedKey: string, filename: string, alt: string) {
  const filePath = path.join(partnersDir, filename);
  const buffer = await fs.readFile(filePath);
  const file = {
    data: buffer,
    mimetype: "image/png",
    name: filename,
    size: buffer.byteLength,
  };

  const existing = await payload.find({
    collection: "media",
    where: { seedKey: { equals: seedKey } },
    limit: 1,
    depth: 0,
  });

  if (existing.docs[0]) {
    const doc = await payload.update({
      collection: "media",
      id: existing.docs[0].id,
      data: { alt, seedKey },
      file,
      context: { disableRevalidate: true },
    });
    logSeed("media", seedKey, "updated");
    return doc.id;
  }

  const doc = await payload.create({
    collection: "media",
    data: { alt, seedKey },
    file,
    context: { disableRevalidate: true },
  });

  logSeed("media", seedKey, "created");
  return doc.id;
}

async function findBySlug(payload: Payload, slug: string) {
  const result = await payload.find({
    collection: "organizations",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    draft: true,
  });

  return result.docs[0] ?? null;
}

export async function seedOrganizations(payload: Payload): Promise<Organization[]> {
  const docs: Organization[] = [];

  for (const seed of seeds) {
    const lightId = await upsertLogoMedia(
      payload,
      `partner-${seed.slug}-light`,
      seed.lightFile,
      `${seed.name} — логотип (светлая тема)`,
    );
    const darkId = await upsertLogoMedia(
      payload,
      `partner-${seed.slug}-dark`,
      seed.darkFile,
      `${seed.name} — логотип (тёмная тема)`,
    );

    const existing = await findBySlug(payload, seed.slug);
    const data = {
      name: seed.name,
      slug: seed.slug,
      relationship: seed.relationship,
      logoLight: lightId,
      logoDark: darkId,
      featured: true,
      sortOrder: seed.sortOrder,
      approvedForPublication: true,
      _status: "published" as const,
    };

    if (existing) {
      logSeed("organization", seed.slug, "skipped");
      docs.push(existing);
      continue;
    }

    const doc = await payload.create({
      collection: "organizations",
      data,
      draft: false,
      context: { disableRevalidate: true },
    });

    logSeed("organization", seed.slug, "created");
    docs.push(doc);
  }

  return docs;
}
