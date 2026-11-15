import type { GlobalConfig } from "payload";

import { authenticated } from "../access/authenticated";

export const Settings: GlobalConfig = {
  slug: "settings",
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      defaultValue: "Dios Cloud",
    },
    {
      name: "siteDescription",
      type: "textarea",
      defaultValue: "Cloud infrastructure and products by Dios.",
    },
    {
      name: "defaultOgImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
