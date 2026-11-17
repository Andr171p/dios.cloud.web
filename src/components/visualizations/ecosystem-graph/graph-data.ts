export type GraphNodeKind =
  | "hub"
  | "product"
  | "entity"
  | "integration"
  | "model"
  | "person"
  | "tool";

export type GraphEdgeKind = "context" | "action" | "model" | "local";

export type GraphNodeData = {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: GraphNodeKind;
  /** Optional short caption under product/model marks */
  caption?: string;
  logoSrc?: string;
  logoAlt?: string;
  /** Monogram when no logo */
  monogram?: string;
  /** Brand-ish accent for product rings */
  accent?: string;
  size?: "sm" | "md" | "lg";
};

export type GraphEdgeData = {
  id: string;
  from: string;
  to: string;
  kind: GraphEdgeKind;
};

export type GraphScenarioStep = {
  id: string;
  /** Edges that carry an active signal */
  edges: string[];
  /** Nodes that receive glow */
  nodes: string[];
  durationMs: number;
};

/** Desktop composition — clustered ecosystem, not a pure star */
export const GRAPH_VIEWBOX = { width: 1020, height: 640 };

export const graphNodes: GraphNodeData[] = [
  // ── Center: AI + chat surface ─────────────────────────────
  {
    id: "ai",
    label: "DIOS AI",
    x: 470,
    y: 300,
    kind: "hub",
    logoSrc: "/integrations/dios-brand.png",
    logoAlt: "DIOS",
    size: "lg",
  },
  {
    id: "chats",
    label: "AI Chats",
    caption: "Диалоги",
    x: 470,
    y: 145,
    kind: "product",
    logoSrc: "/integrations/products/ai-chats.png",
    logoAlt: "AI Chats",
    accent: "#9b6bdc",
    size: "md",
  },
  {
    id: "tools",
    label: "Tools",
    caption: "Плагины",
    x: 560,
    y: 230,
    kind: "tool",
    monogram: "TL",
    accent: "#d4a017",
    size: "sm",
  },

  // ── Left cluster: internal context ────────────────────────
  {
    id: "desk",
    label: "Service Desk",
    caption: "DIO Desk",
    x: 220,
    y: 145,
    kind: "product",
    logoSrc: "/integrations/products/dio-desk.png",
    logoAlt: "Service Desk",
    accent: "#e07a6a",
    size: "md",
  },
  {
    id: "iam",
    label: "IAM",
    caption: "Доступы",
    x: 175,
    y: 310,
    kind: "product",
    logoSrc: "/integrations/products/iam.png",
    logoAlt: "IAM",
    accent: "#6ea8d8",
    size: "md",
  },
  {
    id: "comms",
    label: "Communications",
    caption: "Коммуникации",
    x: 230,
    y: 470,
    kind: "product",
    logoSrc: "/integrations/products/communications.png",
    logoAlt: "Communications",
    accent: "#2ec4b6",
    size: "md",
  },

  // Entities woven into left cluster
  {
    id: "project",
    label: "Проект",
    x: 85,
    y: 75,
    kind: "entity",
    size: "sm",
  },
  {
    id: "ticket",
    label: "Заявка",
    x: 70,
    y: 175,
    kind: "entity",
    size: "sm",
  },
  {
    id: "workitem",
    label: "Work item",
    x: 95,
    y: 250,
    kind: "entity",
    size: "sm",
  },
  {
    id: "role",
    label: "Роль",
    x: 55,
    y: 330,
    kind: "entity",
    size: "sm",
  },
  {
    id: "oauth",
    label: "OAuth / OIDC",
    x: 80,
    y: 400,
    kind: "entity",
    size: "sm",
  },
  {
    id: "meeting",
    label: "Встреча",
    x: 95,
    y: 500,
    kind: "entity",
    size: "sm",
  },
  {
    id: "person",
    label: "Участник",
    x: 155,
    y: 555,
    kind: "person",
    size: "sm",
  },

  // ── Bottom-center: knowledge / learning ───────────────────
  {
    id: "knowledge",
    label: "Knowledge",
    caption: "DIOS KB",
    x: 390,
    y: 505,
    kind: "product",
    logoSrc: "/integrations/products/knowledge.png",
    logoAlt: "Knowledge",
    accent: "#5b8def",
    size: "md",
  },
  {
    id: "courses",
    label: "Courses",
    caption: "Обучение",
    x: 520,
    y: 545,
    kind: "product",
    logoSrc: "/integrations/products/courses.png",
    logoAlt: "Courses",
    accent: "#e0b04a",
    size: "md",
  },
  {
    id: "document",
    label: "Документ",
    x: 320,
    y: 580,
    kind: "entity",
    size: "sm",
  },

  // ── Right cluster: integrations + models ──────────────────
  {
    id: "onec",
    label: "1С",
    x: 740,
    y: 120,
    kind: "integration",
    logoSrc: "/integrations/1c.webp",
    logoAlt: "1С",
    size: "md",
  },
  {
    id: "gitverse",
    label: "GitVerse",
    x: 820,
    y: 250,
    kind: "integration",
    logoSrc: "/integrations/gitverse.png",
    logoAlt: "GitVerse",
    size: "md",
  },
  {
    id: "yandex",
    label: "Yandex Cloud",
    x: 770,
    y: 390,
    kind: "integration",
    logoSrc: "/integrations/yandex-cloud.png",
    logoAlt: "Yandex Cloud",
    size: "md",
  },
  {
    id: "llm-cloud",
    label: "Cloud LLM",
    caption: "Облачная модель",
    x: 680,
    y: 500,
    kind: "model",
    monogram: "CL",
    accent: "#5b8def",
    size: "md",
  },
  {
    id: "llm-private",
    label: "Private LLM",
    caption: "Своя модель",
    x: 790,
    y: 555,
    kind: "model",
    monogram: "PR",
    accent: "#7a6bb5",
    size: "md",
  },
];

export const graphEdges: GraphEdgeData[] = [
  // Local left-cluster weave (ecosystem, not star)
  { id: "project-desk", from: "project", to: "desk", kind: "local" },
  { id: "ticket-desk", from: "ticket", to: "desk", kind: "local" },
  { id: "workitem-desk", from: "workitem", to: "desk", kind: "local" },
  { id: "ticket-workitem", from: "ticket", to: "workitem", kind: "local" },
  { id: "role-iam", from: "role", to: "iam", kind: "local" },
  { id: "oauth-iam", from: "oauth", to: "iam", kind: "local" },
  { id: "meeting-comms", from: "meeting", to: "comms", kind: "local" },
  { id: "person-comms", from: "person", to: "comms", kind: "local" },
  { id: "person-meeting", from: "person", to: "meeting", kind: "local" },
  { id: "desk-iam", from: "desk", to: "iam", kind: "local" },
  { id: "document-knowledge", from: "document", to: "knowledge", kind: "local" },
  { id: "knowledge-courses", from: "knowledge", to: "courses", kind: "local" },

  // Context into AI (selected hubs only — not every product)
  { id: "desk-ai", from: "desk", to: "ai", kind: "context" },
  { id: "iam-ai", from: "iam", to: "ai", kind: "context" },
  { id: "comms-ai", from: "comms", to: "ai", kind: "context" },
  { id: "knowledge-ai", from: "knowledge", to: "ai", kind: "context" },
  { id: "chats-ai", from: "chats", to: "ai", kind: "context" },

  // Tool / plugin layer
  { id: "ai-tools", from: "ai", to: "tools", kind: "action" },
  { id: "tools-onec", from: "tools", to: "onec", kind: "action" },
  { id: "tools-gitverse", from: "tools", to: "gitverse", kind: "action" },

  // Direct integrations still available as context
  { id: "yandex-ai", from: "yandex", to: "ai", kind: "context" },

  // Actions back into process
  { id: "ai-desk-action", from: "ai", to: "desk", kind: "action" },
  { id: "ai-chats-result", from: "ai", to: "chats", kind: "action" },

  // Model plane
  { id: "ai-llm-cloud", from: "ai", to: "llm-cloud", kind: "model" },
  { id: "ai-llm-private", from: "ai", to: "llm-private", kind: "model" },
  { id: "yandex-llm-cloud", from: "yandex", to: "llm-cloud", kind: "model" },
];

/**
 * Three narrative routes — only a few edges glow at once.
 * 1) Service workflow  2) Communication workflow  3) Model + tools
 */
export const graphScenario: GraphScenarioStep[] = [
  // Service: Заявка → Desk → AI → Tools → 1С → Desk
  {
    id: "service-1",
    edges: ["ticket-desk", "project-desk"],
    nodes: ["ticket", "project", "desk"],
    durationMs: 1800,
  },
  {
    id: "service-2",
    edges: ["desk-ai", "chats-ai"],
    nodes: ["desk", "ai", "chats"],
    durationMs: 2000,
  },
  {
    id: "service-3",
    edges: ["ai-tools", "tools-onec", "ai-desk-action"],
    nodes: ["ai", "tools", "onec", "desk", "ticket"],
    durationMs: 2400,
  },

  // Communication: Участник → Встреча → Comms → AI → Knowledge
  {
    id: "comms-1",
    edges: ["person-meeting", "meeting-comms", "person-comms"],
    nodes: ["person", "meeting", "comms"],
    durationMs: 1800,
  },
  {
    id: "comms-2",
    edges: ["comms-ai", "knowledge-ai", "document-knowledge"],
    nodes: ["comms", "ai", "knowledge", "document"],
    durationMs: 2200,
  },
  {
    id: "comms-3",
    edges: ["ai-chats-result", "knowledge-courses"],
    nodes: ["ai", "chats", "knowledge", "courses"],
    durationMs: 1800,
  },

  // Model / cloud path
  {
    id: "model-1",
    edges: ["ai-llm-cloud", "yandex-llm-cloud", "yandex-ai"],
    nodes: ["ai", "llm-cloud", "yandex"],
    durationMs: 2200,
  },
  {
    id: "model-2",
    edges: ["ai-llm-private", "tools-gitverse", "ai-tools"],
    nodes: ["ai", "llm-private", "tools", "gitverse"],
    durationMs: 2200,
  },
];

export const graphNodeMap = Object.fromEntries(
  graphNodes.map((node) => [node.id, node]),
) as Record<string, GraphNodeData>;

export function getEdgePath(
  from: Pick<GraphNodeData, "x" | "y">,
  to: Pick<GraphNodeData, "x" | "y">,
): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.hypot(dx, dy) || 1;

  const lift = Math.min(42, distance * 0.16);
  const nx = -dy / distance;
  const ny = dx / distance;
  const c1x = from.x + dx * 0.35 + nx * lift;
  const c1y = from.y + dy * 0.35 + ny * lift;
  const c2x = from.x + dx * 0.65 + nx * lift;
  const c2y = from.y + dy * 0.65 + ny * lift;

  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

/** Compact mobile narrative */
export const mobileFlow = [
  { id: "m-ticket", label: "Заявка / Встреча", kind: "entity" as const },
  { id: "m-product", label: "Desk / Communications", kind: "product" as const },
  { id: "m-ai", label: "DIOS AI", kind: "hub" as const },
  { id: "m-tool", label: "Tools → 1С / GitVerse", kind: "tool" as const },
  { id: "m-model", label: "Cloud / Private LLM", kind: "model" as const },
] as const;
