import type { CSSProperties } from "react";
import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { SceneBackdrop } from "@/components/background/scene-backdrop";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { pilot } from "@/lib/content";

export function Pilot() {
  return (
    <Scene
      id="pilot"
      tone="media"
      backdrop={<SceneBackdrop src="/scenes/inventory.jpg" />}
    >
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow index="03">{pilot.eyebrow}</Eyebrow>
          <SectionTitle>{pilot.title}</SectionTitle>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {pilot.lead}
          </p>
        </div>
      </Reveal>

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pilot.steps.map((step, index) => (
          <div
            key={step.title}
            className="stagger-item band-card rounded-2xl p-6"
            style={{ "--i": index } as CSSProperties}
          >
            <h3 className="font-serif text-xl text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {step.body}
            </p>
          </div>
        ))}
      </Stagger>

      <Reveal delay={100}>
        <p className="mt-8 font-serif text-xl italic text-ink-soft">
          {pilot.outcome}
        </p>
      </Reveal>

      <div className="band-card mt-14 rounded-2xl p-8">
        <h3 className="font-serif text-2xl text-ink">
          {pilot.engagementTitle}
        </h3>
        <Stagger className="mt-8 grid gap-8 md:grid-cols-3">
          {pilot.engagement.map((item, index) => (
            <div
              key={item.step}
              className="stagger-item"
              style={{ "--i": index } as CSSProperties}
            >
              <span className="font-mono text-xs tracking-[0.2em] text-accent">
                {item.step}
              </span>
              <h4 className="mt-3 font-serif text-lg text-ink">{item.title}</h4>
              {"price" in item && item.price ? (
                <p className="mt-1 font-serif text-2xl text-accent">
                  {item.price}
                </p>
              ) : null}
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </Stagger>
      </div>
    </Scene>
  );
}
