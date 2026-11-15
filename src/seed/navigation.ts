import type { Payload } from "payload";

import { logSeed } from "./utils";

const headerNav = [
  { label: "Продукты", url: "/#products" },
  { label: "Платформа", url: "/#platform" },
  { label: "Экосистема", url: "/#ecosystem" },
  { label: "Материалы", url: "/#articles" },
];

const footerNav = [
  { label: "Продукты", url: "/#products" },
  { label: "Документация", url: "https://docs.example.dios.cloud" },
  { label: "Безопасность", url: "https://security.example.dios.cloud" },
  { label: "Контакты", url: "https://contact.example.dios.cloud" },
];

export async function seedNavigation(payload: Payload) {
  const header = await payload.findGlobal({ slug: "header", depth: 0 });
  const hasArticlesLink = (header.navItems || []).some((item) =>
    item.url?.includes("#articles"),
  );

  if (!header.navItems?.length || !hasArticlesLink) {
    await payload.updateGlobal({
      slug: "header",
      data: {
        logoText: "DIOS",
        navItems: headerNav,
      },
      context: { disableRevalidate: true },
    });
    logSeed("global", "header", header.navItems?.length ? "updated" : "created");
  } else {
    logSeed("global", "header", "skipped");
  }

  const footer = await payload.findGlobal({ slug: "footer", depth: 0 });
  if (!footer.navItems?.length) {
    await payload.updateGlobal({
      slug: "footer",
      data: {
        copyright: "© DIOS. Все права защищены.",
        navItems: footerNav,
      },
      context: { disableRevalidate: true },
    });
    logSeed("global", "footer", "created");
  } else {
    logSeed("global", "footer", "skipped");
  }

  const settings = await payload.findGlobal({ slug: "settings", depth: 0 });
  if (!settings.siteDescription || settings.siteName === "Dios Cloud") {
    await payload.updateGlobal({
      slug: "settings",
      data: {
        siteName: "DIOS",
        siteDescription:
          "Сервисные процессы и ИИ-инструменты для вашей команды. Экосистема продуктов DIOS.",
      },
      context: { disableRevalidate: true },
    });
    logSeed("global", "settings", "updated");
  } else {
    logSeed("global", "settings", "skipped");
  }
}
