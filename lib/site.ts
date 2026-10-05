export const site = {
  name: "Cognimind",
  url: "https://www.cognimind.ai",
  email: "inquiries@cognimind.ai",
  description:
    "Cognimind builds AI co-workers for manufacturers and distributors. One workflow at a time — the AI handles the busywork, the decisions stay with your team.",
  tagline:
    "An AI for manufacturers and distributors that does the tasks you thought were impossible",
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "xvkzpjyk",
} as const;

export const nav = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Why us", href: "/#why-us" },
  { label: "Case study", href: "/#case-study" },
] as const;
