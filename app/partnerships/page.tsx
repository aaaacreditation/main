import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import WorldMap from "../_components/WorldMap";
import CTA from "../_components/CTA";

export const metadata: Metadata = {
  title: "National & International Partnership",
  description:
    "AAA's international network — partnerships and memberships with ISQua, UNESCO, AAACE, CONIES, the Earth Day Network, and AGCAS across healthcare quality, education, and the environment.",
};

const PARTNERS = [
  {
    name: "ISQua — International Society for Quality in Health Care",
    scope:
      "AAA is a member of the International Society for Quality in Health Care (ISQua), which has been working to improve the quality and safety of health care worldwide for over 30 years through education, knowledge sharing, external evaluation, supporting health systems worldwide and connecting like-minded people through health care networks. ISQua's members are continually working towards quality improvement in health care around the world.",
    tag: "Healthcare Quality",
  },
  {
    name: "UNESCO — United Nations Educational, Scientific and Cultural Organization",
    scope:
      "AAA is a partner with UNESCO by supporting the Institute for Lifelong Learning — the key education-related institute and the only organizational unit in the UN family that holds a global mandate for lifelong learning — taking a holistic, integrated, inter-sectoral and cross-sectoral approach to lifelong learning as the guiding paradigm for 21st century education.",
    tag: "Lifelong Learning",
  },
  {
    name: "American Association for Adult and Continuing Education (AAACE)",
    scope:
      "AAA is an active member of AAACE, dedicated to providing leadership for the field of adult and continuing education by expanding opportunities for adult growth and development; the dissemination of theory, research, information, and best practices; promoting identity and standards for the profession; and advocating relevant public policy and social change initiatives. AAACE was founded as the result of a merger between the National Association for Public and Continuing Adult Education (NAPCAE) and the Adult Education Association (AEA) in 1982.",
    tag: "Adult Education",
  },
  {
    name: "International Confederation of Higher Education (CONIES)",
    scope:
      "AAA signed an Agreement for International collaboration and recognition in the area of Accreditation and Certification of Education Institutions with the Council on International Higher Education Supervision (CONIES), recognized by The International Network for Quality Assurance Agencies in Higher Education (INQAAHE). The mission of CONIES: a voluntary, non-governmental, membership association dedicated to quality assurance certification and programme validation through accreditation via peer evaluation.",
    tag: "Higher Education",
  },
  {
    name: "Earth Day Network",
    scope:
      "AAA is a full member of the Earth Day organization, the world's largest organization, working with more than 150,000 partners in over 192 countries. The mission is to diversify, educate and activate the environmental movement worldwide.",
    tag: "Environment",
  },
  {
    name: "Association of Graduate Careers Advisory Services (AGCAS)",
    scope:
      "AAA is a member of AGCAS, the expert membership organisation for higher education student career development and graduate employment professionals that support the best possible career outcomes from higher education for individuals, institutions, society and the economy.",
    tag: "Graduate Careers",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="International Network"
        title={<>National &amp; international <em>partnerships.</em></>}
        intro="AAA's international network spans memberships and partnerships with leading organizations in healthcare quality, lifelong learning, adult and higher education, graduate careers, and the environment."
        crumbs={[{ label: "National & International Partnership" }]}
        meta={[
          { k: "Partner organizations", v: "6 active" },
          { k: "Fields", v: "Healthcare · Education · Environment" },
        ]}
      />
      <section className="block">
        <div className="container">
          <div className="block-head reveal">
            <div>
              <span className="eyebrow">Our partners</span>
              <h2 className="section-heading">National / international partners.</h2>
            </div>
          </div>
          <div className="dir-grid">
            {PARTNERS.map((p) => (
              <div className="dir-card reveal" key={p.name}>
                <div className="name">{p.name}</div>
                <div className="scope">{p.scope}</div>
                <div className="tags"><span className="std-pill light">{p.tag}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WorldMap eyebrow="Where we work" />
      <CTA />
    </>
  );
}
