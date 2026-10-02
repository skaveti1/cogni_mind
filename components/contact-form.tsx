"use client";

import { useState } from "react";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-accent/40 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/10";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");

    if (!site.formspreeId) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const response = await fetch(
        `https://formspree.io/f/${site.formspreeId}`,
        {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        },
      );
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
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
              className={fieldClass}
            />
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
            Something went wrong. Please email {site.email} instead.
          </p>
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
