const phases = [
  {
    label: 'Phase I',
    weeks: 'Weeks 1–8',
    title: 'System Audit',
    description: 'Map workflows, identify labor drains, build ROI framework.',
    deliverable: 'Technical Systems Blueprint + OpEx impact model',
  },
  {
    label: 'Phase II',
    weeks: 'Weeks 9–16',
    title: 'Architecture Design',
    description: 'Design agentic systems, define integration points, specify tooling.',
    deliverable: 'Implementation-ready architecture specification',
  },
  {
    label: 'Phase III',
    weeks: 'Weeks 17–24',
    title: 'Implementation Oversight',
    description:
      'We partner with your team — or bring ours — to implement and ensure architecture integrity.',
    deliverable: 'Live AI systems with measurable P&L impact',
  },
];

export default function Roadmap() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">The Engagement</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            We recommend a Six Month Roadmap
          </h2>
          <p className="text-slate-400 text-lg">
            From Manual Mess to AI-Automated Systems, with full implementation oversight.
          </p>
        </div>

        <div className="space-y-4">
          {phases.map((phase, i) => (
            <div
              key={phase.label}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-8 hover:border-brand/30 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-brand font-black text-sm underline underline-offset-4">
                  {phase.label}
                </span>
                <span className="text-slate-400 font-semibold text-sm">{phase.weeks}:</span>
                <span className="text-white font-black text-lg">{phase.title}</span>
                <span className="ml-auto text-xs text-brand font-bold uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full">
                  Phase {i + 1} of 3
                </span>
              </div>
              <p className="text-slate-300 mb-4">{phase.description}</p>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-slate-500 font-semibold italic shrink-0">Deliverable:</span>
                <span className="text-slate-400 italic">{phase.deliverable}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing callout */}
        <div className="mt-8 bg-brand/10 border border-brand/30 rounded-2xl p-6 text-center">
          <p className="text-brand text-2xl font-black">6-Month Engagement: $15,000/month</p>
          <p className="text-slate-400 text-sm mt-1">
            100% principal attention · Custom-built for your workflows · End-to-end ownership
          </p>
        </div>
      </div>
    </section>
  );
}
