import { Container } from "@/components/ui/Container";
import { HeroSection } from "@/features/home/components/HeroSection";

import { products } from "@/features/products/data";
import { ProductCarousel } from "@/features/products/components/ProductCarousel";

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <section id="products" className="scroll-mt-20 py-20 md:py-28">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[720px]">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#d35b62]">
                НАШИ ПРОДУКТЫ
              </span>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
                Инструменты, которые
                <br />
                работают вместе.
              </h2>

              <p className="mt-5 max-w-[520px] text-base leading-relaxed text-white/55">
                Выбирайте решения под ваши задачи и объединяйте их в единой экосистеме.
              </p>
            </div>
          </div>

          <ProductCarousel products={products} />
        </Container>
      </section>

      <section id="platform" className="scroll-mt-20 border-t border-white/10 py-24">
        <Container>
          <span className="text-xs font-semibold tracking-[0.2em] text-[#d35b62]">
            ЕДИНАЯ ПЛАТФОРМА
          </span>

          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Отдельные продукты.
            <br />
            Единая цифровая среда.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
            Единый аккаунт, организации, управление доступом и интеграции между сервисами DIOS.
          </p>
        </Container>
      </section>
    </main>
  );
}
