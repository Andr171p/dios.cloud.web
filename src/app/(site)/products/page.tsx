import React from "react";

import { ProductCard } from "@/features/products/components/ProductCard";
import { toProductCard } from "@/features/products/mappers";
import { getPublishedProducts } from "@/features/products/queries";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";

export const metadata = buildMetadata({
  title: "Products",
  description: "Explore Dios Cloud products.",
  path: "/products",
});

export default async function ProductsPage() {
  const products = await getPublishedProducts();
  const cards = products.map(toProductCard);

  return (
    <section className="block">
      <Container>
        <h1>Products</h1>
        <p className="lead">Infrastructure and cloud products from Dios.</p>
        {cards.length ? (
          <div className="product-grid">
            {cards.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="lead">No published products yet. Add some in the admin panel.</p>
        )}
      </Container>
    </section>
  );
}
