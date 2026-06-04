# Frontend Architecture

## Stack

- Vanilla TypeScript
- Vite
- HTML
- CSS
- no frontend framework

## Routing

Classic multipage-style navigation:

```text
/books
/books/{slug}
/login
/register
```

SPA behavior only for:

```text
/play/{gameId}
```

For anonymous games, `{gameId}` is a browser-only local save id stored in localStorage. It is not a server-side save id.

## Authentication

Frontend does not store authentication tokens. Browser authentication uses HttpOnly cookies issued by ASP.NET Core Identity.

API calls should use:

```typescript
fetch(url, { credentials: "include" });
```

## Game logic

Frontend renders the state returned by the backend. It must not evaluate game rules authoritatively.
