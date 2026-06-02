# ADR-0016: Use ASP.NET Core Identity initially

## Status

Accepted

## Context

The MVP should support authenticated users and cloud saves.

The initial authentication choice should be practical for a C# / ASP.NET Core application.

Alternatives considered:

- ASP.NET Core Identity with PostgreSQL and JWT.
- External providers only.
- Both local accounts and external providers from the start.

## Decision

Initially use ASP.NET Core Identity with PostgreSQL-backed user tables.

The MVP uses ASP.NET Core Identity with HttpOnly cookie authentication for browser pages and API endpoints.
JWT bearer authentication is not used in MVP.

External providers may be added later.

## Reasons

- Native ASP.NET Core support.
- Works with EF Core.
- Supports local email/password accounts.
- Fits the current backend stack.
- Avoids depending on external identity providers in the MVP.

## Consequences

Positive:

- Clear path to authenticated saves.
- Good integration with roles and admin accounts.
- Works locally in Docker development.

Negative:

- Requires account management.
- Requires correct cookie security configuration.
- Requires CSRF protection for cookie-authenticated unsafe requests.
