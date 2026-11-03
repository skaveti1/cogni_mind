"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const DURATION = 850;
const TICK = 68;
const SETTLE_BASE = 210;
const SETTLE_STEP = 44;

export function ScrambleText({
  text,
  active,
}: {
  text: string;
  active: boolean;
}) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const shown = active && !reduced ? display : text;

  useEffect(() => {
    if (!active || reduced) {
      const reset = window.setTimeout(() => setDisplay(text), 0);
      return () => window.clearTimeout(reset);
    }

    const started = performance.now();
    let timer = 0;

    const tick = () => {
      const elapsed = performance.now() - started;
      const next = Array.from(text)
        .map((char, index) => {
          if (char === " " || index === 0) return char;
          if (elapsed >= SETTLE_BASE + index * SETTLE_STEP) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplay(next);

      if (elapsed < DURATION) {
        timer = window.setTimeout(tick, TICK);
      } else {
        setDisplay(text);
      }
    };

    timer = window.setTimeout(tick, 0);

    return () => window.clearTimeout(timer);
  }, [active, reduced, text]);

  return (
    <span aria-hidden="true" className="nav-flap inline-flex whitespace-pre">
      {Array.from(shown).map((char, index) => (
        <span key={`${index}-${char}`} className="nav-flap-char">
          {char}
        </span>
      ))}
    </span>
  );
}
