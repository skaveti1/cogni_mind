import type {
  Availability,
  Manual,
  Recommendation,
} from "./mock-data";

export type MessageKind =
  | "text"
  | "thinking"
  | "manuals"
  | "citations"
  | "part"
  | "availability"
  | "recommendation";

export type ActivityStepState = "pending" | "running" | "done";

export type ActivityStep = {
  label: string;
  ms: number;
  state: ActivityStepState;
  parallel?: boolean;
  startedAt?: number;
};

export type Message = {
  id: string;
  role: "user" | "agent";
  kind: MessageKind;
  text?: string;
  steps?: ActivityStep[];
  seconds?: number;
  streaming?: boolean;
  manuals?: Manual[];
  citations?: number[];
  part?: { partNumber: string; description: string };
  availability?: Availability;
  recommendation?: Recommendation;
};

export type Stage =
  | "ask"
  | "load"
  | "reportVoltage"
  | "reportFlashes"
  | "recommend"
  | "discussion";
