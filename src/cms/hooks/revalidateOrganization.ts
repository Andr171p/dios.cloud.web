import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateOrganization: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc;

  payload.logger.info(`Revalidating organization: ${doc.slug}`);
  revalidatePath("/");
  revalidateTag("organizations", { expire: 0 });
  revalidateTag("homepage", { expire: 0 });

  return doc;
};

export const revalidateOrganizationDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc;

  payload.logger.info(`Revalidating after organization delete: ${doc?.slug}`);
  revalidatePath("/");
  revalidateTag("organizations", { expire: 0 });
  revalidateTag("homepage", { expire: 0 });

  return doc;
};
