import type { CSSProperties } from "react";
import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { whyUs } from "@/lib/content";

function Check() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-accent"
      aria-hidden="true"
    >
      <path className="check-draw" pathLength={1} d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Dash() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="mt-0.5 shrink-0 text-line-strong"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

export function WhyUs() {
  return (
    <Scene id="why-us" tone="solid">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow index="06">{whyUs.eyebrow}</Eyebrow>
          <SectionTitle>{whyUs.title}</SectionTitle>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {whyUs.lead}
          </p>
        </div>
      </Reveal>

      <div className="mt-14 overflow-hidden rounded-2xl border border-line">
        <div className="hidden gap-px bg-line md:grid md:grid-cols-2">
          <div className="bg-accent px-7 py-5 text-center font-mono text-xs font-semibold uppercase tracking-[0.14em] text-canvas">
            {whyUs.columns.us}
          </div>
          <div className="bg-elevated px-7 py-5 text-center font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {whyUs.columns.them}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-line bg-elevated px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] font-medium md:hidden">
          <span className="flex items-center gap-1.5 text-ink">
            <span className="text-accent">
              <Check />
            </span>
            {whyUs.columns.us}
          </span>
          <span className="flex items-center gap-1.5 text-muted">
            <Dash />
            {whyUs.columns.them}
          </span>
        </div>

        <Stagger>
          {whyUs.rows.map((row, index) => (
            <div
              key={row.us}
              className="stagger-item grid grid-cols-1 gap-px border-t border-line bg-line md:grid-cols-2"
              style={{ "--i": index } as CSSProperties}
            >
              <div className="flex items-start gap-3 bg-surface px-5 py-5 text-sm leading-relaxed text-ink md:px-7 md:py-6">
                <Check />
                {row.us}
              </div>
              <div className="flex items-start gap-3 bg-elevated px-5 py-5 text-sm leading-relaxed text-muted md:px-7 md:py-6">
                <Dash />
                {row.them}
              </div>
            </div>
          ))}
        </Stagger>
      </div>

      <Reveal delay={100}>
        <p className="mt-12 max-w-3xl font-serif text-2xl italic leading-snug text-ink md:text-[1.75rem]">
          &ldquo;{whyUs.quote}&rdquo;
        </p>
      </Reveal>
    </Scene>
  );
}
