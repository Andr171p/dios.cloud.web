import type { Homepage } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";

export async function getHomepage(): Promise<Homepage> {
  const payload = await getPayloadClient();

  return payload.findGlobal({
    slug: "homepage",
    depth: 2,
  });
}
