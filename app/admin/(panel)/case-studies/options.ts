import { prisma } from "@/lib/db";
import type { CaseStudyPageOption } from "./CaseStudyForm";

/** The case study pages a card's story link can point at, newest first. */
export async function caseStudyPageOptions(): Promise<CaseStudyPageOption[]> {
  const rows = await prisma.caseStudy.findMany({
    where: { NOT: { body: "" } },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: { slug: true, name: true, title: true },
  });
  return rows.map((r) => ({ path: `/case-studies/${r.slug}`, label: `${r.name} — ${r.title || r.name}` }));
}
