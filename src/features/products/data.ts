import type { ProductCardModel } from "./types";

/** Local fallback used only when CMS is unavailable in UI experiments. */
export const products = [
  {
    id: "desk",
    slug: "dio-desk",
    name: "DIO Desk",
    tagline: "Обращения, процессы и SLA в одном месте",
    category: "IT SERVICE MANAGEMENT",
    description:
      "Единое пространство для управления обращениями, сервисными процессами и командами.",
    href: "/products/dio-desk",
    appUrl: "https://desk.example.dios.cloud",
    availability: "available",
    accentColor: "#bb252d",
    features: ["Обращения", "Workflow", "SLA"],
    posterUrl: null,
    posterAlt: "DIO Desk",
    demoVideoUrl: null,
  },
  {
    id: "ai",
    slug: "dios-ai",
    name: "DIOS AI",
    tagline: "ИИ-инструменты в контексте вашей организации",
    category: "ARTIFICIAL INTELLIGENCE",
    description: "Интеллектуальные инструменты, работающие в контексте вашей организации.",
    href: "/products/dios-ai",
    appUrl: "https://ai.example.dios.cloud",
    availability: "beta",
    accentColor: "#8b5e3c",
    features: ["ИИ-чаты", "Инструменты", "Интеграции"],
    posterUrl: null,
    posterAlt: "DIOS AI",
    demoVideoUrl: null,
  },
] satisfies ProductCardModel[];
