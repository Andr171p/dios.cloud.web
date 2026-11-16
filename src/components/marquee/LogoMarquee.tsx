"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import styles from "./LogoMarquee.module.css";

export type MarqueeLogo = {
  id: string;
  name: string;
  lightSrc: string;
  darkSrc: string;
};

type Props = {
  logos: readonly MarqueeLogo[];
};

/** Target travel speed in px/sec — keeps motion even as logo count changes */
const SPEED_PX_PER_SEC = 36;

function readTheme(): "light" | "dark" {
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function LogoMarquee({ logos }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setTheme(readTheme());
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group || logos.length < 6) return;

    const measure = () => {
      // Exact first-group width (includes trailing gap) → seamless loop
      const distance = group.getBoundingClientRect().width;
      if (distance <= 0) return;

      track.style.setProperty("--marquee-distance", `${distance}px`);
      track.style.setProperty("--marquee-duration", `${distance / SPEED_PX_PER_SEC}s`);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(group);
    window.addEventListener("load", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [logos, theme]);

  if (logos.length === 0) return null;

  const animate = logos.length >= 6;

  return (
    <div className={styles.viewport} role="region" aria-label="Логотипы организаций">
      <div
        ref={trackRef}
        className={`${styles.track} ${animate ? "" : styles.trackPaused}`.trim()}
      >
        {(animate ? [0, 1] : [0]).map((copy) => (
          <div
            key={copy}
            ref={copy === 0 ? groupRef : undefined}
            className={styles.group}
            aria-hidden={copy === 1 || undefined}
          >
            {logos.map((logo) => {
              const src =
                theme === "light" ? logo.lightSrc || logo.darkSrc : logo.darkSrc || logo.lightSrc;

              return (
                <div key={`${copy}-${logo.id}`} className={styles.logo}>
                  <Image
                    src={src}
                    alt={copy === 0 ? logo.name : ""}
                    width={180}
                    height={72}
                    className={styles.image}
                    unoptimized
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
