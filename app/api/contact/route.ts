import { isPersonalEmail, looksLikeEmail, workEmailMessage } from "@/lib/email";

// Server-only: this module never reaches the browser, so the form ID stays off
// the client and nobody can POST to Formspree directly from a page script.
const formspreeId = process.env.FORMSPREE_ID ?? "xvkzpjyk";

// Only these reach Formspree. Anything else a caller sends is dropped, so the
// proxy can't be used to smuggle Formspree's own `_`-prefixed control fields.
const allowedFields = ["name", "company", "email", "phone", "message"] as const;

const maxFieldLength = 5000;

// A human needs a few seconds to fill five fields; scripts post instantly.
const minFillMs = 3_000;
// Reject a page left open for a day — the timestamp is stale, not a real fill.
const maxFillMs = 24 * 60 * 60 * 1000;

const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 3;
const recentPosts = new Map<string, number[]>();

// Best-effort only: each serverless instance has its own memory, so this slows
// a flood rather than stopping one. Durable limiting needs a shared store.
function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (recentPosts.get(ip) ?? []).filter(
    (at) => now - at < rateLimitWindowMs,
  );

  if (recent.length >= rateLimitMax) {
    recentPosts.set(ip, recent);
    return true;
  }

  recent.push(now);
  recentPosts.set(ip, recent);

  if (recentPosts.size > 5_000) {
    for (const [key, times] of recentPosts) {
      if (times.every((at) => now - at >= rateLimitWindowMs)) {
        recentPosts.delete(key);
      }
    }
  }

  return false;
}

// Compare against the request's own host rather than a hardcoded domain, so
// Vercel preview deployments and localhost work without extra configuration.
function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

// `field` tells the form to render this against a specific input rather than
// as a generic send failure.
function reject(error: string, status: number, field?: "email") {
  return Response.json({ error, field }, { status });
}

export async function POST(request: Request) {
  // Browsers send Origin on cross-site POSTs; a bare script usually sends none.
  if (!isSameOrigin(request)) {
    return reject("Submissions must come from the site itself.", 403);
  }

  if (isRateLimited(clientIp(request))) {
    return reject("Too many submissions. Please try again shortly.", 429);
  }

  let submitted: FormData;
  try {
    submitted = await request.formData();
  } catch {
    return reject("Could not read the submission.", 400);
  }

  // Honeypot: bots fill hidden fields. Report success so they don't retry.
  if (String(submitted.get("_gotcha") ?? "").trim()) {
    return Response.json({ ok: true });
  }

  // The form stamps this on mount, so a request without it never ran our JS.
  const startedAt = Number(submitted.get("_t"));
  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return reject("Submissions must come from the site itself.", 403);
  }

  const elapsed = Date.now() - startedAt;
  if (elapsed < minFillMs) {
    return reject("That submission looked automated. Please try again.", 422);
  }

  // A stale stamp can't be fixed by resubmitting, so say what actually helps.
  if (elapsed > maxFillMs) {
    return reject("This page has been open a while — please reload and resend.", 422);
  }

  const values = Object.fromEntries(
    allowedFields.map((field) => [field, String(submitted.get(field) ?? "").trim()]),
  ) as Record<(typeof allowedFields)[number], string>;

  if (Object.values(values).some((value) => value.length > maxFieldLength)) {
    return reject("That submission is too long.", 413);
  }

  if (!values.name || !values.company || !values.email) {
    return reject("Name, company, and work email are required.", 400);
  }

  if (!looksLikeEmail(values.email)) {
    return reject("Enter a valid email address.", 400);
  }

  // The check that actually enforces the rule. The form runs the same test for
  // instant feedback, but that one is trivially bypassed.
  if (isPersonalEmail(values.email)) {
    return reject(workEmailMessage, 422, "email");
  }

  const payload = new FormData();
  for (const field of allowedFields) {
    if (values[field]) payload.set(field, values[field]);
  }
  payload.set("_subject", "New enquiry from cognimind.ai");

  let delivered: Response;
  try {
    delivered = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      body: payload,
      headers: { Accept: "application/json" },
    });
  } catch {
    return reject("Could not reach the mail service.", 502);
  }

  if (!delivered.ok) {
    return reject("The mail service rejected the submission.", 502);
  }

  return Response.json({ ok: true });
}
