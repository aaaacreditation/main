import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";

export const metadata: Metadata = {
  title: "Advisory Technical Committees",
  description:
    "AAA's 12 Advisory Technical Committees provide advice on technical matters related to the development and operation of AAA accreditation activities, composed of experts representing all stakeholders.",
};

const COMMITTEES = [
  {
    num: 1,
    name: "Food & Environmental Testing Labs Committee",
    program: "Laboratories Accreditation",
  },
  {
    num: 2,
    name: "Material Testing Labs Committee",
    program: "Laboratories Accreditation",
  },
  {
    num: 3,
    name: "Medical Labs Committee",
    program: "Laboratories Accreditation",
  },
  {
    num: 4,
    name: "Calibration Labs Committee",
    program: "Laboratories Accreditation",
  },
  {
    num: 5,
    name: "Non Destructive Testing Committee",
    program: "Inspection Bodies Accreditation",
  },
  {
    num: 6,
    name: "Industrial Inspection Committee",
    program: "Inspection Bodies Accreditation",
  },
  {
    num: 7,
    name: "Personnel Certification Bodies Committee",
    program: "Personnel Certification Bodies Accreditation",
  },
  {
    num: 8,
    name: "Training Providers Accreditation Committee",
    program: "Training Providers Accreditation",
  },
  {
    num: 9,
    name: "QMS, OHSAS Committee",
    program: "System Certification Bodies Accreditation",
  },
  {
    num: 10,
    name: "FSMS Committee",
    program: "System Certification Bodies Accreditation",
  },
  {
    num: 11,
    name: "EMS & Energy Management System Committee",
    program: "System Certification Bodies Accreditation",
  },
  {
    num: 12,
    name: "Product Certification Bodies Committee",
    program: "Product Certification Bodies Accreditation",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="Governance"
        title={<>Advisory <em>technical committees.</em></>}
        intro="The role of the AAA Advisory Technical Committees is to provide advice on technical matters related to the development and operation of AAA accreditation activities. There are 12 committees covering the different programs of accreditation, composed of experts representing all the stakeholders — professional bodies, accredited organizations, customers, and regulatory bodies — in the related scope of accreditation."
        crumbs={[{ label: "Advisory Technical Committees" }]}
        meta={[
          { k: "Committees", v: "12" },
          { k: "Accreditation programs covered", v: "6" },
        ]}
      />
      <section className="block">
        <div className="container">
          <div className="block-head reveal">
            <div>
              <span className="eyebrow">Composition</span>
              <h2 className="section-heading">AAA Advisory Technical Committees composition.</h2>
              <p className="lede">
                The Advisory Technical Committees are also responsible for the formulation and
                review of the technical requirements in each scope of accreditation, and the
                identification of potential assessors and sources of assessors for the related
                accreditation program. &ldquo;International Accreditation &hellip; Accepted
                Globally.&rdquo;
              </p>
            </div>
          </div>

          <div className="dir-grid">
            {COMMITTEES.map((c) => (
              <div className="dir-card reveal" key={c.name}>
                <div className="name">{c.name}</div>
                <div className="scope">Accreditation program: {c.program}</div>
                <div className="tags">
                  <span className="std-pill light">Committee {c.num}</span>
                  <span className="std-pill light">{c.program}</span>
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
