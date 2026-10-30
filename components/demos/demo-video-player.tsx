"use client";

import { useRef, useState } from "react";

export function DemoVideoPlayer({
  src,
  title,
  duration,
  poster,
  captions,
}: {
  src: string;
  title: string;
  duration?: string;
  poster?: string;
  captions?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    videoRef.current?.play().catch(() => {
      // If autoplay is blocked, the native controls are still available.
    });
  };

  return (
    <div className="relative aspect-[160/81] overflow-hidden rounded-2xl border border-line-strong bg-forest shadow-[0_1px_2px_rgba(26,24,21,0.24),0_30px_70px_-34px_rgba(26,24,21,0.55)]">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        controls={started}
        aria-label={`${title} walkthrough`}
        className="h-full w-full bg-forest object-cover"
      >
        {captions ? (
          <track
            kind="captions"
            src={captions}
            srcLang="en"
            label="English"
          />
        ) : null}
      </video>

      {!started ? (
        <button
          type="button"
          onClick={start}
          aria-label={`Play ${title} walkthrough`}
          className="group absolute inset-0 flex flex-col justify-between overflow-hidden p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(201,162,39,0.18),transparent_45%)]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,15,0.16)_0%,rgba(20,18,15,0.08)_40%,rgba(20,18,15,0.88)_100%)]"
          />

          <span className="relative flex w-fit items-center gap-2 rounded-full border border-white/15 bg-forest/55 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Cognimind demo
          </span>

          <span className="relative flex flex-1 items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-transform duration-300 group-hover:scale-105 group-hover:border-white/50">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
            </span>
          </span>

          <span className="relative flex items-end justify-between gap-4">
            <span className="min-w-0">
              <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/55">
                Watch the walkthrough
              </span>
              <span className="mt-1 block font-serif text-xl leading-snug text-white">
                {title}
              </span>
            </span>
            {duration ? (
              <span className="shrink-0 rounded-full border border-white/25 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/80">
                {duration}
              </span>
            ) : null}
          </span>
        </button>
      ) : null}
    </div>
  );
}
