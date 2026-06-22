# Roadmap

## Current status

The project has completed the foundation phase and part of the backend
foundation for the first playable vertical slice.

What is already in place:

- solution and backend project structure
- MediatR wiring
- EF Core + PostgreSQL integration
- initial migration
- Docker Compose for local API + database
- health endpoint
- read-only books API endpoints
- initial backend/domain tests

What remains before Milestone 1 is complete:

- Vite frontend implementation
- playable `/play/{gameId}` flow
- anonymous localStorage save flow
- backend game progression and choice execution
- runtime book seed/import integration

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
[ ] Vite frontend
[x] PostgreSQL Docker service
[x] EF Core setup
[x] EF Core initial migration
[x] MediatR setup
[ ] Seed/import gamebook package JSON
[x] List books
[x] Show book details
[ ] Start anonymous game
[ ] Anonymous localStorage save
[ ] Load current episode
[ ] Show available choices
[ ] Execute choice through backend
[ ] Apply simple effects
[ ] Update player state
[ ] Render `/play` reader
[x] Backend tests

Locked backend MVP decisions for Phase 1:

- runtime input is the curated `gamebook.json` package, not the whole book
- anonymous saves persist only `gamebookSlug`, `currentEpisodeKey`, and `playerState`
- full choice history is deferred
- supported mechanics are limited to `moneyAtLeast`, `addItem`, and `removeMoney`
- authenticated saves and Identity flows are deferred beyond this first backend slice

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
