import { FACTS, PROGRAMS } from "@/lib/facts";
import type { SchemeDoc } from "./types";

/*
 * Shared pieces for the scheme pages: the AAA document library (the policy
 * PDFs and application forms the previous program pages linked to, on the
 * legacy WordPress uploads path) and the hero stat strip.
 */

const UP = "https://aaa-accreditation.org/wp-content/uploads";

export const DOC = {
  generalRequirements: `${UP}/2021/12/General-requirements-for-accreditation-V2.pdf`,
  symbols: `${UP}/2020/04/Requirements-for-use-of-accreditation-symbols.pdf`,
  multiSite: `${UP}/2020/04/Requirements-for-Accreditation-of-multi-site-conformity-assessment-bodies-.pdf`,
  ptPolicy: `${UP}/2020/04/Proficiency-Testing-policy.pdf`,
  traceability: `${UP}/2020/04/Measurement-Traceability-policy.pdf`,
  uncertainty: `${UP}/2020/04/Determination-of-uncertainty-of-measurement-policy.pdf`,
  appLabs: `${UP}/2020/04/Application-form-testing-cal-labs.doc`,
  appInspection: `${UP}/2020/04/Application-form-Inspection-Bodies.doc`,
  checklist17020: `${UP}/2020/04/Checklist-ISO-17020.docx`,
  appSystemProduct2020: `${UP}/2020/04/Application-form-system_product-certfication-Bodies.doc`,
  appSystemProduct2023: `${UP}/2023/03/Application-form-system_product-certfication-Bodies.doc`,
  appHalal: `${UP}/2023/07/Application-form-Halal-certfication-Bodies-2.doc`,
  appPersonnel: `${UP}/2020/04/Application-form-personnel-certfication.doc`,
  appMedical: `${UP}/2023/03/Application-form-for-accreditation-of-medical-labs.doc`,
  appPT: `${UP}/2023/03/Application-form-PT-providers-V2.docx`,
  checklist17043: `${UP}/2020/04/Checklist-for-ISO-17043.docx`,
} as const;

/** The three policy documents every scheme links to. */
export const COMMON_DOCS: SchemeDoc[] = [
  { label: "General requirements for accreditation", href: DOC.generalRequirements, meta: "PDF" },
  { label: "Requirements for use of accreditation symbols", href: DOC.symbols, meta: "PDF" },
  {
    label: "Requirements for accreditation of multi-site conformity assessment bodies",
    href: DOC.multiSite,
    meta: "PDF",
  },
];

/** "Policies & Technical Documents — View →" resource row. */
export const POLICIES_LINK: SchemeDoc = { label: "Policies & Technical Documents", href: "/documents", meta: "VIEW" };

/** Hero stat strip. Figures come from lib/facts.ts; labels follow each client hero. */
export function heroStats(
  labels: [string, string, string, string] = [
    "Countries Served Worldwide",
    "Assessors & Experts",
    "Accreditation Validity",
    "Accreditation Services",
  ],
  last = "International"
) {
  return [
    { v: FACTS.countriesPlus, k: labels[0] },
    { v: FACTS.assessors, k: labels[1] },
    { v: `${FACTS.cycleYears} Years`, k: labels[2] },
    { v: last, k: labels[3] },
  ];
}

const SCHEMES = [
  { href: "/programs/testing-laboratories", label: "Testing Laboratories" },
  { href: "/programs/calibration-laboratories", label: "Calibration Laboratories" },
  { href: PROGRAMS.iso17020.href, label: PROGRAMS.iso17020.shortLabel },
  { href: PROGRAMS.iso17021.href, label: PROGRAMS.iso17021.shortLabel },
  { href: PROGRAMS.iso17024.href, label: PROGRAMS.iso17024.shortLabel },
  { href: PROGRAMS.iso15189.href, label: PROGRAMS.iso15189.shortLabel },
  { href: PROGRAMS.iso17065.href, label: PROGRAMS.iso17065.shortLabel },
  { href: PROGRAMS.iso17043.href, label: PROGRAMS.iso17043.shortLabel },
];

/** CTA "Related" row: the CAB hub plus the next three schemes. */
export function relatedFor(path: string) {
  const i = SCHEMES.findIndex((s) => s.href === path);
  const next = [1, 2, 3].map((n) => SCHEMES[(i + n) % SCHEMES.length]);
  return [{ href: PROGRAMS.cab.href, label: "All conformity assessment programs" }, ...next];
}

/** Breadcrumb trail for JSON-LD (breadcrumbSchema prepends Home). */
export function crumbsFor(name: string, path: string) {
  return [
    { name: "Programs", path: "/programs" },
    { name: "Conformity Assessment Bodies", path: PROGRAMS.cab.href },
    { name, path },
  ];
}
