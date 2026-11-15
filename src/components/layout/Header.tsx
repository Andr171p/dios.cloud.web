import Link from "next/link";
import React from "react";

import type { Header as HeaderType } from "@/payload-types";
import { Container } from "@/components/ui/Container";

export function Header({ data }: { data: HeaderType }) {
  return (
    <header className="site-header">
      <Container>
        <div className="site-header__inner">
          <Link className="site-header__brand" href="/">
            {data.logoText || "Dios Cloud"}
          </Link>
          <nav className="site-header__nav" aria-label="Main">
            {(data.navItems || []).map((item, index) => (
              <Link key={`${item.url}-${index}`} href={item.url}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
