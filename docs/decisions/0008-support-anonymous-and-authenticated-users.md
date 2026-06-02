# ADR-0008: Support anonymous and authenticated play

## Status

Accepted

## Context

The MVP should support both anonymous players and users with accounts.

Anonymous play should be allowed, but only for a limited set of books.

Authenticated users should have cloud saves.

## Decision

Support both anonymous and authenticated play.

Anonymous users:

- Can play only books explicitly allowed for anonymous access.
- Use browser-local saves.

Authenticated users:

- Can use cloud saves.
- Can continue across devices.
- May later gain access to registered-only or paid books.

## Reasons

- Lowers friction for public visitors.
- Allows account-based features later.
- Supports future commercial/community direction.
- Allows demo/free books for anonymous users.

## Consequences

Positive:

- Better onboarding.
- Supports both casual and committed users.

Negative:

- Save logic must handle both browser-local and server-side saves.
- Access control must distinguish anonymous, registered, admin, and future paid access.
