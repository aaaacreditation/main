import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../_components/PageHero";
import PageBody from "../../_components/PageBody";
import Icon from "../../_components/Icon";
import CTA from "../../_components/CTA";

export const metadata: Metadata = {
  title: "Medical Laboratories Accreditation (ISO 15189)",
  description:
    "AAA accredits public and private medical laboratories under ISO 15189 — improving the quality of service rendered to the patient and ensuring the reliability of results.",
};

const APPLY_URL =
  "https://aaa-accreditation.org/wp-content/uploads/2023/03/Application-form-for-accreditation-of-medical-labs.doc";

const DOCS = [
  {
    ttl: "Application form for accreditation of medical labs",
    meta: "DOC",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-for-accreditation-of-medical-labs.doc",
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
            Medical Laboratories <em>Accreditation.</em>
          </>
        }
        intro="Use of accreditation for medical examinations helps improve the quality of service rendered to the patient."
        crumbs={[
          { href: "/programs/healthcare", label: "Programs" },
          { label: "Medical Laboratories" },
        ]}
        meta={[
          { k: "Anchor standard", v: "ISO 15189" },
          { k: "Applies to", v: "Public & private medical laboratories" },
        ]}
      />
      <PageBody label="Program overview">
        <h2>About the program</h2>
        <p>
          Use of accreditation for medical examinations helps improve the quality of service
          rendered to the patient. Accreditation contributes to the efficiency of the healthcare
          system by ensuring the reliability of results.
        </p>
        <p>
          It concerns many medical-technical procedures used for the purposes of prevention,
          screening, and diagnosis. In this way, accreditation guarantees the harmonized and
          optimum quality of the biomedical examinations conducted throughout the country by
          public or private laboratories.
        </p>

        <h2 style={{ marginTop: 48 }}>Related documents</h2>
        <p>
          The following documents relate to the accreditation of medical laboratories.
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
            <Link href="/programs/healthcare" className="ed-link">
              Healthcare Accreditation
            </Link>
          </li>
          <li>
            <Link href="/programs/iso-17025" className="ed-link">
              Testing &amp; Calibration Laboratories (ISO/IEC 17025)
            </Link>
          </li>
        </ul>
      </PageBody>
      <CTA />
    </>
  );
}
