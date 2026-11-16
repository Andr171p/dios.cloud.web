import { Container } from "@/components/ui/Container";
import { LogoMarquee, type MarqueeLogo } from "@/components/marquee/LogoMarquee";

type Props = {
  title?: string | null;
  logos: readonly MarqueeLogo[];
};

export function PartnersSection({
  title = "Наши партнёры и заказчики",
  logos,
}: Props) {
  if (logos.length === 0) return null;

  return (
    <section
      id="partners"
      className="scroll-mt-24 border-b border-[var(--border)] py-14 md:py-20"
      aria-labelledby="partners-heading"
    >
      <Container>
        <p
          id="partners-heading"
          className="mb-8 text-center text-sm font-semibold tracking-[0.08em] text-[var(--muted)] uppercase md:mb-10"
        >
          {title}
        </p>
      </Container>

      <LogoMarquee logos={logos} />
    </section>
  );
}
