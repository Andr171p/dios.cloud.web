import React from "react";

import type { Product } from "@/payload-types";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";
import { Container } from "@/components/ui/Container";

export function ProductRenderer({ product }: { product: Product }) {
  return (
    <>
      <section className="block block-hero">
        <Container>
          <p className="eyebrow">Product</p>
          <h1>{product.title}</h1>
          <p className="lead">{product.summary}</p>
        </Container>
      </section>
      <RenderBlocks blocks={product.layout} />
    </>
  );
}
