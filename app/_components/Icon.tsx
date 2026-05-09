import type { JSX } from "react";

type IconName =
  | "arrow"
  | "search"
  | "shield"
  | "flask"
  | "cert"
  | "globe"
  | "iso"
  | "flag"
  | "scale"
  | "medical"
  | "industry"
  | "book"
  | "clipboard"
  | "chart"
  | "arrowUpRight"
  | "mail"
  | "phone"
  | "pin"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "facebook"
  | "doc"
  | "download"
  | "check";

const PATHS: Record<IconName, JSX.Element> = {
  arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  shield: <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />,
  flask: (
    <>
      <path d="M9 3h6" />
      <path d="M10 3v6L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9V3" />
      <path d="M7.5 14h9" />
    </>
  ),
  cert: (
    <>
      <path d="M4 4h12v10H4z" />
      <circle cx="17" cy="17" r="4" />
      <path d="m15.5 17 1 1 2-2" />
      <path d="M7 8h6M7 11h4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  iso: (
    <>
      <path d="M3 12c4-6 14-6 18 0M3 12c4 6 14 6 18 0" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  flag: <path d="M4 21V4M4 4h13l-2 4 2 4H4" />,
  scale: (
    <>
      <path d="M12 3v18M5 8h14" />
      <path d="M5 8 2 14a3 3 0 0 0 6 0L5 8ZM19 8l-3 6a3 3 0 0 0 6 0L19 8Z" />
    </>
  ),
  medical: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M8 6V4h8v2" />
      <path d="M12 11v6M9 14h6" />
    </>
  ),
  industry: (
    <>
      <path d="M3 21V10l5 3V10l5 3V10l5 3v8H3Z" />
      <path d="M7 17h2M11 17h2M15 17h2" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5Z" />
      <path d="M4 5v14a2 2 0 0 1 2-2h12" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4h6v3H9z" />
      <path d="M9 12h6M9 16h4" />
    </>
  ),
  chart: (
    <>
      <path d="M3 21h18" />
      <path d="M6 17V9M11 17V5M16 17v-6M21 17v-9" />
    </>
  ),
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  twitter: <path d="M4 4h3.5l4.5 6L17 4h3l-7 8.5L21 20h-3.5L13 14l-5.5 6H4l7.5-8.5L4 4Z" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v8M8 7v.01M12 18v-5a2 2 0 0 1 4 0v5M12 13v-3" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="m11 10 4 2-4 2v-4Z" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v8h3v-8h2.5l.5-3H14V8Z" />,
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 13h6M9 17h4" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 20h14" />
    </>
  ),
  check: <path d="m5 12 5 5L20 7" />,
};

export type { IconName };

export default function Icon({
  name,
  size = 20,
  className = "",
  strokeWidth = 1.5,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}
