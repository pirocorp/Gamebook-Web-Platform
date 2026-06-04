# Content Import Tools

Utilities for turning source book assets into GameBook engine content.

Run commands from the repository root. Tool arguments may use repo-relative paths.

## Documentation

### Purpose

This toolchain helps us move from raw source material to a playable `gamebook.json` package.

The current workflow supports:

- extracting page-by-page text from a PDF
- extracting configured episode ranges from that text
- building a final engine package from a curation config

### Tool Structure

Files:

- `package.json`: tool scripts and dependency declaration
- `src/pdf-to-text.mjs`: extracts PDF text into a line-based text file
- `src/extract-episodes.mjs`: extracts configured episode ranges from the text dump
- `src/build-gamebook-package.mjs`: builds `content/gamebooks/{slug}/gamebook.json`
- `src/args.mjs`: command-line argument parsing helpers
- `src/io.mjs`: shared file and JSON helpers
- `src/paths.mjs`: repo-relative path resolution
- `src/text.mjs`: line-range and source-text cleanup helpers

### Inputs And Outputs

Typical source assets live under:

```text
content/source/{book-slug}/
```

Typical output package lives under:

```text
content/gamebooks/{book-slug}/gamebook.json
```

### Curation Model

The build step uses a curation config such as:

```text
content/source/kotarakat-avreya/curated-subset.json
```

That config controls:

- package metadata
- initial player state
- selected source line ranges per episode
- display text
- playable choices
- omitted source-faithful choices
- unmodeled mechanics notes

### Important Behavior

- `pdf-to-text` preserves page markers like `--- PAGE 24 ---` so line numbers remain traceable.
- `extract-episodes` uses `sourceLineStart` and `sourceLineEnd` from the curation config.
- `build-gamebook-package` creates the final package from curated data, not directly from the raw PDF.
- Repo-relative paths are resolved from the repository root even when commands run through `npm --prefix`.

## Runbook

### 1. Install Dependencies

```powershell
npm.cmd install --prefix tools/content-import
```

If npm cannot verify the local certificate chain on Windows:

```powershell
node --use-system-ca "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install --prefix tools/content-import
```

### 2. Put Source Files In Place

Store the source PDF and related artifacts here:

```text
content/source/{book-slug}/
```

Example:

```text
content/source/kotarakat-avreya/Ал Торо - Котаракът и Спасението на Аврея (IPDF).pdf
```

### 3. Extract PDF Text

```powershell
npm.cmd --prefix tools/content-import run pdf-to-text -- --source "content/source/kotarakat-avreya/Ал Торо - Котаракът и Спасението на Аврея (IPDF).pdf" --out content/source/kotarakat-avreya/kotarakat-avreya-text.txt
```

Expected result:

- creates a page-by-page text dump
- preserves page markers for source tracing

### 4. Prepare Or Update The Curation Config

Edit:

```text
content/source/{book-slug}/curated-subset.json
```

Set:

- package metadata
- initial state
- source line ranges
- display text
- playable choices
- omitted choices
- unmodeled mechanics

### 5. Extract Curated Episode Blocks

```powershell
npm.cmd --prefix tools/content-import run extract-episodes -- --config content/source/kotarakat-avreya/curated-subset.json --out content/source/kotarakat-avreya/kotarakat-curated-episodes.json
```

Use this output to audit whether the selected line ranges match the intended episodes.

### 6. Build The Final Gamebook Package

```powershell
npm.cmd --prefix tools/content-import run build-gamebook -- --config content/source/kotarakat-avreya/curated-subset.json
```

Expected result:

```text
content/gamebooks/kotarakat-avreya/gamebook.json
```

### 7. Validate The Result

Minimum checks:

- open the generated JSON and confirm it parses
- confirm all `choices[].targetEpisodeKey` values point to included episodes when building a curated playable slice
- confirm omitted source choices are recorded in metadata when using curated subsets

### 8. Clean Working State If Needed

Keep:

- source PDF
- extracted text dump
- curated config
- curated episode extract
- final `gamebook.json`

Do not keep:

- temporary install folders like `node_modules` if they were only used locally for verification
- one-off scratch outputs unless they are useful for source auditing
