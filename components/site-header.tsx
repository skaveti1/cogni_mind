"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "@/components/brand";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { nav } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/70 backdrop-blur-md">
      <ScrollProgress />
      <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between gap-6 px-6 md:px-8">
        <Link
          href="/#top"
          aria-label="Cognimind home"
          onClick={() => setOpen(false)}
        >
          <Brand />
        </Link>

        <nav
          className="hidden items-center gap-5 lg:flex lg:gap-7"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active = item.href === "/demos" && pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link font-mono text-[0.72rem] uppercase tracking-[0.12em] transition-colors ${
                  item.highlight
                    ? "nav-link-highlight text-amber hover:text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/#contact"
          className="hidden rounded-full bg-accent px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-canvas transition-colors hover:bg-accent-hover md:inline-flex lg:px-5"
        >
          Get in touch
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-canvas lg:hidden">
          <nav
            className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4"
            aria-label="Mobile"
          >
            {nav.map((item) => {
              const active = item.href === "/demos" && pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`border-b border-line py-3.5 font-mono text-xs uppercase tracking-[0.12em] ${
                    item.highlight ? "text-amber" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle"
                    />
                  ) : null}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex justify-center rounded-full bg-accent px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-canvas"
            >
              Get in touch
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
