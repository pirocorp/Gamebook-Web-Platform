# Architecture Decision Records

This folder contains project-level Architecture Decision Records (ADRs).

## Status values

- Accepted: decision is agreed and should be followed.
- Proposed: likely direction, but not finalized.
- Needs discussion: decision is intentionally open.
- Superseded: replaced by a newer ADR.

## ADR list

| ADR | Title | Status |
|---|---|---|
| 0001 | Use PostgreSQL as the primary database | Accepted |
| 0002 | Use ASP.NET Core for the backend | Accepted |
| 0003 | Use Vanilla TypeScript and Vite for the frontend | Accepted |
| 0004 | Use Docker Compose for local development | Accepted |
| 0005 | Backend owns game logic | Accepted |
| 0006 | Use JSONB for dynamic game data | Accepted |
| 0007 | Support original text mode and interactive mode | Accepted |
| 0008 | Support anonymous and authenticated play | Accepted |
| 0009 | Admin-only book management initially | Accepted |
| 0010 | Support multilingual content from the start | Accepted, refined by ADR-0025 |
| 0011 | Support media assets from the start | Accepted |
| 0012 | Use AI-assisted development workflow | Accepted |
| 0013 | Version gamebooks | Accepted, postponed for MVP |
| 0014 | Use localStorage for anonymous saves | Accepted |
| 0015 | Use Clean Architecture style for backend | Accepted |
| 0016 | Use ASP.NET Core Identity initially | Accepted, refined by ADR-0026 |
| 0017 | Store media files on disk initially | Accepted |
| 0018 | Require backend service tests where practical | Accepted |
| 0019 | Use REST first, keep GraphQL possible later | Accepted |
| 0020 | Use hybrid routing: classic pages plus `/play` SPA | Accepted |
| 0021 | Start with one Vite frontend, structured for later split | Accepted |
| 0022 | Use Vertical Slice Architecture with MediatR | Accepted |
| 0023 | Use EF Core migrations for database evolution | Accepted |
| 0024 | Use rich domain entities, aggregates, and Fluent API persistence mapping | Accepted |
| 0025 | Use single-language gamebooks in MVP | Accepted |
| 0026 | Use ASP.NET Core Identity cookie authentication | Accepted |

All ADRs 0001-0026 are accepted. ADR-0010 and ADR-0016 are refined by later ADRs for MVP implementation details.
