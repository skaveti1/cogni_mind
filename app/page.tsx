import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CleanRecord } from "@/components/sections/clean-record";
import { Pilot } from "@/components/sections/pilot";
import { Problem } from "@/components/sections/problem";
import { CaseStudy } from "@/components/sections/case-study";
import { WhyUs } from "@/components/sections/why-us";
import { Team } from "@/components/sections/team";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <CleanRecord />
      <Pilot />
      <Problem />
      <CaseStudy />
      <WhyUs />
      <Team />
      <Contact />
    </>
  );
}
