import type { Article } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";

export async function getLatestArticles(limit = 4): Promise<Article[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "articles",
    depth: 1,
    limit,
    overrideAccess: false,
    sort: "-publishedAt",
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  return result.docs;
}

export async function getArticleBySlug(slug: string, draft = false): Promise<Article | null> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "articles",
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
