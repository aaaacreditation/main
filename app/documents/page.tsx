import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import Icon from "../_components/Icon";
import CTA from "../_components/CTA";

export const metadata: Metadata = { title: "Documents" };

const DOCS = [
  { ttl: "AAA Safeguarding Impartiality Framework", meta: "PDF · 0.6 MB · 2026" },
  { ttl: "AAA Complaints & Appeals Procedure", meta: "PDF · 0.4 MB · 2026" },
  { ttl: "Code of Conduct for AAA Assessors", meta: "PDF · 0.3 MB · 2025" },
  { ttl: "Application Form — Healthcare Programs", meta: "PDF · 0.5 MB · 2026" },
  { ttl: "Application Form — Conformity Assessment Bodies", meta: "PDF · 0.5 MB · 2026" },
  { ttl: "Use of AAA Accreditation Mark", meta: "PDF · 0.4 MB · 2025" },
  { ttl: "Annual Transparency Report 2025", meta: "PDF · 1.2 MB · 2026" },
  { ttl: "Schedule of Fees", meta: "PDF · 0.2 MB · 2026" },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Documents"
        title={<>Public <em>document library.</em></>}
        intro="The AAA framework, procedures and application forms — published in full so anyone can read, audit, and rely on them."
        crumbs={[{ label: "Documents" }]}
        meta={[
          { k: "Total documents", v: "20+" },
          { k: "Last revision", v: "2026" },
        ]}
      />
      <section className="block">
        <div className="container">
          <ul className="doc-list">
            {DOCS.map((d) => (
              <li key={d.ttl} className="reveal">
                <span className="ico"><Icon name="doc" size={18} /></span>
                <div>
                  <div className="ttl">{d.ttl}</div>
                  <div className="meta">{d.meta}</div>
                </div>
                <a href="#" className="dl">
                  Download <Icon name="download" size={12} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTA />
    </>
  );
}
