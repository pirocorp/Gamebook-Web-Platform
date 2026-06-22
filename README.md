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

The repository is currently in an early Phase 1 state.

Implemented today:

- ASP.NET Core solution with `GameBook.Api`, `GameBook.Core`, `GameBook.Data`, and `GameBook.Tests`
- MediatR wired into the API
- EF Core + PostgreSQL data access
- initial EF Core migration
- Docker Compose setup for API + PostgreSQL
- automatic migration apply on API startup for local development
- health endpoint at `GET /api/health`
- read-only book endpoints at `GET /api/books` and `GET /api/books/{slug}`
- initial domain test coverage with `xUnit`

Not implemented yet:

- Vite frontend application
- ASP.NET Core Identity cookie authentication
- register/login/logout flows
- `/play/{gameId}` reader flow
- anonymous and authenticated saves
- backend game progression and choice execution
- seeded playable gamebook package wired into the runtime

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
- `/login`
- `/register`
- `/play/{gameId}`
- anonymous localStorage saves
- authenticated PostgreSQL saves
- backend-owned game logic
- seeded gamebook package from `content/gamebooks/`

Current status relative to Milestone 1:

- done: backend foundation, database foundation, Docker local setup, health endpoint, book list endpoint, book details endpoint, backend test project
- not started or still pending: frontend pages, authentication, save system, playable session flow, reader UI, game engine execution path

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
