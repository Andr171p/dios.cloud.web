import type { Media, Product } from "@/payload-types";

export type ProductCard = {
  id: number | string;
  title: string;
  slug: string;
  summary: string;
  imageUrl: string | null;
  imageAlt: string;
};

function mediaUrl(media: number | Media | null | undefined): string | null {
  if (!media || typeof media === "number") return null;
  return media.url ?? null;
}

function mediaAlt(media: number | Media | null | undefined, fallback: string): string {
  if (!media || typeof media === "number") return fallback;
  return media.alt || fallback;
}

export function toProductCard(product: Product): ProductCard {
  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    summary: product.summary,
    imageUrl: mediaUrl(product.featuredImage),
    imageAlt: mediaAlt(product.featuredImage, product.title),
  };
}
