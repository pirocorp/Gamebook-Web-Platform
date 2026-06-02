# ADR-0021: Admin UI location

## Status

Accepted

## Decision

Start with one Vite frontend application but structure it internally as separate applications.

Initial structure:

frontend/src/apps/public
frontend/src/apps/reader
frontend/src/apps/admin
frontend/src/shared

A future split into separate applications should remain possible.

## Reasons

- Faster MVP development.
- Shared models, API clients, and components.
- Avoids premature complexity.
- Keeps future separation possible.
