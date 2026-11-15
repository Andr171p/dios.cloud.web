import React from "react";

import type { Page } from "@/payload-types";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";

export function PageRenderer({ page }: { page: Page }) {
  return <RenderBlocks blocks={page.layout} />;
}
