import type { Product } from "@/payload-types";
import { productsConfig } from "@/config/products";
import { getPayloadClient } from "@/lib/payload";

export async function getProductBySlug(slug: string, draft = false): Promise<Product | null> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    draft,
    depth: 2,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs[0] ?? null;
}

export async function getPublishedProducts(): Promise<Product[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    depth: 1,
    limit: productsConfig.listPageSize,
    overrideAccess: false,
    where: {
      _status: {
        equals: "published",
      },
    },
    sort: "-publishedAt",
  });

  return result.docs;
}
