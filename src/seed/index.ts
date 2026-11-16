import "dotenv/config";

import { getPayload } from "payload";

import config from "../payload.config";
import { assertSeedEnv } from "../lib/env";
import { seedArticles } from "./articles";
import { seedHomepage } from "./homepage";
import { seedMedia } from "./media";
import { seedNavigation } from "./navigation";
import { seedOrganizations } from "./organizations";
import { seedProducts } from "./products";
import { ensureS3Bucket } from "./utils";

async function main() {
  assertSeedEnv();

  const payload = await getPayload({ config });

  console.log("[seed] start");
  await ensureS3Bucket(payload);

  const media = await seedMedia(payload);
  const products = await seedProducts(payload, media);
  const articles = await seedArticles(payload, media);
  await seedOrganizations(payload);
  await seedHomepage(payload, products, articles);
  await seedNavigation(payload);

  console.log("[seed] done");
  process.exit(0);
}

main().catch((error) => {
  console.error("[seed] failed");
  console.error(error);
  process.exit(1);
});
