const phases = [
  {
    label: 'Phase I',
    weeks: 'Weeks 1–2',
    title: 'Walk the work',
    description: "We walk the workflow with you and score it on three things: what it's worth, whether your data supports it, and whether the team wants it changed.",
    deliverable: 'A build spec and a fixed price',
  },
  {
    label: 'Phase II',
    weeks: 'Weeks 3–10',
    title: 'Build and ship',
    description: 'One system, one job, tested on your real volume. Your people are involved from the first week.',
    deliverable: 'Software that is running, not a specification',
  },
  {
    label: 'Phase III',
    weeks: 'After that',
    title: 'The next one',
    description: 'The second build is faster and cheaper, because the parsing, integrations, and exception handling carry over.',
    deliverable: 'A workflow you keep, and a lower price on the next',
  },
];

export default function Roadmap() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">The Engagement</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            One workflow at a time
          </h2>
          <p className="text-slate-400 text-lg">
            You see working software every week. If it isn&apos;t worth building, we say so before we start.
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
      </div>
    </section>
  );
}
