# Gamebook Package Format

Milestone 1 uses a future-oriented JSON package format stored under:

```text
content/gamebooks/{book-slug}/gamebook.json
```

The format should be close to the later import format, but MVP has no `GameBookVersion` table and no multilingual-per-field model.

## MVP rules

- One package represents one book.
- One book has one language.
- Translations are separate books.
- Episodes and choices are data.
- Original and display text are both stored.

## Example

```json
{
  "formatVersion": "1.0",
  "slug": "kotarakat-avreya",
  "language": "bg",
  "title": "Котаракът и Спасението на Аврея",
  "author": "Ал Торо",
  "description": "Книга-игра.",
  "accessLevel": "public_anonymous",
  "startEpisodeKey": "1",
  "initialState": {
    "money": 100,
    "skills": [],
    "items": [],
    "codeWords": [],
    "notes": ""
  },
  "episodes": [
    {
      "key": "1",
      "title": "Епизод 1",
      "originalText": "...",
      "displayText": "...",
      "choices": [
        {
          "key": "1-a",
          "originalLabel": "...",
          "displayLabel": "...",
          "targetEpisodeKey": "31",
          "conditions": null,
          "effects": []
        }
      ]
    }
  ]
}
```

## First subset

Milestone 1 seeds these episodes:

```text
1, 31, 11, 20, 18, 23, 28, 21, 8, 25, 56
```
