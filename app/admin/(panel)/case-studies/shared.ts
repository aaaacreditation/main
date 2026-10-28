// Type-only Prisma import: the editor (a client component) imports this file.
import type { Prisma } from "@prisma/client";

/**
 * Shared between the Case Studies list, editor and server actions (a "use
 * server" file may only export async functions, so these live here).
 */

export const CASE_STUDY_TABS = [
  { key: "", label: "All" },
  { key: "home", label: "Home carousel" },
  { key: "sme", label: "SME page" },
  { key: "drafts", label: "Drafts" },
] as const;

export type CaseStudyTab = (typeof CASE_STUDY_TABS)[number]["key"];

export function parseTab(v: string | undefined | null): CaseStudyTab {
  return CASE_STUDY_TABS.some((t) => t.key === v) ? (v as CaseStudyTab) : "";
}

/** Prisma filter for a placement tab; reordering swaps neighbours within it. */
export function placementWhere(tab: CaseStudyTab): Prisma.CaseStudyWhereInput {
  switch (tab) {
    case "home":
      return { showOnHome: true };
    case "sme":
      return { showOnSme: true };
    case "drafts":
      return { status: "DRAFT" };
    default:
      return {};
  }
}

export function listHref(tab: CaseStudyTab, extra?: Record<string, string>): string {
  const params = new URLSearchParams();
  if (tab) params.set("tab", tab);
  for (const [k, v] of Object.entries(extra ?? {})) if (v) params.set(k, v);
  const qs = params.toString();
  return `/admin/case-studies${qs ? `?${qs}` : ""}`;
}

/** Photo crop choices (CSS object-position). "" renders as the default, center. */
export const IMAGE_POSITIONS = [
  { value: "", label: "Center (default)" },
  { value: "center 25%", label: "Center 25% (show more of the top)" },
  { value: "center 35%", label: "Center 35%" },
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
] as const;

export const CASE_STUDY_ERRORS: Record<string, string> = {
  name: "The organization name is required.",
  "home-media":
    "The home carousel card needs a photo, its alt text and a logo. Add all three, or untick “Home carousel”.",
  "sme-image": "The SME page card needs a photo. Add one, or untick “SME page”.",
  "image-src":
    "The photo must be uploaded here or be a site path starting with “/”. Images from other websites can’t be displayed.",
  "logo-src":
    "The logo must be uploaded here or be a site path starting with “/”. Images from other websites can’t be displayed.",
  video: "The video URL must be a full link starting with https://.",
  link: "The story link must be a full link (https://…) or a site path starting with “/”.",
  position: "Pick a crop position from the list.",
  notfound: "That case study no longer exists.",
};
