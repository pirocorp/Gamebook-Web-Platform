# Architecture

## Overview

```text
Browser
  |
Vite multipage frontend
  |
HTTP requests
  |
ASP.NET Core API
  |
Controllers
  |
MediatR commands/queries
  |
Feature handlers
  |
GameBook.Core domain and game engine
  |
Repositories
  |
EF Core
  |
PostgreSQL
```

The game engine is generic and data-driven. Gamebooks are imported from data packages under `content/gamebooks/` and are not hardcoded into the engine.

The backend is API-first. Public and auth pages are Vite multipage HTML/TypeScript pages with classic full-page navigation. Only `/play/{gameId}` behaves like a single page application after the reader page loads.

## Backend projects

```text
GameBook.Api
  Controllers
  Features

GameBook.Core
  Domain
  GameEngine
  Rules
  Effects
  Interfaces

GameBook.Data
  DbContext
  Configurations
  Repositories
  Migrations

GameBook.Tests
```

## Main rules

- Controllers are thin and call MediatR.
- Feature handlers orchestrate use cases.
- Business and game rules live in `GameBook.Core`.
- Domain entities are rich and EF-free.
- EF Core mappings live in `GameBook.Data` using Fluent API.
- PostgreSQL schema changes use EF Core migrations.
- Browser authentication uses ASP.NET Core Identity cookies.
- The frontend does not store authentication tokens.
- The frontend does not own game rules.

## Routing model

Classic multipage-style routes:

```text
/books
/books/{slug}
/login
/register
/admin later
```

SPA behavior is used only for:

```text
/play/{gameId}
```
