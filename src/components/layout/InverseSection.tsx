import type { ComponentProps } from "react";

type Props = ComponentProps<"section">;

/** Full-bleed chapter that flips against the page theme. */
export function InverseSection({ className = "", children, ...props }: Props) {
  return (
    <section
      className={[
        "bg-inverse-background text-inverse-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </section>
  );
}
