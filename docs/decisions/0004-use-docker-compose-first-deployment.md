# ADR-0004: Use Docker Compose for local development and first deployment

## Status

Accepted

## Context

The app will initially run on a local Ubuntu server with Docker capabilities and may later move to Azure containers or Azure VMs.

Infrastructure hardening such as HTTPS, certificates, reverse proxy, and public domain setup is intentionally postponed until after the working app exists.

## Decision

Use Docker Compose for local development and first deployment.

## Reasons

- Simple local orchestration.
- Matches the initial Ubuntu server deployment plan.
- Keeps frontend, backend, database, and optional admin tools reproducible.
- Makes later migration to Azure easier than a fully manual install.

## Consequences

Positive:

- Easy startup with `docker compose up -d`.
- Consistent development and deployment environment.
- Good foundation for later production hardening.

Negative:

- Initial deployment is not the final production architecture.
- Future work will be needed for HTTPS, reverse proxy, backups, monitoring, and security hardening.
