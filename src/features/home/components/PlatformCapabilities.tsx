import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { platformIcons } from "@/assets/icons/PlatformIcons";
import { Container } from "@/components/ui/Container";
import type { HomePageViewModel } from "../mappers";

type Props = {
  content: HomePageViewModel["platform"];
};

export function PlatformCapabilities({ content }: Props) {
  return (
    <section id="platform" className="scroll-mt-24 border-t border-[var(--border)] py-20 md:py-28">
      <Container>
        <div className="max-w-3xl text-left">
          {content.eyebrow ? (
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
              {content.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[var(--tracking-tight)] md:text-5xl">
            {content.title}
          </h2>
          {content.description ? (
            <p className="mt-5 max-w-2xl text-base leading-[var(--leading-body)] text-[var(--muted)] md:text-lg">
              {content.description}
            </p>
          ) : null}
          {content.ctaLabel && content.ctaUrl ? (
            <Link
              href={content.ctaUrl}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition-[background-color,border-color,transform] duration-[var(--motion-ui)] hover:border-[color-mix(in_srgb,var(--foreground)_40%,var(--border))] hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] active:scale-[0.98]"
            >
              {content.ctaLabel}
              <ArrowRight size={16} />
            </Link>
          ) : null}
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {content.items.map((item) => {
            const Icon = platformIcons[item.icon];

            return (
              <div key={item.title} className="text-left">
                <Icon className="h-8 w-8 text-[var(--foreground)]" />
                <h3 className="mt-6 text-xl font-semibold tracking-[var(--tracking-tight)] md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-[var(--leading-body)] text-[var(--muted)] md:text-base">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
