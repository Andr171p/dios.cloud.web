import type { GlobalConfig } from "payload";

import { authenticated } from "../access/authenticated";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: "logoText",
      type: "text",
      defaultValue: "DIOS",
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
