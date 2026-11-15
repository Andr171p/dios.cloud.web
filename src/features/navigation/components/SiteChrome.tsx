import React from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getFooter, getHeader } from "@/features/navigation/queries";

export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const [header, footer] = await Promise.all([getHeader(), getFooter()]);

  return (
    <>
      <Header data={header} />
      <main>{children}</main>
      <Footer data={footer} />
    </>
  );
}
