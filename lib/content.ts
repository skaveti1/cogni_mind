export const hero = {
  eyebrow: "For manufacturers and distributors",
  title: "Quotes out in hours. Orders confirmed the same day.",
  statement: "The decisions stay with your team.",
  subtitle: "AI agents do the busywork,",
  subtitleEmphasis: "with the same headcount.",
  note: "If it's not worth building yet, we'll tell you.",
  actions: [
    { label: "Start with one workflow", href: "#contact", variant: "primary" as const },
  ],
};

export const receiving = {
  eyebrow: "A day in the life of a receiving clerk",
  title: "See how the AI agent helps.",
  body: "A truck arrives. The AI agent checks every line against the order before it leaves the dock.",
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
        "We build the agent for that one task, using your real data.",
        "Your team checks its work and approves anything it isn't sure about.",
        "It learns from every correction.",
      ],
    },
    {
      title: "Grow",
      tag: "6 months",
      bullets: [
        "We go where your team loses the most time next. You decide the order.",
        "Each one goes faster.",
        "We keep it all running.",
      ],
    },
  ],
};

export const trialRun = {
  eyebrow: "Trial run",
  title: "Your past work in. A proven agent out.",
  body: "Most AI gets judged on the easy cases. We judge it on the hard ones.",
  steps: [
    {
      title: "Replay",
      body: "It works through 6 months of your past work.",
    },
    {
      title: "Find",
      body: "You see every one it got wrong.",
    },
    {
      title: "Decide",
      body: "You pick what to fix.",
    },
    {
      title: "Fix",
      body: "We teach it what your veterans know.",
    },
    {
      title: "Go live",
      body: "Only when you say so.",
    },
  ],
  replay: {
    label: "Replay console",
    meta: "Example · 6 months",
    columns: ["Past work", "Your team", "Agent", "Result"],
    rows: [
      { id: "WK-1041", team: "Approve", agent: "Approve", result: "Match" },
      { id: "WK-1042", team: "Deny", agent: "Deny", result: "Match" },
      { id: "WK-1043", team: "Approve", agent: "Approve", result: "Match" },
      { id: "WK-1044", team: "Approve", agent: "Deny", result: "Miss" },
      { id: "WK-1045", team: "Deny", agent: "Deny", result: "Match" },
    ],
    note: "The miss: a dealer with an extended warranty. Your veterans knew. Now the agent does too.",
  },
};

export type TrialRunReplay = typeof trialRun.replay;

export const caseStudy = {
  eyebrow: "Case study",
  title: "Six months inside a global food supply company.",
  lead: "A company growing by acquisition, across North America, Europe, and India.",
  stats: [
    {
      value: "17",
      label: "AI agents and automations shipped",
    },
    {
      value: "5",
      label: "Departments mapped end to end",
    },
    {
      value: "Live",
      label: "Still running and expanding",
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
        "The audit projected about a third of manual work could be automated, with seven-figure yearly savings.",
      ],
    },
  ],
  disclaimer:
    "Savings shown are audit estimates, not measured results. Client name kept private.",
};

export const whyUs = {
  eyebrow: "Why us",
  title: "We've done the work we automate.",
  cards: [
    {
      title: "We've run the floor.",
      body: "Years in warehouses and factories at Amazon, Wayfair, Trane, Corning, and Hubbell.",
    },
    {
      title: "We build, not just advise.",
      body: "Engineers by training. We've shipped AI at startups and at Wayfair.",
    },
    {
      title: "We know which tools work.",
      body: "We invest in AI startups. We're not tied to any vendor.",
    },
    {
      title: "We stay until it works.",
      body: "You keep the software. We keep it running.",
    },
  ],
};

export type Brand = {
  name: string;
  label?: string | null;
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
    { name: "Danaher", logo: "/logos/danaher.png", logoWhite: "/logos/white/danaher.png" },
    {
      name: "Liebherr Group",
      label: null,
      logo: "/logos/liebherr.png",
      logoWhite: "/logos/white/liebherr.png",
    },
    {
      name: "Susquehanna International Group",
      label: "SIG",
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
  body: "No commitment. No deck at the end.",
  emailLabel: "Or email us directly",
  messageLabel: "Which workflow hurts most?",
  note: "We respond within 24 hours · No spam, ever.",
};
