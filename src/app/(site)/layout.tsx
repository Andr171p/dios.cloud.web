import React from "react";
import { cookies } from "next/headers";
import Script from "next/script";

import { SiteChrome } from "@/features/navigation/components/SiteChrome";
import { siteConfig } from "@/config/site";
import { manrope, onest, wixMadeforDisplay } from "@/styles/fonts";
import { parseThemeCookie, themeInitScript } from "@/lib/theme";
import "@/styles/globals.css";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const preference = parseThemeCookie(cookieStore.get(siteConfig.themeCookie)?.value);
  const themeAttr = preference === "system" ? undefined : preference;

  return (
    <html
      lang="ru"
      className={`${onest.variable} ${wixMadeforDisplay.variable} ${manrope.variable}`}
      data-theme={themeAttr}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
