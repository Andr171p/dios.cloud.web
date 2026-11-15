import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "seedKey",
      type: "text",
      unique: true,
      index: true,
      admin: {
        description: "Stable key used by seed scripts for idempotent upserts.",
        position: "sidebar",
      },
    },
  ],
  upload: {
    mimeTypes: ["image/*", "video/mp4", "video/webm"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
      },
      {
        name: "hero",
        width: 1920,
        height: 1080,
      },
    ],
    adminThumbnail: "thumbnail",
  },
};
