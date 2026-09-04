FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY apps/services/package.json ./apps/services/
COPY packages/shared/package.json ./packages/shared/
COPY packages/database/package.json ./packages/database/
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/services/node_modules ./apps/services/node_modules
COPY . .
RUN cd apps/services && pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 appuser
COPY --from=builder /app/apps/services/dist ./dist
COPY --from=builder /app/apps/services/node_modules ./node_modules
COPY --from=builder /app/apps/services/package.json ./
USER appuser
EXPOSE 4000
CMD ["node", "dist/index.js"]
