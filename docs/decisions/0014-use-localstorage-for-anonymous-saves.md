# ADR-0014: Use localStorage for anonymous saves

## Status

Accepted

## Context

Anonymous users should be able to play without creating an account.

Their saves should not require cloud persistence in the MVP.

## Decision

Use browser localStorage for anonymous saves.

An anonymous game uses a browser-only local save id. In `/play/{gameId}`, that id refers to a localStorage save record and is not a server-side `SaveGame` id.

Anonymous game rule execution still goes through the backend. The anonymous API flow is stateless: the browser sends the current local save state, the backend validates the requested choice and applies effects, and the browser stores the updated state returned by the backend.

Because anonymous saves live in localStorage, users can tamper with their local anonymous state. This is acceptable for MVP anonymous play and must not be treated as trusted account progress.

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
