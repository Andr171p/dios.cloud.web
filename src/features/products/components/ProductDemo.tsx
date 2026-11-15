"use client";

import { ThemeImage } from "@/components/media/ThemeImage";
import { ThemeVideo } from "@/components/media/ThemeVideo";

import type { ProductCardModel } from "../types";

type Props = {
  product: ProductCardModel;
  active?: boolean;
};

export function ProductDemo({ product, active = true }: Props) {
  const hasVideo = Boolean(product.demoVideoUrl || product.demoVideoUrlLight);
  const hasImage = Boolean(product.posterUrl || product.posterUrlLight);

  return (
    <div className="relative h-full overflow-hidden rounded-[calc(var(--radius-xl)-4px)] border border-[var(--border)] bg-[var(--surface-muted)]">
      {hasVideo ? (
        <ThemeVideo
          darkSrc={product.demoVideoUrl}
          lightSrc={product.demoVideoUrlLight}
          darkPoster={product.posterUrl}
          lightPoster={product.posterUrlLight}
          active={active}
          className="relative h-full min-h-56"
          label={`Демонстрация ${product.name}`}
        />
      ) : hasImage ? (
        <ThemeImage
          darkSrc={product.posterUrl}
          lightSrc={product.posterUrlLight}
          alt={product.posterAlt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 90vw, 70vw"
          priority={active}
        />
      ) : (
        <div className="flex h-full min-h-56 items-end p-6">
          <div className="w-full rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
            <div className="h-3 w-1/3 rounded bg-[var(--overlay)]" />
            <div className="mt-4 space-y-3">
              <div className="h-2 w-full rounded bg-[var(--overlay)]" />
              <div className="h-2 w-4/5 rounded bg-[var(--overlay)]" />
              <div className="h-2 w-2/3 rounded bg-[var(--overlay)]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
