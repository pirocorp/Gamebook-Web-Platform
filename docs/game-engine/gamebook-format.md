# Gamebook Package Format

Milestone 1 uses a future-oriented JSON package format stored under:

```text
content/gamebooks/{book-slug}/gamebook.json
```

The format should stay close to the later import format, but MVP has no `GameBookVersion` table and no multilingual-per-field model.

The formal JSON Schema lives at:

```text
docs/game-engine/gamebook.schema.json
```

## MVP Rules

- One package represents one book.
- One book has one language.
- Translations are separate books.
- Episodes and choices are data.
- Original and display text are both stored.
- Episode keys are strings, even when they contain numeric episode numbers.
- Choice keys are unique within their episode.
- Conditions are either `null` or one condition object.
- Effects are always an array, even when empty.
- Normal choice navigation uses `targetEpisodeKey`.
- `setCurrentEpisode` is reserved for special engine-driven redirects and should not be used for ordinary choice navigation.

## Required Package Shape

```json
{
  "formatVersion": "1.0",
  "slug": "kotarakat-avreya",
  "language": "bg",
  "title": "Book title",
  "author": "Author name",
  "description": "Short book description.",
  "accessLevel": "public_anonymous",
  "startEpisodeKey": "1",
  "initialState": {
    "readerName": "",
    "rating": null,
    "money": 100,
    "items": [],
    "skills": [],
    "codeWords": [],
    "notes": "",
    "custom": {}
  },
  "metadata": {},
  "episodes": [
    {
      "key": "1",
      "title": "Episode 1",
      "originalText": "Exact source text.",
      "displayText": "Reader-facing text.",
      "choices": [
        {
          "key": "1-to-31",
          "originalLabel": "Exact source choice label.",
          "displayLabel": "Reader-facing choice label.",
          "targetEpisodeKey": "31",
          "conditions": null,
          "effects": []
        }
      ]
    }
  ]
}
```

## Top-Level Fields

- `formatVersion`: required string. MVP value is `"1.0"`.
- `slug`: required string. Must match the package folder name.
- `language`: required string. MVP uses one language per `GameBook`.
- `title`: required string.
- `author`: optional string, but should be provided for seeded content.
- `description`: optional string, but should be provided for public book pages.
- `accessLevel`: required string. MVP value for the first subset is `"public_anonymous"`.
- `startEpisodeKey`: required string. Must point to an episode in `episodes`.
- `initialState`: required object using the MVP player state shape.
- `metadata`: optional object for import/curation notes. The engine must not require it for gameplay.
- `episodes`: required non-empty array.

## Curation Metadata

Curated packages may include `metadata` to preserve source traceability without changing gameplay.

Useful metadata fields:

- `curationStrategy`: explains how the subset was prepared.
- `sourcePdf`: source file name.
- `selectedEpisodeKeys`: episode keys included in the package.
- `omittedChoices`: choices intentionally left out because their targets are not included.
- `unmodeledMechanics`: source mechanics kept as text but not represented as structured rules in MVP.

## Initial State Fields

```json
{
  "readerName": "",
  "rating": null,
  "money": 100,
  "items": [],
  "skills": [],
  "codeWords": [],
  "notes": "",
  "custom": {}
}
```

## Episode Fields

- `key`: required string. For the first subset, use `"1"`, `"31"`, and so on.
- `title`: optional string.
- `originalText`: required string containing the source text.
- `displayText`: required string containing the reader-facing text.
- `choices`: required array. Use an empty array for terminal episodes.

## Choice Fields

- `key`: required string, unique within the episode.
- `originalLabel`: required string containing the source choice label.
- `displayLabel`: required string containing the reader-facing choice label.
- `targetEpisodeKey`: required string for ordinary choices.
- `conditions`: required, either `null` or one condition object.
- `effects`: required array of effect objects.

## Conditions

Milestone 1 condition types:

```text
hasItem
hasSkill
hasCodeWord
missingCodeWord
moneyAtLeast
all
any
```

Examples:

```json
{ "type": "hasItem", "item": "item-key" }
{ "type": "hasSkill", "skill": "skill-key" }
{ "type": "hasCodeWord", "codeWord": "code-word-key" }
{ "type": "missingCodeWord", "codeWord": "code-word-key" }
{ "type": "moneyAtLeast", "amount": 20 }
```

Composite condition:

```json
{
  "type": "all",
  "conditions": [
    { "type": "hasItem", "item": "item-key" },
    { "type": "moneyAtLeast", "amount": 20 }
  ]
}
```

## Effects

Milestone 1 effect types:

```text
addItem
removeItem
addCodeWord
removeMoney
addMoney
setCurrentEpisode
```

Examples:

```json
{ "type": "addItem", "item": "item-key" }
{ "type": "removeItem", "item": "item-key" }
{ "type": "addCodeWord", "codeWord": "code-word-key" }
{ "type": "removeMoney", "amount": 20 }
{ "type": "addMoney", "amount": 10 }
```

For ordinary choices, use `targetEpisodeKey` for navigation and leave `setCurrentEpisode` out of `effects`.

## First Subset

Milestone 1 seeds these episodes:

```text
1, 31, 11, 20, 18, 23, 28, 21, 8, 25, 56
```
