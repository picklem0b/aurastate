# AuraState — Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Calendar  │  │  Vault   │  │  Focus   │  │  Rooms   │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       └──────────────┼──────────────┼──────────────┘        │
│                      │              │                        │
│              ┌───────┴──────────────┴───────┐              │
│              │      API Client (typed)       │              │
│              └───────────────┬───────────────┘              │
└──────────────────────────────┼──────────────────────────────┘
                               │ HTTP/JSON
┌──────────────────────────────┼──────────────────────────────┐
│                      API (Hono)                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │Education │  │  Focus   │  │  Social  │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       └──────────────┼──────────────┼──────────────┘        │
│              ┌───────┴──────────────┴───────┐              │
│              │     Services Layer            │              │
│              │  mastery, scheduler, streak   │              │
│              │  socratic-ai, flashcards      │              │
│              └───────────────┬───────────────┘              │
│                      ┌───────┴───────┐                      │
│                      │  Prisma ORM   │                      │
│                      └───────┬───────┘                      │
└──────────────────────────────┼──────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │ MongoDB  │  │  Redis   │  │OpenRouter│                 │
│  │ (Atlas)  │  │ (Upstash)│  │   (AI)   │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

1. **Onboarding:** User → 13 cards → POST /onboarding/complete → User + Subjects + Streak created
2. **Study Session:** User starts focus → Timer runs → End session → XP + Streak updated
3. **Learning:** User opens topic → Socratic AI asks questions → Mastery updated
4. **Calendar:** System generates schedule → Weak points injected → Review sprints added

## Key Algorithms

- **Mastery:** Weighted rolling average (70% new, 30% historical), 34.85% threshold
- **Scheduler:** Time allocation proportional to weakness, 14-day lookahead
- **Streak:** Consecutive days = multiplier (1.1x → 3.0x), gaps reset
- **Focus:** Exponential XP decay on tab blur, 10s grace period, 10m void threshold
