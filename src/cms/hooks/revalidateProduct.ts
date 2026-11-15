import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateProduct: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc;

  if (doc._status === "published") {
    const path = `/products/${doc.slug}`;
    payload.logger.info(`Revalidating product at path: ${path}`);
    revalidatePath(path);
    revalidatePath("/products");
    revalidateTag("products", { expire: 0 });
  }

  if (previousDoc?._status === "published" && doc._status !== "published") {
    revalidatePath(`/products/${previousDoc.slug}`);
    revalidatePath("/products");
    revalidateTag("products", { expire: 0 });
  }

  return doc;
};

export const revalidateProductDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/products/${doc?.slug}`);
    revalidatePath("/products");
    revalidateTag("products", { expire: 0 });
  }

  return doc;
};
