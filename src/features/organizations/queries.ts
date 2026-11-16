import type { Organization } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";

export async function getFeaturedOrganizations(limit = 12): Promise<Organization[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "organizations",
    where: {
      and: [
        { featured: { equals: true } },
        { approvedForPublication: { equals: true } },
        { _status: { equals: "published" } },
      ],
    },
    sort: "sortOrder",
    limit,
    depth: 1,
  });

  return result.docs;
}
