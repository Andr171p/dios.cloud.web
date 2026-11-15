import React from "react";

import { SiteChrome } from "@/features/navigation/components/SiteChrome";
import { SiteHeader} from "@/components/layout/SiteHeader";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />{children}
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
