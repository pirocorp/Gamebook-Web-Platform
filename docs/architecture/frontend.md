# Frontend Architecture

## Stack

- Vanilla TypeScript
- Vite
- HTML
- CSS
- no frontend framework
- API-first backend integration

The frontend is a Vite multipage app. Public and auth pages are separate HTML entry points rendered by Vanilla TypeScript in the browser after loading data from backend API endpoints.

ASP.NET Razor/MVC views are not used for MVP public or auth pages.

## Routing

Classic multipage-style navigation:

```text
/books
/books/{slug}
/login
/register
```

Navigating between these pages is normal full-page browser navigation.

SPA behavior only for:

```text
/play/{gameId}
```

For anonymous games, `{gameId}` is a browser-only local save id stored in localStorage. It is not a server-side save id.

Anonymous rule execution uses stateless backend endpoints. The frontend sends the current local save state and stores the updated state returned by the backend.

## Authentication

Frontend does not store authentication tokens. Browser authentication uses HttpOnly cookies issued by ASP.NET Core Identity.

Login and register pages are Vite multipage frontend pages. They submit credentials to auth API endpoints and rely on the browser-managed HttpOnly cookie returned by ASP.NET Core Identity.

API calls should use:

```typescript
fetch(url, { credentials: "include" });
```

## Game logic

Frontend renders the state returned by the backend. It must not evaluate game rules authoritatively.
