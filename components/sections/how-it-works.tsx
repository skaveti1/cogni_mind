import type { CSSProperties } from "react";
import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { SceneBackdrop } from "@/components/background/scene-backdrop";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { howItWorks } from "@/lib/content";

export function HowItWorks() {
  return (
    <Scene
      id="how-it-works"
      tone="media"
      backdrop={<SceneBackdrop src="/scenes/how-it-works.jpg" />}
    >
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow index="01">{howItWorks.eyebrow}</Eyebrow>
          <SectionTitle>{howItWorks.title}</SectionTitle>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {howItWorks.lead}
          </p>
        </div>
      </Reveal>

      <div className="band-card mt-12 max-w-5xl rounded-2xl p-8">
        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, index) => (
            <div
              key={step.title}
              className="stagger-item"
              style={{ "--i": index } as CSSProperties}
            >
              <span className="font-mono text-xs tracking-[0.2em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          ))}
        </Stagger>

        <div className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-2">
          <div>
            <h3 className="font-serif text-lg text-ink">
              {howItWorks.learn.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {howItWorks.learn.body}
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-ink">
              {howItWorks.stays.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {howItWorks.stays.body}
            </p>
          </div>
        </div>
      </div>
    </Scene>
  );
}
