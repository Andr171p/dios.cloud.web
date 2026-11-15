import React from "react";

import type { HeroBlock as HeroBlockProps } from "@/payload-types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroBlock({ heading, subheading, links }: HeroBlockProps) {
  return (
    <section className="block block-hero">
      <Container>
        <h1>{heading}</h1>
        {subheading ? <p className="lead">{subheading}</p> : null}
        {links?.length ? (
          <div className="button-row">
            {links.map((link, index) => (
              <Button key={`${link.url}-${index}`} href={link.url} appearance={link.appearance}>
                {link.label}
              </Button>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
