import { Container } from "@/components/ui/Container";
import { getLatestArticles } from "@/features/articles/queries";
import { HomePageView } from "@/features/home/components/HomePage";
import { toHomePageViewModel } from "@/features/home/mappers";
import { getHomepage } from "@/features/home/queries";

export default async function HomePage() {
  const [homepage, latestArticles] = await Promise.all([
    getHomepage(),
    getLatestArticles(4),
  ]);

  if (!homepage.hero?.heading || !(homepage.featuredProducts?.length > 0)) {
    return (
      <Container className="py-24">
        <h1 className="text-3xl font-semibold tracking-tight">Главная ещё не заполнена</h1>
        <p className="mt-4 text-[var(--muted)]">
          Запустите <code className="text-[var(--foreground)]">pnpm seed</code>, чтобы создать
          стартовый контент.
        </p>
      </Container>
    );
  }

  const content = toHomePageViewModel(homepage, latestArticles);
  return <HomePageView content={content} />;
}
