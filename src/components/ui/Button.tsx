import Link from "next/link";
import type { ComponentProps } from "react";

type Appearance = "primary" | "secondary";

type SharedProps = {
  appearance?: Appearance | null;
  children: React.ReactNode;
  className?: string;
};

type LinkButtonProps = SharedProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, "className" | "children" | "href">;

type NativeButtonProps = SharedProps & {
  href?: undefined;
} & Omit<ComponentProps<"button">, "className" | "children">;

function buttonClassName(appearance: Appearance, className = "") {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-6 py-3.5 text-sm font-semibold transition-[background-color,border-color,color,transform,opacity] duration-[var(--motion-ui)] ease-[var(--ease-standard)]";

  const variants: Record<Appearance, string> = {
    primary:
      "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] hover:brightness-110 active:scale-[0.98]",
    secondary:
      "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:border-[color-mix(in_srgb,var(--foreground)_40%,var(--border))] hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] active:scale-[0.98]",
  };

  return `${base} ${variants[appearance]} ${className}`.trim();
}

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const appearance: Appearance = props.appearance === "secondary" ? "secondary" : "primary";
  const className = buttonClassName(appearance, props.className);

  if ("href" in props && props.href) {
    const { href, children, appearance: _a, className: _c, ...rest } = props;
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, appearance: _a, className: _c, ...rest } = props as NativeButtonProps;
  return (
    <button type="button" className={className} {...rest}>
      {children}
    </button>
  );
}
