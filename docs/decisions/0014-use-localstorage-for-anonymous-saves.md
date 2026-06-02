# ADR-0014: Use localStorage for anonymous saves

## Status

Accepted

## Context

Anonymous users should be able to play without creating an account.

Their saves should not require cloud persistence in the MVP.

## Decision

Use browser localStorage for anonymous saves.

## Reasons

- Simple implementation.
- No account required.
- No server-side anonymous save cleanup needed initially.
- Fits the MVP requirement.

## Consequences

Positive:

- Fast and simple anonymous play.
- Lower backend complexity.

Negative:

- Saves are device/browser-specific.
- Saves can be lost if the browser data is cleared.
- Later account migration will require explicit sync logic.
