# ADR-0025: Use single-language gamebooks in MVP

## Status

Accepted

## Context

The original platform vision included multilingual support from the beginning. During implementation planning it was decided that multilingual-per-field modeling introduces unnecessary complexity for the MVP.

A translated gamebook can initially be treated as a separate book.

## Decision

For the MVP, each `GameBook` contains exactly one language.

A translation is represented as another `GameBook`.

Example:

```text
GameBook: Котаракът и Спасението на Аврея, language bg
GameBook: The Cat and the Salvation of Avrea, language en
```

## Removed MVP Complexity

The MVP will not include:

```text
GameBookTranslation
EpisodeTranslation
ChoiceTranslation
LocalizedText
```

Fields remain simple:

```text
GameBook.Title
GameBook.Description
GameBook.Language
Episode.OriginalText
Episode.DisplayText
Choice.OriginalLabel
Choice.DisplayLabel
```

## Package Format

The JSON import format follows the same rule:

```json
{
  "formatVersion": "1.0",
  "language": "bg",
  "title": "Котаракът и Спасението на Аврея",
  "episodes": []
}
```

Avoid multilingual fields in MVP package files.

## Relation to ADR-0010

ADR-0010 said to support multilingual content from the start. This ADR refines that decision for MVP:

- the platform can host books in multiple languages
- a single book record contains only one language
- translations are separate books until a later ADR changes the model

## Consequences

MVP aggregate becomes:

```text
GameBook
 ├── Language
 ├── Metadata
 ├── InitialState
 ├── Rules
 └── Episodes
      └── Choices
```

All future development must assume `One GameBook = One Language` until this ADR is replaced.
