import { Container } from "@/components/ui/Container";
import type { HomePageViewModel } from "../mappers";

type Props = {
  content: HomePageViewModel["ecosystem"];
};

export function ConnectedEcosystem({ content }: Props) {
  return (
    <section id="ecosystem" className="scroll-mt-24 border-t border-border py-20 md:py-28">
      <Container>
        <div className="max-w-3xl text-left">
          {content.eyebrow ? (
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              {content.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-5 font-(family-name:--font-display) text-4xl font-semibold tracking-tight md:text-6xl">
            {content.title}
          </h2>
          {content.description ? (
            <p className="mt-6 max-w-2xl text-lg leading-(--leading-body) text-muted">
              {content.description}
            </p>
          ) : null}
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {content.items.map((item) => (
            <div key={item.title} className="border-t border-border pt-6 text-left">
              <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-(--leading-body) text-muted md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
