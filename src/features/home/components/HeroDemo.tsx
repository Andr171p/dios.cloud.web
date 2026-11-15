import { ThemeImage } from "@/components/media/ThemeImage";
import { ThemeVideo } from "@/components/media/ThemeVideo";
import type { HomePageViewModel } from "../mappers";

type Props = {
  demo: NonNullable<HomePageViewModel["hero"]["demo"]>;
};

export function HeroDemo({ demo }: Props) {
  const hasVideo = Boolean(demo.darkVideo || demo.lightVideo);
  const hasImage = Boolean(demo.darkImage || demo.lightImage);

  if (!hasVideo && !hasImage) return null;

  return (
    <div className="hero-demo mx-auto mt-14 w-full max-w-5xl md:mt-16">
      <div className="overflow-hidden rounded-[1.35rem] border border-border bg-surface shadow-(--shadow-soft)">
        <div className="flex h-10 items-center gap-2 border-b border-border px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-3 text-xs text-muted">DIO Desk · Задачи</span>
        </div>

        <div className="relative aspect-video bg-surface-muted">
          {hasVideo ? (
            <ThemeVideo
              darkSrc={demo.darkVideo}
              lightSrc={demo.lightVideo}
              darkPoster={demo.darkImage}
              lightPoster={demo.lightImage}
              className="absolute inset-0 h-full w-full"
              label="Демонстрация интерфейса DIOS"
            />
          ) : (
            <ThemeImage
              darkSrc={demo.darkImage}
              lightSrc={demo.lightImage}
              alt="Интерфейс продукта DIOS"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 960px"
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
}
