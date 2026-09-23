'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Wrench, TrendingUp } from 'lucide-react';

const pills = [
  { icon: CheckCircle2, text: 'Keep what works' },
  { icon: Wrench, text: "Fix what doesn't" },
  { icon: TrendingUp, text: 'Put AI where it pays' },
];

export default function HeroContent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const reveal = (delay: number) => ({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div className="text-center">
      <p
        className="text-brand text-xs font-bold uppercase tracking-[0.22em] mb-6"
        style={reveal(0)}
      >
        An AI co-worker for manufacturers
      </p>

      <h1
        className="max-w-5xl mx-auto text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05]"
        style={{ fontFamily: "var(--font-orbitron, 'Orbitron', monospace)" }}
      >
        <span className="block text-white" style={reveal(0.12)}>
          It takes the busywork.
        </span>
        <span
          className="block text-gradient"
          style={{
            ...reveal(0.3),
            filter: show ? 'drop-shadow(0 0 18px rgba(52,211,153,0.2))' : 'none',
          }}
        >
          The decisions stay with your team.
        </span>
      </h1>

      <p
        className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-slate-400 leading-relaxed"
        style={reveal(0.48)}
      >
        Quotes out in hours, orders confirmed the same day, claims filed without the chase.{' '}
        <span className="text-white font-semibold">Same headcount.</span>
      </p>

      <div className="flex flex-wrap justify-center gap-2.5 mt-8">
        {pills.map(({ icon: Icon, text }, index) => (
          <span
            key={text}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700/70 bg-slate-900/80 text-slate-300 text-sm font-semibold hover:border-brand/30 hover:text-white transition-all"
            style={reveal(0.6 + index * 0.1)}
          >
            <Icon className="w-3.5 h-3.5 text-brand shrink-0" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
