import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

type SceneTone = "solid" | "raised" | "atmospheric" | "media" | "accent";

export function Scene({
  id,
  tone = "solid",
  stack = false,
  backdrop,
  className = "",
  innerClassName = "",
  children,
}: {
  id?: string;
  tone?: SceneTone;
  stack?: boolean;
  backdrop?: ReactNode;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scene scene-${tone} ${stack ? "scene-stack" : ""} ${className}`}
    >
      {backdrop}
      <Container className={`relative z-10 ${innerClassName}`}>
        {children}
      </Container>
    </section>
  );
}

export function SceneCard({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface p-8 shadow-[0_1px_2px_rgba(26,24,21,0.04),0_18px_40px_-24px_rgba(26,24,21,0.22)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  index,
  className = "mb-5",
}: {
  children: ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <div className={`${className} flex items-center gap-3`}>
      {index ? (
        <span className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full border border-line-strong px-2 font-mono text-[0.65rem] tracking-[0.1em] text-ink-soft">
          {index}
        </span>
      ) : (
        <span className="h-px w-6 bg-accent/50" aria-hidden="true" />
      )}
      <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-accent">
        {children}
      </p>
    </div>
  );
}

export function SectionTitle({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      className={`font-serif text-[2rem] leading-[1.1] tracking-[-0.01em] text-ink sm:text-4xl md:text-[2.6rem] ${className}`}
    >
      {children}
    </h2>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "btn-shift inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";
  const variants = {
    primary: "bg-accent text-canvas hover:bg-accent-hover",
    secondary:
      "border border-line-strong bg-transparent text-ink hover:bg-elevated",
  } as const;

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export function Stat({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="font-serif text-4xl text-ink md:text-5xl">{value}</div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{label}</p>
    </div>
  );
}
