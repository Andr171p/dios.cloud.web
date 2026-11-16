import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { authenticated } from "../access/authenticated";
import { authenticatedOrPublished } from "../access/authenticatedOrPublished";
import { revalidateOrganization, revalidateOrganizationDelete } from "../hooks/revalidateOrganization";

export const Organizations: CollectionConfig = {
  slug: "organizations",
  labels: {
    singular: "Organization",
    plural: "Organizations",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "relationship", "featured", "sortOrder", "updatedAt"],
    description:
      "Public marketing profiles for partners and customers shown on the homepage logo marquee. Not IAM tenants.",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    relationship: true,
    logoLight: true,
    logoDark: true,
    website: true,
    featured: true,
    sortOrder: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      maxLength: 120,
    },
    {
      name: "relationship",
      type: "select",
      required: true,
      defaultValue: "partner",
      options: [
        { label: "Customer", value: "customer" },
        { label: "Partner", value: "partner" },
        { label: "Integration", value: "integration" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "logoLight",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Monochrome logo for light theme (dark ink, transparent background).",
      },
    },
    {
      name: "logoDark",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Monochrome logo for dark theme (light ink, transparent background).",
      },
    },
    {
      name: "website",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description: "Show on homepage logo marquee.",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "approvedForPublication",
      type: "checkbox",
      defaultValue: false,
      required: true,
      admin: {
        position: "sidebar",
        description: "Only approved logos may appear publicly.",
      },
    },
    slugField({
      useAsSlug: "name",
      required: true,
    }),
  ],
  hooks: {
    afterChange: [revalidateOrganization],
    afterDelete: [revalidateOrganizationDelete],
  },
  versions: {
    drafts: true,
  },
};
