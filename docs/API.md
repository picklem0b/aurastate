# AuraState API Reference

**Base URL:** `http://localhost:4000` (dev) | `https://api.aurastate.app` (prod)

## Authentication

All protected endpoints require:
```
Authorization: Bearer <clerk_session_token>
```

## Endpoints

### Auth
| Method | Path | Description |
|--------|------|-------------|
| GET | `/auth/me` | Get current user profile |
| POST | `/auth/sync` | Sync user from Clerk webhook |

### Onboarding
| Method | Path | Description |
|--------|------|-------------|
| GET | `/onboarding/region/:code` | Get region curriculum config |
| POST | `/onboarding/complete` | Complete 13-card onboarding |

### Calendar
| Method | Path | Description |
|--------|------|-------------|
| GET | `/calendar/schedule` | Get generated study schedule |
| POST | `/calendar/generate` | Regenerate schedule with params |

### Education
| Method | Path | Description |
|--------|------|-------------|
| POST | `/education/socratic/respond` | Get next Socratic question |
| GET | `/education/topics/:subject/:grade` | List curriculum topics |
| GET | `/education/material/:topicId` | Get study material |

### Focus
| Method | Path | Description |
|--------|------|-------------|
| POST | `/focus/session/start` | Start focus session |
| POST | `/focus/session/end` | End session and save results |
| GET | `/focus/sessions` | Get session history |

### Mastery
| Method | Path | Description |
|--------|------|-------------|
| GET | `/mastery/tree` | Get mastery tree with weak points |
| POST | `/mastery/update` | Update mastery after quiz |

### Social
| Method | Path | Description |
|--------|------|-------------|
| GET | `/social/rooms` | List public War Rooms |
| POST | `/social/rooms` | Create new War Room |
| GET | `/social/rooms/:id/messages` | Get room messages |
| POST | `/social/rooms/:id/messages` | Send message to room |

### Health
| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Service health check |
