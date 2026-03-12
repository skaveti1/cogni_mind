import { Check, X } from 'lucide-react';

const rows = [
  {
    us: '100% principal attention',
    them: 'Divided partner mindshare',
  },
  {
    us: 'Custom-built for your workflows',
    them: 'Cookie-cutter playbooks',
  },
  {
    us: '40+ combined years building systems, developing strategy and partnerships',
    them: 'Junior analysts learning on your dime',
  },
  {
    us: 'End-to-end: blueprint to implementation',
    them: 'Leave unclear follow-ups to ensure repeat business',
  },
];

export default function Comparison() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">Why Work With Us?</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            We design the blueprint<br />and help your team execute.
          </h2>
          <p className="text-slate-400">Your team retains the knowledge. We ensure it works.</p>
        </div>

        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-2">
            <div className="p-5 bg-brand text-slate-950 border-r border-brand/50">
              <p className="font-black text-sm uppercase tracking-widest">Cogni Mind</p>
            </div>
            <div className="p-5 bg-slate-800">
              <p className="font-bold text-sm uppercase tracking-widest text-slate-400">Traditional Consulting Firms</p>
            </div>
          </div>

          {/* Comparison rows */}
          {rows.map((row, i) => (
            <div
              key={row.us}
              className={`grid grid-cols-2 border-t border-slate-800 ${i % 2 !== 0 ? 'bg-slate-900/40' : ''}`}
            >
              <div className="p-5 flex items-start gap-3 border-r border-slate-800">
                <Check className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                <span className="text-slate-200 text-sm leading-relaxed">{row.us}</span>
              </div>
              <div className="p-5 flex items-start gap-3">
                <X className="w-4 h-4 text-red-500/60 mt-0.5 shrink-0" />
                <span className="text-slate-500 text-sm leading-relaxed">{row.them}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-300 font-black italic text-xl mt-10">
          We design the blueprint and help your team execute. Your team keeps the IP.
        </p>
      </div>
    </section>
  );
}
