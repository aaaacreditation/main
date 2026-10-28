import { ContentStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

/** Datalist values for the editor: existing countries and published "accredited as" wording. */
export async function editorOptions(): Promise<{ countries: string[]; accreditedAsOptions: string[] }> {
  const [countries, accreditedAs] = await Promise.all([
    prisma.organization.findMany({ distinct: ["country"], select: { country: true } }),
    prisma.accreditation.findMany({
      where: { organization: { status: ContentStatus.PUBLISHED } },
      distinct: ["accreditedAs"],
      select: { accreditedAs: true },
    }),
  ]);
  const sorted = (xs: string[]) => xs.filter(Boolean).sort((a, b) => a.localeCompare(b));
  return {
    countries: sorted(countries.map((c) => c.country)),
    accreditedAsOptions: sorted(accreditedAs.map((a) => a.accreditedAs)),
  };
}
