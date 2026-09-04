# AuraState — Deployment Guide

## Local Development

```bash
# Start MongoDB + Redis
docker-compose up -d

# Push schema
pnpm db:push

# Seed data
pnpm db:seed

# Start dev servers
pnpm dev
```

## Production (Railway + Vercel)

### API (Railway)

1. Connect GitHub repo to Railway
2. Set environment variables:
   - `DATABASE_URL` — MongoDB Atlas connection string
   - `CLERK_SECRET_KEY` — Clerk backend secret
   - `OPENROUTER_API_KEY` — OpenRouter API key
   - `UPSTASH_REDIS_REST_URL` — Redis URL
   - `ALLOWED_ORIGINS` — Your domain
3. Railway auto-deploys from `dev` branch

### Web (Vercel)

1. Import repo to Vercel
2. Framework: Next.js, Root Directory: `apps/web`
3. Set environment variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_API_URL` — Your Railway API URL
   - `NEXT_PUBLIC_APP_URL` — Your Vercel domain
4. Vercel auto-deploys from `dev` branch

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MongoDB Atlas URL | Yes |
| `CLERK_SECRET_KEY` | Clerk backend secret | Yes |
| `OPENROUTER_API_KEY` | OpenRouter API key | Yes |
| `UPSTASH_REDIS_REST_URL` | Redis cache URL | Optional |
| `ALLOWED_ORIGINS` | CORS origins (comma-separated) | Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend key | Yes |
| `NEXT_PUBLIC_API_URL` | API server URL | Yes |
