import type { MetadataRoute } from "next";

import { getPublishedPages } from "@/features/pages/queries";
import { getPublishedProducts } from "@/features/products/queries";
import { env } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, products] = await Promise.all([getPublishedPages(), getPublishedProducts()]);

  const pageEntries = pages.map((page) => ({
    url: page.slug === "home" ? env.serverUrl : `${env.serverUrl}/${page.slug}`,
    lastModified: page.updatedAt,
  }));

  const productEntries = products.map((product) => ({
    url: `${env.serverUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
  }));

  return [
    {
      url: `${env.serverUrl}/products`,
      lastModified: new Date(),
    },
    ...pageEntries,
    ...productEntries,
  ];
}
