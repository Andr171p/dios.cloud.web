import { Manrope, Onest, Wix_Madefor_Display } from "next/font/google";

export const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body-family",
  display: "swap",
});

export const wixMadeforDisplay = Wix_Madefor_Display({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-display-family",
  display: "swap",
});

/** Editorial card titles — geometric, closer to Atlassian Charlie feel */
export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-editorial-family",
  display: "swap",
});
