'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Bot, User, ArrowRight } from 'lucide-react';

type Role = 'user' | 'assistant';
interface Message {
  role: Role;
  content: string;
  cta?: { label: string; href: string };
}

// ── Pre-defined responses ──────────────────────────────────────────────────
const RESPONSES = {
  pricing:
    "Our engagement is **$15,000/month for 6 months**. That covers everything — system audit, AI architecture design, implementation oversight, and a full optimization phase. We've delivered $2.5M+ in client savings, so the ROI speaks for itself. Ready to see what's possible for your business?",

  services:
    "We help companies move from **manual, fragmented workflows to AI-automated systems** with measurable P&L impact. Specifically: (1) auditing every workflow across your departments, (2) designing agentic AI architectures, (3) overseeing implementation, and (4) tracking the cost savings. We make you AI-native — not just AI-curious.",

  process:
    "Our 3-phase process:\n\n🔍 **Phase 1 (Wks 1–8):** System Audit & Strategy — we map every workflow, identify AI opportunities, and build an ROI framework.\n\n⚙️ **Phase 2 (Wks 9–16):** Architecture & Build — we design and oversee your agentic AI systems.\n\n📈 **Phase 3 (Wks 17–24):** Optimization & Handoff — we measure P&L impact and deliver your complete AI playbook.",

  team:
    "Our team:\n\n**Shail Kaveti** — former Amazon & Wayfair Product Lead, Partner at TheFounderVC. Built global-scale AI personalization systems at Amazon.\n\n**Alex Gluck** — Meta FP&A Manager, former L.E.K. Consulting & Goldman Sachs. $225M closed at Mubadala GE Capital.\n\nCombined 40+ years of experience. MBA, Dartmouth (both).",

  results:
    "Our flagship case study: a **major seafood company** achieved:\n\n✓ 31% reduction in manual work\n✓ 5 departments audited (Procurement, Sales, Supply Chain, Finance, HR)\n✓ $2.5M in verified cost savings\n✓ Positioned as AI-native ahead of their next funding round\n\nAll delivered in a single 6-month engagement.",

  contact:
    "I'll notify the team that you're interested — we'll follow up within 24 hours! You can also book a System Audit directly on this page or email Shail at shail@cognimind.ai.",

  default:
    "Great question! I can tell you about our **services, pricing, process, team,** or **results**. Or if you're ready to explore what AI automation could do for your business, just say 'get in touch' and I'll connect you with the team.",
};

const QUICK_REPLIES = [
  { label: '💰 Pricing',      key: 'pricing'  },
  { label: '⚙️ Our Process',  key: 'process'  },
  { label: '📊 Case Study',   key: 'results'  },
  { label: '🤝 Get in Touch', key: 'contact'  },
];

function matchIntent(input: string): keyof typeof RESPONSES {
  const q = input.toLowerCase();
  if (/pric|cost|\$|fee|how much|invest|budget|expensive/.test(q))                             return 'pricing';
  if (/service|what.*do|offer|help|automat|workflow|ai system/.test(q))                        return 'services';
  if (/process|how.*work|phase|step|timeline|how long|week|month|duration/.test(q))           return 'process';
  if (/team|who|founder|shail|alex|people|behind|experience/.test(q))                         return 'team';
  if (/result|case|study|saving|outcome|proof|example|client|success/.test(q))                return 'results';
  if (/contact|get in touch|talk|meet|call|email|book|audit|schedule|interest|connect/.test(q)) return 'contact';
  return 'default';
}

const WELCOME: Message = {
  role: 'assistant',
  content: "Hi! I'm the Cogni Mind assistant. Ask me anything about our AI transformation services, or pick a topic below.",
};

// Render bold markdown (** **) as <strong>
function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span>
      {parts.map((p, i) =>
        i % 2 === 1 ? <strong key={i} className="text-white font-bold">{p}</strong> : p.split('\n').map((line, j, arr) => (
          <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
        ))
      )}
    </span>
  );
}

export default function Chatbot() {
  const [open,    setOpen]    = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input,   setInput]   = useState('');
  const [typing,  setTyping]  = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const respond = async (userText: string) => {
    const intent = matchIntent(userText);
    const responseText = RESPONSES[intent];

    // Fake typing delay (700–1100ms)
    const delay = 700 + Math.random() * 400;
    setTyping(true);
    await new Promise(r => setTimeout(r, delay));
    setTyping(false);

    const newMsg: Message = { role: 'assistant', content: responseText };

    // Contact intent — add CTA + fire notification email
    if (intent === 'contact') {
      newMsg.cta = { label: 'Book a System Audit', href: '#contact' };
      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      }).catch(() => {});
    }

    setMessages(prev => [...prev, newMsg]);
  };

  const send = (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || typing) return;

    setInput('');
    setShowQuickReplies(false);
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    respond(userText);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ── Chat panel ── */}
      {open && (
        <div
          className="w-85 sm:w-95 bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-chat-slide"
          style={{ height: 500, boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(52,211,153,0.08)' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-950/80 shrink-0">
            <div
              className="w-8 h-8 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center"
              style={{ boxShadow: '0 0 10px rgba(52,211,153,0.2)' }}
            >
              <Bot className="w-4 h-4 text-brand" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm leading-none">Cogni Mind</p>
              <span className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" style={{ animation: 'pulse 2s ease infinite' }} />
                <p className="text-brand text-[10px] font-semibold">Online · Replies instantly</p>
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5
                  ${msg.role === 'assistant' ? 'bg-brand/10 border border-brand/30' : 'bg-slate-700'}
                `}>
                  {msg.role === 'assistant'
                    ? <Bot  className="w-3 h-3 text-brand" />
                    : <User className="w-3 h-3 text-slate-300" />
                  }
                </div>
                <div className="max-w-[82%] space-y-2">
                  <div className={`
                    px-3 py-2.5 rounded-xl text-sm leading-relaxed
                    ${msg.role === 'assistant'
                      ? 'bg-slate-800/80 text-slate-200 rounded-tl-none'
                      : 'bg-brand/15 text-white border border-brand/20 rounded-tr-none'
                    }
                  `}>
                    <RichText text={msg.content} />
                  </div>
                  {msg.cta && (
                    <a
                      href={msg.cta.href}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-brand hover:bg-brand-hover px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {msg.cta.label}
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex gap-2.5 items-start">
                <div className="w-6 h-6 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3 h-3 text-brand" />
                </div>
                <div className="bg-slate-800/80 px-3 py-2.5 rounded-xl rounded-tl-none">
                  <span className="flex gap-1 items-center h-4">
                    <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </span>
                </div>
              </div>
            )}

            {/* Quick replies */}
            {showQuickReplies && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map(({ label, key }) => (
                  <button
                    key={key}
                    onClick={() => send(label.replace(/^[^\s]+\s/, ''))} // strip emoji
                    className="text-xs px-3 py-1.5 rounded-full border border-slate-700 bg-slate-800/60 text-slate-300 hover:border-brand/40 hover:text-white transition-all"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-slate-800 bg-slate-950/60 shrink-0">
            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2 focus-within:border-brand/40 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about pricing, process, results…"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 outline-none"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || typing}
                className="w-7 h-7 rounded-lg bg-brand hover:bg-brand-hover disabled:opacity-40 flex items-center justify-center transition-all shrink-0"
              >
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-14 h-14 rounded-full bg-brand hover:bg-brand-hover text-slate-950 flex items-center justify-center shadow-lg transition-all animate-glow-pulse"
        aria-label="Open chat"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </div>
  );
}
