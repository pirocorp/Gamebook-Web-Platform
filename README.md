# GameBook Web Platform

A public web platform for hosting and playing interactive gamebooks.

Run commands from the repository root. Project commands may use repo-relative
paths.

## Documentation

### Purpose

This repository contains the runtime web application for the GameBook platform.

The platform is designed as a generic gamebook engine, not as a hardcoded
reader for one book. The first playable vertical slice uses a curated subset of
`Котаракът и Спасението на Аврея` to validate the architecture.

### Current Stack

- backend: ASP.NET Core, controllers, MediatR, EF Core
- domain: rich domain entities, aggregates, Clean Architecture boundaries
- database: PostgreSQL, JSONB, EF Core migrations
- authentication target: ASP.NET Core Identity cookie authentication
- frontend: Vanilla TypeScript, Vite multipage HTML/CSS, SPA behavior only for `/play`
- local development: Docker Compose supported

### Current Implementation Baseline

The current implementation pass uses these concrete choices:

- target `.NET 10`
- use `xUnit` for backend tests
- use `MediatR` under the available Community license
- run PostgreSQL and the backend API in Docker Compose
- expose the API container on `http://localhost:8080`
- postpone ASP.NET Core Identity implementation to the next vertical slice

### Current Progress Snapshot

The repository is currently in an active Phase 1 backend vertical-slice state.

Current implementation note:

- PostgreSQL currently stores the seeded book catalog metadata used by the books endpoints
- the playable runtime content still comes directly from `content/gamebooks/{book-slug}/gamebook.json`

Implemented today:

- ASP.NET Core solution with `GameBook.Api`, `GameBook.Core`, `GameBook.Data`, and `GameBook.Tests`
- MediatR wired into the API
- EF Core + PostgreSQL data access
- initial EF Core migration
- Docker Compose setup for API + PostgreSQL
- automatic migration apply on API startup for local development
- health endpoint at `GET /api/health`
- read-only book endpoints at `GET /api/books` and `GET /api/books/{slug}`
- curated `gamebook.json` package loading from `content/gamebooks/`
- anonymous stateless game endpoints for start, state, and choice execution
- backend rule execution for `moneyAtLeast`, `addItem`, and `removeMoney`
- automatic book catalog seeding from the curated package
- Vite frontend for `/books`, `/books/{slug}`, and `/play/{gameId}`
- anonymous localStorage persistence using `gamebook.play.saves` and `gamebook.play.activeSaveId`
- frontend Docker container exposed on `http://localhost:5173`
- backend and domain test coverage with `xUnit`
- verified Docker runtime, live Scalar API UI, and live frontend routes

Not implemented yet:

- ASP.NET Core Identity cookie authentication
- authenticated saves
- code-word branching and other later-phase mechanics

### Verification Rule

Before considering backend work done, verify it in this order:

1. `build`
2. `test`
3. `run`
4. hit the actual endpoint(s)

### Project Structure

Files and folders:

- `backend/GameBook.Api/`: ASP.NET Core API entry point, controllers, feature slices
- `backend/GameBook.Core/`: domain model and core interfaces
- `backend/GameBook.Data/`: EF Core DbContext, mappings, repositories
- `backend/GameBook.Tests/`: xUnit test project for backend/domain coverage
- `frontend/`: Vite frontend app
- `content/gamebooks/`: engine-ready gamebook packages
- `content/source/`: source material and curation inputs
- `tools/content-import/`: offline content import utility
- `docs/`: architecture, ADRs, implementation docs, and runbooks

### Runtime And Tooling Boundary

This repository has two distinct parts:

- the runtime web application under `backend/` and `frontend/`
- the offline content import tooling under `tools/content-import/`

The content import utility prepares `content/gamebooks/*` data but is not part
of the runtime app. When working on backend or frontend application features,
prefer staying within the app code unless the task explicitly involves content
import, generated package troubleshooting, or updates to the utility itself.

### Milestone 1 Scope

Milestone 1 focuses on a first playable vertical slice:

- `/books`
- `/books/{slug}`
- `/play/{gameId}`
- anonymous localStorage saves
- backend-owned game logic
- seeded gamebook package from `content/gamebooks/`

Current status relative to Milestone 1:

- done: backend foundation, database foundation, Docker local setup, health endpoint, book list endpoint, book details endpoint, anonymous game start/state/choice endpoints, curated package loading, frontend pages, anonymous localStorage integration, backend test project
- not started or still pending: authenticated saves, auth pages, broader game engine expansion

### Locked Milestone 1 Backend Decisions

The backend MVP for the first playable slice is locked to these decisions:

1. Gamebook source for runtime:
   use the curated package under `content/gamebooks/{book-slug}/gamebook.json` as the runtime contract for the first slice
2. Anonymous save shape:
   save `gamebookSlug`, `currentEpisodeKey`, and `playerState`
3. Supported mechanics in the first backend slice:
   support only `moneyAtLeast`, `addItem`, and `removeMoney`
4. Save persistence strategy:
   support anonymous browser `localStorage` saves only for this slice

Not part of this first backend slice:

- full-book runtime support beyond the curated subset
- full choice history
- code-word-based branching
- free-form shopping rules
- authenticated save persistence
- ASP.NET Core Identity flows

### Locked Milestone 1 Frontend Assumptions

The frontend MVP for the current slice is locked to these assumptions:

1. `/books` visual direction:
   an editorial library-style page with a warm, print-inspired presentation rather than an admin or dashboard layout
2. `/books/{slug}` role:
   a focused book details page with book metadata, description, and a clear action to start anonymous play
3. `/play/{gameId}` layout:
   a centered reading surface for episode text, a separate diary panel for player state, and large choice actions below the story
4. Reader diary content:
   show `money`, `items`, `skills`, `codeWords`, and `notes`
5. Anonymous localStorage keys:
   use `gamebook.play.saves` for stored saves and `gamebook.play.activeSaveId` for the currently active browser save id

These assumptions are implementation targets for the frontend slice unless a later decision explicitly changes them.

### What We Just Implemented

The current backend slice delivers a playable anonymous API flow against the curated
`Котаракът` package.

What was added:

- runtime loading of `content/gamebooks/{book-slug}/gamebook.json`
- domain models for package episodes, choices, conditions, effects, player state, and anonymous saves
- stateless anonymous game APIs for:
  - starting a new game from a book slug
  - hydrating current state from browser save data
  - executing a selected choice and returning updated state
- automatic seeding of the read-only books catalog from the same curated package
- test coverage for package loading and core game flow mechanics

What was verified:

- `dotnet build GameBook.WebPlatform.sln`
- `dotnet test GameBook.WebPlatform.sln`
- `npm.cmd run build` in `frontend/`
- `docker compose up --build -d`
- live API checks for health, books, anonymous game flow, and Scalar UI
- live frontend route checks for `/books`, `/books/kotarakat-avreya`, and `/play/{gameId}`

Out of scope for Milestone 1:

- admin editor
- full book import UI
- production hosting and hardening
- CSRF protection
- public CORS policy
- password reset
- email confirmation
- external login

## Runbook

For a more operational version of these steps, see
[docs/project/runbook.md](/c:/!repos/Gamebook-Web-Platform/docs/project/runbook.md).

### 1. Start The Local Containers

```powershell
docker compose up --build
```

Expected result:

- PostgreSQL starts on `localhost:5432`
- the API starts on `http://localhost:8080`
- the frontend starts on `http://localhost:5173`
- the API docs UI is available at `http://localhost:8080/scalar`
- pending EF Core migrations are applied on API startup for the current local setup

### 2. Build The Backend Locally

```powershell
dotnet build GameBook.WebPlatform.sln
```

Expected result:

- the solution builds successfully
- API, Core, Data, and Tests projects compile together

### 3. Run The Backend Tests

```powershell
dotnet test GameBook.WebPlatform.sln
```

Expected result:

- all current xUnit tests pass

### 4. Call The API Manually

Use the included HTTP file:

```text
backend/GameBook.Api/GameBook.Api.http
```

Or call the basic endpoints directly:

```powershell
curl http://localhost:8080/scalar
curl http://localhost:8080/api/health
curl http://localhost:8080/api/books
curl -X POST http://localhost:8080/api/games/anonymous/start -H "Content-Type: application/json" -d "{\"gamebookSlug\":\"kotarakat-avreya\"}"
curl http://localhost:5173/books
```

### 5. Run The API Outside Docker If Needed

The API can still run locally without the containerized app:

```powershell
dotnet run --project backend/GameBook.Api/GameBook.Api.csproj --launch-profile http
```

Local non-container API URL:

```text
http://localhost:5019
```

This mode still expects PostgreSQL to be available on `localhost:5432`.

### 6. Stop The Containers

```powershell
docker compose down
```

To also remove the PostgreSQL data volume:

```powershell
docker compose down -v
```

## Important Docs

- `AGENTS.md`: AI/developer rules
- `ARCHITECTURE.md`: high-level architecture
- `ROADMAP.md`: implementation roadmap
- `docs/decisions/`: architecture decision records
- `docs/project/implementation-plan.md`: complete implementation plan
- `docs/project/runbook.md`: project startup and verification runbook
