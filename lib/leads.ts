import { LeadKind, LeadStatus } from "@prisma/client";

/**
 * Lead classification shared by the public capture endpoint and the admin.
 *
 * Eleven forms post to /api/leads, each with its own `source` string. The
 * admin splits them into contact enquiries, applications, quote requests,
 * program-advisor requests and membership applications — this is the one
 * place that mapping lives (the portal_cms migration backfilled existing rows
 * with the same rules).
 */
export function leadKindFromSource(source: string, topic = ""): LeadKind {
  if (source.startsWith("membership")) return LeadKind.MEMBERSHIP;
  if (source.includes("advisor")) return LeadKind.ADVISOR;
  if (source === "home-quote" || source === "quote-form") return LeadKind.QUOTE;
  if (source === "contact-form") return /quote/i.test(topic) ? LeadKind.QUOTE : LeadKind.CONTACT;
  if (
    source === "apply-form" ||
    source === "home-apply" ||
    source === "sme-application" ||
    source.includes("application")
  ) {
    return LeadKind.APPLICATION;
  }
  return LeadKind.OTHER;
}

export const LEAD_KIND_LABEL: Record<LeadKind, string> = {
  CONTACT: "Contact enquiry",
  APPLICATION: "Accreditation application",
  QUOTE: "Quote request",
  ADVISOR: "Program advisor request",
  MEMBERSHIP: "Membership application",
  OTHER: "Other",
};

/** Pipeline order for status pickers; CLOSED is the pre-Oct-2026 catch-all. */
export const LEAD_STATUS_ORDER: LeadStatus[] = [
  LeadStatus.NEW,
  LeadStatus.CONTACTED,
  LeadStatus.QUALIFIED,
  LeadStatus.PROPOSAL,
  LeadStatus.WON,
  LeadStatus.LOST,
  LeadStatus.CLOSED,
  LeadStatus.SPAM,
];

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  PROPOSAL: "Proposal sent",
  WON: "Won",
  LOST: "Lost",
  CLOSED: "Closed",
  SPAM: "Spam",
};

/** Human label for a form `source`, e.g. "iso-17021-advisor" → "ISO 17021 advisor". */
export function leadSourceLabel(source: string): string {
  const known: Record<string, string> = {
    "apply-form": "Apply page",
    "contact-form": "Contact page",
    "home-quote": "Home quote form",
    "home-apply": "Home application (legacy)",
    "quote-form": "Quote form (legacy)",
    "sme-application": "SMEs program application",
    "cab-advisor": "CAB hub advisor",
    "training-education-advisor": "Training & Education advisor",
    "membership-application": "Membership application",
    "membership-individual-application": "Individual membership",
    "membership-individual-rcm": "Recognized Competency Member",
    "membership-organizational-application": "Organizational membership",
  };
  if (known[source]) return known[source];
  return source
    .replace(/-/g, " ")
    .replace(/\biso (\d+)/i, "ISO $1")
    .replace(/^\w/, (c) => c.toUpperCase());
}
