"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { siteConfig, type ThemePreference } from "@/config/site";

function readPreference(): ThemePreference {
  const match = document.cookie.match(new RegExp(`(?:^|; )${siteConfig.themeCookie}=([^;]*)`));
  const value = match?.[1] ? decodeURIComponent(match[1]) : "system";
  if (value === "light" || value === "dark" || value === "system") return value;
  return "system";
}

function applyTheme(preference: ThemePreference) {
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const resolved =
    preference === "light" || preference === "dark"
      ? preference
      : darkQuery.matches
        ? "dark"
        : "light";

  document.documentElement.dataset.theme = resolved;
  document.cookie = `${siteConfig.themeCookie}=${encodeURIComponent(preference)}; path=/; max-age=31536000; samesite=lax`;
}

export function ThemeSwitcher() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    setPreference(readPreference());
  }, []);

  const nextPreference: ThemePreference =
    preference === "light" ? "dark" : preference === "dark" ? "system" : "light";

  const label =
    preference === "light"
      ? "Светлая тема. Переключить на тёмную"
      : preference === "dark"
        ? "Тёмная тема. Переключить на системную"
        : "Системная тема. Переключить на светлую";

  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-[background-color,border-color,color,transform] duration-[var(--motion-ui)] hover:border-[color-mix(in_srgb,var(--foreground)_40%,var(--border))] hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] hover:text-[var(--foreground)] active:scale-95"
      onClick={() => {
        setPreference(nextPreference);
        applyTheme(nextPreference);
      }}
    >
      {preference === "dark" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
