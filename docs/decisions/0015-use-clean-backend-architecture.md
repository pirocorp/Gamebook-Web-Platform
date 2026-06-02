# ADR-0015: Use Clean Architecture style for backend

## Status

Accepted

## Context

The backend will contain API endpoints, game rules, domain models, EF Core persistence, admin features, and tests.

The game engine should not be tightly coupled to ASP.NET or EF Core.

## Decision

Use a Clean Architecture style.

Suggested projects:

- `GameBook.Api`
- `GameBook.Core`
- `GameBook.Data`
- `GameBook.Tests`

Dependency direction:

- Core should not depend on API or Data.
- Data may depend on Core.
- API may depend on Core and Data.
- Tests may depend on all relevant projects.

## Reasons

- Keeps game logic testable.
- Prevents controllers from owning domain logic.
- Keeps EF Core concerns out of the rules engine.
- Helps AI agents place code correctly.

## Consequences

Positive:

- Better maintainability.
- Easier testing.
- Clearer boundaries.

Negative:

- Slightly more initial structure.
- Requires discipline not to bypass the architecture.
