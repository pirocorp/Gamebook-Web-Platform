---
name: content-import-pipeline
description: Guide the repository-specific content import utility, an offline authoring and packaging workflow that prepares engine-ready `gamebook.json` files and is not part of the main runtime app. Use when Codex needs to import or update a gamebook slice, run or troubleshoot `tools/content-import`, edit `curated-subset.json`, validate extracted episode ranges, verify generated choice targets, or keep the import tool and its documentation aligned with this repo's content rules.
---

# Content Import Pipeline

Use this skill for the `tools/content-import` workflow in this repository.

Treat the utility as a content-packaging pipeline, not as game-engine logic. Keep the engine generic and keep book-specific behavior in data under `content/`.

Treat code under `tools/content-import/` as offline developer tooling rather than backend or frontend runtime code.

## Follow This Workflow

1. Read `tools/content-import/README.md` and the relevant curation file before changing anything.
2. Confirm which book slug is being worked on and use repo-relative paths from the repository root.
3. Identify which step is needed:
   - `pdf-to-text` for a fresh or updated PDF text dump
   - `extract-episodes` for auditing selected source ranges
   - `build-gamebook` for generating the final `gamebook.json`
   - `typecheck` for validating the TypeScript tool itself
4. Preserve the distinction between source artifacts and generated outputs:
   - source assets and curation live under `content/source/{book-slug}/`
   - final playable package lives under `content/gamebooks/{book-slug}/gamebook.json`
5. Validate the result before finishing:
   - confirm the generated JSON is structurally sane
   - confirm curated choices target included episode keys
   - confirm omitted source choices and unmodeled mechanics remain documented when relevant

See [references/runbook.md](references/runbook.md) for the exact commands and the detailed validation checklist.

## Apply These Rules

- Keep books as data. Do not hardcode title-specific rules into the engine or this tool.
- Prefer editing curation data over hand-editing generated `gamebook.json`.
- Preserve source traceability. Do not remove page markers or source line provenance without an explicit reason.
- Treat the backend as authoritative for play logic. This utility prepares content; it does not decide runtime game rules.
- Keep changes repo-relative and documented in the utility README when the workflow changes.

## Use This Skill When

- A user asks to import a new vertical slice from a source PDF.
- A curated subset needs episode boundaries, display text, or playable choices adjusted.
- `gamebook.json` must be regenerated after content curation changes.
- The TypeScript import tool must be updated, type-checked, or documented.
- A generated package looks wrong and Codex needs to trace the problem back to text extraction, line ranges, or curation data.

## Avoid These Mistakes

- Do not add book-specific engine logic to compensate for bad content data.
- Do not manually patch schema or database concerns from this workflow.
- Do not treat generated output as the source of truth when the curation config should be corrected instead.
- Do not delete useful audit artifacts such as extracted text or curated episode extracts unless the user explicitly wants cleanup.
