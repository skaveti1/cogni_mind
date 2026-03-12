import {
  ArrowRight,
  BarChart2,
  Target,
  Rocket,
  TrendingDown,
  X,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import Roadmap from '@/components/Roadmap';
import Comparison from '@/components/Comparison';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-brand/30 selection:text-brand">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(52,211,153,0.08),transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

        <div className="max-w-5xl mx-auto text-center relative z-10">

          {/* Mission statement */}
          <p className="text-brand text-2xl md:text-3xl font-black mb-3 tracking-tight">
            We automate your workflows.
          </p>
          <p className="text-slate-500 text-base md:text-lg font-medium mb-8">
            Reduce manual work. Slash OpEx. Build AI systems that actually stick.
          </p>

          <h1 className="text-6xl md:text-[88px] font-black tracking-tight mb-6 leading-[0.92]">
            From Manual Mess<br />
            <span className="text-gradient">to AI‑Automated</span><br />
            Systems.
          </h1>

          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            We don&apos;t hand you a strategy deck and disappear. We architect your AI
            transformation — and stay to ensure{' '}
            <span className="text-white font-semibold">measurable P&L impact.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <button className="group bg-brand hover:bg-brand-hover text-slate-950 font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2">
              Start Your System Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold py-4 px-8 rounded-xl transition-all">
              See the Case Study
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand" /> 40+ years combined experience
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand" /> Amazon · Meta · L.E.K. · Goldman Sachs alumni
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand" /> $2.5M+ client savings delivered
            </span>
          </div>
        </div>
      </section>

      {/* ── METRICS BAR ───────────────────────────────────────── */}
      <section className="py-10 border-y border-slate-800 bg-slate-950">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '31%', label: 'Reduction in Manual Work' },
            { value: '$2.5M', label: 'Client Cost Savings' },
            { value: '$15K/mo', label: '6-Month Engagement' },
            { value: '40+', label: 'Years Combined Exp.' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl md:text-4xl font-black text-brand mb-1 tabular-nums">{value}</p>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE AI IMPERATIVE ─────────────────────────────────── */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">The AI Imperative</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Three things every business<br />needs to get right.
            </h2>
            <p className="text-slate-400 max-w-xl">
              The gap between AI-native and AI-curious comes down to execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <BarChart2 className="w-6 h-6 text-brand" />,
                title: 'Optimize',
                sub: 'Automate workflows, reduce costs, and improve customer management across every department.',
              },
              {
                icon: <Target className="w-6 h-6 text-brand" />,
                title: 'Strategize',
                sub: 'Develop the strategy that will enable your company to become AI-native, not just AI-curious.',
              },
              {
                icon: <Rocket className="w-6 h-6 text-brand" />,
                title: 'Leverage',
                sub: 'Ensure AI usage and adoption across the entire organization so it sticks.',
              },
            ].map(({ icon, title, sub }) => (
              <div
                key={title}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-brand/30 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center mb-6 group-hover:bg-brand/20 transition-colors">
                  {icon}
                </div>
                <h3 className="text-2xl font-black text-brand mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-lg font-semibold italic mt-12">
            We help you get there.
          </p>
        </div>
      </section>

      {/* ── THE IMPLEMENTATION TRAP ───────────────────────────── */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 text-center">
            <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-3">The Problem</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">The Implementation Trap</h2>
            <p className="text-xl text-slate-400">Why AI spending rarely translates to P&L impact.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-2xl border border-red-900/30 p-8">
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                Companies chase AI hype…
              </div>
              <ul className="space-y-4">
                {[
                  'Buying tools before mapping workflows',
                  'Implementing without ROI frameworks to measure P&L impact',
                  'Fragmented adoption with no unified data strategy',
                  'Investing in AI wrappers with no defensible moat',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-slate-300 text-sm">
                    <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-orange-900/30 p-8">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                But the results disappoint…
              </div>
              <ul className="space-y-4">
                {[
                  "Fragmented point solutions that don't integrate",
                  'AI spending with no visibility into operational impact',
                  "Labor costs unchanged despite 'automation'",
                  'Proprietary data exposed without guardrails',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-slate-300 text-sm">
                    <TrendingDown className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ────────────────────────────────────────── */}
      <section className="py-24 bg-slate-900" id="case-study">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <Building2 className="w-5 h-5 text-brand" />
            <p className="text-brand text-xs font-bold uppercase tracking-widest">Case Study</p>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-brand/20 overflow-hidden">
            <div className="bg-brand/5 border-b border-brand/20 px-8 md:px-10 py-8">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                Reducing Manual Work by{' '}
                <span className="text-brand">31%</span> at a Major Seafood Company
              </h2>
              <p className="text-slate-400">
                Resulting in{' '}
                <span className="text-white font-semibold">$2.5M in cost savings</span>
              </p>
            </div>

            <div className="px-8 md:px-10 py-8 grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">What We Did</h3>
                <ul className="space-y-4">
                  {[
                    { bold: '31% reduction', text: 'in manual work across procurement and sales' },
                    { bold: '5 departments audited:', text: 'Procurement, Sales, Supply Chain, Finance, and HR' },
                    { bold: '6-month roadmap', text: 'delivered integrating into Salesforce' },
                    { bold: 'Agentic workflow architecture', text: 'designed for the engineering team to execute' },
                  ].map(({ bold, text }) => (
                    <li key={text} className="flex gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">{bold}</strong> {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">The Outcome</h3>
                <ul className="space-y-4">
                  {[
                    'Productized workflows and investor pitch to Accel, Tiger Global, and other Tier 1 VCs',
                    '$2.5M in verified cost savings through AI-automated workflows',
                    'Company positioned as AI-native ahead of next funding round',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ───────────────────────────────────────────── */}
      <Roadmap />

      {/* ── COMPARISON ────────────────────────────────────────── */}
      <Comparison />

      {/* ── TEAM ──────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">The Team</p>
            <h2 className="text-4xl font-black tracking-tight">Operators. Not just advisors.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Shail */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-black text-base flex-shrink-0">
                  SK
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Shail Kaveti</h3>
                  <p className="text-brand text-sm font-semibold mt-0.5">
                    Partner, TheFounderVC · Former Amazon & Wayfair Product Lead
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Built global-scale AI personalization systems from scratch at Amazon and Wayfair',
                  'Product Lead: Growth strategy, monetization platforms (BILL, Amazon)',
                  'Quantitative trading systems at Susquehanna and Bank of America',
                  'MBA, Dartmouth · BS, Mathematics & CS (Drexel)',
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-slate-400 text-sm">
                    <span className="text-brand mt-1 flex-shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Alex */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-black text-base flex-shrink-0">
                  AG
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Alex Gluck</h3>
                  <p className="text-brand text-sm font-semibold mt-0.5">
                    Marketing FP&A Manager, Meta · Former L.E.K. Consulting
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Meta FP&A Manager · PepsiCo Sr. Manager, Sales Finance & Beverage Strategy',
                  'Senior Consultant, L.E.K.: Due diligence & growth strategy across healthcare, PE, consumer',
                  '$225M closed (97.5% approval rate) at Mubadala GE Capital',
                  'MBA, Dartmouth · Former JPMorgan, Goldman Sachs',
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-slate-400 text-sm">
                    <span className="text-brand mt-1 flex-shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-28 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(52,211,153,0.07),transparent)]" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <p className="text-brand text-xs font-bold uppercase tracking-widest mb-5">Ready to start?</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[0.95]">
            We design the blueprint.<br />Your team executes it.
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            6-month engagement · $15,000/month · Measurable P&L impact or we haven&apos;t done our job.
          </p>
          <button className="group bg-brand hover:bg-brand-hover text-slate-950 font-black py-5 px-10 rounded-xl transition-all text-lg flex items-center justify-center gap-3 mx-auto">
            Book a System Audit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

    </main>
  );
}
