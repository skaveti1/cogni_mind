import { Hero } from "@/components/sections/hero";
import { Receiving } from "@/components/sections/receiving";
import { HowItWorks } from "@/components/sections/how-it-works";
import { TrialRun } from "@/components/sections/trial-run";
import { WhyUs } from "@/components/sections/why-us";
import { CaseStudy } from "@/components/sections/case-study";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Receiving />
      <HowItWorks />
      <TrialRun />
      <WhyUs />
      <CaseStudy />
      <Contact />
    </>
  );
}
