"use client";

import { useEffect, useState } from "react";

import { VideoPlayer } from "@/components/media/VideoPlayer";

type Props = {
  lightSrc?: string | null;
  darkSrc?: string | null;
  lightPoster?: string | null;
  darkPoster?: string | null;
  active?: boolean;
  className?: string;
  label?: string;
};

function readTheme(): "light" | "dark" {
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeVideo({
  lightSrc,
  darkSrc,
  lightPoster,
  darkPoster,
  active = true,
  className = "",
  label,
}: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

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

  const src = theme === "light" ? lightSrc || darkSrc : darkSrc || lightSrc;
  const poster = theme === "light" ? lightPoster || darkPoster : darkPoster || lightPoster;

  if (!src) return null;

  return (
    <VideoPlayer
      key={`${theme}-${src}`}
      src={src}
      poster={poster}
      active={active}
      className={className}
      label={label}
    />
  );
}
