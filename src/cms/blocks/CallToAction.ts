import type { Block } from "payload";

export const CallToAction: Block = {
  slug: "cta",
  interfaceName: "CallToActionBlock",
  labels: {
    singular: "Call to Action",
    plural: "Calls to Action",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "links",
      type: "array",
      maxRows: 2,
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
        {
          name: "appearance",
          type: "select",
          defaultValue: "primary",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
          ],
        },
      ],
    },
  ],
};
