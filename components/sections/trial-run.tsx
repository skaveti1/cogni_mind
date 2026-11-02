import type { CSSProperties } from "react";
import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { ReplayConsole } from "@/components/graphics/replay-console";
import { trialRun } from "@/lib/content";

export function TrialRun() {
  return (
    <Scene id="trial-run" tone="solid" className="scene-trial">
      <div className="max-w-5xl">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>{trialRun.eyebrow}</Eyebrow>
            <SectionTitle>{trialRun.title}</SectionTitle>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
              {trialRun.body}
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-6 grid grid-cols-2 gap-2.5 lg:grid-cols-5">
          {trialRun.steps.map((step, index) => {
            const dark = index === trialRun.steps.length - 1;

            return (
              <div
                key={step.title}
                className={`stagger-item flex flex-col rounded-2xl border p-4 ${
                  dark
                    ? "col-span-2 border-forest bg-forest text-white lg:col-span-1"
                    : "border-line bg-surface shadow-[0_1px_2px_rgba(26,24,21,0.04),0_18px_40px_-24px_rgba(26,24,21,0.18)]"
                }`}
                style={{ "--i": index } as CSSProperties}
              >
                <h3
                  className={`font-sans text-sm font-bold ${
                    dark ? "text-white" : "text-ink"
                  }`}
                >
                  {step.title}.
                </h3>
                <p
                  className={`mt-1.5 text-[0.82rem] leading-relaxed ${
                    dark ? "text-white/65" : "text-muted"
                  }`}
                >
                  {step.body}
                </p>
              </div>
            );
          })}
        </Stagger>

        <Reveal delay={100} direction="none">
          <ReplayConsole replay={trialRun.replay} />
        </Reveal>
      </div>
    </Scene>
  );
}
