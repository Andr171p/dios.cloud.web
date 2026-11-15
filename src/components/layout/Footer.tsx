import Link from "next/link";

import { Container } from "@/components/ui/Container";
import type { Footer as FooterType } from "@/payload-types";

type Props = {
  data: FooterType;
};

export function Footer({ data }: Props) {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[var(--muted)]">{data.copyright}</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-5">
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
        </div>
      </Container>
    </footer>
  );
}
