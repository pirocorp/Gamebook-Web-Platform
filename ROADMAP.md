# Roadmap

## Phase 0 — Project foundation

[x] Project documentation
[x] Initial ADRs
[x] AI instructions
[ ] Update docs for Vertical Slice Architecture + MediatR
[ ] Update docs for Identity cookie authentication

## Phase 1 — First playable vertical slice

Goal: one subset of `Котаракът и Спасението на Аврея` playable end-to-end.

[ ] ASP.NET Core solution
[ ] Vite frontend
[ ] PostgreSQL Docker service
[ ] EF Core setup
[ ] EF Core initial migration
[ ] MediatR setup
[ ] ASP.NET Core Identity cookie auth
[ ] Register/login/logout
[ ] Seed/import gamebook package JSON
[ ] List books
[ ] Show book details
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
[ ] Backend tests

## Phase 2 — Core engine expansion

[ ] More conditions
[ ] More effects
[ ] More player state operations
[ ] More complete `Котаракът` import
[ ] Book validation tools
[ ] Improved save/load UI

## Phase 3 — Admin foundation

[ ] Admin role
[ ] Classic multipage-style admin screens
[ ] Create/edit books
[ ] Create/edit episodes
[ ] Create/edit choices
[ ] JSON condition/effect editor
[ ] Validation UI

## Phase 4 — Media

[ ] Upload images
[ ] Upload audio
[ ] Upload maps
[ ] Attach media to episodes
[ ] Render media in reader
[ ] Store files on disk

## Phase 5 — Deployment hardening

[ ] Reverse proxy
[ ] HTTPS
[ ] Certificates
[ ] Backups
[ ] Logging
[ ] Monitoring
