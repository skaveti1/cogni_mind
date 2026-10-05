import { isPersonalEmail, looksLikeEmail, workEmailMessage } from "@/lib/email";

// Server-only: this module never reaches the browser, so the form ID stays off
// the client and nobody can POST to Formspree directly from a page script.
const formspreeId = process.env.FORMSPREE_ID ?? "xvkzpjyk";

// Only these reach Formspree. Anything else a caller sends is dropped, so the
// proxy can't be used to smuggle Formspree's own `_`-prefixed control fields.
const allowedFields = ["name", "company", "email", "phone", "message"] as const;

const maxFieldLength = 5000;

function reject(error: string, status: number) {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
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
    return reject(workEmailMessage, 422);
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
