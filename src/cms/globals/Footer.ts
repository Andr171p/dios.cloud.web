import type { GlobalConfig } from "payload";

import { authenticated } from "../access/authenticated";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: "copyright",
      type: "text",
      defaultValue: "© DIOS. Все права защищены.",
    },
    {
      name: "navItems",
      type: "array",
      maxRows: 8,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
