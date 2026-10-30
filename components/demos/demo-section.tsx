import type { DemoVideo } from "@/lib/demo-videos";
import { DemoVideoPlayer } from "./demo-video-player";
import { VideoPlaceholder } from "./video-placeholder";

export function DemoSection({
  demo,
  index,
}: {
  demo: DemoVideo;
  index: number;
}) {
  const isLive = demo.status === "live" && Boolean(demo.videoSrc);
  const flip = index % 2 === 1;

  return (
    <section
      id={demo.slug}
      className="grid scroll-mt-24 gap-6 border-t border-line pt-10 first:border-t-0 first:pt-0 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10"
    >
      <div
        className={`order-2 ${flip ? "lg:order-2" : "lg:order-1"}`}
      >
        {isLive && demo.videoSrc ? (
          <DemoVideoPlayer
            src={demo.videoSrc}
            title={demo.name}
            duration={demo.duration}
            poster={demo.poster}
            captions={demo.captions}
          />
        ) : (
          <VideoPlaceholder title={demo.name} />
        )}
      </div>

      <div
        className={`order-1 ${flip ? "lg:order-1" : "lg:order-2"}`}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full border border-line-strong px-2 font-mono text-[0.65rem] tracking-[0.1em] text-ink-soft">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">
            {isLive ? "Watch the demo" : "Coming soon"}
          </span>
        </div>

        <h2 className="mt-4 font-serif text-[1.75rem] leading-[1.12] tracking-[-0.01em] text-ink sm:text-3xl">
          {demo.name}
        </h2>
        <p className="mt-2 font-serif text-lg italic leading-snug text-ink-soft">
          {demo.tagline}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {demo.description}
        </p>

        {demo.highlights?.length ? (
          <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
            {demo.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 text-sm leading-relaxed text-ink-soft"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                />
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
