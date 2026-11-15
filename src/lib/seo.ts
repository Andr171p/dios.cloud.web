import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { env } from "@/lib/env";

type SeoInput = {
  title?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  path?: string;
};

export function buildMetadata({ title, description, imageUrl, path = "/" }: SeoInput): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDescription = description || siteConfig.description;
  const url = new URL(path, env.serverUrl).toString();

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      siteName: siteConfig.name,
      ...(imageUrl
        ? {
            images: [{ url: imageUrl }],
          }
        : {}),
    },
  };
}
