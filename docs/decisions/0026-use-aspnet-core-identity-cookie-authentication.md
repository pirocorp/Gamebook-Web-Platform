# ADR-0026: Use ASP.NET Core Identity cookie authentication

## Status

Accepted

## Context

The MVP application consists of classic multipage-style pages, a `/play` SPA reader, and backend REST API endpoints. Initially all clients are browser based and served as part of the same web platform.

Earlier planning mentioned JWT authentication. This ADR replaces that approach for MVP browser authentication.

## Decision

Use ASP.NET Core Identity cookie authentication as the authentication mechanism for the entire MVP web application.

This includes:

- classic frontend pages
- `/play` SPA requests
- REST API endpoints

The API does not use JWT bearer authentication in MVP.

## API Authentication

Protected API endpoints use standard ASP.NET authorization.

Unauthenticated API requests must return `401 Unauthorized`.

Authenticated but unauthorized API requests must return `403 Forbidden`.

API endpoints must not redirect to HTML login pages.

## Frontend Behavior

Frontend code does not manage authentication tokens.

Do not use:

```text
localStorage token storage
sessionStorage token storage
Authorization: Bearer header
```

Frontend API requests rely on browser cookies:

```typescript
await fetch("/api/games/123/choice", {
    method: "POST",
    credentials: "include",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
});
```

## Cookie Rules

Development:

```text
HttpOnly = true
Secure = false
SameSite = Lax
```

Production:

```text
HttpOnly = true
Secure = true
SameSite = Lax
HTTPS required
```

## CSRF

CSRF protection is deferred from Milestone 1.

Because authentication uses cookies, unsafe operations require CSRF protection before public exposure.

Unsafe methods: POST, PUT, PATCH, DELETE.

Safe methods: GET, HEAD, OPTIONS.

## Future Extension

JWT bearer authentication may be added later for mobile applications, external API clients, integrations, or cross-origin deployments.

Adding JWT must not replace browser cookie authentication unless a future ADR supersedes this one.

## Consequences

The MVP authentication model is:

```text
ASP.NET Core Identity
  +
HttpOnly authentication cookie
  +
[Authorize]
```

for both frontend page access and API access.
