import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../_components/PageHero";
import PageBody from "../../_components/PageBody";
import Icon from "../../_components/Icon";
import CTA from "../../_components/CTA";

export const metadata: Metadata = {
  title: "Product Certification Bodies Accreditation (ISO/IEC 17065 & Halal)",
  description:
    "AAA accredits product certification bodies under ISO/IEC 17065 and Halal certification bodies under OIC/SMIIC 2, S 2055-2:2021, and GSO 2055-2:2021.",
};

const APPLY_URL =
  "https://aaa-accreditation.org/wp-content/uploads/2023/03/Application-form-system_product-certfication-Bodies.doc";

const HALAL_APPLY_URL =
  "https://aaa-accreditation.org/wp-content/uploads/2023/07/Application-form-Halal-certfication-Bodies-2.doc";

const DOCS = [
  {
    ttl: "Application form for accreditation of system/product certification body",
    meta: "DOC",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-system_product-certfication-Bodies.doc",
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
            Product Certification Bodies <em>Accreditation.</em>
          </>
        }
        intro="Product certification demonstrates that a product, process, or service meets the set requirements of established international schemes."
        crumbs={[
          { href: "/programs/healthcare", label: "Programs" },
          { label: "Product Certification Bodies" },
        ]}
        meta={[
          { k: "Anchor standard", v: "ISO/IEC 17065" },
          { k: "Halal schemes", v: "OIC/SMIIC 2 · S 2055-2 · GSO 2055-2" },
        ]}
      />
      <PageBody label="Program overview">
        <h2>About the program</h2>
        <p>
          Product certification demonstrates that a product, process, or service meets the set
          requirements of established international schemes. Accreditation requirements are
          specified in <strong>ISO/IEC 17065</strong> — Conformity assessment — Requirements for
          bodies certifying products, processes and services.
        </p>
        <p>
          Owners of product certification schemes include industry associations, regulatory
          authorities, and conformity assessment bodies. These owners can apply to AAA for
          either public or private schemes.
        </p>

        <h2 style={{ marginTop: 48 }}>Related documents</h2>
        <p>
          The following documents relate to the accreditation of product certification bodies.
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

        <h2 style={{ marginTop: 56 }}>Halal accreditation</h2>
        <p>
          AAA provides accreditation to Halal certification bodies in different fields in
          accordance with internationally and regionally recognized accreditation standards and
          schemes.
        </p>
        <p>
          AAA operates Halal accreditation for certification bodies that certify products and
          services as halal according to the following requirements:
        </p>
        <ul className="bullets">
          <li>
            <strong>OIC/SMIIC 2</strong> — Conformity Assessment Bodies — Requirements for
            Bodies Providing Halal Certification
          </li>
          <li>
            <strong>S 2055-2:2021</strong> — General Requirements for Halal Certification Bodies
          </li>
          <li>
            <strong>GSO 2055-2:2021</strong> — Halal Products — Part 2: General Requirements for
            Halal Certification Bodies
          </li>
        </ul>
        <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={HALAL_APPLY_URL} className="btn btn-primary">
            Apply for Halal Accreditation <Icon name="arrow" size={14} className="arrow" />
          </a>
        </div>

        <h2 style={{ marginTop: 56 }}>Related programs</h2>
        <ul className="bullets">
          <li>
            <Link href="/programs/iso-17021" className="ed-link">
              System Certification Bodies (ISO/IEC 17021-1)
            </Link>
          </li>
          <li>
            <Link href="/programs/iso-17020" className="ed-link">
              Inspection Bodies (ISO/IEC 17020)
            </Link>
          </li>
        </ul>
      </PageBody>
      <CTA />
    </>
  );
}
