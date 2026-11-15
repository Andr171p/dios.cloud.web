import type { Payload } from "payload";
import type { Product } from "@/payload-types";

import { logSeed } from "./utils";

type MediaIds = {
  deskCoverId: number;
  aiCoverId: number;
  kbCoverId: number;
  coursesCoverId: number;
};

type ProductSeed = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  category: string;
  availability: "available" | "beta" | "planned";
  accentColor: string;
  features: string[];
  posterId: number;
  metaTitle: string;
  metaDescription: string;
};

async function findProductBySlug(payload: Payload, slug: string) {
  const result = await payload.find({
    collection: "products",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 0,
    draft: true,
  });

  return result.docs[0] ?? null;
}

export async function seedProducts(payload: Payload, media: MediaIds) {
  const seeds: ProductSeed[] = [
    {
      slug: "dio-desk",
      title: "DIO Desk",
      tagline: "Обращения, процессы и SLA в одном месте",
      summary:
        "Единое пространство для управления обращениями, сервисными процессами и командами поддержки.",
      category: "IT Service Management",
      availability: "available",
      accentColor: "#bb252d",
      features: ["Обращения", "Workflow", "SLA"],
      posterId: media.deskCoverId,
      metaTitle: "DIO Desk — управление сервисными процессами",
      metaDescription:
        "DIO Desk помогает командам принимать обращения, выстраивать workflow и контролировать SLA.",
    },
    {
      slug: "dios-ai",
      title: "DIOS AI",
      tagline: "ИИ-инструменты в контексте вашей организации",
      summary:
        "Интеллектуальные инструменты, которые работают с вашими данными, ролями и процессами DIOS.",
      category: "Artificial Intelligence",
      availability: "beta",
      accentColor: "#8b5e3c",
      features: ["ИИ-чаты", "Инструменты", "Интеграции"],
      posterId: media.aiCoverId,
      metaTitle: "DIOS AI — ИИ для рабочих процессов",
      metaDescription:
        "DIOS AI помогает командам работать с информацией и ускорять рутинные операции.",
    },
    {
      slug: "dios-kb",
      title: "DIOS KB",
      tagline: "База знаний для людей и автоматизаций",
      summary:
        "Структурированная база знаний с поиском, версиями статей и доступом по ролям организации.",
      category: "Knowledge",
      availability: "planned",
      accentColor: "#3f5f4e",
      features: ["Статьи", "Поиск", "Доступы"],
      posterId: media.kbCoverId,
      metaTitle: "DIOS KB — база знаний",
      metaDescription: "DIOS KB собирает знания команды в одном управляемом пространстве.",
    },
    {
      slug: "dio-courses",
      title: "DIO Courses",
      tagline: "Обучение сотрудников на рабочих сценариях",
      summary:
        "Курсы и материалы для адаптации сотрудников к продуктам и процессам экосистемы DIOS.",
      category: "Learning",
      availability: "planned",
      accentColor: "#4a5568",
      features: ["Курсы", "Прогресс", "Сертификация"],
      posterId: media.coursesCoverId,
      metaTitle: "DIO Courses — обучение команды",
      metaDescription: "DIO Courses помогает обучать сотрудников на реальных рабочих сценариях.",
    },
  ];

  const docs: Product[] = [];

  for (const seed of seeds) {
    const existing = await findProductBySlug(payload, seed.slug);
    if (existing) {
      logSeed("product", seed.slug, "skipped");
      docs.push(existing);
      continue;
    }

    const doc = await payload.create({
      collection: "products",
      data: {
        title: seed.title,
        tagline: seed.tagline,
        summary: seed.summary,
        category: seed.category,
        availability: seed.availability,
        accentColor: seed.accentColor,
        features: seed.features.map((label) => ({ label })),
        poster: seed.posterId,
        featuredImage: seed.posterId,
        slug: seed.slug,
        publishedAt: new Date().toISOString(),
        meta: {
          title: seed.metaTitle,
          description: seed.metaDescription,
          image: seed.posterId,
        },
        _status: "published",
      },
      draft: false,
      context: {
        disableRevalidate: true,
      },
    });

    logSeed("product", seed.slug, "created");
    docs.push(doc);
  }

  return docs;
}
