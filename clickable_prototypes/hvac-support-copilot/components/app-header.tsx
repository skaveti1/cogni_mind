import { RotateCcw } from "lucide-react";
import { Brand } from "./brand";

export function AppHeader({ onReset }: { onReset: () => void }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-line bg-surface/90 px-4 py-3 backdrop-blur sm:px-5">
      <div className="flex items-center gap-3">
        <Brand />
        <span className="hidden h-6 w-px bg-line-strong sm:block" />
        <div className="hidden sm:block">
          <p className="text-[0.86rem] font-medium leading-none text-ink">
            HVAC Tech Support Copilot
          </p>
          <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
            Technical Support Console
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-soft">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-online/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-online" />
          </span>
          Online
        </span>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Demo
        </button>
      </div>
    </header>
  );
}
