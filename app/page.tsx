import Hero from "./_components/home/Hero";
import Intro from "./_components/home/Intro";
import TrustBar from "./_components/home/TrustBar";
import Programs from "./_components/home/Programs";
import Stats from "./_components/home/Stats";
import Why from "./_components/home/Why";
import CaseStudies from "./_components/home/CaseStudies";
import Insights from "./_components/home/Insights";
import Partners from "./_components/home/Partners";
import WorldMap from "./_components/WorldMap";
import CTA from "./_components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <TrustBar />
      <Programs />
      <Stats />
      <WorldMap />
      <Why />
      <CaseStudies />
      <Insights />
      <Partners />
      <CTA />
    </>
  );
}
