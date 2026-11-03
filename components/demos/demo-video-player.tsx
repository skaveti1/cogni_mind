"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function DemoVideoPlayer({
  src,
  title,
  duration,
  poster,
  captions,
  compact = false,
  playOnView = false,
}: {
  src: string;
  title: string;
  duration?: string;
  poster?: string;
  captions?: string;
  compact?: boolean;
  playOnView?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!playOnView || reducedMotion) return;

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        video.muted = true;
        video.play().catch(() => {
          if (!cancelled) setAutoplayFailed(true);
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(container);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [playOnView, reducedMotion]);

  const start = () => {
    setStarted(true);
    videoRef.current?.play().catch(() => {
      // If playback is blocked, the native controls are still available.
    });
  };

  const showOverlay =
    !started && (!playOnView || reducedMotion || autoplayFailed);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-none bg-forest shadow-[0_24px_50px_-32px_rgba(26,24,21,0.35)] ${
        compact ? "aspect-[16/9]" : "aspect-[160/81]"
      }`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload={playOnView ? "metadata" : "none"}
        playsInline
        muted={playOnView}
        controls={started}
        onPlay={() => setStarted(true)}
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

      {showOverlay ? (
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

          {!compact ? (
            <span className="relative flex w-fit items-center gap-2 rounded-full border border-white/15 bg-forest/55 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Cognimind demo
            </span>
          ) : null}

          <span className="relative flex flex-1 items-center justify-center">
            <span
              className={`flex items-center justify-center rounded-full bg-white text-forest shadow-[0_10px_30px_rgba(0,0,0,0.28)] ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 ${
                compact ? "h-14 w-14" : "h-16 w-16"
              }`}
            >
              <svg
                width={compact ? "18" : "20"}
                height={compact ? "18" : "20"}
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
              {!compact ? (
                <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/55">
                  Watch the walkthrough
                </span>
              ) : null}
              <span
                className={`block font-serif leading-snug text-white ${
                  compact ? "text-lg" : "mt-1 text-xl"
                }`}
              >
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
