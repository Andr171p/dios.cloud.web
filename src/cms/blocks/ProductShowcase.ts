import type { Block } from "payload";

export const ProductShowcase: Block = {
  slug: "productShowcase",
  interfaceName: "ProductShowcaseBlock",
  labels: {
    singular: "Product Showcase",
    plural: "Product Showcases",
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
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      required: true,
    },
  ],
};
