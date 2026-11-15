import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { authenticated } from "../access/authenticated";
import { authenticatedOrPublished } from "../access/authenticatedOrPublished";
import { layoutBlocks } from "../blocks";
import { revalidateProduct, revalidateProductDelete } from "../hooks/revalidateProduct";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "availability", "slug", "updatedAt"],
  },
  defaultPopulate: {
    title: true,
    slug: true,
    summary: true,
    tagline: true,
    category: true,
    availability: true,
    accentColor: true,
    features: true,
    poster: true,
    logo: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      maxLength: 80,
    },
    {
      name: "tagline",
      type: "text",
      required: true,
      maxLength: 120,
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      maxLength: 320,
    },
    {
      name: "category",
      type: "text",
      required: true,
      maxLength: 64,
    },
    {
      name: "availability",
      type: "select",
      required: true,
      defaultValue: "available",
      options: [
        { label: "Available", value: "available" },
        { label: "Beta", value: "beta" },
        { label: "Planned", value: "planned" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "accentColor",
      type: "text",
      required: true,
      defaultValue: "#bb252d",
      admin: {
        description: "Hex color used for product accent, e.g. #bb252d",
      },
      validate: (value: unknown) => {
        if (typeof value !== "string" || !value) return "Accent color is required";
        if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return "Use a hex color like #bb252d";
        return true;
      },
    },
    {
      name: "features",
      type: "array",
      maxRows: 6,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          maxLength: 40,
        },
      ],
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "poster",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "demoVideo",
      type: "upload",
      relationTo: "media",
      filterOptions: {
        mimeType: {
          contains: "video",
        },
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Legacy field. Prefer poster for product demos.",
        position: "sidebar",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "description",
              type: "richText",
            },
            {
              name: "layout",
              type: "blocks",
              blocks: layoutBlocks,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          label: "SEO",
          name: "meta",
          fields: [
            {
              name: "title",
              type: "text",
            },
            {
              name: "description",
              type: "textarea",
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    slugField({
      useAsSlug: "title",
      required: true,
    }),
  ],
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateProductDelete],
  },
  versions: {
    drafts: true,
  },
};
