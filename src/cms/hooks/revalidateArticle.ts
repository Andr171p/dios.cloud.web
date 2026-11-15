import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateArticle: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc;

  if (doc._status === "published") {
    const path = `/articles/${doc.slug}`;
    payload.logger.info(`Revalidating article at path: ${path}`);
    revalidatePath(path);
    revalidatePath("/");
    revalidateTag("articles", { expire: 0 });
    revalidateTag("homepage", { expire: 0 });
  }

  if (previousDoc?._status === "published" && doc._status !== "published") {
    revalidatePath(`/articles/${previousDoc.slug}`);
    revalidatePath("/");
    revalidateTag("articles", { expire: 0 });
    revalidateTag("homepage", { expire: 0 });
  }

  return doc;
};

export const revalidateArticleDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/articles/${doc?.slug}`);
    revalidatePath("/");
    revalidateTag("articles", { expire: 0 });
    revalidateTag("homepage", { expire: 0 });
  }

  return doc;
};
