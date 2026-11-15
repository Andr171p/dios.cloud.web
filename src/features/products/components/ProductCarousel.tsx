"use client";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ProductCard } from "./ProductCard";
import type { ProductCardModel } from "../types";

type Props = {
  products: readonly ProductCardModel[];
};

function startIndexFor(count: number) {
  if (count <= 1) return 0;
  return Math.floor((count - 1) / 2);
}

function distanceClass(distance: number, active: boolean) {
  if (active) return "product-slide product-slide--active";
  if (distance === 1) return "product-slide product-slide--near";
  return "product-slide product-slide--far";
}

export function ProductCarousel({ products }: Props) {
  const count = products.length;
  const initialIndex = startIndexFor(count);

  const plugins = useMemo(() => [WheelGesturesPlugin({ forceWheelAxis: "x" })], []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      containScroll: false,
      loop: false,
      skipSnaps: false,
      startIndex: initialIndex,
      watchDrag: count > 1,
    },
    count > 1 ? plugins : undefined,
  );

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    sync();
    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);

    return () => {
      emblaApi.off("select", sync);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi, sync]);

  useEffect(() => {
    if (!emblaApi || count <= 1) return;

    const root = emblaApi.rootNode();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        emblaApi.scrollPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        emblaApi.scrollNext();
      }
    };

    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  }, [emblaApi, count]);

  if (count === 0) return null;

  if (count === 1) {
    const product = products[0];
    if (!product) return null;

    return (
      <div className="mx-auto max-w-4xl">
        <ProductCard product={product} active />
      </div>
    );
  }

  return (
    <div
      className="product-carousel relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Продукты DIOS"
    >
      <button
        type="button"
        aria-label="Предыдущий продукт"
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canPrev}
        className="product-carousel__nav product-carousel__nav--prev"
      >
        <ArrowLeft size={20} />
      </button>

      <div
        ref={emblaRef}
        className="product-carousel__viewport overflow-hidden outline-none"
        tabIndex={0}
      >
        <div className="flex touch-pan-y">
          {products.map((product, index) => {
            const active = index === selectedIndex;
            const distance = Math.abs(index - selectedIndex);

            return (
              <div
                key={product.id}
                className="product-carousel__slide min-w-0 shrink-0 grow-0 basis-[86%] px-3 sm:basis-[78%] md:basis-[70%] lg:basis-[62%]"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} из ${count}: ${product.name}`}
                aria-current={active ? "true" : undefined}
              >
                <div
                  className={distanceClass(distance, active)}
                  data-active={active}
                  onClick={() => {
                    if (!active) emblaApi?.scrollTo(index);
                  }}
                  onKeyDown={(event) => {
                    if (!active && (event.key === "Enter" || event.key === " ")) {
                      event.preventDefault();
                      emblaApi?.scrollTo(index);
                    }
                  }}
                  role={active ? undefined : "button"}
                  tabIndex={active ? undefined : 0}
                >
                  <ProductCard product={product} active={active} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        aria-label="Следующий продукт"
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canNext}
        className="product-carousel__nav product-carousel__nav--next"
      >
        <ArrowRight size={20} />
      </button>

      <div className="mt-8 flex items-center justify-center gap-3">
        <p className="text-sm text-[var(--muted)]" aria-live="polite">
          {selectedIndex + 1} / {count}
        </p>
      </div>
    </div>
  );
}
