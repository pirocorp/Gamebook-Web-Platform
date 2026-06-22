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

The current implementation runs the frontend through a dedicated Vite container
in Docker Compose and exposes it on `http://localhost:5173`.

## Locked MVP UI assumptions

The current frontend slice should implement these assumptions:

- `/books` should feel like an editorial library page with a warm, bookish presentation
- `/books/{slug}` should present one book in a focused details layout with a clear start action
- `/play/{gameId}` should use a reading-first layout:
  - centered main story column
  - separate diary panel on desktop
  - diary section stacked below the story on mobile
  - large choice actions below the episode text
- the diary should display `money`, `items`, `skills`, `codeWords`, and `notes`
- anonymous saves should use these browser keys:
  - `gamebook.play.saves`
  - `gamebook.play.activeSaveId`

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

Recommended frontend flow:

- `/books` loads the catalog from `GET /api/books`
- `/books/{slug}` loads book details from `GET /api/books/{slug}`
- starting play uses `POST /api/games/anonymous/start`
- restoring play uses `POST /api/games/anonymous/state`
- submitting a choice uses `POST /api/games/anonymous/choice`
- the browser persists the returned anonymous save in `localStorage`

Current implementation note:

- the frontend route layer is handled by Vite rewrites for `/books`, `/books/{slug}`, and `/play/{gameId}`
- the frontend proxies `/api` requests to the backend instead of hardcoding browser-side cross-origin calls

## Authentication

Frontend does not store authentication tokens. Browser authentication uses HttpOnly cookies issued by ASP.NET Core Identity.

Login and register pages are Vite multipage frontend pages. They submit credentials to auth API endpoints and rely on the browser-managed HttpOnly cookie returned by ASP.NET Core Identity.

API calls should use:

```typescript
fetch(url, { credentials: "include" });
```

## Game logic

Frontend renders the state returned by the backend. It must not evaluate game rules authoritatively.
