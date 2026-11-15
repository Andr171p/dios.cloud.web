import React, { Fragment } from "react";

import type { Page, Product } from "@/payload-types";

import { CallToActionBlock } from "./CallToActionBlock";
import { FAQBlock } from "./FAQBlock";
import { FeatureGridBlock } from "./FeatureGridBlock";
import { HeroBlock } from "./HeroBlock";
import { ProductShowcaseBlock } from "./ProductShowcaseBlock";

type LayoutBlock = NonNullable<Page["layout"]>[number] | NonNullable<Product["layout"]>[number];

const blockComponents = {
  hero: HeroBlock,
  featureGrid: FeatureGridBlock,
  productShowcase: ProductShowcaseBlock,
  faq: FAQBlock,
  cta: CallToActionBlock,
} as const;

export function RenderBlocks({ blocks }: { blocks: LayoutBlock[] | null | undefined }) {
  if (!blocks?.length) return null;

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block;

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType as keyof typeof blockComponents];

          // @ts-expect-error block props are discriminated by blockType
          return <Block key={index} {...block} />;
        }

        return null;
      })}
    </Fragment>
  );
}
