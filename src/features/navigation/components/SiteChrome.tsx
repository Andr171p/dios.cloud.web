import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getFooter, getHeader } from "@/features/navigation/queries";

export async function SiteChrome({ children }: { children: ReactNode }) {
  const [header, footer] = await Promise.all([getHeader(), getFooter()]);

  return (
    <>
      <SiteHeader data={header} />
      <main>{children}</main>
      <Footer data={footer} />
    </>
  );
}
