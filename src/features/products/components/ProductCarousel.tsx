'use client';

import {useCallback, useEffect, useState} from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ProductCard } from "./ProductCard";
import type { Product } from "../types";


type Props = {
  products: readonly Product[];
};

export function ProductCarousel({products}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() =>{
    if (!emblaApi) return;

    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("init", updateButtons);
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("init", updateButtons);
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-5 flex touch-pan-y">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-0 flex-[0_0_90%] pl-5 md:flex-[0_0_65%] lg:flex-[0_0_50%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          aria-label="Предыдущие продукты"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          type="button"
          aria-label="Следующие продукты"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
