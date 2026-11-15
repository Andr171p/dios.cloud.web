import type { Payload } from "payload";
import type { Article } from "@/payload-types";

import type { ArticleCardTheme } from "@/features/articles/themes";

import { plainRichText } from "./richText";
import { logSeed } from "./utils";

type MediaIds = {
  articleEngineeringId: number;
  articleGuideId: number;
  articleUpdateId: number;
  articleCaseId: number;
};

type ArticleSeed = {
  slug: string;
  title: string;
  excerpt: string;
  category: "engineering" | "guide" | "update" | "case-study";
  cardTheme: ArticleCardTheme;
  coverId: number;
  body: string;
};

async function findBySlug(payload: Payload, slug: string) {
  const result = await payload.find({
    collection: "articles",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    draft: true,
  });

  return result.docs[0] ?? null;
}

export async function seedArticles(payload: Payload, media: MediaIds) {
  const seeds: ArticleSeed[] = [
    {
      slug: "desk-automation-internals",
      title: "Как устроены процессы DIO Desk",
      excerpt:
        "Разбираем, как маршрутизация обращений, SLA и события связываются в рабочих сценариях команды.",
      category: "engineering",
      cardTheme: "forest",
      coverId: media.articleEngineeringId,
      body: "Технический обзор автоматизации DIO Desk. Полный текст будет заменён редакционным материалом.",
    },
    {
      slug: "start-with-service-requests",
      title: "Первое рабочее пространство",
      excerpt:
        "Практический сценарий для первой линии: очередь, приоритеты, эскалации и понятные статусы.",
      category: "guide",
      cardTheme: "blue",
      coverId: media.articleGuideId,
      body: "Руководство по запуску обработки обращений в DIOS. Черновой seed-текст.",
    },
    {
      slug: "dios-ai-context-update",
      title: "Новые возможности DIOS AI",
      excerpt:
        "Короткое обновление о работе с организационным контекстом и безопасных границах доступа.",
      category: "update",
      cardTheme: "red",
      coverId: media.articleUpdateId,
      body: "Заметка об обновлении DIOS AI. Seed-контент для визуальной проверки секции.",
    },
    {
      slug: "service-desk-rollout-story",
      title: "Как связаны продукты",
      excerpt:
        "История внедрения: от разрозненных чатов к прозрачному процессу в экосистеме DIOS.",
      category: "case-study",
      cardTheme: "petrol",
      coverId: media.articleCaseId,
      body: "Кейс внедрения сервисных процессов. Seed-текст без выдуманных метрик.",
    },
  ];

  const docs: Article[] = [];

  for (const seed of seeds) {
    const existing = await findBySlug(payload, seed.slug);
    const data = {
      title: seed.title,
      excerpt: seed.excerpt,
      category: seed.category,
      cardTheme: seed.cardTheme,
      cover: seed.coverId,
      content: plainRichText(seed.body),
      slug: seed.slug,
      publishedAt: new Date().toISOString(),
      _status: "published" as const,
    };

    if (existing) {
      const needsUpdate =
        existing.title !== seed.title ||
        existing.cardTheme !== seed.cardTheme ||
        existing.cover !== seed.coverId;

      if (needsUpdate) {
        const doc = await payload.update({
          collection: "articles",
          id: existing.id,
          data,
          draft: false,
          context: { disableRevalidate: true },
        });
        logSeed("article", seed.slug, "updated");
        docs.push(doc);
      } else {
        logSeed("article", seed.slug, "skipped");
        docs.push(existing);
      }
      continue;
    }

    const doc = await payload.create({
      collection: "articles",
      data,
      draft: false,
      context: { disableRevalidate: true },
    });

    logSeed("article", seed.slug, "created");
    docs.push(doc);
  }

  return docs;
}
