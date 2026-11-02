export type DemoVideoStatus = "live" | "soon";

export type DemoVideo = {
  /** Anchor id used on the demos page. */
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: DemoVideoStatus;
  duration?: string;
  videoSrc?: string;
  poster?: string;
  captions?: string;
  highlights?: readonly string[];
  /** Reserved for linking to the matching interactive prototype. */
  liveHref?: string;
};

export const demoVideos = [
  {
    slug: "plm",
    name: "Product Lifecycle Management Agent",
    tagline: "Draft and check product data sheets without chasing spreadsheets.",
    description:
      "This walkthrough shows the PLM Agent reading source documents, drafting a product data sheet, and flagging the fields that need an engineer's review. It also surfaces regulation risk and legacy parts tied to the product, so the team can make the call before anything is published.",
    status: "live",
    duration: "47 sec",
    videoSrc: "/videos/plm-demo.mp4",
    poster: "/posters/plm-demo.jpg",
    highlights: [
      "Extracts specifications from source documents",
      "Flags missing or low-confidence fields for review",
      "Surfaces regulatory risk and affected legacy parts",
      "Keeps the engineer in the approval loop",
    ],
  },
  {
    slug: "tech-support",
    name: "Tech Support Agent",
    tagline: "Manual-grounded triage, diagnosis, and human handoff.",
    description:
      "A support agent that loads service manuals, runs concurrent searches, and guides a technician through a fault while keeping diagnosis and escalation in human hands.",
    status: "live",
    duration: "42 sec",
    videoSrc: "/videos/tech-support-demo.mp4",
    poster: "/posters/tech-support-demo.jpg",
    highlights: [
      "Pulls the right manual pages into context",
      "Walks the technician through the next check",
      "Hands off to a human with the full case attached",
    ],
  },
  {
    slug: "quality-control",
    name: "Quality Control Agent",
    tagline: "One standardized ticket stream across every subsidiary.",
    description:
      "A quality agent that normalizes quality issues from every subsidiary into one dashboard, then surfaces repeating product problems that would otherwise be missed. The agent clusters similar failures, links them to the affected products, and keeps quality teams focused on the exceptions that need a human call.",
    status: "live",
    duration: "31 sec",
    videoSrc: "/videos/quality-control-demo.mp4",
    poster: "/posters/quality-control-demo.jpg",
    highlights: [
      "Standardizes tickets from every subsidiary into one schema",
      "Unifies quality reporting in a single dashboard",
      "Surfaces recurring product issues across plants",
      "Keeps quality teams focused on the exceptions",
    ],
  },
] satisfies readonly DemoVideo[];
