import type { Product } from "./types";

export const products = [
  {
    id: "desk",
    name: "DIO Desk",
    category: "IT SERVICE MANAGEMENT",
    description:
      "Единое пространство для управления обращениями, " + "сервисными процессами и командами.",
    href: "/products/desk",
    accentColor: "#bb252d",
    features: ["Обращения", "Workflow", "SLA"],
  },
  {
    id: "ai",
    name: "DIOS AI",
    category: "ARTIFICIAL INTELLIGENCE",
    description: "Интеллектуальные инструменты, работающие " + "в контексте вашей организации.",
    href: "/products/ai",
    accentColor: "#9169d8",
    features: ["ИИ-чаты", "Инструменты", "Интеграции"],
  },
] satisfies Product[];
