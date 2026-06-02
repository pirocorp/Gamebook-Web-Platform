# ADR-0002: Use ASP.NET Core for the backend

## Status

Accepted

## Context

The backend must expose APIs, execute game logic, validate player choices, manage saves, support authentication, and provide admin functionality.

## Decision

Use C# with ASP.NET Core Web API.

## Reasons

- Strong backend framework.
- Good performance.
- Good Docker support.
- Strong typing helps maintain complex rules and domain models.
- Excellent integration with Entity Framework Core.
- Good OpenAPI/Swagger support.
- Suitable for long-term growth.

## Consequences

Positive:

- Backend logic can be structured cleanly and tested.
- Good fit for future authentication, admin, and cloud deployment needs.

Negative:

- Requires maintaining a separate frontend build pipeline.
- Requires discipline to keep controllers thin and domain logic out of the API layer.
