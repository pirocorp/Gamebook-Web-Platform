# ADR-0012: Use AI-assisted development workflow

## Status

Accepted

## Context

The project is intended to be designed and developed with AI assistance.

AI assistants need stable project-level instructions to avoid making incorrect assumptions.

## Decision

Maintain AI-focused project files.

Required files/folders:

- `AGENTS.md`
- `ARCHITECTURE.md`
- `ROADMAP.md`
- `docs/`
- `.ai/prompts/`
- `.ai/checklists/`

## Reasons

- Helps future AI sessions understand the project.
- Reduces repeated explanations.
- Prevents accidental stack changes.
- Documents what is intentional.

## Consequences

Positive:

- More consistent AI-generated changes.
- Better long-term maintainability.
- Easier onboarding.

Negative:

- Documentation must be kept current.
- AI instructions can become stale if ignored.
