import type { Page } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";

export async function getPageBySlug(slug: string, draft = false): Promise<Page | null> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "pages",
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

export async function getPublishedPages(): Promise<Page[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "pages",
    depth: 0,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  return result.docs;
}
