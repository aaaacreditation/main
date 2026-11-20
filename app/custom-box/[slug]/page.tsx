import type { Metadata } from "next";
import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "@/app/_components/SiteLink";
import PageHero from "../../_components/PageHero";
import CTA from "../../_components/CTA";
import JsonLd from "../../_components/JsonLd";
import Glyph from "../../_components/site/Glyph";
import {
  ACCREDITATION_TYPES,
  accreditationType,
  orgStatus,
  type Accreditation,
  type Org,
} from "@/app/_data/accredited-organizations";
import { getAccreditedOrganizations } from "@/lib/directory";
import { findProfile } from "@/lib/org-profiles";
import { publicPath } from "@/lib/public-urls";
import { CONTACT } from "@/lib/facts";
import { SITE_URL, breadcrumbSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import "../../directory/accredited-organizations/directory.css";
import "../profile.css";

/**
 * One accredited organization, at its old WordPress address
 * /custom-box/<slug>/ (Nov 2026, client: the old links must stay real pages).
 * Same facts as the register's detail dialog, as published — status is never
 * inferred from a date. Old duplicate slugs show the same page with the
 * canonical pointing at the organization's main address; an organization no
 * longer in the register sends its old address to the register.
 */
export const revalidate = 300;

const REGISTER = "/directory/accredited-organizations";

async function lookup(slug: string) {
  const match = findProfile(await getAccreditedOrganizations(), decodeURIComponent(slug));
  if (match?.kind === "delisted") permanentRedirect(publicPath(REGISTER));
  if (!match) notFound();
  return match;
}

function typeLabel(a: Accreditation): string {
  const t = ACCREDITATION_TYPES[accreditationType(a)];
  return t.standard ? `${t.label} · ${t.standard}` : t.label;
}

function StatusPill({ status }: { status: string }) {
  const live = status === "Accredited";
  return (
    <span className={`dx-status${live ? " live" : " held"}`}>
      {live ? <Glyph name="check-circle" size={13} strokeWidth={2} /> : <span className="dx-status-dot" aria-hidden="true" />}
      {status}
    </span>
  );
}

function summary(org: Org): string {
  const types = [...new Set(org.accreditations.map(typeLabel))].join(", ");
  const text =
    org.description?.trim() ||
    `${org.name}${org.country ? ` (${org.country})` : ""} is listed in the American Accreditation Association register${types ? ` as ${types}` : ""}.`;
  if (text.length <= 158) return text;
  const cut = text.slice(0, 157);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), 120)).replace(/[\s.,;:—-]+$/, "")}…`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const match = findProfile(await getAccreditedOrganizations(), decodeURIComponent(slug));
  if (match?.kind !== "org") return {};
  const { org } = match;
  return seoPage({
    title: `${org.name} — AAA Accredited`,
    description: summary(org),
    path: `/custom-box/${match.slug}`,
    ...(org.logo ? { image: org.logo } : {}),
  });
}

export default async function OrganizationProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { org, slug: main } = await lookup(slug);
  const path = `/custom-box/${main}`;
  const status = orgStatus(org);

  return (
    <div className="axp dxp orgx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Accredited Organizations", path: REGISTER },
            { name: org.name, path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: org.name,
            url: `${SITE_URL}${publicPath(path)}`,
            ...(org.logo ? { logo: org.logo.startsWith("http") ? org.logo : `${SITE_URL}${org.logo}` } : {}),
            ...(org.description ? { description: org.description } : {}),
            ...(org.country ? { address: { "@type": "PostalAddress", addressCountry: org.country } } : {}),
          },
        ]}
      />

      <PageHero
        eyebrow="AAA accredited register"
        badge="Accredited Organizations"
        title={org.name}
        intro={org.location || org.country || undefined}
        crumbs={[{ href: REGISTER, label: "Accredited Organizations" }, { label: org.name }]}
      />

      <section className="ax-section">
        <div className="container orgx-wrap">
          <article className="orgx-card">
            <div className="dx-modal-head">
              <span className="dx-logo modal">
                {org.logo ? (
                  <Image src={org.logo} alt={`${org.name} logo`} fill sizes="180px" />
                ) : (
                  <span className="dx-logo-mono" aria-hidden="true">
                    {org.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </span>
              <div>
                <StatusPill status={status} />
                <h2>{org.name}</h2>
                <p className="dx-loc">
                  <Glyph name="pin" size={14} strokeWidth={2} /> {org.location}
                  {org.country && !org.location.includes(org.country) && <> · {org.country}</>}
                </p>
              </div>
            </div>

            {org.description && <p className="dx-modal-desc">{org.description}</p>}

            <div className="dx-records">
              <div className="dx-record-h">
                <Glyph name="shield-check" size={14} strokeWidth={2} />
                {org.accreditations.length === 1 ? "Accreditation record" : `${org.accreditations.length} accreditation records`}
              </div>
              {org.accreditations.map((a) => (
                <div className={`dx-record${a.status === "Accredited" ? "" : " is-held"}`} key={a.number + a.accreditedAs}>
                  <div className="dx-record-top">
                    <span className="dx-record-type">{typeLabel(a)}</span>
                    <StatusPill status={a.status} />
                  </div>
                  <dl>
                    <div>
                      <dt>Accredited as</dt>
                      <dd>{a.accreditedAs}</dd>
                    </div>
                    <div>
                      <dt>Accreditation no.</dt>
                      <dd className="dx-num">{a.number}</dd>
                    </div>
                    <div>
                      <dt>Scope</dt>
                      <dd>{a.scope}</dd>
                    </div>
                    <div>
                      <dt>Valid until</dt>
                      <dd>{a.expiry}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>

            <p className="dx-modal-note">
              Status is shown as published in the AAA register. To confirm the current scope, validity or status of
              any listing, contact AAA with the accreditation number.
            </p>

            <div className="dx-modal-actions">
              <Link href={CONTACT.formHref} className="ax-btn ax-btn-blue sm">
                Verify this listing <Glyph name="arrow-right" size={14} strokeWidth={2} />
              </Link>
              <Link href={REGISTER} className="ax-btn ax-btn-ghost-navy sm">
                All accredited organizations
              </Link>
            </div>
          </article>
        </div>
      </section>

      <CTA
        related={[
          { href: REGISTER, label: "Accredited organizations register" },
          { href: "/apply", label: "Apply for accreditation" },
          { href: "/about-accreditation", label: "What accreditation means" },
        ]}
      />
    </div>
  );
}
