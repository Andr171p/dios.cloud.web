import { Container } from "@/components/ui/Container";
import type { HomePageViewModel } from "../mappers";
import { HeroActions } from "./HeroActions";
import { HeroBackground } from "./HeroBackground";
import { HeroDemo } from "./HeroDemo";

type Props = {
  content: HomePageViewModel["hero"];
};

export function HomeHero({ content }: Props) {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground
        gridEnabled={content.gridEnabled}
        interactiveEnabled={content.interactiveBackgroundEnabled}
      />

      <Container className="pb-8 pt-16 text-center md:pb-12 md:pt-24">
        <div className="mx-auto max-w-3xl">
          {content.eyebrow ? (
            <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-muted uppercase">
              {content.eyebrow}
            </p>
          ) : null}

          <h1 className="font-(family-name:--font-display) text-(length:--text-hero) leading-tight font-semibold tracking-(--tracking-display) text-balance">
            {content.heading}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-(--leading-body) text-muted md:text-lg">
            {content.subheading}
          </p>

          <HeroActions links={content.links} />
        </div>

        {content.demoEnabled && content.demo ? <HeroDemo demo={content.demo} /> : null}
      </Container>
    </section>
  );
}
