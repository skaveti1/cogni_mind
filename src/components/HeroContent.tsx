'use client';

import { useState, useEffect } from 'react';
import { TrendingDown, DollarSign, Cpu } from 'lucide-react';

const cyclingWords = ['workflows.', 'operations.', 'processes.', 'supply chains.'];

const pills = [
  { icon: TrendingDown, text: 'Reduce manual work' },
  { icon: DollarSign,   text: 'Slash OpEx'          },
  { icon: Cpu,          text: 'Build AI that sticks' },
];

export default function HeroContent() {
  const [wIdx, setWIdx] = useState(0);
  const [wOut, setWOut] = useState(false);
  const [show,   setShow]   = useState(false);
  const [strike, setStrike] = useState(false); // strikethrough drawn
  const [reveal, setReveal] = useState(false); // AI text scan reveals

  useEffect(() => {
    const t0 = setTimeout(() => setShow(true),   60);
    const t1 = setTimeout(() => setStrike(true), 900);  // strike after text arrives
    const t2 = setTimeout(() => setReveal(true), 1800); // reveal after strike done
    const t3 = setInterval(() => {
      setWOut(true);
      setTimeout(() => { setWIdx(i => (i + 1) % cyclingWords.length); setWOut(false); }, 320);
    }, 2800);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearInterval(t3); };
  }, []);

  const slide = (delay: number) => ({
    opacity:    show ? 1 : 0,
    transform:  show ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div className="text-center select-none">

      {/* ── Mission statement with cycling word ── */}
      <div style={slide(0)} className="mb-5 relative">
        <p className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
          <span className="text-white">We automate your </span>
          <span
            className="text-brand relative inline-block"
            style={{
              opacity:    wOut ? 0 : 1,
              transform:  wOut ? 'translateY(-10px)' : 'translateY(0)',
              transition: 'opacity 0.28s ease, transform 0.28s ease',
              textShadow: '0 0 28px rgba(52,211,153,0.45)',
            }}
          >
            {cyclingWords[wIdx]}
            <span
              className="absolute -right-3 top-0 bottom-0 w-0.5 bg-brand rounded-full"
              style={{ animation: 'blink-cursor 1s step-end infinite' }}
            />
          </span>
        </p>
      </div>

      {/* ── Value prop pills ── */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-14">
        {pills.map(({ icon: Icon, text }, i) => (
          <span
            key={text}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700/70 bg-slate-900/80 text-slate-300 text-sm font-semibold hover:border-brand/30 hover:text-white transition-all"
            style={{
              opacity:    show ? 1 : 0,
              transform:  show ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity 0.6s ease ${0.2 + i * 0.09}s, transform 0.6s ease ${0.2 + i * 0.09}s, border-color 0.2s, color 0.2s`,
            }}
          >
            <Icon className="w-3.5 h-3.5 text-brand shrink-0" />
            {text}
          </span>
        ))}
      </div>

      {/* ── Transformation Headline ── */}
      <div className="mb-10 relative">

        {/* Small label */}
        <p
          className="text-[10px] uppercase tracking-[0.22em] font-bold mb-5"
          style={{
            ...slide(0.3),
            color: 'rgba(148,163,184,0.5)',
          }}
        >
          The transformation
        </p>

        {/* MANUAL MESS — slides up, then gets struck through */}
        <div style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div
            className="relative inline-block"
            style={{
              transform:  show ? 'translateY(0)' : 'translateY(110%)',
              transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s',
            }}
          >
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none"
              style={{
                fontFamily: "var(--font-orbitron, 'Orbitron', monospace)",
                color: strike ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.75)',
                transition: 'color 0.4s ease 0.3s',
              }}
            >
              MANUAL MESS
            </h1>

            {/* Animated red strikethrough */}
            <div
              className="absolute top-1/2 left-0 h-0.75 rounded-full"
              style={{
                width:       strike ? '100%' : '0%',
                background:  'linear-gradient(90deg, #ef4444, #f97316)',
                boxShadow:   '0 0 10px rgba(239,68,68,0.7)',
                transform:   'translateY(-50%)',
                transition:  'width 0.75s cubic-bezier(0.4,0,0.2,1) 0.1s',
              }}
            />
          </div>
        </div>

        {/* AI-AUTOMATED — scan reveal left-to-right */}
        <div style={{ overflow: 'hidden', marginBottom: 0 }}>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none"
            style={{
              fontFamily: "var(--font-orbitron, 'Orbitron', monospace)",
              background:  'linear-gradient(90deg, #34d399, #22d3ee, #a5f3fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter:      reveal ? 'drop-shadow(0 0 18px rgba(52,211,153,0.45))' : 'none',
              clipPath:    reveal ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
              transition:  'clip-path 0.9s cubic-bezier(0.22,1,0.36,1), filter 1s ease 0.4s',
            }}
          >
            AI-AUTOMATED
          </h1>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-white"
            style={{
              fontFamily:  "var(--font-orbitron, 'Orbitron', monospace)",
              opacity:     reveal ? 1 : 0,
              transform:   reveal ? 'translateY(0)' : 'translateY(30%)',
              transition:  'opacity 0.5s ease 0.7s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.7s',
              letterSpacing: '0.02em',
            }}
          >
            SYSTEMS.
          </h1>
        </div>

        {/* Scan flash — a bright line that sweeps across at reveal moment */}
        <div
          className="absolute top-[55%] left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.8) 50%, transparent 100%)',
            opacity:     reveal ? 0 : 0,
            transform:   reveal ? 'translateX(110%)' : 'translateX(-110%)',
            transition:  reveal ? 'transform 0.8s ease, opacity 0.1s' : 'none',
          }}
        />
      </div>

      {/* ── Description ── */}
      <div style={slide(0.7)} className="mb-6 max-w-2xl mx-auto">
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
          We don&apos;t hand you a strategy deck and disappear.{' '}
          <span className="text-white font-semibold">
            We architect your AI transformation
          </span>{' '}
          — and stay to ensure{' '}
          <span
            className="font-bold"
            style={{
              background: 'linear-gradient(90deg,#34d399,#22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            measurable P&L impact.
          </span>
        </p>
      </div>

      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
