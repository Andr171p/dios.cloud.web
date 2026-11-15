import type { ArticleCardTheme } from "./themes";

export type ArticleCategory = "engineering" | "guide" | "update" | "case-study";
export type { ArticleCardTheme };

export type ArticleCardModel = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  cardTheme: ArticleCardTheme;
  href: string;
  coverUrl: string | null;
  coverAlt: string;
};
