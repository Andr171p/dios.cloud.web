import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { authenticated } from "../access/authenticated";
import { authenticatedOrPublished } from "../access/authenticatedOrPublished";
import { revalidateArticle, revalidateArticleDelete } from "../hooks/revalidateArticle";

export const Articles: CollectionConfig = {
  slug: "articles",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "cardTheme", "publishedAt", "updatedAt"],
  },
  defaultPopulate: {
    title: true,
    slug: true,
    excerpt: true,
    category: true,
    cardTheme: true,
    cover: true,
    publishedAt: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      maxLength: 160,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: 280,
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Инженерия", value: "engineering" },
        { label: "Руководство", value: "guide" },
        { label: "Обновление", value: "update" },
        { label: "Внедрение", value: "case-study" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "cardTheme",
      type: "select",
      required: true,
      defaultValue: "blue",
      options: [
        { label: "DIOS Red", value: "red" },
        { label: "Deep Blue", value: "blue" },
        { label: "Forest", value: "forest" },
        { label: "Iris", value: "iris" },
        { label: "Petrol", value: "petrol" },
        { label: "Burnt Orange", value: "orange" },
      ],
      admin: {
        position: "sidebar",
        description: "Editorial card palette. Semantic tokens only — not freeform HEX.",
        isClearable: false,
      },
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "relatedProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
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
    afterChange: [revalidateArticle],
    afterDelete: [revalidateArticleDelete],
  },
  versions: {
    drafts: true,
  },
};
