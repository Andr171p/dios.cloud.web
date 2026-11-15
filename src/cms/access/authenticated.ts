import type { Access } from "payload";

export const authenticated = (({ req: { user } }) => Boolean(user)) satisfies Access;
