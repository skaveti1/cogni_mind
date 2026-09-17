import Image from 'next/image';
import {
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
import ContactForm from '@/components/ContactForm';
import WorkflowAnimation from '@/components/WorkflowAnimation';
import HeroContent from '@/components/HeroContent';
import HeroTransform from '@/components/HeroTransform';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-brand/30 selection:text-brand">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-28 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(52,211,153,0.08),transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

        <div className="max-w-5xl mx-auto relative z-10">
          <HeroContent />
          <HeroTransform />

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500 mt-10">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand" /> Operators, not advisors
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand" /> Amazon · Wayfair · Trane alumni
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand" /> 17 AI agents shipped in six months
            </span>
          </div>
        </div>
      </section>

      {/* ── METRICS BAR ───────────────────────────────────────── */}
      <section className="py-10 border-y border-slate-800 bg-slate-950">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { value: '17', label: 'AI agents and automations shipped' },
            { value: '5', label: 'Departments audited end to end' },
            { value: '6mo', label: 'Embedded with the client' },
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
              Most AI projects die<br />because nobody uses them.
            </h2>
            <p className="text-slate-400 max-w-xl">
              The software usually works. Getting people to use it is the hard part.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <BarChart2 className="w-6 h-6 text-brand" />,
                title: 'Pick one workflow',
                sub: 'We start where it costs you most, not where AI is easiest to demo.',
              },
              {
                icon: <Target className="w-6 h-6 text-brand" />,
                title: 'Build it into their day',
                sub: 'Nothing new to log into. It runs inside the tools your team already uses.',
              },
              {
                icon: <Rocket className="w-6 h-6 text-brand" />,
                title: "Stop what doesn't pay",
                sub: "Anything that isn't earning its keep, we stop. We'll tell you before you spend more.",
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

      {/* ── WORKFLOW ANIMATION ────────────────────────────────── */}
      <WorkflowAnimation />

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
                Six months inside a global food supply chain company
              </h2>
              <p className="text-slate-400">
                Embedded across North America, Europe and India
              </p>
            </div>

            <div className="px-8 md:px-10 py-8 grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">What We Did</h3>
                <ul className="space-y-4">
                  {[
                    'Audited workflows end to end across five departments: procurement, sales, supply chain, finance, and HR',
                    'Designed and shipped 17 AI agents and automations alongside their engineering team',
                    'Embedded them in the systems their teams already use, across sales, procurement, finance, and operations',
                    'Automated their monthly reporting and built a live view of the business for the CEO',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">The Outcome</h3>
                <ul className="space-y-4">
                  {[
                    'Still running and expanding across their entities today',
                    'The audit projected around a third of manual work could be automated, with seven-figure annual savings',
                    'Helped productize the workflows, which became part of their next funding conversation',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="md:col-span-2 text-xs text-slate-500 pt-2 border-t border-slate-800">
                Those savings figures are audit estimates, and we say so. Client agreements keep the name off this page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ───────────────────────────────────────────── */}
      <div id="how-it-works">
        <Roadmap />
      </div>

      {/* ── COMPARISON ────────────────────────────────────────── */}
      <div id="why-us">
        <Comparison />
      </div>

      {/* ── TEAM ──────────────────────────────────────────────── */}
      <section id="team" className="py-24 bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">The Team</p>
            <h2 className="text-4xl font-black tracking-tight">Operators. Not just advisors.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Shail */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-brand/20 shrink-0">
                  <Image
                    src="/shail-kaveti.jpg"
                    alt="Shail Kaveti"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Shail Kaveti</h3>
                  <p className="text-brand text-sm font-semibold mt-0.5">
                    Operator · Amazon Business, Wayfair, Bill.com
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Employee #3 at Amazon Business, building US and EU B2B operations',
                  "Built Wayfair's residential AC business from zero to roughly $50M",
                  'Months on warehouse floors at Amazon and Wayfair, receiving through shipping',
                  'MBA, Tuck at Dartmouth · BS/MS Computer Science, Drexel',
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

      {/* ── CONTACT ───────────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(52,211,153,0.06),transparent)]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — headline + trust signals */}
            <div className="lg:pt-4">
              <p className="text-brand text-xs font-bold uppercase tracking-widest mb-4">Ready to start?</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 leading-[0.95]">
                Let&apos;s start with<br />
                <span className="text-gradient">one workflow.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                We&apos;ll walk it with you, score it, and tell you if it&apos;s worth building. No commitment. No deck at the end.
              </p>

              {/* Trust bullets */}
              <ul className="space-y-4">
                {[
                  { stat: '17',  text: 'agents shipped in six months' },
                  { stat: '5',   text: 'departments audited end to end' },
                  { stat: '24h', text: 'response time' },
                ].map(({ stat, text }) => (
                  <li key={stat} className="flex items-center gap-4">
                    <span className="text-brand font-black text-xl tabular-nums w-14 shrink-0">{stat}</span>
                    <span className="text-slate-400 text-sm">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-slate-800">
                <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-3">Or email us directly</p>
                <a
                  href="mailto:shail@cognimind.ai"
                  className="text-brand font-semibold hover:underline underline-offset-4 text-sm"
                >
                  shail@cognimind.ai
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-lg font-black text-white mb-1">Tell us which workflow hurts most</h3>
              <p className="text-slate-500 text-sm mb-6">Tell us what you&apos;re working with — we&apos;ll take it from there.</p>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Cognimind. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <a href="mailto:shail@cognimind.ai" className="hover:text-brand transition-colors">
              shail@cognimind.ai
            </a>
            <span className="w-px h-3 bg-slate-800" />
            <a href="#contact" className="hover:text-brand transition-colors">
              Get in touch
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
