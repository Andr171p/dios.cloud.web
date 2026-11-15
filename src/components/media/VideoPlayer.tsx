"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string | null;
  active?: boolean;
  className?: string;
  label?: string;
};

export function VideoPlayer({
  src,
  poster,
  active = true,
  className = "",
  label = "Product demo",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!active || reducedMotion) {
      video.pause();
      setPlaying(false);
      return;
    }

    const playPromise = video.play();
    if (playPromise) {
      playPromise
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [active, reducedMotion, src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        poster={poster ?? undefined}
        muted
        playsInline
        loop
        preload={active ? "metadata" : "none"}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <button
        type="button"
        className="glass absolute bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] transition-[background-color,transform,opacity] duration-[var(--motion-ui)] hover:bg-[color-mix(in_srgb,var(--foreground)_12%,transparent)] hover:opacity-100 active:scale-95"
        aria-label={playing ? "Остановить демонстрацию" : "Воспроизвести демонстрацию"}
        onClick={() => {
          const video = videoRef.current;
          if (!video) return;
          if (video.paused) {
            void video.play();
          } else {
            video.pause();
          }
        }}
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>
    </div>
  );
}
