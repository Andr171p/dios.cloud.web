export type ProductDemoAssets = {
  /** Prefer theme-aware stills until motion demos are ready per product */
  darkPoster?: string;
  lightPoster?: string;
  darkVideo?: string;
  lightVideo?: string;
};

export type ProductRuntimeConfig = {
  slug: string;
  appUrl: string;
  docsUrl: string;
  /** Graphic mark only — kept in code as brand identity */
  markSrc?: string;
  /** Soft tonal plate behind the mark (light + dark themes) */
  markAccent?: `#${string}`;
  demo?: ProductDemoAssets;
};

/**
 * Runtime product URLs and demo assets live in code, not CMS.
 * Carousel cards accept image and/or video; video wins when present.
 */
export const productRegistry: Record<string, ProductRuntimeConfig> = {
  "dio-desk": {
    slug: "dio-desk",
    appUrl: "https://desk.example.dios.cloud",
    docsUrl: "https://docs.example.dios.cloud/desk",
    markSrc: "/integrations/products/dio-desk.png",
    markAccent: "#e07a6a",
    demo: {
      darkPoster: "/demos/dio-desk-board-dark-poster.webp",
      lightPoster: "/demos/dio-desk-board-light-poster.webp",
    },
  },
  "dios-ai": {
    slug: "dios-ai",
    appUrl: "https://ai.example.dios.cloud",
    docsUrl: "https://docs.example.dios.cloud/ai",
    markSrc: "/integrations/products/ai-chats.png",
    markAccent: "#9b6bdc",
  },
  "dios-kb": {
    slug: "dios-kb",
    appUrl: "https://kb.example.dios.cloud",
    docsUrl: "https://docs.example.dios.cloud/kb",
    markSrc: "/integrations/products/knowledge.png",
    markAccent: "#5b8def",
  },
  "dio-courses": {
    slug: "dio-courses",
    appUrl: "https://courses.example.dios.cloud",
    docsUrl: "https://docs.example.dios.cloud/courses",
    markSrc: "/integrations/products/courses.png",
    markAccent: "#e0b04a",
  },
};

export function getProductMarkSrc(slug: string): string | null {
  return getProductRuntime(slug)?.markSrc ?? null;
}

export function getProductMarkAccent(slug: string): `#${string}` | null {
  return getProductRuntime(slug)?.markAccent ?? null;
}

export const heroMotionDemo = {
  darkVideo: "/demos/motion-dark.mp4",
  lightVideo: "/demos/motion-light.mp4",
  darkPoster: "/demos/dio-desk-board-dark-poster.webp",
  lightPoster: "/demos/dio-desk-board-light-poster.webp",
} as const;

export function getProductRuntime(slug: string): ProductRuntimeConfig | null {
  return productRegistry[slug] ?? null;
}

export function getProductAppUrl(slug: string): string {
  return getProductRuntime(slug)?.appUrl ?? `/products/${slug}`;
}

export function getProductMarketingUrl(slug: string): string {
  return `/products/${slug}`;
}
