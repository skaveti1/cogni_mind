'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

type Field = 'name' | 'company' | 'email' | 'phone' | 'message';
type Status = 'idle' | 'loading' | 'success' | 'error';

const initialForm: Record<Field, string> = {
  name: '', company: '', email: '', phone: '', message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-14">
        <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-brand" />
        </div>
        <h3 className="text-2xl font-black text-white mb-2">Message received!</h3>
        <p className="text-slate-400 mb-6">We'll be in touch within 24 hours.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-brand text-sm font-semibold hover:underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass =
    'w-full bg-slate-800/50 border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-all';
  const labelClass = 'block text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Row 1: Name + Company */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name <span className="text-brand">*</span></label>
          <input
            type="text" name="name" required
            value={form.name} onChange={handleChange}
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Company <span className="text-brand">*</span></label>
          <input
            type="text" name="company" required
            value={form.company} onChange={handleChange}
            placeholder="Acme Corp"
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 2: Email + Phone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Work Email <span className="text-brand">*</span></label>
          <input
            type="email" name="email" required
            value={form.email} onChange={handleChange}
            placeholder="jane@company.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone <span className="text-slate-600">(optional)</span></label>
          <input
            type="tel" name="phone"
            value={form.phone} onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className={inputClass}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>What are you looking to solve?</label>
        <textarea
          name="message" rows={4}
          value={form.message} onChange={handleChange}
          placeholder="Tell us about your current workflows, pain points, or what you'd like to automate…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          Something went wrong. Email us directly at{' '}
          <a href="mailto:shail@cognimind.ai" className="underline">shail@cognimind.ai</a>
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full group bg-brand hover:bg-brand-hover disabled:opacity-60 text-slate-950 font-black py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
      >
        {status === 'loading' ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
        ) : (
          <>Book Your System Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
        )}
      </button>

      <p className="text-center text-slate-600 text-xs">
        We respond within 24 hours · No spam, ever.
      </p>
    </form>
  );
}
