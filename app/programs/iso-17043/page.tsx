import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../_components/PageHero";
import PageBody from "../../_components/PageBody";
import Icon from "../../_components/Icon";
import CTA from "../../_components/CTA";

export const metadata: Metadata = {
  title: "Proficiency Testing Providers Accreditation (ISO/IEC 17043)",
  description:
    "AAA offers an internationally recognized accreditation program for proficiency testing providers under ISO/IEC 17043:2010 — Conformity assessment — General requirements for proficiency testing.",
};

const APPLY_URL =
  "https://aaa-accreditation.org/wp-content/uploads/2023/03/Application-form-PT-providers-V2.docx";

const DOCS = [
  {
    ttl: "Application form for accreditation of PT providers",
    meta: "DOC",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-PT-providers.doc",
  },
  {
    ttl: "Checklist for ISO/IEC 17043",
    meta: "DOCX",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Checklist-for-ISO-17043.docx",
  },
  {
    ttl: "General requirements for accreditation",
    meta: "PDF",
    href: "https://aaa-accreditation.org/wp-content/uploads/2021/12/General-requirements-for-accreditation-V2.pdf",
  },
  {
    ttl: "Requirements for use of accreditation symbols",
    meta: "PDF",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-use-of-accreditation-symbols.pdf",
  },
  {
    ttl: "Requirements for accreditation of multi-site conformity assessment bodies",
    meta: "PDF",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-Accreditation-of-multi-site-conformity-assessment-bodies-.pdf",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="Accreditation Program"
        title={
          <>
            Proficiency Testing Providers <em>Accreditation.</em>
          </>
        }
        intro="AAA offers an internationally recognized accreditation program for proficiency testing providers."
        crumbs={[
          { href: "/programs/healthcare", label: "Programs" },
          { label: "Proficiency Testing Providers" },
        ]}
        meta={[
          { k: "Anchor standard", v: "ISO/IEC 17043:2010" },
          { k: "Applies to", v: "Proficiency testing providers" },
        ]}
      />
      <PageBody label="Program overview">
        <h2>About the program</h2>
        <p>
          Proficiency testing providers are organizations that take responsibility for all
          aspects of the development and operation of proficiency testing schemes.
        </p>
        <p>
          Requirements for AAA&apos;s accreditation program for proficiency testing providers are
          defined in <strong>ISO/IEC 17043:2010</strong> — Conformity assessment — General
          requirements for proficiency testing.
        </p>

        <h2 style={{ marginTop: 48 }}>Why proficiency testing matters</h2>
        <p>
          Accredited proficiency testing providers produce proficiency testing samples that
          compare results from similar testing laboratories, allowing laboratories to:
        </p>
        <ul className="bullets">
          <li>Assess and demonstrate the reliability of the data they produce</li>
          <li>Identify areas where their testing and measurement methods need improvement</li>
          <li>Identify further training needs of staff</li>
          <li>Foster confidence in the performance of their testing and measurements</li>
          <li>Assure laboratory competence and confidence in results</li>
        </ul>

        <h2 style={{ marginTop: 48 }}>Related documents</h2>
        <p>
          The following documents relate to the accreditation of proficiency testing providers.
        </p>
        <ul className="doc-list">
          {DOCS.map((d) => (
            <li key={d.ttl}>
              <span className="ico"><Icon name="doc" size={18} /></span>
              <div>
                <div className="ttl">{d.ttl}</div>
                <div className="meta">{d.meta}</div>
              </div>
              <a href={d.href} className="dl">
                Download <Icon name="download" size={12} />
              </a>
            </li>
          ))}
        </ul>

        <h2 style={{ marginTop: 48 }}>Apply for accreditation</h2>
        <p>
          You can apply for accreditation today — download the application form to begin, or
          request a quote from our team.
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={APPLY_URL} className="btn btn-primary">
            Apply Now <Icon name="arrow" size={14} className="arrow" />
          </a>
          <Link href="/quote" className="btn btn-ghost">Request a Quote</Link>
        </div>

        <h2 style={{ marginTop: 56 }}>Related programs</h2>
        <ul className="bullets">
          <li>
            <Link href="/programs/iso-17025" className="ed-link">
              Testing &amp; Calibration Laboratories (ISO/IEC 17025)
            </Link>
          </li>
          <li>
            <Link href="/programs/iso-15189" className="ed-link">
              Medical Laboratories (ISO 15189)
            </Link>
          </li>
        </ul>
      </PageBody>
      <CTA />
    </>
  );
}
