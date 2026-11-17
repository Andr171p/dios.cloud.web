import type { MarqueeLogo } from "@/components/marquee/LogoMarquee";

import { AiMetricsSection } from "./AiMetricsSection";
import { ArticlesSection } from "./ArticlesSection";
import { ConnectedEcosystem } from "./ConnectedEcosystem";
import { FeaturedProductsSection } from "./FeaturedProductsSection";
import { FinalCta } from "./FinalCta";
import { HomeHero } from "./HomeHero";
import { PartnersSection } from "./PartnersSection";
import { PlatformCapabilities } from "./PlatformCapabilities";
import type { HomePageViewModel } from "../mappers";

type Props = {
  content: HomePageViewModel;
  partnerLogos?: readonly MarqueeLogo[];
};

export function HomePageView({ content, partnerLogos = [] }: Props) {
  return (
    <>
      <HomeHero content={content.hero} />
      <PartnersSection logos={partnerLogos} />
      <FeaturedProductsSection
        content={content.productShowcase}
        products={content.featuredProducts}
      />
      <PlatformCapabilities content={content.platform} />
      <AiMetricsSection />
      <ConnectedEcosystem content={content.ecosystem} />
      <ArticlesSection content={content.articlesSection} articles={content.articles} />
      <FinalCta content={content.finalCta} />
    </>
  );
}
