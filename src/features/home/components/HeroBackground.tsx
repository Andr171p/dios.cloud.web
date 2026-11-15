import { InteractiveGrid } from "@/components/effects/InteractiveGrid";

type Props = {
  gridEnabled?: boolean;
  interactiveEnabled?: boolean;
};

export function HeroBackground({ gridEnabled = true, interactiveEnabled = true }: Props) {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {gridEnabled ? (
        <div className="pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_at_center,transparent_18%,black_72%)]">
          <div className="hero-grid absolute inset-0" />
        </div>
      ) : null}

      <div className="absolute inset-0">
        <InteractiveGrid enabled={Boolean(gridEnabled && interactiveEnabled)} />
      </div>
    </div>
  );
}
