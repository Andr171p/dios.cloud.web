import type { Block } from "payload";

export const FeatureGrid: Block = {
  slug: "featureGrid",
  interfaceName: "FeatureGridBlock",
  labels: {
    singular: "Feature Grid",
    plural: "Feature Grids",
  },
  fields: [
    {
      name: "heading",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "features",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "icon",
          type: "text",
          admin: {
            description: "Optional icon name or emoji",
          },
        },
      ],
    },
  ],
};
