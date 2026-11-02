import type { CSSProperties } from "react";
import type { TrialRunReplay } from "@/lib/content";

function ResultBadge({ result }: { result: string }) {
  const miss = result === "Miss";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[0.52rem] uppercase tracking-[0.12em] ${
        miss ? "bg-amber-soft text-amber" : "bg-accent-soft text-ink-soft"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${miss ? "bg-amber" : "bg-gold"}`}
      />
      {result}
    </span>
  );
}

export function ReplayConsole({ replay }: { replay: TrialRunReplay }) {
  return (
    <div className="replay-console mt-5 overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(26,24,21,0.04),0_18px_40px_-24px_rgba(26,24,21,0.22)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
          <p className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-ink-soft">
            {replay.label}
          </p>
        </div>
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">
          {replay.meta}
        </p>
      </div>

      <div className="px-4 py-3">
        <div className="hidden grid-cols-[1.2fr_1fr_1fr_0.8fr] gap-4 pb-1.5 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-muted sm:grid">
          {replay.columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </div>

        <div className="space-y-1.5">
          {replay.rows.map((row, index) => {
            const miss = row.result === "Miss";

            return (
              <div
                key={row.id}
                className={`replay-row ${
                  miss ? "replay-row-miss" : ""
                } grid grid-cols-2 gap-x-4 gap-y-1.5 rounded-xl border border-line bg-canvas/60 px-3.5 py-2 sm:grid-cols-[1.2fr_1fr_1fr_0.8fr] sm:items-center sm:gap-4`}
                style={{ "--i": index } as CSSProperties}
              >
                <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:block">
                  <div>
                    <span className="mb-0.5 block font-mono text-[0.5rem] uppercase tracking-[0.12em] text-muted sm:hidden">
                      Past work
                    </span>
                    <span className="font-mono text-xs text-ink">{row.id}</span>
                  </div>
                  <span className="sm:hidden">
                    <ResultBadge result={row.result} />
                  </span>
                </div>

                <div>
                  <span className="mb-0.5 block font-mono text-[0.5rem] uppercase tracking-[0.12em] text-muted sm:hidden">
                    Your team
                  </span>
                  <span className="text-sm text-ink-soft">{row.team}</span>
                </div>

                <div>
                  <span className="mb-0.5 block font-mono text-[0.5rem] uppercase tracking-[0.12em] text-muted sm:hidden">
                    Agent
                  </span>
                  <span className={`text-sm ${miss ? "text-amber" : "text-ink-soft"}`}>
                    {row.agent}
                  </span>
                </div>

                <div className="hidden sm:flex sm:justify-start">
                  <ResultBadge result={row.result} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="replay-note mt-2.5 border-t border-line pt-2.5">
          <p className="flex gap-2.5 text-sm leading-relaxed text-muted">
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
            />
            {replay.note}
          </p>
        </div>
      </div>
    </div>
  );
}
