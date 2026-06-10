# Statecraft Online

Statecraft Online is a foundation shell for a web-based multiplayer nation simulation game inspired by nation identity sims, 2D strategy maps, roleplay news feeds, and character-agent grand strategy systems.

This repository is Foundation Step 1 only: a monorepo, shared domain types, Prisma schema, seeded demo world, Fastify API, Socket.IO scaffold, and React/Vite prototype UI.

## Requirements

- Node.js 20+
- npm 10+
- PostgreSQL 14+

## Setup

```bash
npm install
cp .env.example .env
```

Update `DATABASE_URL` in `.env` if your local PostgreSQL user, password, host, port, or database name differs.

On Windows, you can use the helper script instead:

```bat
test-and-run.bat
```

It creates `.env` from `.env.example` when needed, installs dependencies when missing, generates the Prisma client, runs typecheck/tests/build, and can launch the API and web dev servers.

## Database

Create the database in PostgreSQL, then run:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```

If you use Docker, this repo includes a local PostgreSQL service:

```bash
docker compose up -d postgres
npm run db:push
npm run prisma:seed
```

For quick local prototyping against an existing empty database, you can also use:

```bash
npm run db:push
npm run prisma:seed
```

## Development

Run the API:

```bash
npm run dev:api
```

Run the web app in another terminal:

```bash
npm run dev:web
```

Default local URLs:

- Web: `http://localhost:5173`
- API: `http://localhost:4000`
- Health check: `http://localhost:4000/health`

## Nation Creation Flow

Open `http://localhost:5173/create-nation` to found a customized nation. The wizard covers identity, government, economy, founding origin, ideology sliders, culture traits, flag colors, emblem, and starting package.

Submitting the wizard creates:

- Nation profile data.
- Nation stats.
- Starter map locations.
- Starter character agents.
- Starter military units.
- A founding nation post.

If PostgreSQL is unavailable, the API serves an in-memory fallback so the prototype flow remains playable. Persistent creation requires PostgreSQL plus:

```bash
npm run db:push
npm run prisma:seed
```

## Event Engine

Seed data includes 20 authored event templates. The events page is available at:

```text
http://localhost:5173/nation/demo-nation/events
```

Useful API endpoints:

- `GET /api/nations/:nationId/events`
- `POST /api/nations/:nationId/events/generate`
- `POST /api/nations/:nationId/advance-turn`
- `POST /api/events/:activeEventId/choose`
- `GET /api/nations/:nationId/event-history`
- `GET /api/event-templates`

Without PostgreSQL, the API uses an in-memory fallback for the demo nation so generation and resolution can still be tested. With PostgreSQL, run:

```bash
npm run db:push
npm run prisma:seed
```

## Validation

```bash
npm run prisma:generate
npm run typecheck
npm test
npm run build
```

If PowerShell blocks `npm.ps1`, use `npm.cmd` commands instead or run `test-and-run.bat`.

## Current Limitations

- No real authentication.
- Created nations use a demo user or in-memory fallback when PostgreSQL is unavailable.
- No production-ready authorization checks.
- No full combat simulation.
- Event generation is authored/static; there is no AI-generated event writing yet.
- No media upload storage.
- No advanced map rendering, fog of war, pathfinding, or war resolution.
- Socket.IO emits simple domain events only; it does not yet perform full multiplayer synchronization.

## Monorepo Layout

- `apps/web` - React + Vite + TypeScript frontend.
- `apps/api` - Fastify + TypeScript backend with Socket.IO scaffold.
- `packages/shared` - Shared TypeScript domain types.
- `prisma` - Prisma schema and demo seed data.
- `docs` - Design, architecture, and roadmap notes.
