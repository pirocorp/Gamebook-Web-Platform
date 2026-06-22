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

## Current implementation status

The target architecture is broader than the current codebase.

Implemented today:

- backend solution split into API, Core, Data, and Tests projects
- thin controllers calling MediatR queries
- read-only books slice
- health endpoint
- EF Core DbContext, mappings, repository, and initial migration
- PostgreSQL local runtime through Docker Compose

Current runtime data split:

- PostgreSQL currently stores only the seeded gamebook catalog metadata used by the books endpoints
- the playable gamebook package, including episodes, choices, initial state, conditions, and effects, is currently loaded from `content/gamebooks/{book-slug}/gamebook.json`

Still pending:

- frontend pages and Vite app structure
- Identity cookie authentication flows
- save game aggregates and persistence
- `/play/{gameId}` runtime flow
- game engine execution for episodes, choices, conditions, and effects

## Locked backend MVP decisions

For the first backend playable slice, use these constraints:

- runtime game data comes from the curated `content/gamebooks/{book-slug}/gamebook.json` package
- anonymous save persistence lives only in browser `localStorage`
- the anonymous save shape contains only `gamebookSlug`, `currentEpisodeKey`, and `playerState`
- full choice history is deferred
- supported mechanics are limited to `moneyAtLeast`, `addItem`, and `removeMoney`
- code-word branching and other unmodeled mechanics are deferred
- ASP.NET Core Identity remains part of the broader architecture, but is not part of this first backend slice

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

Current codebase note:

- `GameBook.Api`, `GameBook.Core`, `GameBook.Data`, and `GameBook.Tests` exist
- the `frontend/` app structure has not been implemented yet
- the current domain model is still minimal and does not yet include the planned engine-focused areas such as `GameEngine`, `Rules`, or `Effects`

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
