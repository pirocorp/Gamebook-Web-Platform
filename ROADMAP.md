# Roadmap

## Current status

The project has completed the first playable anonymous vertical slice for one
seeded gamebook.

What is already in place:

- solution and backend project structure
- MediatR wiring
- EF Core + PostgreSQL integration
- initial migration
- Docker Compose for local API + database + frontend
- health endpoint
- read-only books API endpoints
- anonymous game start/state/choice API flow
- frontend books, details, and play pages
- localStorage-based anonymous save flow
- backend and frontend verification coverage
- initial backend/domain tests

What remains before Milestone 1 is complete:

- authenticated save persistence
- ASP.NET Core Identity cookie authentication
- richer rule and effect support
- full-book import and validation expansion

## Phase 0 - Project foundation

[x] Project documentation
[x] Initial ADRs
[x] AI instructions
[x] Vertical Slice Architecture + MediatR decision
[x] Identity cookie authentication decision

## Phase 1 - First playable vertical slice

Goal: one curated subset of `Котаракът и Спасението на Аврея` playable end-to-end.

- target `.NET 10`
- use `xUnit`
- wire Docker Compose from the first backend step
- build the backend skeleton and first public endpoint scaffold before the play slice

[x] ASP.NET Core solution
[x] Vite frontend
[x] PostgreSQL Docker service
[x] EF Core setup
[x] EF Core initial migration
[x] MediatR setup
[x] Seed/import gamebook package JSON
[x] List books
[x] Show book details
[x] Start anonymous game
[x] Anonymous localStorage save
[x] Load current episode
[x] Show available choices
[x] Execute choice through backend
[x] Apply simple effects
[x] Update player state
[x] Render `/play` reader
[x] Backend tests
[x] Frontend build verification

Locked backend MVP decisions for Phase 1:

- runtime input is the curated `gamebook.json` package, served from the JSON package at runtime
- anonymous saves persist only `gamebookSlug`, `currentEpisodeKey`, and `playerState`
- full choice history is deferred
- supported mechanics are limited to `moneyAtLeast`, `addItem`, and `removeMoney`
- authenticated saves and Identity flows are deferred beyond this first backend slice

Locked frontend MVP decisions for Phase 1:

- `/books` uses an editorial library-style presentation
- `/books/{slug}` uses a focused details page with a start action
- `/play/{gameId}` uses a reading-first layout with a separate diary panel
- diary fields shown are `money`, `items`, `skills`, `codeWords`, and `notes`
- browser storage keys are `gamebook.play.saves` and `gamebook.play.activeSaveId`

## Phase 2 - Core engine expansion

[ ] More conditions
[ ] More effects
[ ] More player state operations
[ ] More complete `Котаракът` import
[ ] Book validation tools
[ ] Improved save/load UI
[ ] Choice history
[ ] Code-word-based branching
[ ] Authenticated save persistence

## Phase 3 - Admin foundation

[ ] Admin role
[ ] Classic multipage-style admin screens
[ ] Create/edit books
[ ] Create/edit episodes
[ ] Create/edit choices
[ ] JSON condition/effect editor
[ ] Validation UI

## Phase 4 - Media

[ ] Upload images
[ ] Upload audio
[ ] Upload maps
[ ] Attach media to episodes
[ ] Render media in reader
[ ] Store files on disk

## Phase 5 - Deployment hardening

[ ] Production hosting model
[ ] Reverse proxy
[ ] HTTPS
[ ] Certificates
[ ] Public CORS policy if needed
[ ] CSRF protection
[ ] Backups
[ ] Logging
[ ] Monitoring
