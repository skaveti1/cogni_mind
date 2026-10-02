import type { CSSProperties } from "react";
import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { SceneBackdrop } from "@/components/background/scene-backdrop";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { CountUp } from "@/components/motion/count-up";
import { caseStudy } from "@/lib/content";

function splitStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { number: null as number | null, suffix: value };
  return { number: Number(match[1]), suffix: match[2] };
}

export function CaseStudy() {
  return (
    <Scene
      id="case-study"
      tone="media"
      backdrop={
        <>
          <SceneBackdrop src="/scenes/logistics.jpg" />
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
            <Eyebrow index="03">{caseStudy.eyebrow}</Eyebrow>
            <SectionTitle>{caseStudy.title}</SectionTitle>
            <p className="mt-4 text-base leading-relaxed text-white/90">
              {caseStudy.lead}
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-8 grid gap-5 border-t border-line-strong sm:grid-cols-3">
          {caseStudy.stats.map((stat, index) => {
            const { number, suffix } = splitStat(stat.value);
            return (
              <div
                key={stat.label}
                className="stagger-item pt-5"
                style={{ "--i": index } as CSSProperties}
              >
                <p className="font-serif text-3xl text-white">
                  {number === null ? (
                    stat.value
                  ) : (
                    <CountUp value={number} suffix={suffix} />
                  )}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/80">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </Stagger>

        <Stagger className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
          {caseStudy.sections.map((section, index) => (
            <div
              key={section.label}
              className="stagger-item border-t border-line pt-5"
              style={{ "--i": index } as CSSProperties}
            >
              <h3 className="font-serif text-xl font-medium text-white">
                {section.label}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm font-medium leading-relaxed text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Stagger>

        <Reveal delay={100}>
          <p className="mt-6 border-t border-line pt-4 text-xs italic leading-relaxed text-white/80">
            {caseStudy.disclaimer}
          </p>
        </Reveal>
      </div>
    </Scene>
  );
}
