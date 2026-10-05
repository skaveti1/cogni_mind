"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { contact } from "@/lib/content";
import { isPersonalEmail, workEmailMessage } from "@/lib/email";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string) => void };
  }
}

// Absent until the key is configured, in which case no widget renders and the
// route skips verification — the form keeps working either way.
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Turnstile tokens are single use, so the widget needs a fresh one after any
// outcome that leaves the form on screen.
function resetTurnstile() {
  window.turnstile?.reset();
}

const fieldClass =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-accent/40 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/10";


export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const mountedAt = useRef<number | null>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const email = String(new FormData(form).get("email") ?? "");
    if (isPersonalEmail(email)) {
      setEmailError(workEmailMessage);
      form.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
      return;
    }
    setEmailError(null);

    setFormError(null);
    setStatus("submitting");

    try {
      const body = new FormData(form);
      body.set("_t", String(mountedAt.current ?? 0));

      const response = await fetch("/api/contact", {
        method: "POST",
        body,
      });

      if (!response.ok) {
        const { error, field } = await response
          .json()
          .catch(() => ({ error: null, field: null }));

        // Field-scoped rejections belong on the input, not the send error slot.
        if (field === "email") {
          setEmailError(error ?? workEmailMessage);
          setStatus("idle");
          resetTurnstile();
          form.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
          return;
        }

        setFormError(
          response.status === 429
            ? "Too many submissions. Please try again shortly."
            : null,
        );
        throw new Error("Request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      resetTurnstile();
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start rounded-2xl border border-line bg-surface p-8 shadow-[0_1px_2px_rgba(26,24,21,0.04),0_18px_40px_-24px_rgba(26,24,21,0.22)]">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path className="check-draw-auto" pathLength={1} d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="mt-6 font-serif text-2xl text-ink">Thanks — got it.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {contact.note}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-accent hover:text-accent-hover"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-8 shadow-[0_1px_2px_rgba(26,24,21,0.04),0_18px_40px_-24px_rgba(26,24,21,0.22)]">
      <h3 className="font-serif text-2xl text-ink">{contact.formTitle}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {contact.formSubtitle}
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-ink-soft">
              Full name <span className="text-accent">*</span>
            </span>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-ink-soft">
              Company <span className="text-accent">*</span>
            </span>
            <input
              type="text"
              name="company"
              required
              autoComplete="organization"
              className={fieldClass}
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-ink-soft">
              Work email <span className="text-accent">*</span>
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              aria-invalid={emailError ? true : undefined}
              aria-describedby={emailError ? "email-error" : undefined}
              onChange={() => emailError && setEmailError(null)}
              className={`${fieldClass} ${
                emailError ? "border-red-500/70 focus:border-red-500/70" : ""
              }`}
            />
            {emailError ? (
              <span id="email-error" className="mt-1.5 block text-xs text-red-600">
                {emailError}
              </span>
            ) : null}
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-ink-soft">
              Phone <span className="text-muted">(optional)</span>
            </span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              className={fieldClass}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-ink-soft">
            What are you looking to solve?
          </span>
          <textarea
            name="message"
            rows={4}
            className={`${fieldClass} resize-none`}
          />
        </label>

        <input type="hidden" name="_subject" value="New enquiry from cognimind.ai" />

        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        {status === "error" ? (
          <p className="text-sm text-red-600">
            {formError ?? `Something went wrong. Please email ${site.email} instead.`}
          </p>
        ) : null}

        {turnstileSiteKey ? (
          <>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              strategy="afterInteractive"
            />
            <div
              className="cf-turnstile"
              data-sitekey={turnstileSiteKey}
              data-theme="light"
            />
          </>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-canvas transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send it over"}
        </button>

        <p className="text-center text-xs text-muted">{contact.note}</p>
      </form>
    </div>
  );
}
