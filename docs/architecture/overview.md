# Architecture Overview

The platform is a generic gamebook engine.

```text
Browser
  |
Vanilla TypeScript + Vite
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
