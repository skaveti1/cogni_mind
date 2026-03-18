'use client';

import { useEffect, useState } from 'react';
import {
  FileText,
  Mail,
  Phone,
  Calculator,
  GitBranch,
  Database,
  Zap,
  CheckCircle2,
  Bot,
  BarChart2,
} from 'lucide-react';

const beforeItems = [
  { icon: FileText,   label: 'Manual data entry',     color: '#ef4444' },
  { icon: Mail,       label: 'Email handoffs',         color: '#f97316' },
  { icon: Phone,      label: 'Call-based approvals',   color: '#ef4444' },
  { icon: Calculator, label: 'Spreadsheet tracking',  color: '#f97316' },
];

const afterItems = [
  { icon: Bot,        label: 'AI document parsing',   color: '#34d399' },
  { icon: Zap,        label: 'Auto-triggered actions', color: '#22d3ee' },
  { icon: CheckCircle2, label: 'Instant approvals',   color: '#34d399' },
  { icon: BarChart2,  label: 'Live dashboards',        color: '#22d3ee' },
];

const PARTICLE_COUNT = 6;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => i);

export default function WorkflowAnimation() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % beforeItems.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">The Transformation</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Your workflows.{' '}
            <span className="text-gradient">Reimagined.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Every manual step becomes an automated signal. Every bottleneck becomes a data point.
          </p>
        </div>

        {/* Animation grid */}
        <div className="grid grid-cols-[1fr_80px_1fr] md:grid-cols-[1fr_120px_1fr] gap-0 items-center">

          {/* ── BEFORE column ── */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-5">Before</p>
            {beforeItems.map(({ icon: Icon, label, color }, i) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500"
                style={{
                  borderColor: active === i ? `${color}40` : 'rgba(255,255,255,0.06)',
                  background: active === i ? `${color}10` : 'rgba(255,255,255,0.02)',
                  opacity: active === i ? 1 : 0.45,
                  transform: active === i ? 'translateX(4px)' : 'none',
                }}
              >
                <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                <span className="text-sm text-slate-300 font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* ── CENTER pipeline ── */}
          <div className="flex flex-col items-center justify-center relative h-64 select-none">
            {/* Vertical track */}
            <div
              className="absolute w-px bg-gradient-to-b from-red-500/20 via-brand/40 to-cyan-400/20"
              style={{ top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
            />

            {/* Animated particles */}
            {particles.map((i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  left: 'calc(50% - 3px)',
                  bottom: 0,
                  background: i % 2 === 0 ? '#34d399' : '#22d3ee',
                  boxShadow: `0 0 6px ${i % 2 === 0 ? '#34d399' : '#22d3ee'}`,
                  animation: `flow-particle ${2 + (i * 0.45)}s ${i * 0.35}s linear infinite`,
                }}
              />
            ))}

            {/* CM badge */}
            <div
              className="relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-full bg-slate-900 border-2 border-brand flex items-center justify-center animate-float-badge"
              style={{ boxShadow: '0 0 20px rgba(52,211,153,0.35)' }}
            >
              <GitBranch className="w-4 h-4 md:w-5 md:h-5 text-brand" />
            </div>

            {/* Labels */}
            <span className="absolute top-1 text-[9px] font-bold uppercase tracking-widest text-red-400">Manual</span>
            <span className="absolute bottom-1 text-[9px] font-bold uppercase tracking-widest text-brand">AI</span>
          </div>

          {/* ── AFTER column ── */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-5 text-right">After</p>
            {afterItems.map(({ icon: Icon, label, color }, i) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border justify-end transition-all duration-500"
                style={{
                  borderColor: active === i ? `${color}40` : 'rgba(255,255,255,0.06)',
                  background: active === i ? `${color}10` : 'rgba(255,255,255,0.02)',
                  opacity: active === i ? 1 : 0.45,
                  transform: active === i ? 'translateX(-4px)' : 'none',
                }}
              >
                <span className="text-sm text-slate-300 font-medium">{label}</span>
                <Icon className="w-4 h-4 shrink-0" style={{ color }} />
              </div>
            ))}
          </div>
        </div>

        {/* Results bar */}
        <div className="mt-14 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { value: '31%',   label: 'Less manual work' },
            { value: '$2.5M', label: 'Cost savings' },
            { value: '6mo',   label: 'Full deployment' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="text-center py-5 px-4 rounded-2xl border border-brand/20 bg-brand/5"
            >
              <p className="text-2xl md:text-3xl font-black text-brand mb-1">{value}</p>
              <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">{label}</p>
            </div>
          ))}
        </div>

        {/* Bottom data layer bar */}
        <div className="mt-10 flex items-center gap-3 max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-xl px-5 py-3">
          <Database className="w-4 h-4 text-brand shrink-0" />
          <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand to-cyan-400"
              style={{ width: '73%', transition: 'width 1.5s ease' }}
            />
          </div>
          <span className="text-xs text-slate-400 font-semibold tabular-nums">73% automated</span>
        </div>
      </div>
    </section>
  );
}
