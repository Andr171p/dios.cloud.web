import React from "react";

import type { CallToActionBlock as CallToActionBlockProps } from "@/payload-types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CallToActionBlock({ heading, description, links }: CallToActionBlockProps) {
  return (
    <section className="block block-cta">
      <Container>
        <h2>{heading}</h2>
        {description ? <p className="lead">{description}</p> : null}
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
