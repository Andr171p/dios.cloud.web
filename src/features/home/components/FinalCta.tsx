import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { HomePageViewModel } from "../mappers";

type Props = {
  content: HomePageViewModel["finalCta"];
};

export function FinalCta({ content }: Props) {
  return (
    <section className="border-t border-[var(--border)] py-20 md:py-28">
      <Container>
        <div className="rounded-[var(--radius-xl)] bg-[var(--surface)] px-8 py-12 text-center md:px-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[var(--tracking-tight)] md:text-5xl">
              {content.heading}
            </h2>
            {content.description ? (
              <p className="mx-auto mt-5 max-w-2xl text-base leading-[var(--leading-body)] text-[var(--muted)] md:text-lg">
                {content.description}
              </p>
            ) : null}
            {content.links.length > 0 ? (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {content.links.map((link) => (
                  <Button
                    key={`${link.url}-${link.label}`}
                    href={link.url}
                    appearance={link.appearance}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
