# ADR-0014: Use localStorage for anonymous saves

## Status

Accepted

## Context

Anonymous users should be able to play without creating an account.

Their saves should not require cloud persistence in the MVP.

## Decision

Use browser localStorage for anonymous saves.

An anonymous game uses a browser-only local save id. In `/play/{gameId}`, that id refers to a localStorage save record and is not a server-side `SaveGame` id.

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
