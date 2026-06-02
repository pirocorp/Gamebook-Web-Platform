# ADR-0026: Use ASP.NET Core Identity cookie authentication

## Status

Accepted

## Context

The MVP application consists of:

- Classic multipage-style public pages.
- Classic multipage-style authentication pages.
- A `/play` SPA reader.
- Backend REST API endpoints.

Initially all clients are browser based and served as part of the same web platform.

The MVP does not require:

- mobile clients
- third-party API consumers
- external integrations
- cross-origin frontend/backend deployment

Earlier planning mentioned JWT authentication. This ADR replaces that approach for MVP browser authentication.

## Decision

Use ASP.NET Core Identity cookie authentication as the authentication mechanism for the entire MVP web application.

This includes:

- classic frontend pages
- `/play` SPA requests
- REST API endpoints

The API does not use JWT bearer authentication in MVP.

Authentication flow:

```text
Login request
      |
ASP.NET Identity validates credentials
      |
Server issues encrypted HttpOnly authentication cookie
      |
Browser stores cookie automatically
      |
Browser sends cookie on later API requests
      |
ASP.NET authentication middleware validates cookie
      |
[Authorize] allows or blocks access
```

## API Authentication

Protected API endpoints use standard ASP.NET authorization.

Example:

```csharp
[Authorize]
[HttpPost("/api/games/{saveId}/choice")]
public async Task<IActionResult> ExecuteChoice(
    Guid saveId,
    ExecuteChoiceRequest request,
    CancellationToken cancellationToken)
{
    // Controller remains thin and sends a MediatR command/query.
}
```

Unauthenticated API requests must return:

```text
401 Unauthorized
```

Authenticated but unauthorized API requests must return:

```text
403 Forbidden
```

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

`Secure = false` is allowed only for local HTTP development.

## CSRF

Because authentication uses cookies, unsafe operations require CSRF protection.

Unsafe methods:

```text
POST
PUT
PATCH
DELETE
```

Safe methods:

```text
GET
HEAD
OPTIONS
```

CSRF protection should be implemented before exposing authenticated unsafe actions publicly.

## Anonymous Play

Anonymous play does not require authentication.

Anonymous users use browser localStorage saves.

Authenticated users use PostgreSQL server-side saves.

The app does not migrate anonymous saves into accounts in MVP.

## Future Extension

JWT bearer authentication may be added later for:

- mobile applications
- external API clients
- integrations
- cross-origin frontend/backend deployments

Possible future model:

```text
Browser clients
    |
    ASP.NET Identity cookie authentication

External clients
    |
    JWT bearer authentication
```

Adding JWT must not replace browser cookie authentication unless a future ADR supersedes this one.

## Reasons

Positive:

- Better fit for browser-based MVP.
- Works naturally with classic multipage-style pages.
- Works with the `/play` SPA.
- No token exposure to JavaScript.
- Avoids localStorage token security concerns.
- Avoids CORS complexity in MVP.
- Aligns with ASP.NET Core Identity defaults.

Negative:

- Less suitable for external clients.
- Requires CSRF protection for unsafe requests.
- Requires correct API behavior to avoid login-page redirects.
- Requires HTTPS before production use.

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

The implementation plan, frontend instructions, and AI instructions must not mention JWT/localStorage as the MVP browser authentication mechanism.
