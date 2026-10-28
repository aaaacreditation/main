import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireArea } from "@/lib/admin";
import OrgForm, { ORG_FORM_ERRORS } from "../OrgForm";
import { editorOptions } from "../options";
import "../directory-admin.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit organization" };

export default async function EditOrganizationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await requireArea("directory");
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const [org, options] = await Promise.all([
    prisma.organization.findUnique({
      where: { id },
      include: { accreditations: { orderBy: { order: "asc" } } },
    }),
    editorOptions(),
  ]);
  if (!org) notFound();

  return (
    <>
      <header className="adm-topbar">
        <div>
          <nav className="adm-crumbs">
            <Link href="/admin/directory">Accredited Organizations</Link> / Edit
          </nav>
          <h1 className="adm-topbar-clamp">{org.name}</h1>
          <p className="adm-topbar-sub">
            {[org.location || org.country, `${org.accreditations.length} accreditation record${org.accreditations.length === 1 ? "" : "s"}`, org.status === "PUBLISHED" ? "Published" : "Draft"]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </header>
      <div className="adm-content">
        {error ? (
          <p className="adm-error" role="alert">
            {ORG_FORM_ERRORS[error] ?? "The organization couldn’t be saved. Check the fields and try again."}
          </p>
        ) : null}
        <OrgForm
          countries={options.countries}
          accreditedAsOptions={options.accreditedAsOptions}
          org={{
            id: org.id,
            slug: org.slug,
            name: org.name,
            location: org.location,
            country: org.country,
            description: org.description,
            logo: org.logo,
            website: org.website,
            order: org.order,
            status: org.status,
            accreditations: org.accreditations.map((a) => ({
              accreditedAs: a.accreditedAs,
              number: a.number,
              scope: a.scope,
              expiry: a.expiry,
              status: a.status,
            })),
          }}
        />
      </div>
    </>
  );
}
