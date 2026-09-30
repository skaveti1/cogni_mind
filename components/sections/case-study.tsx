import type { CSSProperties } from "react";
import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { SceneBackdrop } from "@/components/background/scene-backdrop";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { caseStudy } from "@/lib/content";

export function CaseStudy() {
  return (
    <Scene
      id="case-study"
      tone="media"
      backdrop={<SceneBackdrop src="/scenes/logistics.jpg" />}
    >
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow index="04">{caseStudy.eyebrow}</Eyebrow>
          <SectionTitle>{caseStudy.title}</SectionTitle>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {caseStudy.lead}
          </p>
        </div>
      </Reveal>

      <div className="band-card mt-10 max-w-4xl rounded-2xl p-8">
        <Stagger className="grid gap-10 md:grid-cols-2 md:gap-14">
          {caseStudy.sections.map((section, index) => (
            <div
              key={section.label}
              className="stagger-item border-t border-line pt-7"
              style={{ "--i": index } as CSSProperties}
            >
              <h3 className="font-serif text-2xl text-ink">{section.label}</h3>
              <ul className="mt-6 space-y-4">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3.5 text-[0.95rem] leading-relaxed text-ink-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Stagger>

        <p className="mt-10 border-t border-line pt-6 text-sm italic leading-relaxed text-muted">
          {caseStudy.disclaimer}
        </p>
      </div>
    </Scene>
  );
}
