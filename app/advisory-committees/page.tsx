import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";

export const metadata: Metadata = { title: "Advisory Technical Committees" };

const COMMITTEES = [
  {
    name: "Healthcare Technical Committee",
    scope: "ISO 15189 medical laboratories, hospital and clinic accreditation",
    chair: "Dr. Amal Rashid",
    members: 11,
  },
  {
    name: "Laboratory Technical Committee",
    scope: "ISO/IEC 17025 testing & calibration laboratories, ISO/IEC 17043 PT providers",
    chair: "James Caldwell",
    members: 13,
  },
  {
    name: "Inspection & Certification Committee",
    scope: "ISO/IEC 17020 inspection, 17021-1 systems, 17065 product certification",
    chair: "Marco Venturelli",
    members: 12,
  },
  {
    name: "Personnel & Training Committee",
    scope: "ISO/IEC 17024 personnel certification, ASTM E-2659 training providers",
    chair: "Dr. Ifeoma Okeke",
    members: 9,
  },
  {
    name: "Impartiality Committee",
    scope: "Cross-program safeguarding, complaints procedure, conflict-of-interest review",
    chair: "Aiyana Brooks",
    members: 7,
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title={<>Advisory <em>technical committees.</em></>}
        intro="Independent expert committees provide the technical guidance behind every AAA program — convened from industry, academia, and regulatory backgrounds."
        crumbs={[{ label: "Advisory Committees" }]}
        meta={[
          { k: "Active committees", v: "5" },
          { k: "External members", v: "52 total" },
        ]}
      />
      <section className="block">
        <div className="container">
          <div className="block-head reveal">
            <div>
              <span className="eyebrow">Active committees</span>
              <h2 className="section-heading">Standing committees that govern AAA programs.</h2>
            </div>
          </div>

          <div className="dir-grid">
            {COMMITTEES.map((c) => (
              <div className="dir-card reveal" key={c.name}>
                <div className="name">{c.name}</div>
                <div className="scope">{c.scope}</div>
                <div className="tags">
                  <span className="std-pill light">Chair · {c.chair}</span>
                  <span className="std-pill light">{c.members} members</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
