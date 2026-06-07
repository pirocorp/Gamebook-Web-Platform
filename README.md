# GameBook Web Platform

A public web platform for hosting and playing interactive gamebooks.

The project is designed as a generic gamebook engine, not as a hardcoded reader for one book. The first playable vertical slice uses a curated subset of **Котаракът и Спасението на Аврея** to validate the architecture.

## Stack

- Backend: ASP.NET Core, Controllers, MediatR, EF Core
- Domain: rich domain entities, aggregates, Clean Architecture boundaries
- Database: PostgreSQL, JSONB, EF Core migrations
- Authentication: ASP.NET Core Identity cookie authentication
- Frontend: Vanilla TypeScript, Vite multipage HTML/CSS, SPA behavior only for `/play`
- Local development: Docker Compose supported

The backend is API-first. Public and auth pages use classic full-page navigation through separate Vite HTML/TypeScript entry points. The game reader is the only MVP area that behaves like a single page application after it loads.

## Tooling Boundary

`tools/content-import/` is offline developer tooling for preparing `content/gamebooks/` packages.

It is not part of the runtime web app. When working on backend or frontend application features, prefer staying within the app code unless the task explicitly involves content import, generated package troubleshooting, or updates to the utility itself.

The utility defaults to full-book imports where the config includes every episode, and also supports curated subset imports for MVP slices when intentionally needed.

## Milestone 1

Milestone 1 focuses on a first playable vertical slice:

- `/books`
- `/books/{slug}`
- `/login`
- `/register`
- `/play/{gameId}`
- anonymous localStorage saves
- authenticated PostgreSQL saves
- backend-owned game logic
- seeded gamebook package from `content/gamebooks/`

Admin editor, full book import, production hosting, infrastructure hardening, CSRF protection, public CORS policy, password reset, email confirmation, and external login are out of scope for Milestone 1.

## Important docs

- `AGENTS.md` — AI/developer rules
- `ARCHITECTURE.md` — high-level architecture
- `ROADMAP.md` — implementation roadmap
- `docs/decisions/` — architecture decision records
- `docs/project/implementation-plan.md` — complete implementation plan
