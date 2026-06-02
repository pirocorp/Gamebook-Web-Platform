# ADR-0018: Require backend service tests where practical

## Status

Accepted

## Context

The backend will own game logic, rule evaluation, state changes, saves, and admin validation.

Mistakes in these areas could corrupt saves or break books.

## Decision

Require tests for backend services where practical, especially for:

- Rules engine.
- Game engine.
- Save game service.
- Book validation.
- Import logic.
- Access control logic.

Avoid over-engineering tests for trivial boilerplate.

## Reasons

- Game logic must be reliable.
- Future AI-assisted changes need safety nets.
- Backend is the source of truth.
- Tests document expected behavior.

## Consequences

Positive:

- Safer refactoring.
- Better AI-generated code review.
- More confidence in rules and saves.

Negative:

- More upfront work.
- Requires test data and fixtures.
- Must avoid slowing MVP with excessive test ceremony.
