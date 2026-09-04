# Contributing to AuraState

## Git Workflow

### Versioning: `v1.C.X`

- **C** = implementation/feature (increment for new features)
- **X** = revisions within that feature (increment for fixes/improvements)

Every new feature starts at `v1.C.0`. Subsequent changes increment X.

### Commits

- One meaningful change per commit
- Short, descriptive sentence
- No contributor footers

### Tags

- Annotated tags with `-m` for detailed descriptions
- Tag messages describe the overall change
- Never modify or rewrite existing tags

## Development

```bash
pnpm install          # Install all dependencies
pnpm dev              # Start all dev servers
pnpm build            # Build all packages
pnpm test             # Run all tests
pnpm type-check       # Type-check all packages
```

## Adding a New Feature

1. Create a new branch from dev
2. Make your changes (one commit per meaningful step)
3. Tag each version with `v1.C.X`
4. Push to dev branch
5. Create PR to main when ready

## Code Style

- TypeScript strict mode
- Prefer editing existing files
- Use workspace protocol for cross-package deps
- Follow existing naming conventions
