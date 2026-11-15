import Link from 'next/link';
import { ArrowUpRight, Sparkles } from "lucide-react";

import {Container} from "@/components/ui/Container";


export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 right-[-15%] -z-10 h-175 w-175 rounded-full bg-[#bb252d]/12 blur-[140px]"
      />

      <Container className="py-24 md:py-36">
        <div className="max-w-235">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-white/70">
            <Sparkles size={14} className="text-[#d75b62]" />
            DIOS CLOUD PLATFORM
          </div>

          <h1 className="text-[clamp(3rem,7vw,6.5rem)] leading-[1.04] font-semibold tracking-[-0.065em]">
            Одна экосистема.
            <br />
            <span className="text-[#d35b62]">
              Больше возможностей.
            </span>
          </h1>

          <p className="mt-8 max-w-160 text-lg leading-relaxed text-white/55 md:text-xl">
            Объединяем инструменты, процессы и искусственный
            интеллект в единой цифровой среде для бизнеса.
          </p>

          <div className="mt-11 flex flex-wrap gap-3">
            <Link
              href="#products"
              className="inline-flex items-center gap-3 rounded-xl bg-[#bb252d] px-7 py-4 text-sm font-semibold transition-colors hover:bg-[#a71e26]"
            >
              Исследовать продукты
              <ArrowUpRight size={18} />
            </Link>

            <Link
              href="#platform"
              className="inline-flex items-center rounded-xl border border-white/15 px-7 py-4 text-sm font-medium transition-colors hover:bg-white/5"
            >
              О платформе
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
