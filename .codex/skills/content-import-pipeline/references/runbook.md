# Content Import Runbook

Use this reference when the task requires exact commands, file locations, or a validation checklist for the repository's content import utility.

The utility supports two content-packaging modes:
- full-book curation where the config includes every episode
- subset curation for a vertical slice

## Directory Model

Source inputs usually live under:

```text
content/source/{book-slug}/
```

Generated playable package lives at:

```text
content/gamebooks/{book-slug}/gamebook.json
```

Primary utility files live under:

```text
tools/content-import/
```

## Choose The Right Step

Use `pdf-to-text` when:
- a source PDF is new or replaced
- page-by-page text extraction must be regenerated

Use `extract-episodes` when:
- `sourceLineStart` or `sourceLineEnd` changed
- a subset or full-book config must be audited against the extracted text
- episode boundaries are suspected to be wrong

Use `build-gamebook` when:
- metadata, initial state, episode text, choices, or curation notes changed
- `gamebook.json` must be regenerated for play or review

## Config Shapes

Use a full-book config when:
- building a complete playable package
- including every episode in the source book
- preserving the same metadata and validation model without subset omissions

Use a subset config when:
- building an MVP slice
- intentionally omitting some episodes or choices
- recording omitted source-faithful choices or unmodeled mechanics for the slice

File names are conventional, not required. Examples:

```text
content/source/{book-slug}/book-config.json
content/source/{book-slug}/curated-full.json
content/source/{book-slug}/curated-subset.json
```

Use `typecheck` when:
- the TypeScript utility code changed
- command-line parsing, shared types, or file helpers were edited

## Commands

Run commands from the repository root.

Install dependencies:

```powershell
npm.cmd install --prefix tools/content-import
```

Extract PDF text:

```powershell
npm.cmd --prefix tools/content-import run pdf-to-text -- --source "content/source/{book-slug}/{source-pdf-name}.pdf" --out "content/source/{book-slug}/{book-slug}-text.txt"
```

Extract curated episode blocks:

```powershell
npm.cmd --prefix tools/content-import run extract-episodes -- --config "content/source/{book-slug}/{config-file}.json" --out "content/source/{book-slug}/{book-slug}-curated-episodes.json"
```

Build the final package:

```powershell
npm.cmd --prefix tools/content-import run build-gamebook -- --config "content/source/{book-slug}/{config-file}.json"
```

Type-check the utility:

```powershell
npm.cmd --prefix tools/content-import run typecheck
```

Run the utility tests:

```powershell
npm.cmd --prefix tools/content-import run test
```

## Validation Checklist

- Confirm the selected config file matches the intended book slug and language.
- Confirm the selected config matches the intended import mode: subset slice or full book.
- Confirm extracted text still contains page markers such as `--- PAGE 24 ---`.
- Confirm episode source ranges map to the intended text in the extracted dump.
- Confirm generated `episodes[].key` values match the choice targets that reference them.
- Confirm subset configs record omitted source-faithful choices where needed.
- Confirm notes about unmodeled mechanics remain in metadata instead of disappearing during regeneration.
- Confirm generated `gamebook.json` is the output of the build step, not hand-edited drift.
- When tool code changed, run both `typecheck` and `test` and require both to pass.
- If behavior changed intentionally, update or extend tests so they verify the new expected behavior.
- Treat unexpected test failures as regressions until the code or the expectation is clarified.

## Troubleshooting Heuristics

If extracted text looks wrong:
- inspect the source PDF path first
- regenerate the text dump before changing curated ranges

If an episode contains the wrong prose:
- inspect `sourceLineStart` and `sourceLineEnd`
- regenerate curated episode extracts to audit the config output before rebuilding the final package

If a choice points to a missing episode:
- fix the curation config or episode inclusion set
- rebuild the package after correcting the data

If the tool behavior changed after code edits:
- run `typecheck`
- update `tools/content-import/README.md` when commands, expectations, or file roles changed
