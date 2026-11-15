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
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  defaultPopulate: {
    title: true,
    slug: true,
    summary: true,
    featuredImage: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
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
