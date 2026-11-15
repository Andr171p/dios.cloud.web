import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

import { ProductRenderer } from "@/features/products/components/ProductRenderer";
import { getProductBySlug, getPublishedProducts } from "@/features/products/queries";
import { buildMetadata } from "@/lib/seo";

type Args = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getPublishedProducts();
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Args) {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const product = await getProductBySlug(slug, draft);

  return buildMetadata({
    title: product?.meta?.title || product?.title,
    description: product?.meta?.description || product?.summary,
    path: `/products/${slug}`,
  });
}

export default async function ProductPage({ params }: Args) {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const product = await getProductBySlug(slug, draft);

  if (!product) notFound();

  return <ProductRenderer product={product} />;
}
