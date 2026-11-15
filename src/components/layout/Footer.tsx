import Link from "next/link";
import React from "react";

import type { Footer as FooterType } from "@/payload-types";
import { Container } from "@/components/ui/Container";

export function Footer({ data }: { data: FooterType }) {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__inner">
          <p>{data.copyright}</p>
          <nav className="site-footer__nav" aria-label="Footer">
            {(data.navItems || []).map((item, index) => (
              <Link key={`${item.url}-${index}`} href={item.url}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
