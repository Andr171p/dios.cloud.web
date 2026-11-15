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
      defaultValue: "DIOS",
    },
    {
      name: "siteDescription",
      type: "textarea",
      defaultValue: "Сервисные процессы и ИИ-инструменты для вашей команды.",
    },
    {
      name: "defaultOgImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
