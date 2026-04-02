# AuraState — The Student Operating System

> **Version:** 1.0.0-alpha  
> **Architecture:** Distributed Polyglot (Next.js 15 / FastAPI 3.12 / PostgreSQL)  
> **Standard:** Industrial-Grade Performance & Zero-Friction UX

---

## Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Next.js 15+, TypeScript, Tailwind v4 |
| Auth       | Clerk                             |
| Backend    | FastAPI (Python 3.12+)            |
| Database   | PostgreSQL (primary), Supabase (alt) |
| ORM        | Prisma                            |
| State      | Zustand                           |
| Cache      | Redis                             |
| Deploy     | Vercel (web) + Railway/AWS (api)  |

---

## Quick Start

```bash
# 1. Install dependencies
cd apps/web && npm install
cd ../api && pip install -r requirements.txt

# 2. Set environment variables
cp .env.example .env.local

# 3. Run dev environment
docker-compose up -d        # Postgres + Redis
cd apps/web && npm run dev  # Next.js on :3000
cd apps/api && uvicorn main:app --reload  # FastAPI on :8000
```

---

## Core Systems

1. **Gatekeeper Onboarding** — 13-card state-machine with regional curriculum lock
2. **Chronos Calendar** — Predictive scheduler with weak-point injection
3. **Socratic Vault** — AI-powered interview engine with adaptive assessment
4. **Pulse Focus Engine** — Anti-cheat study timer with exponential decay
5. **War Rooms** — Discord-inspired community channels

---

## Monorepo Structure

```
aurastate/
├── apps/
│   ├── web/          # Next.js 15 frontend
│   └── api/          # FastAPI backend
├── packages/
│   ├── database/     # Prisma schema + migrations
│   └── ui-primitives/ # Shared shadcn components
└── tests/            # E2E Playwright suite
```

---

## Regional Support

- 🇿🇦 South Africa: CAPS / IEB curriculum mapping
  - Western Cape: Auto-locks LO, Math/Lit, English HL, Afrikaans FAL
  - Gauteng: Custom stream configuration
- Additional regions: Configurable via `regional_config.py`

---

*Built for South African students. Designed for the world.*
