# Complete Implementation Plan

## 1. Goal

Build the first working vertical slice of the Gamebook Web Platform.

The first milestone should prove:

- ASP.NET Core backend
- Vertical Slice Architecture with MediatR
- EF Core + PostgreSQL
- rich domain entities and aggregates
- ASP.NET Core Identity cookie authentication
- anonymous and authenticated saves
- Vanilla TypeScript + Vite frontend
- seeded real gamebook subset
- backend-owned game logic
- playable `/play` reader

## 2. Locked Architecture

Backend:

- C#
- ASP.NET Core
- Controllers + MediatR
- Vertical Slice Architecture
- Clean Architecture boundaries
- Rich domain entities
- DDD aggregates and aggregate roots
- EF Core
- PostgreSQL
- JSONB
- EF Core migrations from day one
- ASP.NET Core Identity
- HttpOnly cookie authentication

Frontend:

- Vanilla TypeScript
- Vite
- HTML
- CSS
- No React/Vue/Angular
- API-first frontend integration
- Vite multipage app for public and auth pages
- Classic multipage-style public pages
- Classic multipage-style auth pages
- SPA behavior only for `/play`

Database:

- PostgreSQL
- EF Core migrations
- Strongly typed C# objects serialized to JSONB for executable game data

Development:

- Docker Compose supported
- PostgreSQL runs in Docker
- API can run locally or in Docker
- Frontend can run locally with Vite or in Docker
- During local development, Vite serves frontend pages and calls the ASP.NET Core API
- Day-to-day frontend development prefers local Vite for fast reload
- Local development should avoid CORS complexity by using a Vite dev proxy or another same-origin-style setup
- Production hosting is out of scope for MVP

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

The root `src/` directory is not used in MVP.

## 3. Milestone 1 Scope

Included:

- `/books`
- `/books/{slug}`
- `/login`
- `/register`
- `/play/{gameId}`
- register, login, logout
- Identity cookie authentication
- anonymous localStorage saves
- authenticated PostgreSQL saves
- first book: `Котаракът и Спасението на Аврея`
- manually curated subset only
- backend validates choices and applies effects

Excluded:

- admin editor
- media upload UI
- full book import
- anonymous save to account migration
- production hosting model
- non-trivial infrastructure hardening
- public CORS policy
- CSRF protection for authenticated mutations
- password reset
- email confirmation
- external login
- JWT bearer authentication
- frontend token storage
- deployment hardening

## 4. Domain Model

Aggregate roots:

```text
GameBook
SaveGame
MediaAsset
```

MVP structure:

```text
GameBook
 ├── Episodes
 │    └── Choices
 ├── InitialState
 └── Rules

SaveGame
 └── PlayerState
```

No `GameBookVersion` in MVP.

`Episode` and `Choice` are not aggregate roots.

## 5. Language Model

For MVP:

```text
One GameBook = One Language
```

If a book is translated, it becomes another `GameBook`.

No multilingual field model in MVP.

## 6. Persistence Rules

Domain entities live in `GameBook.Core`.

EF Core configuration lives in `GameBook.Data`.

Rules:

- no EF attributes in Core
- use Fluent API only
- repositories return aggregate roots
- no `IEpisodeRepository`
- no `IChoiceRepository`

Repositories:

```text
IGameBookRepository
ISaveGameRepository
IMediaAssetRepository
```

## 7. Backend Structure

```text
backend/

GameBook.Api/
  Controllers/
    BooksController.cs
    AuthController.cs
    GamesController.cs
  Features/
    Books/
      GetBooks/
      GetBookDetails/
    Auth/
      Register/
      Login/
      Logout/
      Me/
    Games/
      StartGame/
      GetGameState/
      ExecuteChoice/
  Common/

GameBook.Core/
  Domain/
    GameBooks/
    Saves/
    Media/
  GameEngine/
  Rules/
  Effects/
  Interfaces/

GameBook.Data/
  GameBookDbContext.cs
  Configurations/
  Repositories/
  Migrations/

GameBook.Tests/
```

Controllers must be thin. Handlers orchestrate use cases. Game rules belong in Core.

## 8. First Gamebook Package

Location:

```text
content/gamebooks/kotarakat-avreya/gamebook.json
```

Use both `originalText` and `displayText`.

First episode subset:

```text
1, 31, 11, 20, 18, 23, 28, 21, 8, 25, 56
```

## 9. Initial Rules and Effects

Conditions:

```text
hasItem
hasSkill
hasCodeWord
missingCodeWord
moneyAtLeast
all
any
```

Effects:

```text
addItem
removeItem
addCodeWord
removeMoney
addMoney
setCurrentEpisode
```

Executable rule data should use strongly typed C# objects serialized to JSONB.

## 10. Save Behavior

Anonymous user:

- save automatically to browser localStorage
- start creates a browser-only local save id
- `/play/{gameId}` uses that browser-only local save id for anonymous games
- the anonymous local save id is not a server-side `SaveGame` id
- backend still validates choices and applies rules through stateless anonymous game endpoints
- browser sends the current anonymous state to the backend and stores the returned updated state
- no account required
- limited to anonymous-accessible books

Authenticated user:

- save automatically to PostgreSQL
- save belongs to user account
- browser authenticates using HttpOnly Identity cookie

Logout while playing:

- server save remains on server
- user is redirected to `/login` or `/books`
- no automatic conversion to local save

## 11. API Endpoints for Milestone 1

Books:

```http
GET /api/books
GET /api/books/{slug}
```

Auth:

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

Auth pages are Vite multipage frontend pages that call these API endpoints. ASP.NET Identity manages users and issues the HttpOnly authentication cookie.

Games:

```http
POST /api/games/start
GET  /api/games/{saveId}
POST /api/games/{saveId}/choice
POST /api/games/anonymous/start
POST /api/games/anonymous/choice
```

Authenticated server-save endpoints use `[Authorize]`.

Anonymous saves are persisted in browser localStorage. Anonymous endpoints are stateless: the frontend sends the current local save state, the backend validates choices and applies rules, and the frontend stores the updated state returned by the backend.

## 12. Frontend Structure

```text
frontend/
  books.html
  book-details.html
  login.html
  register.html
  play.html
frontend/src/
  pages/
    books.ts
    book-details.ts
    login.ts
    register.ts
  reader/
    play.ts
  shared/
    api/
    auth/
    saves/
    models/
    components/
  styles/
```

Public/auth pages use classic multipage-style navigation.

Those pages are client-rendered by Vanilla TypeScript after loading their own HTML entry point. They call backend API endpoints for data and actions.

The reader at `/play/{gameId}` has SPA behavior.

Frontend API calls use cookies:

```typescript
fetch("/api/auth/me", {
    credentials: "include"
});
```

Do not store auth tokens in localStorage or sessionStorage.

## 13. Milestone Breakdown

### Milestone 1.1 — Repository and docs alignment

- update ADR index with ADR-0022 to ADR-0026
- update architecture and AI docs
- update auth wording from JWT to Identity cookies
- add `content/gamebooks/` folder

### Milestone 1.2 — Solution skeleton

- create ASP.NET solution
- create `GameBook.Api`, `GameBook.Core`, `GameBook.Data`, `GameBook.Tests`
- add Vite frontend
- add Docker Compose with PostgreSQL
- add health endpoint

### Milestone 1.3 — Domain and persistence

- create aggregates and entities
- create strongly typed condition/effect models
- create DbContext and Fluent API mappings
- configure JSONB
- create first EF migration

### Milestone 1.4 — Auth slice

- configure ASP.NET Identity
- configure cookie authentication
- configure API unauthorized behavior to return 401/403
- create register/login/logout/me slices
- create Vite multipage frontend login/register pages that call auth API endpoints

### Milestone 1.5 — Import seed package

- create `content/gamebooks/kotarakat-avreya/gamebook.json`
- add selected episode subset
- create import service
- validate package structure
- import into PostgreSQL

### Milestone 1.6 — Public book pages

- create books API
- create Vite multipage `/books`
- create Vite multipage `/books/{slug}`
- show book details and start button

### Milestone 1.7 — Game start and saves

- create `StartGame` feature
- create anonymous stateless start endpoint
- anonymous start creates local save
- authenticated start creates PostgreSQL save
- create `LocalSaveProvider` and `ServerSaveProvider`

### Milestone 1.8 — Reader and game engine

- create GameEngine, RulesEngine, EffectsEngine
- create GetGameState and ExecuteChoice features
- create anonymous stateless ExecuteChoice flow
- render episode, diary, and available choices
- apply effects and persist state

### Milestone 1.9 — Tests

- GameEngine tests
- RulesEngine tests
- EffectsEngine tests
- handler tests
- ImportService tests
- SaveGame domain behavior tests

## 14. Definition of Done for Milestone 1

Milestone 1 is complete when:

- PostgreSQL runs in Docker
- API runs
- frontend runs
- user can register and login
- browser receives HttpOnly auth cookie
- anonymous and authenticated users can browse books
- users can open book details
- users can start the `Котаракът` subset
- anonymous save uses localStorage
- authenticated save uses PostgreSQL
- `/play/{gameId}` loads current episode
- valid choices are shown
- invalid choices are hidden
- selecting a choice updates state and changes episode
- diary shows money, items, skills, code words, and notes
- backend tests cover core game logic
- no admin functionality is included yet

## 15. Non-Negotiable Rules

- Do not introduce React.
- Do not replace PostgreSQL.
- Do not use JWT bearer auth in MVP.
- Do not store auth tokens in localStorage/sessionStorage.
- Do not put game rules in the frontend.
- Do not put game rules in controllers.
- Do not put domain logic directly in MediatR handlers.
- Do not create EF attributes in Core.
- Do not create repositories for every child entity.
- Do not create multilingual-per-field model in MVP.
- Do not add admin editor to Milestone 1.
- Do not hardcode `Котаракът` logic into the engine.
- Books are data.
- Engine is generic.

## 16. Clarified Implementation Decisions

- Implement a full Milestone 1 skeleton, but update documentation before writing application code.
- Use `backend/` for .NET projects and `frontend/` for the Vite app; do not use root `src/` in MVP.
- Use an API-first backend with a Vite multipage frontend. Public and auth pages are not server-rendered Razor/MVC pages in MVP.
- Use classic full-page navigation for public/auth routes and SPA behavior only inside `/play/{gameId}`.
- Anonymous `/play/{gameId}` uses a browser-only local save id stored in localStorage.
- Anonymous game rule execution uses stateless backend endpoints so backend-owned game logic is preserved.
- CSRF protection is out of scope for MVP and must be revisited before public exposure.
- Production hosting and non-trivial infrastructure/security hardening are out of scope for MVP.
- The curated gamebook subset content will be provided in the documented package format.

## 17. Ready For Implementation

There are no remaining open architecture decisions required before starting the Milestone 1 skeleton.
