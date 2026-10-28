import type { LeadKind, LeadStatus } from "@prisma/client";

/** Chip tone per status (adm-chip modifiers). */
export function leadStatusTone(status: LeadStatus): string {
  switch (status) {
    case "NEW":
      return "new";
    case "CONTACTED":
    case "QUALIFIED":
    case "PROPOSAL":
      return "ok";
    case "WON":
      return "won";
    case "SPAM":
      return "err";
    default:
      return "muted"; // LOST, CLOSED
  }
}

/** Compact kind labels for table cells and chips. */
export const LEAD_KIND_SHORT: Record<LeadKind, string> = {
  CONTACT: "Contact",
  APPLICATION: "Application",
  QUOTE: "Quote",
  ADVISOR: "Advisor",
  MEMBERSHIP: "Membership",
  OTHER: "Other",
};

/** Plural tab labels, in tab order. */
export const LEAD_KIND_TABS: { kind: LeadKind; label: string }[] = [
  { kind: "CONTACT", label: "Contact enquiries" },
  { kind: "APPLICATION", label: "Applications" },
  { kind: "QUOTE", label: "Quote requests" },
  { kind: "ADVISOR", label: "Advisor requests" },
  { kind: "MEMBERSHIP", label: "Membership" },
  { kind: "OTHER", label: "Other" },
];

export const leadDateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
export const leadTimeFmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });
export const leadDateTimeFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

/** Digits for a wa.me link (international format, no "+" or "00"), or null when too short. */
export function whatsappDigits(phone: string): string | null {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  return digits.length >= 8 ? digits : null;
}

/** Only http(s) URLs become links — the referrer comes from a request header. */
export function safeHttpUrl(v: string): string | null {
  return /^https?:\/\//i.test(v) ? v : null;
}
