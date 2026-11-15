import type { Payload } from "payload";
import type { Article, Product } from "@/payload-types";

import { logSeed } from "./utils";

export async function seedHomepage(
  payload: Payload,
  products: Product[],
  articles: Article[],
) {
  const bySlug = Object.fromEntries(products.map((product) => [product.slug, product.id]));
  const articleIds = articles.map((article) => article.id);

  const existing = await payload.findGlobal({
    slug: "homepage",
    depth: 0,
  });

  const featuredIds = ["dio-desk", "dios-ai", "dios-kb", "dio-courses"]
    .map((slug) => bySlug[slug])
    .filter((id): id is number => typeof id === "number");

  const heroPayload = {
    eyebrow: "DIOS CLOUD PLATFORM",
    heading: "Экосистема рабочих продуктов",
    subheading:
      "DIO Desk, DIOS AI и другие продукты, которые работают вместе через общую платформу.",
    links: [
      { label: "Открыть продукты", url: "#products", appearance: "primary" as const },
      { label: "Связаться с нами", url: "https://demo.example.dios.cloud", appearance: "secondary" as const },
    ],
    demoEnabled: true,
    gridEnabled: true,
    interactiveBackgroundEnabled: true,
  };

  const platformPayload = {
    eyebrow: "Возможности платформы",
    title: "Что объединяет продукты DIOS",
    description:
      "Общие платформенные возможности, доступные в соответствующих продуктах и сценариях.",
    ctaLabel: "Познакомьтесь с платформой",
    ctaUrl: "#ecosystem",
    items: [
      {
        icon: "account" as const,
        title: "Единый аккаунт",
        description: "Вход в продукты DIOS через общую систему идентификации.",
      },
      {
        icon: "organizations" as const,
        title: "Организации и команды",
        description: "Разделение рабочих пространств и управление участниками.",
      },
      {
        icon: "integrations" as const,
        title: "Интеграции",
        description: "Связь систем и автоматизация обмена данными.",
      },
      {
        icon: "access" as const,
        title: "Контроль доступа",
        description: "Разрешения и границы доступа в рамках организации.",
      },
    ],
  };

  const articlesSectionPayload = {
    eyebrow: "Материалы и обновления",
    title: "Как развивается DIOS",
    description:
      "Инженерные заметки, руководства и обновления продуктов — без публикаций ради публикаций.",
  };

  const hasCore = Boolean(existing.hero?.heading && (existing.featuredProducts?.length ?? 0) > 0);
  const needsPlatform = !(existing.platform?.items?.length);
  const needsArticlesSection = !existing.articlesSection?.title;
  const needsFeaturedArticles = !(existing.featuredArticles?.length);
  const needsCenteredHero =
    existing.hero?.heading !== heroPayload.heading ||
    existing.hero?.demoEnabled == null ||
    existing.hero?.gridEnabled == null;

  if (hasCore && !needsPlatform && !needsArticlesSection && !needsFeaturedArticles && !needsCenteredHero) {
    logSeed("global", "homepage", "skipped");
    return;
  }

  if (!hasCore) {
    await payload.updateGlobal({
      slug: "homepage",
      data: {
        hero: heroPayload,
        featuredProducts: featuredIds,
        productShowcase: {
          eyebrow: "Наши продукты",
          title: "Инструменты, которые работают вместе.",
          description:
            "Выбирайте решения под ваши задачи и объединяйте их в единой экосистеме DIOS.",
        },
        platform: platformPayload,
        ecosystem: {
          eyebrow: "Связанная экосистема",
          title: "Отдельные продукты. Единая цифровая среда.",
          description:
            "Единый аккаунт, организации, управление доступом и интеграции между сервисами DIOS.",
          items: [
            {
              title: "Общий контекст",
              description:
                "Продукты опираются на одну модель организаций, ролей и доступов.",
            },
            {
              title: "Связные процессы",
              description:
                "От обращения в Desk до ответа с помощью AI и материалов базы знаний.",
            },
            {
              title: "Понятный следующий шаг",
              description:
                "Каждый продукт ведёт к действию: открыть приложение, изучить сценарий или запросить демо.",
            },
          ],
        },
        articlesSection: articlesSectionPayload,
        featuredArticles: articleIds.slice(0, 4),
        finalCta: {
          heading: "Выберите продукт и начните работу.",
          description:
            "Изучите возможности, откройте приложение или запросите демонстрацию — без лишних обещаний.",
          links: [
            { label: "Открыть продукты", url: "#products", appearance: "primary" },
            {
              label: "Запросить демонстрацию",
              url: "https://demo.example.dios.cloud",
              appearance: "secondary",
            },
          ],
        },
      },
      context: { disableRevalidate: true },
    });

    logSeed("global", "homepage", "created");
    return;
  }

  await payload.updateGlobal({
    slug: "homepage",
    data: {
      ...(needsCenteredHero ? { hero: heroPayload } : {}),
      ...(needsPlatform ? { platform: platformPayload } : {}),
      ...(needsArticlesSection ? { articlesSection: articlesSectionPayload } : {}),
      ...(needsFeaturedArticles ? { featuredArticles: articleIds.slice(0, 4) } : {}),
    },
    context: { disableRevalidate: true },
  });

  logSeed("global", "homepage", "updated");
}
