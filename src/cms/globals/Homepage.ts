import type { GlobalConfig } from "payload";

import { authenticated } from "../access/authenticated";
import { revalidateHomepage } from "../hooks/revalidateHomepage";

const linkFields = [
  {
    name: "label",
    type: "text" as const,
    required: true,
    maxLength: 48,
  },
  {
    name: "url",
    type: "text" as const,
    required: true,
    maxLength: 256,
  },
  {
    name: "appearance",
    type: "select" as const,
    defaultValue: "primary",
    options: [
      { label: "Primary", value: "primary" },
      { label: "Secondary", value: "secondary" },
    ],
  },
];

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateHomepage],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "hero",
              type: "group",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  maxLength: 64,
                },
                {
                  name: "heading",
                  type: "text",
                  required: true,
                  maxLength: 160,
                },
                {
                  name: "subheading",
                  type: "textarea",
                  required: true,
                  maxLength: 400,
                },
                {
                  name: "links",
                  type: "array",
                  maxRows: 2,
                  fields: linkFields,
                },
                {
                  name: "demoEnabled",
                  type: "checkbox",
                  defaultValue: true,
                },
                {
                  name: "gridEnabled",
                  type: "checkbox",
                  defaultValue: true,
                },
                {
                  name: "interactiveBackgroundEnabled",
                  type: "checkbox",
                  defaultValue: true,
                },
                {
                  name: "demoDarkImage",
                  type: "upload",
                  relationTo: "media",
                },
                {
                  name: "demoLightImage",
                  type: "upload",
                  relationTo: "media",
                },
                {
                  name: "demoDarkVideo",
                  type: "upload",
                  relationTo: "media",
                  filterOptions: {
                    mimeType: {
                      contains: "video",
                    },
                  },
                },
                {
                  name: "demoLightVideo",
                  type: "upload",
                  relationTo: "media",
                  filterOptions: {
                    mimeType: {
                      contains: "video",
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Products",
          fields: [
            {
              name: "featuredProducts",
              type: "relationship",
              relationTo: "products",
              hasMany: true,
              required: true,
              admin: {
                description: "Order of slides in the featured product carousel.",
              },
            },
            {
              name: "productShowcase",
              type: "group",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  maxLength: 64,
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  maxLength: 160,
                },
                {
                  name: "description",
                  type: "textarea",
                  maxLength: 400,
                },
              ],
            },
          ],
        },
        {
          label: "Platform",
          fields: [
            {
              name: "platform",
              type: "group",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  maxLength: 64,
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  maxLength: 160,
                },
                {
                  name: "description",
                  type: "textarea",
                  maxLength: 400,
                },
                {
                  name: "ctaLabel",
                  type: "text",
                  maxLength: 64,
                },
                {
                  name: "ctaUrl",
                  type: "text",
                  maxLength: 256,
                },
                {
                  name: "items",
                  type: "array",
                  maxRows: 6,
                  minRows: 4,
                  fields: [
                    {
                      name: "icon",
                      type: "select",
                      required: true,
                      options: [
                        { label: "Account", value: "account" },
                        { label: "Organizations", value: "organizations" },
                        { label: "Integrations", value: "integrations" },
                        { label: "Access", value: "access" },
                      ],
                    },
                    {
                      name: "title",
                      type: "text",
                      required: true,
                      maxLength: 80,
                    },
                    {
                      name: "description",
                      type: "textarea",
                      required: true,
                      maxLength: 240,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Ecosystem",
          fields: [
            {
              name: "ecosystem",
              type: "group",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  maxLength: 64,
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  maxLength: 160,
                },
                {
                  name: "description",
                  type: "textarea",
                  maxLength: 400,
                },
                {
                  name: "items",
                  type: "array",
                  maxRows: 6,
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      required: true,
                      maxLength: 80,
                    },
                    {
                      name: "description",
                      type: "textarea",
                      required: true,
                      maxLength: 240,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Articles",
          fields: [
            {
              name: "articlesSection",
              type: "group",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  maxLength: 64,
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  maxLength: 160,
                },
                {
                  name: "description",
                  type: "textarea",
                  maxLength: 400,
                },
              ],
            },
            {
              name: "featuredArticles",
              type: "relationship",
              relationTo: "articles",
              hasMany: true,
              maxRows: 4,
              admin: {
                description:
                  "Up to 4 editorial cards. Leave empty to show the latest published articles.",
              },
            },
          ],
        },
        {
          label: "Final CTA",
          fields: [
            {
              name: "finalCta",
              type: "group",
              fields: [
                {
                  name: "heading",
                  type: "text",
                  required: true,
                  maxLength: 160,
                },
                {
                  name: "description",
                  type: "textarea",
                  maxLength: 400,
                },
                {
                  name: "links",
                  type: "array",
                  maxRows: 2,
                  fields: linkFields,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
