export const site = {
  name: "Cognimind",
  url: "https://www.cognimind.ai",
  email: "inquiries@cognimind.ai",
  description:
    "Cognimind builds AI co-workers for industrial distributors and companies growing by acquisition. It starts with one clean parts catalog; the decisions stay with your team.",
  tagline: "An AI co-worker for industrial distributors",
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
} as const;

export const nav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Case study", href: "#case-study" },
  { label: "Why us", href: "#why-us" },
  { label: "Team", href: "#team" },
] as const;
