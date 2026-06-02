# ADR-0017: Store media files on disk initially

## Status

Accepted

## Context

The platform must support images, audio, and maps from the beginning.

The initial deployment target is a local Ubuntu server with Docker.

Alternatives considered:

- Store files on disk.
- Store binary files in PostgreSQL.
- Use Azure Blob Storage from the start.

## Decision

Store media files on disk initially.

The database stores metadata and paths.

Later, media storage can migrate to Azure Blob Storage or another object storage provider.

## Reasons

- Simple for local Docker deployment.
- Avoids bloating PostgreSQL with large binaries.
- Keeps MVP infrastructure simple.
- Allows straightforward backup of media directories.
- Compatible with later object storage migration.

## Consequences

Positive:

- Simpler and cheaper initial setup.
- Good fit for local Ubuntu server.
- Easy to inspect files manually.

Negative:

- Requires careful volume configuration.
- Backups must include both database and media directory.
- Later migration to blob storage requires abstraction.
