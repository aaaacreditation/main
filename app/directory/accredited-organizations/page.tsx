import type { Metadata } from "next";
import PageHero from "../../_components/PageHero";
import CTA from "../../_components/CTA";

export const metadata: Metadata = { title: "Accredited Organizations" };

const ACCREDITED = [
  { name: "Meridian Health", scope: "Hospital · ISO 15189", country: "USA" },
  { name: "Northgate Labs", scope: "Testing & Calibration · ISO/IEC 17025", country: "Canada" },
  { name: "Apex Calibration", scope: "Calibration · ISO/IEC 17025", country: "UK" },
  { name: "Cedarwood Clinic", scope: "Clinic · Healthcare", country: "UAE" },
  { name: "Stanford Testing Co.", scope: "Testing · ISO/IEC 17025", country: "USA" },
  { name: "Riverbend Medical", scope: "Hospital · Healthcare", country: "Saudi Arabia" },
  { name: "Ironside Inspection", scope: "Inspection · ISO/IEC 17020", country: "Australia" },
  { name: "Pacific Standards", scope: "System Certification · ISO/IEC 17021-1", country: "Singapore" },
  { name: "Caldwell Institute", scope: "Personnel Certification · ISO/IEC 17024", country: "USA" },
  { name: "Veritas Assay", scope: "Testing · ISO/IEC 17025", country: "South Africa" },
  { name: "Beacon Conformity", scope: "Product Certification · ISO/IEC 17065", country: "Germany" },
  { name: "Helios Hospital Group", scope: "Hospital · Healthcare", country: "India" },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Directory"
        title={<>Accredited <em>organizations.</em></>}
        intro="A public register of organizations currently holding active AAA accreditation. Updated weekly."
        crumbs={[{ label: "Directory" }, { label: "Accredited Organizations" }]}
        meta={[
          { k: "Active records", v: "200+" },
          { k: "Last refresh", v: "Q1 2026" },
        ]}
      />
      <section className="block">
        <div className="container">
          <div className="dir-grid">
            {ACCREDITED.map((o) => (
              <div className="dir-card reveal" key={o.name}>
                <div className="name">{o.name}</div>
                <div className="scope">{o.scope}</div>
                <div className="tags"><span className="std-pill light">{o.country}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
