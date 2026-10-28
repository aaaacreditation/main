import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireArea } from "@/lib/admin";
import DangerButton from "../../../_components/DangerButton";
import CaseStudyForm from "../CaseStudyForm";
import { deleteCaseStudy } from "../actions";
import { CASE_STUDY_ERRORS } from "../shared";
import "../case-studies-admin.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit case study" };

export default async function EditCaseStudyPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await requireArea("case-studies");
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const cs = await prisma.caseStudy.findUnique({ where: { id } });
  if (!cs) notFound();

  const placement = [cs.showOnHome && "Home carousel", cs.showOnSme && "SME page"].filter(Boolean).join(" · ");

  return (
    <>
      <header className="adm-topbar">
        <div>
          <nav className="adm-crumbs"><Link href="/admin/case-studies">Case Studies</Link> / Edit</nav>
          <h1 className="adm-topbar-clamp">{cs.name}</h1>
          <p className="adm-topbar-sub">
            {placement || "Not placed on the site"} · {cs.status === "PUBLISHED" ? "Published" : "Draft"}
          </p>
        </div>
        <div className="adm-topbar-actions">
          <form action={deleteCaseStudy}>
            <input type="hidden" name="id" value={cs.id} />
            <DangerButton
              confirmText={`Delete the case study “${cs.name}”? It disappears from the site at once. This cannot be undone.`}
            >
              Delete case study
            </DangerButton>
          </form>
        </div>
      </header>
      <div className="adm-content">
        {error ? <p className="adm-error" role="alert">{CASE_STUDY_ERRORS[error] ?? "Something went wrong."}</p> : null}
        <CaseStudyForm
          cs={{
            id: cs.id,
            slug: cs.slug,
            name: cs.name,
            sector: cs.sector,
            country: cs.country,
            metric: cs.metric,
            quote: cs.quote,
            description: cs.description,
            image: cs.image,
            imageAlt: cs.imageAlt,
            imagePosition: cs.imagePosition,
            logo: cs.logo,
            logoTight: cs.logoTight,
            initials: cs.initials,
            videoUrl: cs.videoUrl,
            link: cs.link,
            featured: cs.featured,
            showOnHome: cs.showOnHome,
            showOnSme: cs.showOnSme,
            order: cs.order,
            status: cs.status,
          }}
        />
      </div>
    </>
  );
}
