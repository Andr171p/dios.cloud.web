import type { Media, Organization } from "@/payload-types";
import type { MarqueeLogo } from "@/components/marquee/LogoMarquee";
import { partnerLogoBySlug } from "@/config/partner-logos";

function isMedia(value: number | Media | null | undefined): value is Media {
  return Boolean(value && typeof value === "object");
}

function mediaUrl(value: number | Media | null | undefined): string | null {
  if (!isMedia(value)) return null;
  return value.url ?? null;
}

export function toMarqueeLogo(org: Organization): MarqueeLogo | null {
  const staticSrc = partnerLogoBySlug[org.slug];
  const lightSrc = staticSrc || mediaUrl(org.logoLight);
  const darkSrc = staticSrc || mediaUrl(org.logoDark);

  if (!lightSrc && !darkSrc) return null;

  return {
    id: String(org.id),
    name: org.name,
    lightSrc: lightSrc || darkSrc!,
    darkSrc: darkSrc || lightSrc!,
  };
}
