import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Logo from "@/components/Logo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Cogni Mind · AI Systems Architecture Advisory",
  description: "From Manual Mess to AI-Automated Systems. We architect your AI transformation and stay to ensure measurable P&L impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>

        {/* ── Sticky Navbar ─────────────────────────────────── */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-6 px-6 py-3 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">

          {/* Logo + wordmark */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            <Logo size={36} />
            <div className="leading-none">
              <span className="block font-black text-white tracking-tight text-base">
                COGNI MIND
              </span>
              <span className="block text-[10px] text-brand uppercase tracking-widest font-semibold mt-0.5">
                AI Systems Architecture
              </span>
            </div>
          </a>

          {/* Nav links — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Case Study',   href: '#case-study'   },
              { label: 'Why Us',       href: '#why-us'       },
              { label: 'Team',         href: '#team'         },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white font-medium rounded-lg hover:bg-slate-800/60 transition-all"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA button */}
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-slate-950 font-bold text-sm py-2.5 px-5 rounded-lg transition-all"
          >
            Book Audit
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </header>

        {children}
      </body>
    </html>
  );
}
