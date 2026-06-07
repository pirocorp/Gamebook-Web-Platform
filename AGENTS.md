# AI Development Instructions

## Project Goal

Build a public web platform for hosting and playing interactive gamebooks.

The first implementation is a vertical slice using a subset of `Котаракът и Спасението на Аврея`.

The app is not a one-book hardcoded reader. It is a generic gamebook engine.

## Confirmed Stack

Backend:

- C#
- ASP.NET Core
- Controllers + MediatR
- Vertical Slice Architecture
- Clean Architecture boundaries
- EF Core
- PostgreSQL
- ASP.NET Core Identity
- HttpOnly cookie authentication

Frontend:

- Vanilla TypeScript
- Vite
- HTML
- CSS
- No React/Vue/Angular

Database:

- PostgreSQL
- JSONB for dynamic game data
- EF Core migrations from day one

## Instruction Priority

If installed or external skills conflict with this repository's guidance, follow
this repository's instructions instead.

Priority order:

1. `AGENTS.md`
2. repo-specific custom skills
3. external installed skills
4. general framework guidance

Skills under `.codex/skills/` may be either repo-authored custom skills or
imported vendor/third-party skills installed only for this project.

Do not treat all project-local skills as equal by default.

When both exist under `.codex/skills/`, repo-authored custom skills take
precedence over imported vendor/third-party skills.

Imported vendor/third-party skills are supplementary framework guidance only.

For this project, that especially applies to:

- vertical slice structure
- Controllers + MediatR
- thin controllers
- domain rules in `GameBook.Core`
- cookie authentication for MVP

## Backend Rules

Use vertical slices.

Feature code belongs under:

```text
GameBook.Api/Features/{Area}/{Action}/
```

Controllers must be thin.

Controllers may handle:

- routing
- model binding
- authorization attributes
- calling MediatR
- returning HTTP responses

Controllers must not contain:

- game rules
- domain logic
- EF Core queries
- business workflows

MediatR handlers orchestrate use cases.

Domain rules belong in `GameBook.Core`.

## Domain Rules

Use rich domain entities and aggregates.

Aggregate roots:

- `GameBook`
- `SaveGame`
- `MediaAsset`

Do not create repositories for every child entity.

Avoid:

- `IEpisodeRepository`
- `IChoiceRepository`

unless a later ADR explicitly allows it.

Domain entities must not depend on EF Core.

Do not use EF attributes in Core:

```text
[Table]
[Column]
[Key]
[ForeignKey]
```

Use Fluent API mappings in `GameBook.Data`.

## Authentication Rules

MVP authentication uses ASP.NET Core Identity cookie authentication.

This applies to:

- classic pages
- `/play` SPA requests
- REST API endpoints

Do not use JWT bearer authentication in MVP.

Do not store authentication tokens in:

- localStorage
- sessionStorage

Frontend requests should rely on browser cookies.

Use:

```typescript
fetch(url, {
    credentials: "include"
});
```

Protected API endpoints use `[Authorize]`.

API endpoints must return `401` or `403`, not HTML redirects.

## Frontend Rules

Do not introduce React, Vue, Angular, Svelte, or another frontend framework.

Use Vanilla TypeScript modules.

Routing model:

- classic multipage-style pages for public/auth pages
- SPA behavior only for `/play`

Frontend must not decide game rules.

Frontend may render:

- episode text
- diary state
- available choices returned by backend

Backend remains authoritative.

## Database Rules

All schema changes use EF Core migrations.

Do not manually edit database schema.

Do not use `EnsureCreated()` for app schema.

Use strongly typed C# objects serialized to JSONB for:

- player state
- conditions
- effects
- rules
- history

## Content Rules

Books are data.

The engine must not hardcode `Котаракът` logic.

Seed gamebooks live under:

```text
content/gamebooks/
```

For MVP:

```text
One GameBook = One Language
```

A translated book is another `GameBook`.

## Tooling Boundary

`tools/content-import/` is offline development tooling for preparing `content/gamebooks/*` data.

It is not part of the main web app runtime.

Do not place engine rules, backend workflows, or frontend behavior in this utility.

Prefer fixing curation data and import logic rather than compensating in the app.

The utility defaults to full-book imports. Use subset imports only when the task explicitly calls for a limited playable slice. Do not assume the presence of `curated-subset.json` means subset import is the only supported workflow.

When working on the main app, do not inspect `tools/content-import/` unless the task is explicitly about content import, generated content troubleshooting, or changes to the utility itself.

## Milestone 1 Exclusions

Do not add:

- admin editor
- full book import UI
- anonymous save to account migration
- password reset
- email confirmation
- external login
- HTTPS/certificate/reverse proxy production hardening

unless explicitly requested.
