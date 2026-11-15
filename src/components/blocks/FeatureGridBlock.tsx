import React from "react";

import type { FeatureGridBlock as FeatureGridBlockProps } from "@/payload-types";
import { Container } from "@/components/ui/Container";

export function FeatureGridBlock({ heading, description, features }: FeatureGridBlockProps) {
  return (
    <section className="block block-features">
      <Container>
        {heading ? <h2>{heading}</h2> : null}
        {description ? <p className="lead">{description}</p> : null}
        <div className="feature-grid">
          {(features || []).map((feature, index) => (
            <article key={`${feature.title}-${index}`} className="feature-card">
              {feature.icon ? <div className="feature-card__icon">{feature.icon}</div> : null}
              <h3>{feature.title}</h3>
              {feature.description ? <p>{feature.description}</p> : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
