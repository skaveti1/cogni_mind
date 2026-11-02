export const site = {
  name: "Cognimind",
  url: "https://www.cognimind.ai",
  email: "inquiries@cognimind.ai",
  description:
    "Cognimind builds AI agents for manufacturers and distributors. One workflow at a time — the agents handle the busywork, the decisions stay with your team.",
  tagline:
    "AI agents for manufacturers and distributors. The decisions stay with your team.",
} as const;

export type NavItem = {
  label: string;
  href: string;
  highlight?: boolean;
};

export const nav: readonly NavItem[] = [
  { label: "Home", href: "/#top" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Why us", href: "/#why-us" },
  { label: "Case study", href: "/#case-study" },
  { label: "Demos", href: "/demos", highlight: true },
];
