# Dios Cloud Web

Marketing site and CMS for Dios Cloud, built with Next.js and Payload CMS on PostgreSQL.

## Local development

1. Copy env file:

```bash
cp .env.example .env
```

2. Start Postgres (host port **5433** to avoid clashing with a local Postgres on 5432):

```bash
docker compose up -d postgres
```

3. Install and run:

```bash
pnpm install
pnpm dev
```

4. Open:

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin

Create the first admin user in `/admin`, then publish a page with slug `home` to replace the homepage placeholder.

## Useful scripts

| Script                    | Purpose                           |
| ------------------------- | --------------------------------- |
| `pnpm dev`                | Next.js + Payload dev server      |
| `pnpm generate:types`     | Regenerate `src/payload-types.ts` |
| `pnpm generate:importmap` | Regenerate admin import map       |
| `pnpm lint`               | ESLint                            |
| `pnpm test:int`           | Integration tests                 |

## Project layout

- `src/app/(site)` — public website routes
- `src/app/(payload)` — Payload admin and APIs
- `src/cms` — collections, globals, blocks, access, hooks
- `src/features` — domain queries and feature components
- `src/components` — shared UI, layout, block renderers
- `docker/` — Docker helpers; root `docker-compose.yml` starts Postgres
