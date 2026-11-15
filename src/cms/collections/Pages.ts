import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { authenticated } from "../access/authenticated";
import { authenticatedOrPublished } from "../access/authenticatedOrPublished";
import { layoutBlocks } from "../blocks";
import { revalidatePage, revalidatePageDelete } from "../hooks/revalidatePage";

export const Pages: CollectionConfig = {
  slug: "pages",
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
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: layoutBlocks,
              required: true,
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
    afterChange: [revalidatePage],
    afterDelete: [revalidatePageDelete],
  },
  versions: {
    drafts: true,
  },
};
