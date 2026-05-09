import Hero from "./_components/home/Hero";
import TrustBar from "./_components/home/TrustBar";
import Programs from "./_components/home/Programs";
import Stats from "./_components/home/Stats";
import Why from "./_components/home/Why";
import Insights from "./_components/home/Insights";
import Partners from "./_components/home/Partners";
import CTA from "./_components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Programs />
      <Stats />
      <Why />
      <Insights />
      <Partners />
      <CTA />
    </>
  );
}
