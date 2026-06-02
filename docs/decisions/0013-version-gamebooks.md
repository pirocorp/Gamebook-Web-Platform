# ADR-0013: Version gamebooks

## Status

Accepted

## Context

Gamebooks may be edited after publication.

Existing saves should not break when an admin updates a book.

## Decision

Gamebooks must be versioned.

Published versions should not be mutated in ways that break existing saves.

## Reasons

- Protects player saves.
- Allows draft/published workflows.
- Enables validation before publishing.
- Supports future corrections and editions.

## Consequences

Positive:

- Stable playthroughs.
- Safer editing workflow.
- Better auditability.

Negative:

- More complex data model.
- Admin UI must handle drafts, published versions, and active versions.
