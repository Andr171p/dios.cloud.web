import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { env } from "@/lib/env";
import { getPayloadClient } from "@/lib/payload";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const collection = searchParams.get("collection") || "pages";

  if (secret !== env.previewSecret) {
    return new Response("Invalid preview token", { status: 401 });
  }

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  const payload = await getPayloadClient();

  if (collection === "products") {
    const result = await payload.find({
      collection: "products",
      draft: true,
      depth: 0,
      limit: 1,
      where: { slug: { equals: slug } },
    });

    if (!result.docs[0]) {
      return new Response("Product not found", { status: 404 });
    }

    const draft = await draftMode();
    draft.enable();
    redirect(`/products/${slug}`);
  }

  const result = await payload.find({
    collection: "pages",
    draft: true,
    depth: 0,
    limit: 1,
    where: { slug: { equals: slug } },
  });

  if (!result.docs[0]) {
    return new Response("Page not found", { status: 404 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(slug === "home" ? "/" : `/${slug}`);
}
