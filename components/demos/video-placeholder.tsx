export function VideoPlaceholder({ title }: { title: string }) {
  return (
    <div className="relative flex aspect-[160/81] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-line-strong bg-elevated/70 p-8 text-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(201,162,39,0.12),transparent_60%)]"
      />

      <div className="relative">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-line-strong bg-surface text-muted">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
          </svg>
        </span>
        <p className="mt-4 font-serif text-xl text-ink">
          Walkthrough in production
        </p>
        <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-muted">
          We&apos;re recording a short demo of the {title}. Check back soon.
        </p>
        <span className="mt-4 inline-flex rounded-full border border-line-strong px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-soft">
          Video coming soon
        </span>
      </div>
    </div>
  );
}
