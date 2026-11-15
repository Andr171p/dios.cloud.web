import type { Media, Product } from "@/payload-types";
import {
  getProductAppUrl,
  getProductMarketingUrl,
  getProductRuntime,
} from "@/config/product-registry";

import type { ProductCardModel } from "./types";

function isMedia(value: number | Media | null | undefined): value is Media {
  return Boolean(value && typeof value === "object");
}

function mediaUrl(media: number | Media | null | undefined): string | null {
  if (!isMedia(media)) return null;
  return media.url ?? null;
}

function mediaAlt(media: number | Media | null | undefined, fallback: string): string {
  if (!isMedia(media)) return fallback;
  return media.alt || fallback;
}

function asHex(color: string): `#${string}` {
  return (color.startsWith("#") ? color : `#${color}`) as `#${string}`;
}

export function toProductCardModel(product: Product): ProductCardModel {
  const poster = product.poster ?? product.featuredImage;
  const runtime = getProductRuntime(product.slug);
  const demo = runtime?.demo;

  return {
    id: String(product.id),
    slug: product.slug,
    name: product.title,
    tagline: product.tagline,
    category: product.category,
    description: product.summary,
    href: getProductMarketingUrl(product.slug),
    appUrl: getProductAppUrl(product.slug),
    availability: product.availability,
    accentColor: asHex(product.accentColor),
    features: (product.features ?? []).map((feature) => feature.label),
    posterUrl: demo?.darkPoster ?? mediaUrl(poster),
    posterAlt: mediaAlt(poster, product.title),
    posterUrlLight: demo?.lightPoster ?? null,
    demoVideoUrl: demo?.darkVideo ?? mediaUrl(product.demoVideo),
    demoVideoUrlLight: demo?.lightVideo ?? null,
  };
}

/** @deprecated Prefer toProductCardModel */
export function toProductCard(product: Product) {
  const model = toProductCardModel(product);
  return {
    id: model.id,
    title: model.name,
    slug: model.slug,
    summary: model.description,
    imageUrl: model.posterUrl,
    imageAlt: model.posterAlt,
  };
}
