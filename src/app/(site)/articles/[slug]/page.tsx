import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

import { Container } from "@/components/ui/Container";
import { articleCategoryLabel, toArticleCardModel } from "@/features/articles/mappers";
import { getArticleBySlug, getLatestArticles } from "@/features/articles/queries";
import { buildMetadata } from "@/lib/seo";

type Args = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getLatestArticles(50);
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Args) {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const article = await getArticleBySlug(slug, draft);

  return buildMetadata({
    title: article?.title,
    description: article?.excerpt,
    path: `/articles/${slug}`,
  });
}

export default async function ArticlePage({ params }: Args) {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const article = await getArticleBySlug(slug, draft);

  if (!article) notFound();

  const model = toArticleCardModel(article);

  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
          {articleCategoryLabel(model.category)}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[var(--tracking-tight)] md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-6 text-lg leading-[var(--leading-body)] text-[var(--muted)]">
          {article.excerpt}
        </p>
        <p className="mt-10 text-sm text-[var(--muted)]">
          Полный rich-text рендер добавим отдельным шагом. Сейчас страница нужна для переходов с
          редакционных карточек.
        </p>
      </Container>
    </section>
  );
}
