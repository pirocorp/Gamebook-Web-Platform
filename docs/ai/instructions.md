# AI Instructions

## Follow ADRs

Before changing architecture, read:

```text
docs/decisions/
```

Important current decisions:

- PostgreSQL
- ASP.NET Core
- Vanilla TypeScript + Vite
- Controllers + MediatR
- Vertical Slice Architecture
- rich domain entities and aggregates
- EF Core migrations
- ASP.NET Identity cookie authentication
- single-language gamebooks in MVP

## Backend Changes

Add backend functionality as a vertical slice:

```text
Features/{Area}/{Action}/
```

Use:

- Command or Query
- Handler
- Response
- Validator when needed

Controllers stay thin and call MediatR.

Do not place business logic in controllers.

Do not place game rules directly in handlers.

Game rules belong in Core.

## Auth Changes

MVP uses ASP.NET Core Identity cookie authentication.

Do not add JWT bearer authentication unless explicitly requested by a new ADR.

Do not add frontend token storage.

Do not store tokens in localStorage/sessionStorage.

Frontend API calls should use cookies.

## Domain Changes

Domain entities live in Core.

No EF attributes in Core.

Use Fluent API in Data.

Repositories should be based around aggregate roots.

## Frontend Changes

Do not introduce a frontend framework.

Use Vanilla TypeScript.

Classic page behavior for:

- `/books`
- `/books/{slug}`
- `/login`
- `/register`

SPA behavior only for:

- `/play/{gameId}`

## Database Changes

Use EF Core migrations.

Do not manually edit schema.

Do not use `EnsureCreated()` for app schema.
