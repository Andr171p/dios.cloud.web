"use client";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ArticleCard } from "./ArticleCard";
import type { ArticleCardModel } from "../types";

type Props = {
  articles: readonly ArticleCardModel[];
};

export function ArticleRail({ articles }: Props) {
  const count = articles.length;
  const reducedMotion = useReducedMotion();
  const plugins = useMemo(() => [WheelGesturesPlugin({ forceWheelAxis: "x" })], []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      slidesToScroll: 1,
      loop: false,
      dragFree: false,
      watchDrag: count > 1,
    },
    count > 1 ? plugins : undefined,
  );

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    if (!emblaApi) return;
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

  if (count === 0) return null;

  return (
    <div className="article-rail" role="region" aria-label="Материалы DIOS">
      {count > 1 ? (
        <div className="mb-6 flex justify-end gap-2 pr-6 md:pr-10 lg:pr-16">
          <button
            type="button"
            aria-label="Предыдущие материалы"
            className="article-rail__nav"
            disabled={!canPrev}
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Следующие материалы"
            className="article-rail__nav"
            disabled={!canNext}
            onClick={() => emblaApi?.scrollNext()}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      ) : null}

      <div ref={emblaRef} className="article-rail__viewport">
        <motion.div
          className="article-rail__track"
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reducedMotion ? 0 : 0.1,
                delayChildren: reducedMotion ? 0 : 0.04,
              },
            },
          }}
        >
          {articles.map((article) => (
            <div key={article.id} className="article-rail__slide">
              <motion.div
                className="h-full"
                variants={{
                  hidden: {
                    opacity: 0,
                    x: reducedMotion ? 0 : 72,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.62,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                <ArticleCard article={article} />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
