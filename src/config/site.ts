export const siteConfig = {
  name: "DIOS",
  description:
    "Сервисные процессы и ИИ-инструменты для вашей команды. DIO Desk, DIOS AI и связанные продукты экосистемы DIOS.",
  url: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  themeCookie: "dios-theme",
} as const;

export type ThemePreference = "light" | "dark" | "system";
