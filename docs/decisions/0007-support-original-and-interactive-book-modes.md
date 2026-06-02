# ADR-0007: Support original text mode and interactive mode

## Status

Accepted

## Context

Gamebooks often contain original text, instructions, conditional branches, and mechanical notes.

A digital version can either preserve the original book exactly or adapt the experience for smoother play.

## Decision

Support both original text mode and interactive adapted mode.

Original text mode preserves the book faithfully.

Interactive mode may:

- Hide unavailable choices.
- Automatically apply conditions.
- Automatically apply effects.
- Hide internal rule checks when the engine can resolve them.

## Reasons

- Preserves archival value.
- Allows a better digital reading experience.
- Supports both faithful and modernized presentation.
- Useful for different audiences.

## Consequences

Positive:

- More flexible content model.
- Better player experience.
- Keeps original text available.

Negative:

- Requires storing both original and display/adapted text where needed.
- Admin editor must support this distinction.
