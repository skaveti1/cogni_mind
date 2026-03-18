'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, FileSpreadsheet, Mail, Phone, ClipboardList, Bot, Zap, CheckCircle2, BarChart2 } from 'lucide-react';

const pairs = [
  {
    before: { icon: FileSpreadsheet, label: 'Spreadsheet tracking',    color: '#ef4444' },
    after:  { icon: BarChart2,       label: 'Live AI dashboards',       color: '#34d399' },
  },
  {
    before: { icon: Mail,            label: 'Email approval chains',    color: '#f97316' },
    after:  { icon: Zap,             label: 'Instant auto-approvals',   color: '#34d399' },
  },
  {
    before: { icon: Phone,           label: 'Call-based handoffs',      color: '#ef4444' },
    after:  { icon: Bot,             label: 'Agentic AI workflows',     color: '#22d3ee' },
  },
  {
    before: { icon: ClipboardList,   label: 'Manual data entry',        color: '#f97316' },
    after:  { icon: CheckCircle2,    label: 'AI document parsing',      color: '#34d399' },
  },
];

export default function HeroTransform() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % pairs.length);
        setFade(true);
      }, 280);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const { before, after } = pairs[idx];
  const BeforeIcon = before.icon;
  const AfterIcon  = after.icon;

  return (
    <div className="flex flex-col items-center gap-4 my-10">

      {/* Transformation ticker */}
      <div
        className="flex items-center gap-3 sm:gap-4"
        style={{
          opacity:    fade ? 1 : 0,
          transform:  fade ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.28s ease, transform 0.28s ease',
        }}
      >
        {/* Before card */}
        <div
          className="flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-semibold"
          style={{
            background:   `${before.color}08`,
            borderColor:  `${before.color}30`,
            color:        '#94a3b8',
          }}
        >
          <BeforeIcon className="w-4 h-4 shrink-0" style={{ color: before.color }} />
          <span>{before.label}</span>
        </div>

        {/* Arrow with animated flow dots */}
        <div className="relative flex items-center shrink-0" style={{ width: 64 }}>
          {/* Track line */}
          <div className="w-full h-px bg-gradient-to-r from-red-500/30 via-brand/60 to-cyan-400/30" />
          {/* Animated dot */}
          <div
            className="absolute w-2 h-2 rounded-full bg-brand"
            style={{
              left: 0,
              boxShadow: '0 0 6px #34d399',
              animation: 'hero-dot 1.3s linear infinite',
            }}
          />
          <ArrowRight
            className="absolute -right-0.5 w-3 h-3 text-brand"
            style={{ filter: 'drop-shadow(0 0 4px #34d399)' }}
          />
        </div>

        {/* After card */}
        <div
          className="flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-semibold"
          style={{
            background:  `${after.color}10`,
            borderColor: `${after.color}35`,
            color:       after.color,
          }}
        >
          <AfterIcon className="w-4 h-4 shrink-0" />
          <span>{after.label}</span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {pairs.map((_, i) => (
          <button
            key={i}
            onClick={() => { setFade(false); setTimeout(() => { setIdx(i); setFade(true); }, 280); }}
            className="rounded-full transition-all"
            style={{
              width:      i === idx ? 20 : 6,
              height:     6,
              background: i === idx ? '#34d399' : '#26263a',
            }}
            aria-label={`Show pair ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes hero-dot {
          0%   { left: 0;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: calc(100% - 8px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
