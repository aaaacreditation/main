import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";

export const metadata: Metadata = { title: "National & International Partnership" };

const PARTNERS = [
  { name: "ILAC", scope: "International Laboratory Accreditation Cooperation", region: "Global" },
  { name: "IAF", scope: "International Accreditation Forum", region: "Global" },
  { name: "GAFTA", scope: "Sector-specific recognition arrangement", region: "Global" },
  { name: "Commonwealth of Virginia", scope: "Authorizing authority", region: "United States" },
  { name: "GCC Quality Council", scope: "Regional recognition", region: "GCC" },
  { name: "ASEAN CAB Forum", scope: "Conformity assessment alignment", region: "Southeast Asia" },
  { name: "Pan-African Accreditation Forum", scope: "Regional recognition", region: "Africa" },
  { name: "Latin-American Accreditation Network", scope: "Sector network", region: "LATAM" },
  { name: "European AB Liaison Group", scope: "Technical liaison", region: "Europe" },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title={<>National & international <em>partnerships.</em></>}
        intro="AAA's accreditations travel because of the partnerships behind them — multilateral arrangements, sector networks, and authorizing authorities."
        crumbs={[{ label: "Partnerships" }]}
        meta={[
          { k: "Recognition arrangements", v: "9 active" },
          { k: "Operating jurisdictions", v: "60+ countries" },
        ]}
      />
      <section className="block">
        <div className="container">
          <div className="block-head reveal">
            <div>
              <span className="eyebrow">Active partnerships</span>
              <h2 className="section-heading">The arrangements that make AAA accreditation portable.</h2>
            </div>
          </div>
          <div className="dir-grid">
            {PARTNERS.map((p) => (
              <div className="dir-card reveal" key={p.name}>
                <div className="name">{p.name}</div>
                <div className="scope">{p.scope}</div>
                <div className="tags"><span className="std-pill light">{p.region}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
