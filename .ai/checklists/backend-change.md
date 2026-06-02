# Backend Change Checklist

Before finishing a backend change:

## Architecture

- [ ] Correct vertical slice folder used.
- [ ] Controller remains thin.
- [ ] MediatR command/query added where appropriate.
- [ ] Handler orchestrates only.
- [ ] Domain logic remains in Core.
- [ ] Game rules remain in GameEngine/Rules/Effects.

## Domain

- [ ] Aggregate boundaries respected.
- [ ] No repository added for child entities without justification.
- [ ] No EF attributes added to Core.
- [ ] Invariants are enforced in domain entities where appropriate.

## Persistence

- [ ] EF Fluent API configuration updated if needed.
- [ ] EF migration added if schema changed.
- [ ] JSONB mappings reviewed if dynamic data changed.
- [ ] Existing migrations preserved.

## Authentication

- [ ] Cookie authentication model preserved.
- [ ] No JWT bearer auth introduced.
- [ ] No token localStorage/sessionStorage introduced.
- [ ] Protected endpoints use `[Authorize]`.
- [ ] API returns 401/403 instead of login-page redirects.

## Tests

- [ ] Handler tests added or updated.
- [ ] Domain tests added or updated.
- [ ] Game engine/rules/effects tests added if logic changed.

## Docs

- [ ] ADR update considered.
- [ ] Architecture docs updated if needed.
- [ ] Implementation plan updated if scope changed.
