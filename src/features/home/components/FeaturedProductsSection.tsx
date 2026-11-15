import { Container } from "@/components/ui/Container";
import { ProductCarousel } from "@/features/products/components/ProductCarousel";
import type { HomePageViewModel } from "../mappers";

type Props = {
  content: HomePageViewModel["productShowcase"];
  products: HomePageViewModel["featuredProducts"];
};

export function FeaturedProductsSection({ content, products }: Props) {
  return (
    <section id="products" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          {content.eyebrow ? (
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
              {content.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[var(--tracking-tight)] md:text-6xl">
            {content.title}
          </h2>
          {content.description ? (
            <p className="mx-auto mt-5 max-w-xl text-base leading-[var(--leading-body)] text-[var(--muted)]">
              {content.description}
            </p>
          ) : null}
        </div>

        <ProductCarousel products={products} />
      </Container>
    </section>
  );
}
