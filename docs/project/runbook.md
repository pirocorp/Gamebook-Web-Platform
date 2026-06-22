# Project Runbook

Use this reference when the task requires exact commands, startup order,
verification steps, or troubleshooting guidance for the runtime web
application.

This runbook covers the main project runtime, not the offline content import
utility.

## Verification Rule

Before considering backend work done, verify it in this order:

1. `build`
2. `test`
3. `run`
4. hit the actual endpoint(s)

## Directory Model

Primary runtime code lives under:

```text
backend/
frontend/
```

Runtime content packages live under:

```text
content/gamebooks/
```

Offline source assets and curation inputs live under:

```text
content/source/
```

The offline content import utility lives under:

```text
tools/content-import/
```

## Choose The Right Startup Path

Use Docker Compose when:

- you want the normal local runtime path
- you want API and PostgreSQL wired together automatically
- you want the API on `http://localhost:8080`

Use local `dotnet run` for the API when:

- you are iterating only on backend code
- you want faster edit-run cycles outside the API container
- PostgreSQL is already running separately on `localhost:5432`

Use the content import tool when:

- `content/gamebooks/*` must be generated or updated
- source PDFs or curation configs changed
- the task is about import pipeline behavior rather than runtime app behavior

## Commands

Run commands from the repository root.

Start the full local runtime:

```powershell
docker compose up --build
```

For the current local setup, the API applies pending EF Core migrations on
startup.

Start only PostgreSQL:

```powershell
docker compose up postgres
```

Build the backend solution:

```powershell
dotnet build GameBook.WebPlatform.sln
```

Run backend tests:

```powershell
dotnet test GameBook.WebPlatform.sln
```

Run the API locally without the API container:

```powershell
dotnet run --project backend/GameBook.Api/GameBook.Api.csproj --launch-profile http
```

Stop the local runtime:

```powershell
docker compose down
```

Remove containers and PostgreSQL data volume:

```powershell
docker compose down -v
```

## Runtime Endpoints

Docker Compose API base URL:

```text
http://localhost:8080
```

Local `dotnet run` API base URL:

```text
http://localhost:5019
```

PostgreSQL host access:

```text
localhost:5432
```

Current manual verification endpoints:

- `GET /scalar`
- `GET /api/health`
- `GET /api/books`
- `GET /api/books/{slug}`
- `POST /api/games/anonymous/start`
- `POST /api/games/anonymous/state`
- `POST /api/games/anonymous/choice`

HTTP request examples live in:

```text
backend/GameBook.Api/GameBook.Api.http
```

## Validation Checklist

- Confirm `docker compose config` resolves successfully before assuming Compose changes are valid.
- Confirm the `api` service exposes host port `8080`.
- Confirm the `postgres` service is healthy before assuming database-dependent API work should succeed.
- Confirm `dotnet build GameBook.WebPlatform.sln` succeeds after backend code changes.
- Confirm `dotnet test GameBook.WebPlatform.sln` succeeds after backend or domain changes.
- Confirm `GET /api/health` returns `200 OK`.
- Confirm `GET /api/books` returns the seeded curated book catalog.
- Confirm `POST /api/games/anonymous/start` returns episode `1` for `kotarakat-avreya`.
- Confirm `POST /api/games/anonymous/state` returns the current episode from the provided anonymous save.
- Confirm `POST /api/games/anonymous/choice` updates the current episode and applies supported effects.
- Confirm local `dotnet run` still works after Docker-specific configuration changes.
- Confirm runtime app changes do not accidentally drift into `tools/content-import/` unless the task is explicitly about content import.

## Troubleshooting Heuristics

If Docker Compose fails before container startup:

- run `docker compose config`
- inspect `docker-compose.yml`
- confirm Docker Desktop or the local Docker daemon is running

If the API container starts but cannot reach PostgreSQL:

- confirm the API connection string uses host `postgres`, not `localhost`
- confirm the `postgres` service is healthy
- confirm port `5432` is not blocked locally

If local `dotnet run` cannot reach PostgreSQL:

- confirm PostgreSQL is running on `localhost:5432`
- confirm `backend/GameBook.Api/appsettings.json` still points to the local host connection string

If `/api/books` fails unexpectedly:

- confirm the database connection is valid
- confirm EF Core wiring in `GameBook.Data` still registers correctly
- confirm the curated package seeder ran successfully on startup

If anonymous game endpoints fail unexpectedly:

- confirm `content/gamebooks/{book-slug}/gamebook.json` exists in the runtime output or container image
- confirm the current save payload uses a valid `gamebookSlug`
- confirm the current save payload uses an episode key that exists in the curated package
- confirm the selected `choiceKey` belongs to the current episode
- confirm the choice is not filtered out by unsupported or unmet conditions

If backend tests stop running:

- confirm the solution still targets `.NET 10`
- confirm `GameBook.Tests` still references the backend projects correctly
- treat unexpected test failures as regressions until clarified
