# ADR-0005: Backend owns game logic

## Status

Accepted

## Context

Gamebooks can have different mechanics, conditions, effects, code words, items, skills, money, and custom stats.

The frontend should not decide which choices are valid.

## Decision

The backend is the authority for game logic.

The backend must:

- Validate selected choices.
- Evaluate conditions.
- Apply effects.
- Update player state.
- Return only available continuations.
- Protect against invalid or manipulated client actions.

## Reasons

- Prevents cheating and inconsistent saves.
- Keeps game mechanics centralized.
- Allows the same rules to be used by web, admin validation, and future clients.
- Makes the frontend simpler.

## Consequences

Positive:

- Consistent game behavior.
- Easier testing of rules.
- Better security.

Negative:

- The app is not designed for fully offline play.
- Frontend must call the backend for authoritative progression.
