import type { CSSProperties } from "react";
import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { cleanRecord } from "@/lib/content";

function Check() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CleanRecord() {
  return (
    <Scene id="one-clean-record" tone="solid">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow index="02">{cleanRecord.eyebrow}</Eyebrow>
          <SectionTitle>{cleanRecord.title}</SectionTitle>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {cleanRecord.lead}
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1.05fr_auto_1fr]">
        <Stagger className="space-y-3">
          {cleanRecord.records.map((record, index) => (
            <div
              key={record.number}
              className="stagger-item rounded-xl border border-line bg-surface p-4"
              style={{ "--i": index } as CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  {record.company}
                </span>
                <span className="font-mono text-xs text-ink-soft">
                  {record.number}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="text-sm text-ink">{record.name}</span>
                <span className="text-sm text-muted">{record.price}</span>
              </div>
            </div>
          ))}
        </Stagger>

        <div aria-hidden="true" className="hidden justify-center lg:flex">
          <svg
            width="44"
            height="24"
            viewBox="0 0 44 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <path d="M2 12h34M29 5l7 7-7 7" />
          </svg>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-accent/40 bg-accent-soft p-5">
            <div className="flex items-center gap-2 text-accent">
              <Check />
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em]">
                Clean record
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-mono text-xs text-ink-soft">
                {cleanRecord.record.number}
              </span>
              <span className="text-xs text-accent">
                {cleanRecord.record.price}
              </span>
            </div>
            <p className="mt-1 text-base text-ink">{cleanRecord.record.name}</p>
          </div>

          <div className="rounded-xl border border-amber/40 bg-amber-soft p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-amber">
              {cleanRecord.review.label}
            </p>
            <ul className="mt-3 space-y-2">
              {cleanRecord.review.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Reveal delay={120}>
        <p className="mt-12 max-w-3xl text-sm italic leading-relaxed text-muted">
          {cleanRecord.note}
        </p>
      </Reveal>
    </Scene>
  );
}
