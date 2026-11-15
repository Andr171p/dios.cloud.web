import type { ThemePreference } from "@/config/site";
import { siteConfig } from "@/config/site";

export function parseThemeCookie(value: string | undefined): ThemePreference {
  if (value === "light" || value === "dark" || value === "system") return value;
  return "system";
}

export const themeInitScript = `(function(){try{var key=${JSON.stringify(siteConfig.themeCookie)};var match=document.cookie.match(new RegExp('(?:^|; )'+key+'=([^;]*)'));var pref=match?decodeURIComponent(match[1]):'system';var dark=window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=(pref==='light'||pref==='dark')?pref:(dark?'dark':'light');document.documentElement.dataset.theme=theme;}catch(e){}})();`;
