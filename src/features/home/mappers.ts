import type { Article, Homepage, Media, Product } from "@/payload-types";
import { toArticleCardModel } from "@/features/articles/mappers";
import type { ArticleCardModel } from "@/features/articles/types";
import { toProductCardModel } from "@/features/products/mappers";
import type { ProductCardModel } from "@/features/products/types";
import type { PlatformIconKey } from "@/assets/icons/PlatformIcons";
import { heroMotionDemo } from "@/config/product-registry";

export type HomeLink = {
  label: string;
  url: string;
  appearance: "primary" | "secondary";
};

export type HeroDemoAssets = {
  darkImage?: string | null;
  lightImage?: string | null;
  darkVideo?: string | null;
  lightVideo?: string | null;
};

export type HomePageViewModel = {
  hero: {
    eyebrow?: string | null;
    heading: string;
    subheading: string;
    links: HomeLink[];
    demoEnabled: boolean;
    gridEnabled: boolean;
    interactiveBackgroundEnabled: boolean;
    demo: HeroDemoAssets | null;
  };
  productShowcase: {
    eyebrow?: string | null;
    title: string;
    description?: string | null;
  };
  featuredProducts: ProductCardModel[];
  platform: {
    eyebrow?: string | null;
    title: string;
    description?: string | null;
    ctaLabel?: string | null;
    ctaUrl?: string | null;
    items: Array<{
      icon: PlatformIconKey;
      title: string;
      description: string;
    }>;
  };
  ecosystem: {
    eyebrow?: string | null;
    title: string;
    description?: string | null;
    items: Array<{ title: string; description: string }>;
  };
  articlesSection: {
    eyebrow?: string | null;
    title: string;
    description?: string | null;
  };
  articles: ArticleCardModel[];
  finalCta: {
    heading: string;
    description?: string | null;
    links: HomeLink[];
  };
};

function mapLinks(
  links:
    | Array<{
        label: string;
        url: string;
        appearance?: "primary" | "secondary" | null;
        id?: string | null;
      }>
    | null
    | undefined,
): HomeLink[] {
  return (links ?? []).map((link) => ({
    label: link.label,
    url: link.url,
    appearance: link.appearance === "secondary" ? "secondary" : "primary",
  }));
}

function isProduct(value: number | Product | null | undefined): value is Product {
  return Boolean(value && typeof value === "object");
}

function isArticle(value: number | Article | null | undefined): value is Article {
  return Boolean(value && typeof value === "object");
}

function isMedia(value: number | Media | null | undefined): value is Media {
  return Boolean(value && typeof value === "object");
}

function mediaUrl(value: number | Media | null | undefined): string | null {
  if (!isMedia(value)) return null;
  return value.url ?? null;
}

const defaultIcons: PlatformIconKey[] = [
  "account",
  "organizations",
  "integrations",
  "access",
];

function resolveHeroDemo(homepage: Homepage): HeroDemoAssets | null {
  const hero = homepage.hero;

  const demo: HeroDemoAssets = {
    darkImage: mediaUrl(hero?.demoDarkImage) ?? heroMotionDemo.darkPoster,
    lightImage: mediaUrl(hero?.demoLightImage) ?? heroMotionDemo.lightPoster,
    darkVideo: mediaUrl(hero?.demoDarkVideo) ?? heroMotionDemo.darkVideo,
    lightVideo: mediaUrl(hero?.demoLightVideo) ?? heroMotionDemo.lightVideo,
  };

  if (!demo.darkImage && !demo.lightImage && !demo.darkVideo && !demo.lightVideo) {
    return null;
  }

  return demo;
}

export function toHomePageViewModel(
  homepage: Homepage,
  fallbackArticles: Article[] = [],
): HomePageViewModel {
  const featuredProducts = (homepage.featuredProducts ?? [])
    .filter(isProduct)
    .map(toProductCardModel);

  const featuredArticles = (homepage.featuredArticles ?? [])
    .filter(isArticle)
    .map(toArticleCardModel);

  const articles =
    featuredArticles.length > 0
      ? featuredArticles
      : fallbackArticles.map(toArticleCardModel);

  return {
    hero: {
      eyebrow: homepage.hero?.eyebrow,
      heading: homepage.hero?.heading ?? "DIOS",
      subheading: homepage.hero?.subheading ?? "",
      links: mapLinks(homepage.hero?.links),
      demoEnabled: homepage.hero?.demoEnabled !== false,
      gridEnabled: homepage.hero?.gridEnabled !== false,
      interactiveBackgroundEnabled: homepage.hero?.interactiveBackgroundEnabled !== false,
      demo: resolveHeroDemo(homepage),
    },
    productShowcase: {
      eyebrow: homepage.productShowcase?.eyebrow,
      title: homepage.productShowcase?.title ?? "Продукты",
      description: homepage.productShowcase?.description,
    },
    featuredProducts,
    platform: {
      eyebrow: homepage.platform?.eyebrow,
      title: homepage.platform?.title ?? "Что объединяет продукты DIOS",
      description: homepage.platform?.description,
      ctaLabel: homepage.platform?.ctaLabel,
      ctaUrl: homepage.platform?.ctaUrl,
      items: (homepage.platform?.items ?? []).map((item, index) => ({
        icon: (item.icon as PlatformIconKey) || defaultIcons[index % defaultIcons.length]!,
        title: item.title,
        description: item.description,
      })),
    },
    ecosystem: {
      eyebrow: homepage.ecosystem?.eyebrow,
      title: homepage.ecosystem?.title ?? "Экосистема",
      description: homepage.ecosystem?.description,
      items: (homepage.ecosystem?.items ?? []).map((item) => ({
        title: item.title,
        description: item.description,
      })),
    },
    articlesSection: {
      eyebrow: homepage.articlesSection?.eyebrow,
      title: homepage.articlesSection?.title ?? "Материалы и обновления",
      description: homepage.articlesSection?.description,
    },
    articles,
    finalCta: {
      heading: homepage.finalCta?.heading ?? "Начните с DIOS",
      description: homepage.finalCta?.description,
      links: mapLinks(homepage.finalCta?.links),
    },
  };
}
