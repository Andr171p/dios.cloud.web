import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidatePage: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc;

  if (doc._status === "published") {
    const path = doc.slug === "home" ? "/" : `/${doc.slug}`;
    payload.logger.info(`Revalidating page at path: ${path}`);
    revalidatePath(path);
    revalidateTag("pages", { expire: 0 });
  }

  if (previousDoc?._status === "published" && doc._status !== "published") {
    const oldPath = previousDoc.slug === "home" ? "/" : `/${previousDoc.slug}`;
    payload.logger.info(`Revalidating old page at path: ${oldPath}`);
    revalidatePath(oldPath);
    revalidateTag("pages", { expire: 0 });
  }

  return doc;
};

export const revalidatePageDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === "home" ? "/" : `/${doc?.slug}`;
    revalidatePath(path);
    revalidateTag("pages", { expire: 0 });
  }

  return doc;
};
