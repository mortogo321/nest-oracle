# nest-oracle

[![CI](https://github.com/mortogo321/nest-oracle/actions/workflows/ci.yml/badge.svg)](https://github.com/mortogo321/nest-oracle/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-26.10-blue.svg)](./server/Dockerfile)
[![Bun](https://img.shields.io/badge/bun-1.4.2-black.svg)](./server/package.json)

NestJS monorepo scaffold — multi-app workspace (`api`, `server`, `worker`) sharing `libs/common`, with Oracle/RabbitMQ integration points.

> Scaffold status: the Oracle (TypeORM) and RabbitMQ (microservices) wiring is **planned but not yet implemented**. `DatabaseModule` / `RmqModule` expose validated, test-covered stubs so every app boots and stays healthy without live infra. Compose ships RabbitMQ today; Oracle is a commented opt-in until the integration lands.

## Tech stack

- NestJS 12 (Express) · TypeScript 5.9 strict (`noUncheckedIndexedAccess`) · Vitest 5 · Biome
- `@nestjs/config` (zod-validated env) · `@nestjs/terminus` health · `helmet` + CORS + `ValidationPipe` + throttler
- Bun-first (`bun.lock`, `packageManager: bun@1.4.2`) · Node 26 runtime · pinned Docker images
- RabbitMQ 4.3.5 (compose) · Oracle Free 23-slim (opt-in, commented)

## Quickstart

```bash
cd server
bun install
bun run start:dev        # default app (server) on :3000
bun run start:dev api    # api app on :8000
bun run start:dev worker # worker app on :9000
```

With infra:

```bash
docker compose -f docker/compose.development.yml up --build
```

## Structure

```
server/
├── apps/
│   ├── api/       # :8000 — API app
│   ├── server/    # :3000 — default app
│   └── worker/    # :9000 — worker app
└── libs/
    └── common/    # env (zod), health (/health·/ready·/live), database + rmq stubs
docker/
├── compose.development.yml
└── compose.production.yml
```

## API

| App | Root | Health | Ready | Live |
|-----|------|--------|-------|------|
| api (`:8000`) | `GET /` | `GET /health` | `GET /health/ready` | `GET /health/live` |
| server (`:3000`) | `GET /` | `GET /health` | `GET /health/ready` | `GET /health/live` |
| worker (`:9000`) | `GET /` | `GET /health` | `GET /health/ready` | `GET /health/live` |

## Environment

| Variable | Default | Notes |
|----------|---------|-------|
| `PORT` | per-app (8000/3000/9000) | |
| `APP_NAME` | per-app | surfaced in `/health/live` |
| `CORS_ORIGINS` | `http://localhost:3000` | comma-separated; `*` forces `credentials: false` |
| `RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_MS` | `100` / `60000` | throttler |
| `RABBITMQ_URL` | `amqp://guest:guest@localhost:5672` | validated, never logged raw |
| `ORACLE_DSN` | `''` (not-configured) | set to mark DB `configured` |

## Scripts (in `server/`)

```bash
bun run typecheck   # tsc --noEmit (strict)
bun run ci:check    # biome ci
bun run test        # vitest run (16 unit tests)
bun run test:e2e    # vitest e2e (6 tests: / + /health/live per app)
bun run build:all   # nest build + tsc-alias per app
bun run validate    # typecheck + ci:check
```

Production entries (tsc monorepo emit; `tsc-alias` rewrites `@app/common`
to relative paths so plain `node` runs them):

| App | Entry |
|-----|-------|
| api | `dist/api/apps/api/src/main.js` |
| server | `dist/server/apps/server/src/main.js` |
| worker | `dist/worker/apps/worker/src/main.js` |

## Docker

- Build context is `server/`: `docker build -f server/Dockerfile --target production server/`
- Targets: `development` (hot reload) · `production` (lean `node:26.10-alpine`, non-root, `HEALTHCHECK`)
- Pinned images: `oven/bun:1.4.2-alpine`, `node:26.10-alpine`, `rabbitmq:4.3.5-management-alpine`

## CI

`quality` (biome + typecheck + vitest) → `build` (`build:all`) → `docker` (production build, no push). Dependabot weekly (npm/docker/actions).

## Roadmap

- [ ] Wire TypeORM + `oracledb` in `DatabaseModule` (thin-client, `ORACLE_DSN`, migration story)
- [ ] Wire `@nestjs/microservices` RMQ `ClientProxy` in `RmqModule` (connection + retry + health indicator)
- [ ] Per-app `.env.app` files + Swagger per service
- [x] e2e coverage for `/health/live` per app (6 e2e tests, green)

## Pins

- TypeScript pinned `~5.9.3`: Nest 12 + TS 7 has no verified build story yet.
- Oracle image pinned `gvenzl/oracle-free:23-slim` (commented until wired).
