import { ArticlesSection } from "./ArticlesSection";
import { ConnectedEcosystem } from "./ConnectedEcosystem";
import { FeaturedProductsSection } from "./FeaturedProductsSection";
import { FinalCta } from "./FinalCta";
import { HomeHero } from "./HomeHero";
import { PlatformCapabilities } from "./PlatformCapabilities";
import type { HomePageViewModel } from "../mappers";

type Props = {
  content: HomePageViewModel;
};

export function HomePageView({ content }: Props) {
  return (
    <>
      <HomeHero content={content.hero} />
      <FeaturedProductsSection
        content={content.productShowcase}
        products={content.featuredProducts}
      />
      <PlatformCapabilities content={content.platform} />
      <ConnectedEcosystem content={content.ecosystem} />
      <ArticlesSection content={content.articlesSection} articles={content.articles} />
      <FinalCta content={content.finalCta} />
    </>
  );
}
