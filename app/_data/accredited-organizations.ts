import registerJson from "./accredited-organizations.json";

/**
 * The AAA public register of accredited organizations — types, program
 * mapping and the bundled snapshot.
 *
 * Source of truth: the Organization / Accreditation tables, edited in the
 * admin portal (/admin/directory) and read by the public pages through
 * `getAccreditedOrganizations()` in lib/directory.ts. The JSON below is the
 * bundled snapshot of the live aaa-accreditation.org register
 * (`node scripts/sync-accredited-organizations.mjs`, Oct 2026): it seeds the
 * database and is the fallback when the database is unreachable. Organizations
 * keep the register's order, most recently added first; one organization can
 * hold several accreditations (Inspeed Global holds five).
 *
 * This module is imported by client components (DirectoryExplorer), so it
 * must stay free of server-only imports such as Prisma.
 *
 * Every `description` is the organization's own wording, and every
 * accreditation field is the register's own wording. Facts inside a
 * description (including any country counts an organization states about
 * itself) belong to that organization and must not be edited to match AAA's
 * own figures. Status is shown as published — never inferred from a date.
 */

export type Accreditation = {
  /** As published, e.g. "Training & Education Provider", "ISO/IEC 17024: 2026". */
  accreditedAs: string;
  number: string;
  scope: string;
  /** As published, e.g. "May 1, 2029". */
  expiry: string;
  /** "Accredited", "Suspended" or "Withdrawn". */
  status: string;
};

/** The record statuses the register publishes, in display order. */
export const ACCREDITATION_STATUSES = ["Accredited", "Suspended", "Withdrawn"] as const;
export type AccreditationStatus = (typeof ACCREDITATION_STATUSES)[number];

export type Org = {
  name: string;
  location: string;
  country: string;
  description?: string;
  /** Local copy of the organization's logo (public/accredited/logos). */
  logo?: string;
  accreditations: Accreditation[];
};

/** Bundled snapshot of the register — the seed and the no-database fallback. */
export const ACCREDITED_ORGANIZATIONS: Org[] = registerJson as Org[];

/* ------------------------------------------------------------------ types */

/**
 * The register's "accredited as" wording varies record to record ("Education
 * Provider", "Training & Education provider", "ISO/IEC 17024: 2026",
 * "Personnel Certification Body ISO 17024"…). This maps each record onto the
 * AAA program it falls under so the register can be filtered; the published
 * wording is still what the record shows.
 */
export type AccreditationTypeId =
  | "training"
  | "healthcare"
  | "school"
  | "management-systems"
  | "personnel"
  | "product"
  | "testing-lab"
  | "calibration-lab"
  | "inspection"
  | "proficiency"
  | "other";

export type ProgramFamily = "training" | "healthcare" | "school" | "cab";

export const ACCREDITATION_TYPES: Record<
  AccreditationTypeId,
  { label: string; standard?: string; family: ProgramFamily | null }
> = {
  training: { label: "Training & Education Provider", family: "training" },
  healthcare: { label: "Healthcare Organization", family: "healthcare" },
  school: { label: "School", family: "school" },
  "management-systems": { label: "Management Systems Certification Body", standard: "ISO/IEC 17021-1", family: "cab" },
  personnel: { label: "Personnel Certification Body", standard: "ISO/IEC 17024", family: "cab" },
  product: { label: "Product Certification Body", standard: "ISO/IEC 17065", family: "cab" },
  "testing-lab": { label: "Testing Laboratory", standard: "ISO/IEC 17025", family: "cab" },
  "calibration-lab": { label: "Calibration Laboratory", standard: "ISO/IEC 17025", family: "cab" },
  inspection: { label: "Inspection Body", standard: "ISO/IEC 17020", family: "cab" },
  proficiency: { label: "Proficiency Testing Provider", standard: "ISO/IEC 17043", family: "cab" },
  other: { label: "Accredited Organization", family: null },
};

export const PROGRAM_FAMILIES: { id: ProgramFamily; label: string }[] = [
  { id: "training", label: "Training & Education" },
  { id: "healthcare", label: "Healthcare" },
  { id: "school", label: "Schools" },
  { id: "cab", label: "Conformity Assessment" },
];

/** Order matters: calibration before testing, proficiency before testing. */
const TYPE_RULES: [RegExp, AccreditationTypeId][] = [
  [/school/i, "school"],
  [/health|hospital|clinic/i, "healthcare"],
  [/17021|system(s)? certification/i, "management-systems"],
  [/17024|personnel/i, "personnel"],
  [/17065|product/i, "product"],
  [/proficiency|17043/i, "proficiency"],
  [/calibration/i, "calibration-lab"],
  [/17025|testing lab/i, "testing-lab"],
  [/17020|inspection/i, "inspection"],
  [/training|education/i, "training"],
];

export function accreditationType(a: Accreditation): AccreditationTypeId {
  for (const [test, id] of TYPE_RULES) if (test.test(a.accreditedAs)) return id;
  return "other";
}

/** The organization's headline status: Accredited if any record is. */
export function orgStatus(o: Org): string {
  return o.accreditations.some((a) => a.status === "Accredited")
    ? "Accredited"
    : o.accreditations[0]?.status ?? "Accredited";
}

/* ----------------------------------------------------------------- stats */

export type RegisterStats = {
  organizations: number;
  countries: number;
  records: number;
  accredited: number;
};

/** Countries represented in a register (a register fact, not AAA's reach). */
export function registerCountries(orgs: Org[]): string[] {
  return Array.from(new Set(orgs.map((o) => o.country).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

/** Headline counts derived from a register list. */
export function registerStats(orgs: Org[]): RegisterStats {
  return {
    organizations: orgs.length,
    countries: registerCountries(orgs).length,
    records: orgs.reduce((n, o) => n + o.accreditations.length, 0),
    accredited: orgs.filter((o) => orgStatus(o) === "Accredited").length,
  };
}

/**
 * Countries in the bundled snapshot.
 * @deprecated Snapshot only — pages read the live register with
 * `getAccreditedOrganizations()` and call `registerCountries(orgs)`.
 */
export const REGISTER_COUNTRIES: string[] = registerCountries(ACCREDITED_ORGANIZATIONS);

/**
 * Headline counts of the bundled snapshot.
 * @deprecated Snapshot only — pages read the live register with
 * `getAccreditedOrganizations()` and call `registerStats(orgs)`.
 */
export const REGISTER_STATS: RegisterStats = registerStats(ACCREDITED_ORGANIZATIONS);
