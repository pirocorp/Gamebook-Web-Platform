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
- Identity cookie authentication
- register/login/logout
- playable `/play/{gameId}` flow
- save system
- backend game progression and choice execution
- runtime book seed/import integration

## Phase 0 - Project foundation

[x] Project documentation
[x] Initial ADRs
[x] AI instructions
[x] Vertical Slice Architecture + MediatR decision
[x] Identity cookie authentication decision

## Phase 1 - First playable vertical slice

Goal: one subset of `Котаракът и Спасението на Аврея` playable end-to-end.

- target `.NET 10`
- use `xUnit`
- wire Docker Compose from the first backend step
- build the backend skeleton and first public endpoint scaffold before the Identity slice

[x] ASP.NET Core solution
[ ] Vite frontend
[x] PostgreSQL Docker service
[x] EF Core setup
[x] EF Core initial migration
[x] MediatR setup
[ ] ASP.NET Core Identity cookie auth
[ ] Register/login/logout
[ ] Seed/import gamebook package JSON
[x] List books
[x] Show book details
[ ] Start anonymous game
[ ] Start authenticated game
[ ] Anonymous localStorage save
[ ] Authenticated PostgreSQL save
[ ] Load current episode
[ ] Show available choices
[ ] Execute choice through backend
[ ] Apply simple effects
[ ] Update player state
[ ] Render `/play` reader
[x] Backend tests

## Phase 2 - Core engine expansion

[ ] More conditions
[ ] More effects
[ ] More player state operations
[ ] More complete `Котаракът` import
[ ] Book validation tools
[ ] Improved save/load UI

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
