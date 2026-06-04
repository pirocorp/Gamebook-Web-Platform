# Content Import Tools

Utilities for preparing source books for the GameBook engine.

Run commands from the repository root. Tool arguments may use repo-relative paths.

## Install

```powershell
npm.cmd install --prefix tools/content-import
```

If npm cannot verify the local certificate chain on Windows, use:

```powershell
node --use-system-ca "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install --prefix tools/content-import
```

## PDF To Text

Extracts a page-by-page text dump from a PDF. Page markers are included so curation files can use stable line ranges.

```powershell
npm.cmd --prefix tools/content-import run pdf-to-text -- --source "content/source/kotarakat-avreya/Ал Торо - Котаракът и Спасението на Аврея (IPDF).pdf" --out content/source/kotarakat-avreya/kotarakat-avreya-text.txt
```

## Extract Episode Ranges

Uses `sourceLineStart` and `sourceLineEnd` from a curation file to create an audit-friendly episode extract.

```powershell
npm.cmd --prefix tools/content-import run extract-episodes -- --config content/source/kotarakat-avreya/curated-subset.json --out content/source/kotarakat-avreya/kotarakat-curated-episodes.json
```

## Build Gamebook Package

Builds `content/gamebooks/{slug}/gamebook.json` from a curation file. The curation file controls display text, playable choices, omitted choices, and unmodeled mechanics.

```powershell
npm.cmd --prefix tools/content-import run build-gamebook -- --config content/source/kotarakat-avreya/curated-subset.json
```
