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
  type AccreditationTypeId,
  type Org,
} from "@/app/_data/accredited-organizations";
import { getAccreditedOrganizations } from "@/lib/directory";
import { findProfile, profilePath } from "@/lib/org-profiles";
import { publicPath } from "@/lib/public-urls";
import { CONTACT, PROGRAMS } from "@/lib/facts";
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

/**
 * What each kind of AAA accreditation confirms, with the program page that
 * explains it (Nov 2026: profiles were ~190 words — thin for search — and
 * linked nowhere but the register). General statements of what the standard
 * covers, true of every organization holding that accreditation.
 */
const TYPE_COPY: Record<AccreditationTypeId, { href: string; link: string; text: string }> = {
  training: {
    href: PROGRAMS.training.href,
    link: PROGRAMS.training.label,
    text: "AAA accreditation of a training or education provider confirms that its programs, trainers, learner assessment and quality management have been independently evaluated against AAA's accreditation criteria, and are kept under annual surveillance.",
  },
  healthcare: {
    href: PROGRAMS.healthcare.href,
    link: PROGRAMS.healthcare.label,
    text: "AAA healthcare accreditation evaluates a hospital, clinic or care provider on patient safety, clinical governance, quality improvement and patient-centered care. AAA's healthcare standards are assessed by ISQua's External Evaluation Association.",
  },
  school: {
    href: PROGRAMS.school.href,
    link: PROGRAMS.school.label,
    text: "AAA school accreditation evaluates a school's governance and leadership, teaching and learning, student welfare and continuous improvement against AAA's standards for K–12 institutions.",
  },
  "management-systems": {
    href: PROGRAMS.iso17021.href,
    link: PROGRAMS.iso17021.label,
    text: "Accreditation to ISO/IEC 17021-1 confirms that a certification body auditing and certifying management systems — such as ISO 9001, ISO 14001 or ISO 45001 — is competent, consistent and impartial, so the certificates it issues can be trusted.",
  },
  personnel: {
    href: PROGRAMS.iso17024.href,
    link: PROGRAMS.iso17024.label,
    text: "Accreditation to ISO/IEC 17024 confirms that a personnel certification body certifies people's competence through fair, valid and reliable examination, and manages its certification scheme impartially.",
  },
  product: {
    href: PROGRAMS.iso17065.href,
    link: PROGRAMS.iso17065.label,
    text: "Accreditation to ISO/IEC 17065 confirms that a body certifying products, processes or services operates competently, consistently and impartially.",
  },
  "testing-lab": {
    href: PROGRAMS.testingLabs.href,
    link: PROGRAMS.testingLabs.label,
    text: "Accreditation to ISO/IEC 17025 confirms a testing laboratory's technical competence and the validity of the results it reports.",
  },
  "calibration-lab": {
    href: PROGRAMS.calibrationLabs.href,
    link: PROGRAMS.calibrationLabs.label,
    text: "Accreditation to ISO/IEC 17025 confirms a calibration laboratory's technical competence, measurement traceability and the validity of the calibration results it reports.",
  },
  inspection: {
    href: PROGRAMS.iso17020.href,
    link: PROGRAMS.iso17020.label,
    text: "Accreditation to ISO/IEC 17020 confirms that an inspection body is competent to carry out inspections and does so impartially and consistently.",
  },
  proficiency: {
    href: PROGRAMS.iso17043.href,
    link: PROGRAMS.iso17043.label,
    text: "Accreditation to ISO/IEC 17043 confirms that a proficiency testing provider designs and runs its schemes competently, so laboratories can rely on them to check their performance.",
  },
  other: {
    href: "/about-accreditation",
    link: "What accreditation means",
    text: "Accreditation is independent confirmation that an organization meets recognized standards of competence, quality and impartiality, assessed by AAA and kept under regular surveillance.",
  },
};

/** Other organizations to link to: same country first, then the same kind of accreditation. */
function neighbours(all: Org[], org: Org, max = 6): Org[] {
  const types = new Set(org.accreditations.map(accreditationType));
  const others = all.filter((o) => o.name !== org.name);
  const sameCountry = org.country ? others.filter((o) => o.country === org.country) : [];
  const sameType = others.filter((o) => !sameCountry.includes(o) && o.accreditations.some((a) => types.has(accreditationType(a))));
  return [...sameCountry, ...sameType].slice(0, max);
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
  const kinds = [...new Set(org.accreditations.map(accreditationType))];
  const nearby = neighbours(await getAccreditedOrganizations(), org);
  const sameCountry = nearby.length > 0 && nearby[0].country === org.country;

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
            ...(org.country ? { address: { "@type": "PostalAddress", addressCountry: org.country, ...(org.location ? { addressLocality: org.location } : {}) } } : {}),
            // The accreditation, as a credential awarded by AAA.
            hasCredential: org.accreditations.map((a) => ({
              "@type": "EducationalOccupationalCredential",
              name: `AAA accreditation — ${a.accreditedAs}`,
              credentialCategory: "Accreditation",
              identifier: a.number,
              recognizedBy: { "@id": `${SITE_URL}/#organization` },
            })),
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

      <section className="ax-section cream">
        <div className="container orgx-wrap">
          <div className="ax-head">
            <span className="eyebrow">About this accreditation</span>
            <h2>What {kinds.length > 1 ? "these accreditations confirm" : "this accreditation confirms"}</h2>
          </div>
          <div className="orgx-about">
            {kinds.map((k) => (
              <div key={k} className="orgx-about-item">
                <h3>{ACCREDITATION_TYPES[k].standard ? `${ACCREDITATION_TYPES[k].label} · ${ACCREDITATION_TYPES[k].standard}` : ACCREDITATION_TYPES[k].label}</h3>
                <p>
                  {TYPE_COPY[k].text}{" "}
                  <Link href={TYPE_COPY[k].href}>{TYPE_COPY[k].link} →</Link>
                </p>
              </div>
            ))}
            <div className="orgx-about-item">
              <h3>How to check a listing</h3>
              <p>
                Each record in the AAA register carries an accreditation number, scope and validity date. The register
                shows the status as published; to confirm it, contact AAA with the accreditation number. Certificates
                issued under AAA can be checked in the{" "}
                {/* The certificate portal is a static app outside Next routing (public/adcp). */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href="/adcp/">AAA certificate portal</a>.
              </p>
            </div>
          </div>

          {nearby.length > 0 && (
            <nav className="orgx-more" aria-label="More accredited organizations">
              <h3>{sameCountry ? `More AAA-accredited organizations in ${org.country}` : "More AAA-accredited organizations"}</h3>
              <ul>
                {nearby.map((o) => (
                  <li key={o.name}>
                    <Link href={profilePath(o)}>
                      <strong>{o.name}</strong>
                      <span>{o.country}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
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
