import type { Metadata } from "next";
import Link from "next/link";
import {
  Button,
  Container,
  Eyebrow,
  Scene,
  SectionTitle,
} from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { DemoSection } from "@/components/demos/demo-section";
import { demoVideos } from "@/lib/demo-videos";

export const metadata: Metadata = {
  title: "Demos",
  description:
    "Short walkthroughs of Cognimind AI agents doing real work inside manufacturing and distribution workflows.",
  alternates: { canonical: "/demos" },
  openGraph: {
    type: "website",
    url: "/demos",
    title: "Cognimind demos",
    description:
      "Short walkthroughs of Cognimind AI agents doing real work inside manufacturing and distribution workflows.",
  },
};

export default function DemosPage() {
  const liveCount = demoVideos.filter((demo) => demo.status === "live").length;

  return (
    <>
      <Scene id="top" tone="solid" className="scene-compact">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <Reveal direction="none">
              <Eyebrow>Demos</Eyebrow>
            </Reveal>
            <Reveal>
              <SectionTitle>See the agents do the work.</SectionTitle>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
                Short walkthroughs of Cognimind AI agents inside real
                manufacturing and distribution workflows. No slideware — just
                the product, the inputs, and the output.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#plm">Watch the PLM demo</Button>
                <Button href="/#contact" variant="secondary">
                  Get in touch
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="hidden lg:block">
            <Reveal direction="right" delay={120}>
              <div className="rounded-2xl border border-line bg-surface p-2 shadow-[0_1px_2px_rgba(26,24,21,0.04),0_18px_40px_-24px_rgba(26,24,21,0.22)]">
                <div className="flex items-center justify-between px-3 pb-2 pt-3">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                    On this page
                  </p>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">
                    {liveCount} live
                  </p>
                </div>
                <ul>
                  {demoVideos.map((demo, index) => (
                    <li key={demo.slug}>
                      <a
                        href={`#${demo.slug}`}
                        className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                      >
                        <span className="mt-0.5 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full border border-line-strong px-1.5 font-mono text-[0.58rem] tracking-[0.08em] text-ink-soft">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.82rem] font-medium leading-snug text-ink">
                            {demo.name}
                          </span>
                          <span className="mt-0.5 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">
                            {demo.status === "live"
                              ? `Watch · ${demo.duration}`
                              : "Video coming soon"}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                            demo.status === "live"
                              ? "bg-gold"
                              : "bg-line-strong"
                          }`}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Scene>

      <Scene tone="raised" className="scene-tight">
        <div className="space-y-10 lg:space-y-14">
          {demoVideos.map((demo, index) => (
            <DemoSection key={demo.slug} demo={demo} index={index} />
          ))}
        </div>
      </Scene>

      <section className="border-t border-forest-line bg-forest py-14 text-white md:py-16">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/40">
                Start with one workflow
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-[1.1] tracking-[-0.01em] text-white sm:text-4xl">
                Want to see this on your data?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/65">
                We&apos;ll walk one workflow with you and tell you if it&apos;s
                worth building. No commitment, no deck at the end.
              </p>
            </div>
            <Link
              href="/#contact"
              className="btn-shift inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-forest transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
            >
              Get in touch
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
          </div>
        </Container>
      </section>
    </>
  );
}
