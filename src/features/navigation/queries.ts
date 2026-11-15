import type { Footer, Header, Setting } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";

export async function getHeader(): Promise<Header> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "header", depth: 1 });
}

export async function getFooter(): Promise<Footer> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "footer", depth: 1 });
}

export async function getSettings(): Promise<Setting> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "settings", depth: 1 });
}
