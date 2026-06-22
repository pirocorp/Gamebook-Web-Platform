# Complete Implementation Plan

## 1. Goal

Build and document the first working vertical slice of the Gamebook Web
Platform.

The current milestone proves:

- ASP.NET Core backend
- Vertical Slice Architecture with MediatR
- EF Core + PostgreSQL
- rich domain boundaries in `GameBook.Core`
- Vanilla TypeScript + Vite frontend
- seeded real gamebook package
- backend-owned game logic
- playable anonymous `/play/{gameId}` reader
- browser localStorage saves

The current slice does not yet include ASP.NET Core Identity or authenticated
save persistence.

## 2. Current Implementation Status

Implemented today:

- `GET /api/health`
- `GET /api/books`
- `GET /api/books/{slug}`
- `POST /api/games/anonymous/start`
- `POST /api/games/anonymous/state`
- `POST /api/games/anonymous/choice`
- frontend routes for `/books`, `/books/{slug}`, and `/play/{gameId}`
- anonymous save persistence in browser localStorage
- Docker Compose with API, PostgreSQL, and frontend containers
- backend tests for runtime package loading and game progression logic

Current runtime data split:

- PostgreSQL stores seeded catalog metadata for books
- playable episode and choice data is loaded at runtime from
  `content/gamebooks/{slug}/gamebook.json`
- the full playable graph is not stored in PostgreSQL yet

## 3. Locked Architecture

Backend:

- C#
- ASP.NET Core
- Controllers + MediatR
- Vertical Slice Architecture
- Clean Architecture boundaries
- rich domain entities
- EF Core
- PostgreSQL
- EF Core migrations from day one

Frontend:

- Vanilla TypeScript
- Vite
- HTML
- CSS
- No React/Vue/Angular
- multipage entry points for `/books` and `/books/{slug}`
- SPA-like reader behavior only for `/play`

Database:

- PostgreSQL
- EF Core migrations
- JSONB remains the long-term target for dynamic executable data

Development:

- Docker Compose supported
- PostgreSQL runs in Docker
- API can run locally or in Docker
- frontend can run locally with Vite or in Docker
- Vite proxy is used to forward `/api` requests to the backend during frontend development

Repository layout:

```text
Gamebook-Web-Platform/
  GameBook.WebPlatform.sln
  backend/
    GameBook.Api/
    GameBook.Core/
    GameBook.Data/
    GameBook.Tests/
  frontend/
  content/
  docs/
```

## 4. Milestone 1 Scope

Included:

- `/books`
- `/books/{slug}`
- `/play/{gameId}`
- anonymous localStorage saves
- first book: `Котаракът и Спасението на Аврея`
- curated runtime package
- backend validation of available choices
- backend application of supported effects

Excluded for this slice:

- `/login`
- `/register`
- Identity cookie authentication
- authenticated PostgreSQL saves
- admin editor
- media upload UI
- full book import UI
- anonymous save to account migration
- production hosting model
- non-trivial infrastructure hardening
- password reset
- email confirmation
- external login
- JWT bearer authentication

## 5. Domain Model

Aggregate roots:

```text
GameBook
SaveGame
MediaAsset
```

Current anonymous runtime state:

```text
AnonymousSave
 ├── GamebookSlug
 ├── CurrentEpisodeKey
 └── PlayerState
```

Current `PlayerState` fields rendered by the reader:

- `readerName`
- `rating`
- `money`
- `items`
- `skills`
- `codeWords`
- `notes`
- `custom`

Full choice history is intentionally deferred beyond this slice.

## 6. Persistence Rules

Domain entities live in `GameBook.Core`.

EF Core configuration lives in `GameBook.Data`.

Rules:

- no EF attributes in Core
- use Fluent API only
- repositories return aggregate roots
- no `IEpisodeRepository`
- no `IChoiceRepository`

Current storage split:

- `IGameBookRepository` serves catalog metadata from PostgreSQL
- `IGameBookPackageRepository` loads playable content from the JSON package on disk
- anonymous play state is browser-owned and not persisted by the backend

## 7. Backend Structure

```text
backend/

GameBook.Api/
  Controllers/
    BooksController.cs
    GamesController.cs
    HealthController.cs
  Features/
    Books/
      GetBooks/
      GetBookDetails/
    Games/
      StartAnonymousGame/
      GetAnonymousGameState/
      ExecuteAnonymousChoice/

GameBook.Core/
  Domain/
    GameBooks/
    Saves/
    Media/
  GameEngine/
  Interfaces/

GameBook.Data/
  GameBookDbContext.cs
  FileSystemGameBookPackageRepository.cs
  GameBookCatalogSeeder.cs
  Migrations/

GameBook.Tests/
```

Controllers are thin. Handlers orchestrate use cases. Game rules belong in
Core.

## 8. Frontend Structure

```text
frontend/
  books.html
  book-details.html
  play.html
  src/
    pages/
      books.ts
      book-details.ts
    reader/
      play.ts
    shared/
      api/
      dom/
      layout/
      models/
      saves/
      styles/
```

Current frontend behavior:

- `/books` lists available books from `GET /api/books`
- `/books/{slug}` loads one book from `GET /api/books/{slug}`
- `/play/{gameId}` restores the active local save, rebuilds state through
  `POST /api/games/anonymous/state`, and posts choices through
  `POST /api/games/anonymous/choice`

Locked browser storage keys:

- `gamebook.play.saves`
- `gamebook.play.activeSaveId`

## 9. Runtime Package

Location:

```text
content/gamebooks/kotarakat-avreya/gamebook.json
```

The package follows the documented gamebook format and currently acts as the
runtime source of truth for:

- initial state
- episodes
- choices
- supported conditions
- supported effects

Catalog metadata is seeded into PostgreSQL from this package family, but the
reader still executes directly from the JSON package.

## 10. Initial Rules and Effects

Currently supported conditions:

```text
moneyAtLeast
```

Currently supported effects:

```text
addItem
removeMoney
```

Deferred for later phases:

- code-word branching
- larger effect vocabulary
- richer composed conditions
- full history-aware rules

## 11. Save Behavior

Anonymous user:

- start creates a browser-owned local save record
- the save record contains `gamebookSlug`, `currentEpisodeKey`, and `playerState`
- `/play/{gameId}` uses the browser-owned save id, not a server `SaveGame` id
- backend endpoints are stateless for anonymous play
- browser sends the current save state to the backend and stores the updated state returned

Deferred authenticated behavior:

- account-owned PostgreSQL saves
- HttpOnly Identity cookie authentication
- save continuity across devices

## 12. API Endpoints for the Current Slice

Books:

```http
GET /api/books
GET /api/books/{slug}
```

Games:

```http
POST /api/games/anonymous/start
POST /api/games/anonymous/state
POST /api/games/anonymous/choice
```

Reference:

- detailed endpoint descriptions live in `docs/api/endpoints.md`

## 13. Milestone Breakdown

### Milestone 1.1 - Foundation

- solution and project structure
- MediatR setup
- EF Core setup
- initial migration
- Docker Compose for API and PostgreSQL

### Milestone 1.2 - Catalog and runtime package loading

- seed book catalog metadata into PostgreSQL
- load runtime package from `content/gamebooks/`
- expose public books endpoints

### Milestone 1.3 - Anonymous game engine slice

- implement anonymous start endpoint
- implement anonymous state rebuild endpoint
- implement anonymous choice execution endpoint
- validate available choices in the backend
- apply currently supported effects

### Milestone 1.4 - Frontend vertical slice

- implement `/books`
- implement `/books/{slug}`
- implement `/play/{gameId}`
- persist local saves in browser storage
- connect frontend to anonymous game endpoints

### Milestone 1.5 - Verification

- backend unit and integration-oriented tests
- frontend production build verification
- Docker Compose runtime verification

## 14. Definition of Done for the Current Slice

The current slice is complete when:

- PostgreSQL runs in Docker
- API runs
- frontend runs
- user can browse books
- user can open book details
- user can start the seeded `Котаракът` package
- anonymous save uses localStorage
- `/play/{gameId}` loads current episode
- valid choices are shown
- selecting a choice updates state and changes episode
- diary shows money, items, skills, codeWords, and notes
- backend tests pass
- frontend build succeeds

## 15. Next Slice After This

Next planned expansion areas:

- ASP.NET Core Identity cookie authentication
- authenticated save persistence
- more conditions and effects
- full-book import pipeline expansion
- choice history
- admin/editor tooling

## 16. Non-Negotiable Rules

- Do not introduce React.
- Do not replace PostgreSQL.
- Do not use JWT bearer auth in MVP.
- Do not store auth tokens in localStorage/sessionStorage.
- Do not put game rules in the frontend.
- Do not put game rules in controllers.
- Do not put domain logic directly in MediatR handlers.
- Do not create EF attributes in Core.
- Do not create repositories for every child entity.
- Do not add admin editor to Milestone 1.
- Do not hardcode `Котаракът` logic into the engine.
- Books are data.
- Engine is generic.
