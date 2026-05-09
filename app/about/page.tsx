import type { Metadata } from "next";
import AboutHero from "../_components/about/AboutHero";
import AboutMission from "../_components/about/AboutMission";
import AboutPillars from "../_components/about/AboutPillars";
import AboutTimeline from "../_components/about/AboutTimeline";
import AboutLeadership from "../_components/about/AboutLeadership";
import AboutImpartiality from "../_components/about/AboutImpartiality";
import AboutRecognition from "../_components/about/AboutRecognition";
import CTA from "../_components/CTA";

export const metadata: Metadata = {
  title: "About AAA",
  description:
    "An independent accreditation body authorized by the Commonwealth of Virginia, USA, delivering ISO/IEC-aligned programs across more than sixty countries.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutPillars />
      <AboutTimeline />
      <AboutLeadership />
      <AboutImpartiality />
      <AboutRecognition />
      <CTA />
    </>
  );
}
