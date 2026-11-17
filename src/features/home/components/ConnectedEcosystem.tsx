import Link from "next/link";

import { InverseSection } from "@/components/layout/InverseSection";
import { Container } from "@/components/ui/Container";
import { EcosystemGraph } from "@/components/visualizations/ecosystem-graph/EcosystemGraph";
import { getProductMarketingUrl } from "@/config/product-registry";
import type { HomePageViewModel } from "../mappers";

type Props = {
  content: HomePageViewModel["ecosystem"];
};

export function ConnectedEcosystem({ content }: Props) {
  const ctaHref = getProductMarketingUrl("dios-ai");

  return (
    <InverseSection
      id="ecosystem"
      aria-labelledby="ecosystem-heading"
      className="scroll-mt-24 py-28 md:py-40"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.28fr)] lg:gap-8 xl:gap-12">
          <div className="relative z-10 max-w-xl text-left">
            <p className="text-xs font-semibold tracking-[0.2em] text-inverse-accent uppercase">
              {content.eyebrow ?? "Интеграции и контекст"}
            </p>

            <h2
              id="ecosystem-heading"
              className="mt-5 font-(family-name:--font-display) text-4xl font-semibold tracking-(--tracking-tight) text-balance text-inverse-foreground md:text-5xl lg:text-6xl"
            >
              Контекст, который связывает ваши инструменты
            </h2>

            <p className="mt-6 max-w-md text-base leading-(--leading-body) text-inverse-muted md:text-lg">
              DIOS AI работает не в вакууме: он опирается на продукты платформы,
              сущности бизнес-процессов и подключённые системы — а модели
              обрабатывают запрос отдельно от источников данных.
            </p>

            <Link
              href={ctaHref}
              className="group mt-9 inline-flex items-center gap-4 rounded-full border border-inverse-foreground/70 px-8 py-4 text-sm font-medium text-inverse-foreground transition-[background-color,border-color,color,gap] duration-(--motion-ui) hover:border-inverse-foreground hover:bg-[color-mix(in_srgb,var(--inverse-foreground)_10%,transparent)] hover:gap-5 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Как работает DIOS AI
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-(--motion-ui) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </Link>

            {content.items.length > 0 ? (
              <ul className="mt-12 hidden max-w-md space-y-5 border-t border-inverse-border pt-8 lg:block">
                {content.items.slice(0, 3).map((item) => (
                  <li key={item.title}>
                    <p className="text-sm font-semibold text-inverse-foreground">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-(--leading-body) text-inverse-muted">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="relative min-w-0 lg:-mr-6 xl:-mr-10">
            <EcosystemGraph />
          </div>
        </div>
      </Container>
    </InverseSection>
  );
}
