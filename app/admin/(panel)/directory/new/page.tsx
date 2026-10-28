import Link from "next/link";
import { requireArea } from "@/lib/admin";
import OrgForm, { ORG_FORM_ERRORS } from "../OrgForm";
import { editorOptions } from "../options";
import "../directory-admin.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Add organization" };

export default async function NewOrganizationPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireArea("directory");
  const { error } = await searchParams;
  const { countries, accreditedAsOptions } = await editorOptions();

  return (
    <>
      <header className="adm-topbar">
        <div>
          <nav className="adm-crumbs">
            <Link href="/admin/directory">Accredited Organizations</Link> / New
          </nav>
          <h1>Add organization</h1>
        </div>
      </header>
      <div className="adm-content">
        {error ? (
          <p className="adm-error" role="alert">
            {ORG_FORM_ERRORS[error] ?? "The organization couldn’t be saved. Check the fields and try again."}
          </p>
        ) : null}
        <OrgForm countries={countries} accreditedAsOptions={accreditedAsOptions} />
      </div>
    </>
  );
}
