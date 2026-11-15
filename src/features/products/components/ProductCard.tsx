import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Headset } from "lucide-react";

import type { Product } from "../types";

const icons = {
  desk: Headset,
  ai: BrainCircuit,
};

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const Icon = icons[product.id as keyof typeof icons];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#2e2e2e] transition-colors hover:border-white/25">
      <div className="p-7 md:p-9">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            {Icon && <Icon size={25} />}
          </div>

          <span className="text-[10px] font-medium tracking-[0.14em] text-white/40">
            {product.category}
          </span>
        </div>

        <h3 className="text-3xl font-semibold tracking-tight">{product.name}</h3>

        <p className="mt-4 min-h-16 max-w-110 text-sm leading-relaxed text-white/55">
          {product.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {product.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60"
            >
              {feature}
            </span>
          ))}
        </div>

        <Link
          href={product.href}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#e47a80]"
        >
          Узнать больше
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="relative mt-auto h-60 overflow-hidden bg-[#242424] p-6 md:h-75">
        <div
          aria-hidden="true"
          className="absolute inset-x-12 bottom-0 h-40 rounded-full opacity-25 blur-[80px]"
          style={{ backgroundColor: product.accentColor }}
        />

        <div className="relative h-full overflow-hidden rounded-t-2xl border border-white/10 bg-[#191919] shadow-2xl">
          <div className="flex h-9 items-center gap-2 border-b border-white/10 px-4">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>

          <div className="flex h-full gap-4 p-5">
            <div className="w-1/4 space-y-3 border-r border-white/10 pr-4">
              {[60, 90, 70, 50].map((width, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full bg-white/10"
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>

            <div className="flex-1 space-y-4">
              <div className="h-4 w-1/2 rounded bg-white/15" />

              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="h-2 w-2/3 rounded bg-white/15" />
                  <div className="mt-2 h-2 w-1/3 rounded bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
