# nest-oracle — multi-app NestJS API (bun-first, pinned runtimes)
# Build context: server/
#
# Targets: development (hot reload) | production (lean node runtime).
# One image serves all three apps; compose overrides CMD per service:
#   node dist/<app>/apps/<app>/src/main.js  (tsc monorepo emit; tsc-alias
#   rewrites the @app/common alias to relative paths so plain node runs it)

# --- deps: install with bun ---
FROM oven/bun:1.4.2-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# --- development: hot reload via nest --watch ---
FROM oven/bun:1.4.2-alpine AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000 8000 9000
CMD ["bun", "run", "start:dev"]

# --- builder: compile all three apps ---
FROM oven/bun:1.4.2-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build:all

# --- production: minimal node runtime, non-root ---
FROM node:26.10-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app
USER nestjs
EXPOSE 3000 8000 9000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://localhost:'+(process.env.PORT||3000)+'/health/live').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
# Per-service healthchecks live in compose (ports differ per service).
CMD ["node", "dist/server/apps/server/src/main.js"]
