import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

import { PageRenderer } from "@/features/pages/components/PageRenderer";
import { getPageBySlug, getPublishedPages } from "@/features/pages/queries";
import { buildMetadata } from "@/lib/seo";

type Args = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const pages = await getPublishedPages();

  return pages
    .filter((page) => page.slug !== "home")
    .map(({ slug }) => ({
      slug: slug.split("/"),
    }));
}

export async function generateMetadata({ params }: Args) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");
  const { isEnabled: draft } = await draftMode();
  const page = await getPageBySlug(slug, draft);

  return buildMetadata({
    title: page?.meta?.title || page?.title,
    description: page?.meta?.description,
    path: `/${slug}`,
  });
}

export default async function CMSPage({ params }: Args) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");
  const { isEnabled: draft } = await draftMode();
  const page = await getPageBySlug(slug, draft);

  if (!page) notFound();

  return <PageRenderer page={page} />;
}
