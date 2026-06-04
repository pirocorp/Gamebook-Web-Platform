# Architecture Overview

The platform is a generic gamebook engine.

```text
Browser
  |
Vite multipage frontend
  |
HTTP API calls
  |
ASP.NET Core controllers
  |
MediatR feature handlers
  |
GameBook.Core domain and engine
  |
EF Core repositories
  |
PostgreSQL
```

Books are data packages imported from `content/gamebooks/`.

The backend is API-first. Public and auth pages are separate Vite HTML/TypeScript entry points with normal full-page navigation. The reader at `/play/{gameId}` is the only MVP area with SPA-style behavior after initial page load.
