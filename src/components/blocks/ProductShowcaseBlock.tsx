import Link from "next/link";
import React from "react";

import type { Product, ProductShowcaseBlock as ProductShowcaseBlockProps } from "@/payload-types";
import { toProductCard } from "@/features/products/mappers";
import { Container } from "@/components/ui/Container";

export function ProductShowcaseBlock({
  heading,
  description,
  products,
}: ProductShowcaseBlockProps) {
  const items = (products || [])
    .filter((product): product is Product => typeof product === "object" && product !== null)
    .map(toProductCard);

  return (
    <section className="block block-products">
      <Container>
        {heading ? <h2>{heading}</h2> : null}
        {description ? <p className="lead">{description}</p> : null}
        <div className="product-grid">
          {items.map((product) => (
            <Link key={product.id} className="product-card" href={`/products/${product.slug}`}>
              <h3>{product.title}</h3>
              <p>{product.summary}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
