# ADR-0006: Use JSONB for dynamic game data

## Status

Accepted

## Context

Different gamebooks may use different mechanics and player-state fields.

Some books may use skills and money. Others may use health, reputation, dice rolls, time, spells, or custom values.

## Decision

Use PostgreSQL JSONB fields for flexible game data.

JSONB should be used for:

- Choice conditions.
- Choice effects.
- Initial player state.
- Current player state.
- Book-specific rules.
- Custom stats.
- Media metadata.

## Reasons

- Avoids adding database columns for every game-specific mechanic.
- Allows books to define flexible rules.
- PostgreSQL can index and query JSONB data when needed.
- Works well with EF Core through Npgsql.

## Consequences

Positive:

- Flexible engine.
- Suitable for many different gamebook systems.
- Reduces schema churn.

Negative:

- JSON schemas must be documented carefully.
- Validation must happen in code.
- Overuse of JSONB can make reporting and querying harder.
