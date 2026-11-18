type HexColor = `#${string}`;

export type ProductFeature = {
  label: string;
};

export type ProductCardModel = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  href: string;
  appUrl: string;
  availability: "available" | "beta" | "planned";
  accentColor: HexColor;
  features: readonly string[];
  /** Product graphic mark (identity lives in code registry) */
  markSrc: string | null;
  /** Soft tonal plate color for the mark */
  markAccent: HexColor | null;
  posterUrl: string | null;
  posterAlt: string;
  demoVideoUrl: string | null;
  demoVideoUrlLight?: string | null;
  posterUrlLight?: string | null;
};

/** @deprecated Use ProductCardModel */
export type Product = ProductCardModel;
