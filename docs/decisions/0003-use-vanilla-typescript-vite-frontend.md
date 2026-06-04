# ADR-0003: Use Vanilla TypeScript and Vite for the frontend

## Status

Accepted

## Context

The frontend is primarily an interactive gamebook reader and admin interface.

The project intentionally avoids React, Vue, Angular, or another frontend framework in the MVP.

## Decision

Use Vanilla TypeScript, Vite, HTML, and CSS.

Use Vite as a multipage frontend for public and auth pages. The backend remains API-first, and frontend pages call API endpoints for data and actions.

Only the `/play/{gameId}` reader behaves like a single page application after initial page load.

## Reasons

- TypeScript provides type safety.
- Vite provides modern development tooling without forcing a framework.
- The player UI is mostly state rendering and event handling.
- Avoids unnecessary framework complexity in the first version.
- Keeps the frontend easy to understand and AI-editable.

## Consequences

Positive:

- Lightweight frontend.
- Easy to serve as static files.
- No framework lock-in.
- Good fit for the reader experience.
- Keeps public/auth pages and the reader in one frontend toolchain.

Negative:

- More manual structure is needed for views, routing, and components.
- As the admin UI grows, complexity must be managed carefully.
- Server-rendered Razor/MVC views are not used for MVP public or auth pages.
