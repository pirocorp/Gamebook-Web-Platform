# Milestones

## Milestone 1 - First playable vertical slice

A user can browse books, start a seeded curated subset of `Котаракът`, and
play through available choices with anonymous localStorage saves.

Locked Milestone 1 backend decisions:

- runtime uses the curated `gamebook.json` package
- anonymous saves persist only `gamebookSlug`, `currentEpisodeKey`, and `playerState`
- full choice history is deferred
- supported mechanics are limited to `moneyAtLeast`, `addItem`, and `removeMoney`
- authenticated save persistence and Identity flows are deferred beyond this first backend slice

See `docs/project/implementation-plan.md` for details.

## Later milestones

- expanded rules and effects
- full book import
- admin editor
- media management
- deployment hardening
