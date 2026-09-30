export const hero = {
  eyebrow: "AI co-workers for industrial distribution",
  title: "An AI co-worker for industrial distributors",
  statement: "It takes the busywork. The decisions stay with your team.",
  subtitle:
    "Quotes out in hours, orders confirmed the same day, claims filed without the chase — starting with one clean parts catalog. Same headcount.",
  chips: ["Keep what works", "Fix what doesn't", "Put AI where it pays"],
  stats: [
    { value: "17", label: "AI agents and automations shipped" },
    { value: "5", label: "Departments audited end to end" },
    { value: "6mo", label: "Embedded with the client" },
  ],
};

export const howItWorks = {
  eyebrow: "How the AI co-worker handles it",
  title: "One clean parts catalog, without the busywork.",
  lead: "It reads every company's parts list, matches identical parts, and brings you only what needs a human decision.",
  steps: [
    {
      title: "Pulls",
      body: "Pulls the parts lists from each company — from ERP, Excel, or any other source your team uses.",
    },
    {
      title: "Matches",
      body: "Matches identical parts and sorts them into a standard format, defined with your team in week one.",
    },
    {
      title: "Scores",
      body: "Scores how sure it is about every match.",
    },
    {
      title: "Flags",
      body: "Flags what needs human approval: price conflicts, unsure matches, missing details.",
    },
  ],
  learn: {
    title: "Learns from every decision",
    body: "Every decision your team makes with Cognimind becomes a rule it applies next time. As it learns, only the unsure ones come back for approval.",
  },
  stays: {
    title: "What stays with your team",
    body: "Pricing decisions, unsure matches, final approval, and any other rules your team prefers.",
  },
};

export const cleanRecord = {
  eyebrow: "One part, three records",
  title: "One clean record.",
  lead: "The same part entered by each company with a different number, name and price. Cognimind reconciles them into one agreed record.",
  records: [
    {
      company: "Company A",
      number: "AB-1024",
      name: 'Hydraulic valve 1/2"',
      price: "$184.00",
    },
    {
      company: "Company B",
      number: "HV-050",
      name: "Valve, hydraulic .5in",
      price: "$191.50",
    },
    {
      company: "Company C",
      number: "10553",
      name: "Hyd valve 1/2",
      price: "$178.00",
    },
  ],
  record: {
    number: "VALV-10024",
    name: "Hydraulic valve, 1/2 in",
    price: "Best price",
  },
  review: {
    label: "Needs your team",
    items: [
      "Price conflict: $178.00 – $191.50",
      "Low-confidence match",
      "Missing unit of measure",
    ],
  },
  note: "Every part in one agreed format — ready for the website, reports, every team that uses parts data, and the next company you buy.",
};

export const pilot = {
  eyebrow: "We start small",
  title: "Solve for SKU harmonization.",
  lead: "A fixed-price pilot on two of your companies, in the formats you already use.",
  steps: [
    {
      title: "Pull",
      body: "We take exports from two of your companies, in whatever format they use today.",
    },
    {
      title: "Define",
      body: "We align with your team on what a good part record looks like.",
    },
    {
      title: "Match & Report",
      body: "We show you how many lined up automatically and how many needed your team to review.",
    },
    {
      title: "Fixed Price",
      body: "You get a clear, scoped proposal to complete the full catalog consolidation.",
    },
  ],
  outcome:
    "After that: your team finds any part in seconds, quotes go out faster, and parts start selling online.",
  engagementTitle: "How we work together",
  engagement: [
    {
      step: "01",
      title: "A 60-minute call",
      body: "Free. We pick the workflow that matters most right now.",
    },
    {
      step: "02",
      title: "2–3 weeks, fixed price",
      body: "$15,000 — includes everything, AI costs too. If you continue, it counts toward the full build.",
      price: "$15,000",
    },
    {
      step: "03",
      title: "A six-month partnership",
      body: "One six-month fee. We build the first workflow, then the next ones on your list — sales, procurement, finance — and keep everything running, including for every company you buy.",
    },
  ],
};

export const problem = {
  eyebrow: "The problem",
  title: "The acquisition data problem",
  lead: "Every company you buy brings its own ERP, formats, and part numbers. The data doesn't line up — so the website, the reports, and the next deal all stall.",
  columns: [
    {
      label: "What acquisition creates",
      tone: "neutral" as const,
      items: [
        "A new ERP and spreadsheet stack for every company",
        "The same part entered under different numbers and names",
        "Prices that disagree across entities",
        "Data too messy to put on the website",
      ],
    },
    {
      label: "What it costs you",
      tone: "warn" as const,
      items: [
        "Quotes that take hours to put together",
        "Cross-selling that's impossible across entities",
        "Inventory that can't be shared between locations",
        "Every new deal compounds the mess",
      ],
    },
  ],
};

export const caseStudy = {
  eyebrow: "Case study",
  title: "Six months inside a global food supply chain company",
  lead: "A company that grows by acquisition — embedded across North America, Europe and India",
  sections: [
    {
      label: "What we did",
      items: [
        "Audited workflows end to end across five departments: procurement, sales, supply chain, finance, and HR",
        "Designed and shipped 17 AI agents and automations alongside their engineering team",
        "Embedded them in the systems their teams already use, across sales, procurement, finance, and operations",
        "Automated their monthly reporting and built a live view of the business for the CEO",
      ],
    },
    {
      label: "The outcome",
      items: [
        "Still running and expanding across their entities today",
        "The audit projected around a third of manual work could be automated, with seven-figure annual savings",
        "Helped productize the workflows, which became part of their next funding conversation",
      ],
    },
  ],
  disclaimer:
    "Those savings figures are audit estimates, and we say so. Client agreements keep the name off this page.",
};

export const whyUs = {
  eyebrow: "Why work with us?",
  title: "We build it. Your team keeps it.",
  lead: "You keep the IP and the knowledge. We make sure it runs.",
  columns: { us: "Cognimind", them: "Traditional consulting firms" },
  rows: [
    {
      us: "100% principal attention",
      them: "Divided partner mindshare",
    },
    {
      us: "Custom-built for your workflows",
      them: "Cookie-cutter playbooks",
    },
    {
      us: "Built on reusable parts — not from scratch for each acquisition",
      them: "Start from zero on every engagement",
    },
    {
      us: "We know what breaks and where",
      them: "Learn your operations on the clock",
    },
    {
      us: "40+ combined years building systems, developing strategy and partnerships",
      them: "Junior analysts learning on your dime",
    },
    {
      us: "End-to-end: audit through implementation",
      them: "Leave unclear follow-ups to ensure repeat business",
    },
  ],
  quote:
    "Most AI practitioners learned your world from a report. We ran it on the warehouse floor.",
};

export const team = {
  eyebrow: "The team",
  title: "Operators. Not just advisors.",
  members: [
    {
      name: "Shail Kaveti",
      role: "Operator · Amazon Business, Wayfair, Bill.com",
      initials: "SK",
      photo: "",
      points: [
        "Employee #3 at Amazon Business, building US and EU B2B operations",
        "Built Wayfair's residential AC business from zero to roughly $50M",
        "Months on warehouse floors at Amazon and Wayfair, receiving through shipping",
        "MBA, Tuck at Dartmouth · BS/MS Computer Science, Drexel",
      ],
    },
    {
      name: "Alex Gluck",
      role: "Marketing FP&A Manager, Meta · Former L.E.K. Consulting",
      initials: "AG",
      photo: "",
      points: [
        "Meta FP&A Manager · PepsiCo Sr. Manager, Sales Finance & Beverage Strategy",
        "Senior Consultant, L.E.K.: Due diligence & growth strategy across healthcare, PE, consumer",
        "$225M closed (97.5% approval rate) at Mubadala GE Capital",
        "MBA, Dartmouth · Former JPMorgan, Goldman Sachs",
      ],
    },
  ],
};

export const contact = {
  eyebrow: "Ready to start?",
  title: "Let's start with one workflow.",
  body: "We'll walk it with you, score it, and tell you if it's worth building. No commitment. No deck at the end.",
  stats: [
    { value: "17", label: "agents shipped in six months" },
    { value: "5", label: "departments audited end to end" },
    { value: "24h", label: "response time" },
  ],
  emailLabel: "Or email us directly",
  formTitle: "Tell us which workflow hurts most",
  formSubtitle: "Tell us what you're working with — we'll take it from there.",
  note: "We respond within 24 hours · No spam, ever.",
};
