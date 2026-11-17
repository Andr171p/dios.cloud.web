import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { RollingNumber } from "@/components/ui/RollingNumber";
import { getProductMarketingUrl } from "@/config/product-registry";

const METRICS = [
  {
    value: 34,
    suffix: "%",
    label: "Выше релевантность ответов",
  },
  {
    value: 41,
    suffix: "%",
    label: "Меньше уточняющих запросов",
  },
] as const;

export function AiMetricsSection() {
  const diosAiUrl = getProductMarketingUrl("dios-ai");

  return (
    <section
      id="ai-metrics"
      aria-labelledby="ai-metrics-heading"
      className="scroll-mt-24 border-t border-border py-28 md:py-40"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            DIOS AI
          </p>

          <h2
            id="ai-metrics-heading"
            className="mt-5 font-(family-name:--font-display) text-4xl font-semibold tracking-(--tracking-tight) text-balance md:text-6xl"
          >
            Почему контекст имеет значение
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-(--leading-body) text-muted md:text-lg">
            В отличие от обычного AI-чата, DIOS AI понимает контекст вашей
            организации, встроен в бизнес-процессы и использует инструменты
            платформы.
          </p>

          <Link
            href={diosAiUrl}
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-[color,gap] duration-(--motion-micro) hover:gap-2.5 hover:text-accent-hover"
          >
            Почему это важно
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="mx-auto mt-20 flex max-w-5xl flex-col items-center gap-12 md:mt-24 md:flex-row md:justify-center md:gap-6 lg:gap-10">
          {METRICS.map((metric, index) => (
            <div key={metric.label} className="contents">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="font-(family-name:--font-display) text-5xl font-light text-accent md:text-6xl lg:text-7xl"
                >
                  +
                </span>
              ) : null}

              <div className="min-w-0 flex-1 text-center">
                <RollingNumber
                  value={metric.value}
                  suffix={metric.suffix}
                  className="text-[clamp(4.5rem,11vw,10.5rem)] leading-none text-foreground"
                />
                <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-foreground uppercase md:mt-6 md:text-sm">
                  {metric.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-3xl text-center text-sm leading-(--leading-body) text-muted md:mt-20">
          Демонстрационные значения на основе внутренних сценариев сравнения
          DIOS AI и обычного веб-чата без платформенного контекста. Итоговые
          результаты зависят от данных, ролей доступа и подключённых интеграций.
        </p>
      </Container>
    </section>
  );
}
