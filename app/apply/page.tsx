import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import JsonLd from "../_components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import ApplyForm from "./ApplyForm";
import { FACTS } from "@/lib/facts";
import "./apply.css";

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "Apply for AAA Accreditation",
    description:
      "Apply for AAA accreditation: tell us who is applying and what you want accredited, and an AAA advisor will confirm the right program and application form.",
    path: "/apply",
  });
}

const CONSULT = "https://calendly.com/accreditationaaa/consultation-call-am";

export default function Page() {
  return (
    <div className="axp apx">
      <JsonLd
        schema={[breadcrumbSchema([{ name: "Apply", path: "/apply" }])]}
      />

      {/* 01 — Hero */}
      <PageHero
        image="/about/assessment.jpg"
        eyebrow="Apply"
        badge={false}
        title={
          <>
            Apply for <em>accreditation.</em>
          </>
        }
        intro="Tell us who is applying and what you want accredited. An advisor will confirm the correct program, send the right application form, and list the documents to prepare."
        crumbs={[{ label: "Apply" }]}
        meta={[
          { k: "Assessors & Experts", v: FACTS.assessors },
          { k: "Certificate validity", v: `${FACTS.cycleYears} years` },
          { k: "Countries served", v: String(FACTS.countries) },
          { k: "Accredited organizations", v: "200+" },
        ]}
        caption={{
          kicker: "AAA assessment team",
          title: "On-site assessment against the applicable international standard",
          chip: "Stage 03",
        }}
      />

      {/* 02 — Start your application (overlaps the hero) */}
      <section className="apx-start" id="start">
        <div className="container">
          <div className="apx-card reveal">
            <div className="apx-card-copy">
              <span className="eyebrow">Start here</span>
              <h2>Start your application</h2>
              <ul className="apx-card-points">
                <li>
                  <span>
                    Start Your Accreditation Application – Get a Free,{" "}
                    <span style={{ whiteSpace: "nowrap" }}>No-Obligation</span> Quote
                  </span>
                </li>
                <li>Confirms which program and standard applies to you</li>
                <li>Reply within two business days</li>
                <li>You receive the correct application form and document checklist</li>
              </ul>
              <p className="apx-card-aside">
                Prefer to talk it through first?{" "}
                <a href={CONSULT} target="_blank" rel="noopener noreferrer">
                  Book a 30-minute consultation
                </a>
                .
              </p>
            </div>
            <ApplyForm />
          </div>
        </div>
      </section>
    </div>
  );
}
