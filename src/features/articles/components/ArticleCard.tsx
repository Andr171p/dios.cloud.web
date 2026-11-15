import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { articleCategoryLabel } from "../mappers";
import type { ArticleCardModel } from "../types";

type Props = {
  article: ArticleCardModel;
};

const themeClass: Record<ArticleCardModel["cardTheme"], string> = {
  red: "article-card--red",
  blue: "article-card--blue",
  forest: "article-card--forest",
  iris: "article-card--iris",
  petrol: "article-card--petrol",
  orange: "article-card--orange",
};

export function ArticleCard({ article }: Props) {
  return (
    <Link href={article.href} className={`article-card group ${themeClass[article.cardTheme]}`}>
      <div className="article-card__media">
        {article.coverUrl ? (
          <Image
            src={article.coverUrl}
            alt={article.coverAlt}
            fill
            className="article-card__image object-cover"
            sizes="(max-width: 640px) 84vw, (max-width: 1024px) 45vw, 30vw"
          />
        ) : (
          <div className="article-card__fallback" aria-hidden />
        )}
      </div>

      <div className="article-card__body">
        <span className="article-card__tag">{articleCategoryLabel(article.category)}</span>
        <h3 className="article-card__title">{article.title}</h3>
        <span className="article-card__action">
          Читать сейчас
          <ArrowRight size={16} aria-hidden />
        </span>
      </div>
    </Link>
  );
}
