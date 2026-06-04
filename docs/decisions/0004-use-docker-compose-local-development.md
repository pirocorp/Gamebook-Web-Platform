# ADR-0004: Use Docker Compose for local development

## Status

Accepted

## Context

The app should be easy to run locally while Milestone 1 is being built.

Production hosting is out of scope for MVP. Infrastructure hardening such as HTTPS, certificates, reverse proxy, public CORS policy, backups, monitoring, and public domain setup is intentionally postponed until after the working app exists.

## Decision

Use Docker Compose for local development orchestration.

## Reasons

- Simple local orchestration.
- Keeps frontend, backend, database, and optional admin tools reproducible.
- Gives the project a practical path to run the full stack while deferring production hosting decisions.

## Consequences

Positive:

- Easy startup with `docker compose up -d`.
- Consistent development environment.
- Good foundation for later production hardening.

Negative:

- Docker Compose is not the final production architecture.
- Future work will be needed for HTTPS, reverse proxy, backups, monitoring, and security hardening.
