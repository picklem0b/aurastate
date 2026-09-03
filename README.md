# AuraState — The Student Operating System

> **Version:** 1.0.0-alpha
> **Architecture:** pnpm Monorepo (Next.js 15 / Hono / MongoDB)
> **Standard:** South African CAPS Curriculum Aligned

---

## Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Next.js 15, TypeScript, Tailwind v4 |
| API        | Hono (Node.js 20)                |
| Database   | MongoDB Atlas (Prisma ORM)        |
| Auth       | Clerk                             |
| AI         | OpenRouter (free academic models) |
| Cache      | Upstash Redis                     |
| State      | Zustand                           |
| Monorepo   | pnpm workspaces + Turborepo       |
| Deploy     | Vercel (web) + Railway (API)      |

---

## Quick Start

```bash
# 1. Install pnpm
corepack enable && corepack prepare pnpm@9.0.0 --activate

# 2. Install dependencies
pnpm install

# 3. Set up environment
cp .env.example .env
# Edit .env with your keys

# 4. Start database
docker-compose up -d

# 5. Push schema to MongoDB
pnpm db:push

# 6. Seed curriculum data
pnpm db:seed

# 7. Start dev servers
pnpm dev
```

- **Web:** http://localhost:3000
- **API:** http://localhost:4000
- **API Health:** http://localhost:4000/health

---

## Core Systems

1. **Gatekeeper Onboarding** — 13-card state-machine with regional curriculum lock
2. **Chronos Calendar** — Predictive scheduler with weak-point injection
3. **Socratic Vault** — AI-powered interview engine with adaptive assessment
4. **Pulse Focus Engine** — Anti-cheat study timer with exponential decay
5. **War Rooms** — Discord-inspired community channels
6. **Streak System** — Daily study streaks with XP multiplier bonuses
7. **Flashcard Generator** — AI-generated exam-focused study cards

---

## Subjects (14 Core)

| Category    | Subjects |
|-------------|----------|
| Core        | Mathematics, Mathematical Literacy, Physical Sciences, Life Sciences |
| Languages   | English HL/FAL, Afrikaans HL/FAL |
| Commerce    | Accounting, Business Studies, Economics |
| Humanities  | Geography, History |
| Compulsory  | Life Orientation |

---

## Regional Support

- 🇿🇦 South Africa: All 9 provinces with CAPS/IEB curriculum mapping
- Western Cape: Auto-locks LO, Math/Lit, English HL, Afrikaans FAL
- Gauteng, KZN, Eastern Cape, Free State, Limpopo, Mpumalanga, North West, Northern Cape

---

## Monorepo Structure

```
aurastate/
├── apps/
│   ├── web/          # Next.js 15 frontend
│   └── services/     # Hono API server
├── packages/
│   ├── shared/       # Types, constants, validators
│   ├── database/     # Prisma schema + MongoDB
│   └── ui/           # Shared React components
└── docs/             # API reference, study guide
```

---

## Versioning

This project uses a custom versioning system: `v1.C.X`
- **C** = implementation/feature number
- **X** = revisions within that implementation

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

*Built for South African students. Designed for the world.*
