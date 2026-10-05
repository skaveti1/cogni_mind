export const hero = {
  eyebrow: "For manufacturers and distributors",
  title: "AI agents that do the work you thought was impossible",
  statement: "The decisions stay with your team.",
  subtitle:
    "Quotes out in hours. Orders confirmed the same day. Stock checked as it comes off the truck.",
  subtitleEmphasis: "Same headcount.",
  actions: [
    { label: "Start with one workflow", href: "#contact", variant: "primary" as const },
  ],
};

export const receiving = {
  eyebrow: "A day in the life of a receiving clerk",
  title: "See how the AI co-worker helps.",
  body: "A truck arrives. The AI co-worker checks every line against the order before it leaves the dock.",
  image: "/screenshots/table_dashboard.png",
  imageAlt:
    "Example receiving dashboard showing a delivery from Northside Supply against PO-4418, with lines that match the order and two flagged for the team to review.",
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "One workflow at a time. You see working software every week.",
  steps: [
    {
      title: "Walk the work",
      tag: "1 hour, free",
      bullets: [
        "We see how your team does the job today.",
        "We pick the one task that eats the most time.",
        "If your data isn't ready, we tell you.",
      ],
    },
    {
      title: "Build and test",
      tag: "2–3 weeks",
      bullets: [
        "We build the AI for that one task, using your real data.",
        "Your team checks its work and approves anything it isn't sure about.",
        "It learns from every correction.",
      ],
    },
    {
      title: "Grow",
      tag: "6 months",
      bullets: [
        "We go where your team loses the most time next. You decide the order.",
        "Each one goes faster, because the AI already knows your products, customers, and how you work.",
        "We keep it all running.",
      ],
    },
  ],
  note: "Sometimes the honest answer is that it's not worth building yet. We'll say that too.",
};

export const caseStudy = {
  eyebrow: "Case study",
  title: "Six months inside a global food supply company.",
  lead: "A company growing by acquisition, across North America, Europe, and India.",
  stats: [
    {
      value: "17",
      label: "AI agents and automations shipped alongside their engineers",
    },
    {
      value: "5",
      label:
        "Departments mapped end to end: procurement, sales, supply chain, finance, HR",
    },
    {
      value: "Live",
      label: "Still running and expanding across their companies today",
    },
  ],
  sections: [
    {
      label: "What we did",
      items: [
        "Mapped how work ran across procurement, sales, supply chain, finance, and HR.",
        "Designed and shipped 17 AI agents and automations alongside their engineering team.",
        "Built them into the systems their teams already used.",
        "Automated monthly reporting and built a live view of the business for the CEO.",
      ],
    },
    {
      label: "The outcome",
      items: [
        "Still running and expanding today.",
        "The audit projected about a third of manual work could be automated, with seven-figure yearly savings. These are audit estimates, not measured results.",
      ],
    },
  ],
  disclaimer: "Client agreements keep the name off this page.",
};

export const whyUs = {
  eyebrow: "Why us",
  title: "We've done the work we automate.",
  cards: [
    {
      title: "We've run the floor.",
      body: "We've spent years in warehouses and factories at Amazon, Wayfair, Trane, Corning, and Hubbell. We know where the day goes wrong.",
    },
    {
      title: "We build, not just advise.",
      body: "We're engineers by training. We've shipped AI at companies from early-stage startups to billion-dollar businesses like Wayfair.",
    },
    {
      title: "We know which tools work.",
      body: "We invest in AI startups and see hundreds of tools a year. We're not tied to any vendor, so we recommend what fits.",
    },
    {
      title: "We stay until it works.",
      body: "Your team keeps the software and the know-how. We keep it running.",
    },
  ],
};

export type Brand = {
  name: string;
  logo?: string;
  logoWhite?: string;
};

export const brands = {
  items: [
    { name: "Amazon", logo: "/logos/amazon.png", logoWhite: "/logos/white/amazon.png" },
    { name: "Wayfair", logo: "/logos/wayfair.png", logoWhite: "/logos/white/wayfair.png" },
    { name: "Trane", logo: "/logos/trane.png", logoWhite: "/logos/white/trane.png" },
    { name: "Corning", logo: "/logos/corning.png", logoWhite: "/logos/white/corning.png" },
    { name: "Hubbell", logo: "/logos/hubbell.png", logoWhite: "/logos/white/hubbell.png" },
    {
      name: "Liebherr Group",
      logo: "/logos/liebherr.png",
      logoWhite: "/logos/white/liebherr.png",
    },
    {
      name: "Susquehanna International Group",
      logo: "/logos/susquehanna.png",
      logoWhite: "/logos/white/susquehanna.png",
    },
    { name: "Dartmouth", logo: "/logos/dartmouth.png", logoWhite: "/logos/white/dartmouth.png" },
    { name: "Duke", logo: "/logos/duke.png", logoWhite: "/logos/white/duke.png" },
  ] satisfies Brand[],
};

export const contact = {
  eyebrow: "Get in touch",
  title: "Let's start with one workflow.",
  body: "We'll walk it with you and tell you if it's worth building. No commitment. No deck at the end.",
  emailLabel: "Or email us directly",
  formTitle: "Tell us which workflow hurts most",
  formSubtitle: "Tell us what you're working with — we'll take it from there.",
  note: "We respond within 24 hours · No spam, ever.",
};
