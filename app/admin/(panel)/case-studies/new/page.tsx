import Link from "next/link";
import { requireArea } from "@/lib/admin";
import CaseStudyForm from "../CaseStudyForm";
import { caseStudyPageOptions } from "../options";
import { CASE_STUDY_ERRORS } from "../shared";
import "../case-studies-admin.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "New case study" };

export default async function NewCaseStudyPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; placement?: string }>;
}) {
  await requireArea("case-studies");
  const [{ error, placement }, caseStudyPages] = await Promise.all([searchParams, caseStudyPageOptions()]);

  return (
    <>
      <header className="adm-topbar">
        <div>
          <nav className="adm-crumbs"><Link href="/admin/case-studies">Case Studies</Link> / New</nav>
          <h1>New case study</h1>
        </div>
      </header>
      <div className="adm-content">
        {error ? <p className="adm-error" role="alert">{CASE_STUDY_ERRORS[error] ?? "Something went wrong."}</p> : null}
        <CaseStudyForm
          cs={{
            status: "DRAFT",
            showOnHome: placement === "home",
            showOnSme: placement === "sme",
          }}
          caseStudyPages={caseStudyPages}
        />
      </div>
    </>
  );
}
