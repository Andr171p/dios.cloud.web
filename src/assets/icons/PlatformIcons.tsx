type IconProps = {
  className?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function AccountIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="11" r="4.5" {...stroke} />
      <path d="M7.5 25c1.8-4.2 5-6.5 8.5-6.5s6.7 2.3 8.5 6.5" {...stroke} />
      <path d="M22.5 8.5c1.6.4 2.8 1.8 2.8 3.5s-1.2 3.1-2.8 3.5" {...stroke} />
    </svg>
  );
}

export function OrganizationsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="5" y="8" width="10" height="16" rx="2.5" {...stroke} />
      <rect x="17" y="12" width="10" height="12" rx="2.5" {...stroke} />
      <path d="M8.5 13h3M8.5 17h3M8.5 21h3M20.5 16h3M20.5 20h3" {...stroke} />
    </svg>
  );
}

export function IntegrationsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="10" cy="16" r="4" {...stroke} />
      <circle cx="22" cy="10" r="3.5" {...stroke} />
      <circle cx="22" cy="22" r="3.5" {...stroke} />
      <path d="M13.8 14.2 18.7 11.4M13.8 17.8l4.9 2.8" {...stroke} />
    </svg>
  );
}

export function AccessIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="8" y="14" width="16" height="12" rx="2.5" {...stroke} />
      <path d="M12 14V11a4 4 0 0 1 8 0v3" {...stroke} />
      <circle cx="16" cy="20" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const platformIcons = {
  account: AccountIcon,
  organizations: OrganizationsIcon,
  integrations: IntegrationsIcon,
  access: AccessIcon,
} as const;

export type PlatformIconKey = keyof typeof platformIcons;
