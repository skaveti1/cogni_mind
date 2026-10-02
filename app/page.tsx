import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyUs } from "@/components/sections/why-us";
import { CaseStudy } from "@/components/sections/case-study";
import { Team } from "@/components/sections/team";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyUs />
      <CaseStudy />
      <Team />
      <Contact />
    </>
  );
}
