import type { GlobalAfterChangeHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateHomepage: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc;

  payload.logger.info("Revalidating homepage");
  revalidatePath("/");
  revalidateTag("homepage", { expire: 0 });

  return doc;
};
