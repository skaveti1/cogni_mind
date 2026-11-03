import { Hero } from "@/components/sections/hero";
import { TrialRun } from "@/components/sections/trial-run";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyUs } from "@/components/sections/why-us";
import { CaseStudy } from "@/components/sections/case-study";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrialRun />
      <HowItWorks />
      <WhyUs />
      <CaseStudy />
      <Contact />
    </>
  );
}
