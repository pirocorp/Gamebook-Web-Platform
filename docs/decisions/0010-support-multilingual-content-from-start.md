# ADR-0010: Support multilingual content from the start

## Status

Accepted

## Context

Gamebooks may exist in different languages, and the platform should not be limited to Bulgarian-only content.

## Decision

Design the data model and UI with multilingual content support from the start.

## Reasons

- Avoids expensive schema redesign later.
- Supports Bulgarian and other languages.
- Allows translated metadata, episodes, choices, and media captions.
- Makes the platform more suitable for future community/commercial use.

## Consequences

Positive:

- Internationalization-ready architecture.
- Better long-term flexibility.

Negative:

- More complex admin editor.
- More complex content model.
- Every content field needs language considerations.
