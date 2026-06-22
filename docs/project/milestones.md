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

Locked frontend assumptions for the same slice:

- `/books` uses an editorial library-style presentation
- `/books/{slug}` uses a focused details page with a start action
- `/play/{gameId}` uses a reading-first layout with a separate diary panel
- diary fields shown are `money`, `items`, `skills`, `codeWords`, and `notes`
- browser storage keys are `gamebook.play.saves` and `gamebook.play.activeSaveId`

Current implementation status:

- backend anonymous play endpoints are implemented
- frontend `/books`, `/books/{slug}`, and `/play/{gameId}` are implemented
- PostgreSQL currently stores catalog metadata only
- playable episode and choice data is still served from
  `content/gamebooks/{slug}/gamebook.json`
- Docker Compose runs API, PostgreSQL, and frontend together for local development

See `docs/project/implementation-plan.md` for details.

## Later milestones

- expanded rules and effects
- full book import
- admin editor
- media management
- deployment hardening
