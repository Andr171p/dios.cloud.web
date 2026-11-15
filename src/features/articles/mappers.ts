import type { Article, Media } from "@/payload-types";

import { normalizeArticleTheme } from "./themes";
import type { ArticleCardModel } from "./types";

const categoryLabels = {
  engineering: "Инженерия",
  guide: "Руководство",
  update: "Обновление",
  "case-study": "Внедрение",
} as const;

function isMedia(value: number | Media | null | undefined): value is Media {
  return Boolean(value && typeof value === "object");
}

export function articleCategoryLabel(category: ArticleCardModel["category"]) {
  return categoryLabels[category];
}

export function toArticleCardModel(article: Article): ArticleCardModel {
  const cover = article.cover;

  return {
    id: String(article.id),
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    cardTheme: normalizeArticleTheme(article.cardTheme),
    href: `/articles/${article.slug}`,
    coverUrl: isMedia(cover) ? (cover.url ?? null) : null,
    coverAlt: isMedia(cover) ? cover.alt || article.title : article.title,
  };
}
