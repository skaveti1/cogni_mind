import type { CSSProperties } from "react";
import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { SceneBackdrop } from "@/components/background/scene-backdrop";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { howItWorks } from "@/lib/content";

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-sm font-medium leading-relaxed text-white"
        >
          <span
            aria-hidden="true"
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function HowItWorks() {
  return (
    <Scene
      id="how-it-works"
      tone="media"
      backdrop={
        <>
          <SceneBackdrop src="/scenes/how-it-works.jpg" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[rgba(20,18,15,0.5)]"
          />
        </>
      }
    >
      <div className="max-w-5xl [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow index="01">{howItWorks.eyebrow}</Eyebrow>
            <SectionTitle>{howItWorks.title}</SectionTitle>
          </div>
        </Reveal>

        <div className="mt-10 grid border-t border-line-strong md:grid-cols-3 md:divide-x md:divide-line">
          {howItWorks.steps.map((step) => (
            <div
              key={step.title}
              className="flex items-baseline justify-between gap-6 border-b border-line py-3.5 last:border-b-0 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0"
            >
              <h3 className="font-serif text-lg font-medium text-white md:text-xl">
                {step.title}
              </h3>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/70">
                {step.tag}
              </span>
            </div>
          ))}
        </div>

        <div aria-hidden="true" className="h-1 w-full bg-ink" />

        <Stagger className="grid md:grid-cols-3 md:divide-x md:divide-line">
          {howItWorks.steps.map((step, index) => (
            <div
              key={step.title}
              className="stagger-item py-5 md:px-6 md:first:pl-0 md:last:pr-0"
              style={{ "--i": index } as CSSProperties}
            >
              <Bullets items={step.bullets} />
            </div>
          ))}
        </Stagger>

        <Reveal delay={80}>
          <p className="mt-4 max-w-3xl border-t border-line pt-6 font-serif text-base italic leading-snug text-white/90">
            {howItWorks.note}
          </p>
        </Reveal>
      </div>
    </Scene>
  );
}
