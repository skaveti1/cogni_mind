import type { CSSProperties } from "react";
import { Button, Scene } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { CountUp } from "@/components/motion/count-up";
import { hero } from "@/lib/content";

function splitStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { number: null as number | null, suffix: value };
  return { number: Number(match[1]), suffix: match[2] };
}

export function Hero() {
  return (
    <Scene id="top" tone="solid" className="scene-hero">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal direction="none">
          <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-soft">
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            {hero.eyebrow}
          </p>
        </Reveal>

        <Reveal>
          <h1 className="mt-4 font-serif text-[2.15rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl md:text-[2.9rem]">
            {hero.title}
          </h1>
        </Reveal>

        <Reveal delay={80}>
          <p className="mx-auto mt-3 font-serif text-lg italic leading-snug text-ink-soft sm:text-lg">
            {hero.statement}
          </p>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-2 max-w-xl text-[0.9rem] leading-relaxed text-muted sm:text-[0.95rem]">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button href="#contact">Get in touch</Button>
            <Button href="#case-study" variant="secondary">
              See the case study
            </Button>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <ul className="mt-4 flex flex-wrap justify-center gap-2.5">
            {hero.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full bg-surface px-4 py-1 text-xs font-medium text-ink-soft ring-1 ring-line"
              >
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Stagger className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 md:mt-8">
        {hero.stats.map((stat, index) => {
          const { number, suffix } = splitStat(stat.value);
          return (
            <div
              key={stat.label}
              className="stagger-item bg-surface px-8 py-4 text-center md:py-5"
              style={{ "--i": index } as CSSProperties}
            >
              <dt className="font-serif text-4xl text-ink">
                {number === null ? (
                  stat.value
                ) : (
                  <CountUp value={number} suffix={suffix} />
                )}
              </dt>
              <dd className="mt-1.5 text-sm text-muted">{stat.label}</dd>
            </div>
          );
        })}
      </Stagger>
    </Scene>
  );
}
