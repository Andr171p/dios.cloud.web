import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import type { HomeLink } from "../mappers";

type Props = {
  links: HomeLink[];
};

export function HeroActions({ links }: Props) {
  if (links.length === 0) return null;

  const [primary, secondary] = links;

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
      {primary ? (
        <Button
          href={primary.url}
          appearance={primary.appearance === "secondary" ? "secondary" : "primary"}
          className="rounded-full px-7 py-3"
        >
          {primary.label}
        </Button>
      ) : null}

      {secondary ? (
        secondary.appearance === "secondary" ? (
          <Link
            href={secondary.url}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-[color,transform,gap] duration-(--motion-micro) hover:gap-2.5 hover:text-accent-hover"
          >
            {secondary.label}
            <ArrowRight size={16} />
          </Link>
        ) : (
          <Button href={secondary.url} appearance="secondary" className="rounded-full px-7 py-3">
            {secondary.label}
          </Button>
        )
      ) : null}
    </div>
  );
}
