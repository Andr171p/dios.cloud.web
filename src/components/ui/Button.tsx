import Link from "next/link";
import React from "react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  appearance?: "primary" | "secondary" | null;
};

export function Button({ href, children, appearance = "primary" }: ButtonProps) {
  const className =
    appearance === "secondary" ? "button button--secondary" : "button button--primary";

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
