export const articleThemes = {
  red: "#BB252D",
  blue: "#2054AE",
  forest: "#456127",
  iris: "#7140A2",
  petrol: "#17666B",
  orange: "#A84B23",
} as const;

export type ArticleCardTheme = keyof typeof articleThemes;

const legacyThemeMap: Record<string, ArticleCardTheme> = {
  green: "forest",
  neutral: "petrol",
};

export function normalizeArticleTheme(value: string | null | undefined): ArticleCardTheme {
  if (value && value in articleThemes) {
    return value as ArticleCardTheme;
  }

  if (value && value in legacyThemeMap) {
    return legacyThemeMap[value]!;
  }

  return "blue";
}
