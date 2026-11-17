import { ContentStatus, TermKind } from "@prisma/client";
import { prisma } from "@/lib/db";

/** Datalist values for the editor: existing countries and published "accredited as" wording. */
export async function editorOptions(): Promise<{
  countries: string[];
  accreditedAsOptions: string[];
  /** Register tags added in Admin → Categories & Tags (Nov 2026). */
  customTags: { slug: string; name: string }[];
}> {
  const [countries, accreditedAs, terms] = await Promise.all([
    prisma.organization.findMany({ distinct: ["country"], select: { country: true } }),
    prisma.accreditation.findMany({
      where: { organization: { status: ContentStatus.PUBLISHED } },
      distinct: ["accreditedAs"],
      select: { accreditedAs: true },
    }),
    prisma.term.findMany({ where: { kind: TermKind.ORG_TAG }, orderBy: [{ order: "asc" }, { name: "asc" }] }),
  ]);
  const sorted = (xs: string[]) => xs.filter(Boolean).sort((a, b) => a.localeCompare(b));
  return {
    countries: sorted(countries.map((c) => c.country)),
    accreditedAsOptions: sorted(accreditedAs.map((a) => a.accreditedAs)),
    customTags: terms.map((t) => ({ slug: t.slug, name: t.name })),
  };
}
