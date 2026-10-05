import type { CSSProperties } from "react";
import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { LogoMarquee } from "@/components/graphics/logo-marquee";
import { brands, whyUs } from "@/lib/content";

export function WhyUs() {
  return (
    <Scene id="why-us" tone="solid">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow index="02">{whyUs.eyebrow}</Eyebrow>
          <SectionTitle>{whyUs.title}</SectionTitle>
        </div>
      </Reveal>

      <Stagger className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.cards.map((card, index) => (
          <div
            key={card.title}
            className="stagger-item"
            style={{ "--i": index } as CSSProperties}
          >
            <div aria-hidden="true" className="h-0.5 w-full bg-gold" />
            <h3 className="mt-5 font-sans text-xl font-bold text-ink">
              {card.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {card.body}
            </p>
          </div>
        ))}
      </Stagger>

      <Reveal delay={80} className="mt-16">
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
          Our Background
        </p>
        <div className="mt-5">
          <LogoMarquee brands={brands.items} />
        </div>
      </Reveal>
    </Scene>
  );
}
