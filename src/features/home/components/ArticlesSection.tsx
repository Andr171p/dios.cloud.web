import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { ArticleRail } from "@/features/articles/components/ArticleRail";
import type { HomePageViewModel } from "../mappers";

type Props = {
  content: HomePageViewModel["articlesSection"];
  articles: HomePageViewModel["articles"];
};

export function ArticlesSection({ content, articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <section id="articles" className="scroll-mt-24 border-t border-[var(--border)] py-20 md:py-28">
      <Container>
        <div className="article-rail__header max-w-none">
          <div className="max-w-3xl text-left">
            {content.eyebrow ? (
              <p className="text-xs font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
                {content.eyebrow}
              </p>
            ) : null}
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[var(--tracking-tight)] md:text-5xl">
              {content.title}
            </h2>
            {content.description ? (
              <p className="mt-5 max-w-2xl text-base leading-[var(--leading-body)] text-[var(--muted)]">
                {content.description}
              </p>
            ) : null}
          </div>

          <Link
            href="/articles"
            className="mb-1 inline-flex items-center gap-1.5 text-sm font-semibold transition-[color,gap] duration-[var(--motion-micro)] hover:gap-2.5 hover:text-[var(--accent)]"
          >
            Все публикации
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </Container>

      {/* Left-aligned to content grid; right edge peeks next card past the container padding */}
      <div className="mt-10 pl-6 md:pl-10 lg:pl-16">
        <ArticleRail articles={articles} />
      </div>
    </section>
  );
}
