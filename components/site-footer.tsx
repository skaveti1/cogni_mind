import Link from "next/link";
import { Brand } from "@/components/brand";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-forest-line bg-forest text-white/60">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/#top" aria-label="Cognimind home" className="text-white">
              <Brand className="text-white" markClassName="text-white" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              AI co-workers for manufacturers and distributors. One workflow at
              a time — the AI takes the busywork. The decisions stay with your
              team.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-white/35">
              Get in touch
            </p>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              {site.email}
            </a>
            <Link
              href="/#contact"
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              Start a conversation
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-forest-line pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cognimind. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.14em]">
            Built for manufacturers who ship
          </p>
        </div>
      </div>
    </footer>
  );
}
