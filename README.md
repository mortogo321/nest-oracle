# NestJS Oracle Monorepo Scaffold

Early-stage NestJS monorepo skeleton for a multi-service backend, set up to eventually integrate with an Oracle database and RabbitMQ messaging.

## What's inside

- Multi-app NestJS workspace with three apps: `api`, `server`, and `worker`, sharing a `libs/common` library
- `libs/common` contains placeholder `DatabaseModule` and `RmqModule` classes reserved for the planned Oracle/TypeORM and RabbitMQ integrations — not implemented yet
- Docker Compose files for development and production environments (currently empty placeholders)

## Tech stack

- NestJS 11 on the Express platform
- TypeScript, Jest for unit/e2e testing
- Yarn (yarn.lock committed; a bun.lock is also present)

## Quickstart

```bash
cd server
yarn install
yarn start:dev
```

This runs the default `server` app on port 3000. To run the `api` or `worker` app instead, use the Nest CLI's `-p` project flag or the app-specific scripts once configured.

## Structure

```
server/
├── apps/
│   ├── api/       # API app
│   ├── server/    # Default app
│   └── worker/    # Worker app
└── libs/
    └── common/    # Shared DatabaseModule, RmqModule (scaffolded, not yet implemented)
docker/
├── compose.development.yml   # placeholder
└── compose.production.yml    # placeholder
```

Note: this is a starting-point scaffold — Oracle/TypeORM and RabbitMQ wiring are planned but not yet implemented in the codebase.
