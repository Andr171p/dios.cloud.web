import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

import { ProductDemo } from "./ProductDemo";
import type { ProductCardModel } from "../types";

type Props = {
  product: ProductCardModel;
  active?: boolean;
};

const availabilityLabel = {
  available: "Доступен",
  beta: "Бета",
  planned: "В планах",
} as const;

export function ProductCard({ product, active = false }: Props) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)] transition-[transform,opacity,box-shadow] duration-[var(--motion-stage)] ease-[var(--ease-emphasized)] ${
        active ? "opacity-100" : "opacity-80"
      }`}
    >
      <div className="flex flex-1 flex-col p-7 md:p-9">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="text-[10px] font-semibold tracking-[0.16em] text-[var(--muted)] uppercase">
            {product.category}
          </span>
          <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]">
            {availabilityLabel[product.availability]}
          </span>
        </div>

        <div className="flex items-center gap-3.5 md:gap-4">
          {product.markSrc ? (
            <span
              className="product-mark inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[1.05rem] md:size-[3.25rem]"
              style={
                {
                  "--mark-accent": product.markAccent ?? product.accentColor,
                } as CSSProperties
              }
              aria-hidden
            >
              <Image
                src={product.markSrc}
                alt=""
                width={56}
                height={56}
                className="size-[78%] object-contain"
              />
            </span>
          ) : null}

          <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[var(--tracking-tight)] md:text-4xl">
            {product.name}
          </h3>
        </div>

        <p className="mt-3 text-sm font-medium text-[var(--accent)]">{product.tagline}</p>

        <p className="mt-4 max-w-[34rem] text-sm leading-[var(--leading-body)] text-[var(--muted)] md:text-base">
          {product.description}
        </p>

        {product.features.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {product.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted)]"
              >
                {feature}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={product.href}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-[color,gap] duration-[var(--motion-micro)] hover:gap-2.5 hover:text-[var(--accent)]"
          >
            Узнать больше
            <ArrowUpRight size={16} />
          </Link>
          {product.availability !== "planned" ? (
            <Link
              href={product.appUrl}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors duration-[var(--motion-micro)] hover:text-[var(--foreground)]"
            >
              Открыть приложение
            </Link>
          ) : null}
        </div>
      </div>

      <div className="relative h-56 p-4 pt-0 md:h-72 md:p-6 md:pt-0">
        <ProductDemo product={product} active={active} />
      </div>
    </article>
  );
}
