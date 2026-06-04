# ADR-0020: Frontend routing strategy

## Status

Accepted

## Decision

Use a hybrid Vite routing approach.

The backend remains API-first. Public and auth pages are Vite multipage HTML/TypeScript entry points that call backend API endpoints for data and actions.

Public areas behave like a classic multipage website with full-page navigation.

Examples:

/books
/books/book-slug
/login
/register


Interactive areas behave as single page applications.

Examples:

/play/{id}

Admin:
No SPA in MVP

## Reasons

- Better public website experience.
- Better future SEO possibilities.
- Game reader remains fast and app-like.
- Fits future community platform goals.
- Keeps MVP frontend implementation consistent with Vanilla TypeScript and Vite.

## Consequences

- Public and auth pages are not server-rendered ASP.NET Razor/MVC views in MVP.
- The browser loads a separate HTML page for each public/auth route.
- Each page uses TypeScript to call API endpoints and render page content.
- `/play/{id}` is the only MVP route with SPA-style behavior after initial page load.
