import React from "react";

import type { FAQBlock as FAQBlockProps } from "@/payload-types";
import { Container } from "@/components/ui/Container";

export function FAQBlock({ heading, items }: FAQBlockProps) {
  return (
    <section className="block block-faq">
      <Container>
        {heading ? <h2>{heading}</h2> : null}
        <div className="faq-list">
          {(items || []).map((item, index) => (
            <details key={`${item.question}-${index}`} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
