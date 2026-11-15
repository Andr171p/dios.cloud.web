import Link from "next/link";

import { DiosMark } from "@/components/brand/DiosMark";
import { ThemeSwitcher } from "@/components/navigation/ThemeSwitcher";
import { Container } from "@/components/ui/Container";
import type { Header as HeaderType } from "@/payload-types";

type Props = {
  data: HeaderType;
};

export function SiteHeader({ data }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--glass)] backdrop-blur-xl">
      <Container>
        <div className="flex h-[var(--header-height)] items-center justify-between gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-3 font-[family-name:var(--font-display)] text-xl font-bold tracking-[var(--tracking-display)] transition-opacity duration-[var(--motion-micro)] hover:opacity-80"
            aria-label="DIOS — главная"
          >
            <DiosMark priority />
            <span>
              {data.logoText || "DIOS"}
              <span className="text-[var(--accent)]">.</span>
            </span>
          </Link>

          <nav aria-label="Основная навигация" className="hidden items-center gap-8 md:flex">
            {(data.navItems || []).map((item, index) => (
              <Link
                key={`${item.url}-${index}`}
                href={item.url}
                className="text-sm text-[var(--muted)] transition-colors duration-[var(--motion-micro)] hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Link
              href="/admin"
              className="rounded-full border border-[var(--border)] px-4 py-2.5 text-sm font-medium transition-[background-color,border-color,color] duration-[var(--motion-ui)] hover:border-[color-mix(in_srgb,var(--foreground)_40%,var(--border))] hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)]"
            >
              Войти
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
