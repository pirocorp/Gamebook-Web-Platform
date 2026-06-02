\# ADR-0025: Use single-language gamebooks in MVP



\## Status



Accepted



\## Context



The original platform vision included multilingual support from the beginning.



The idea was that a gamebook could contain multiple translations:



```text

GameBook



&#x20;├── Bulgarian content

&#x20;├── English content

&#x20;└── Other languages

```



This would require multilingual structures for:



\- Book metadata

\- Episodes

\- Choices

\- Media descriptions

\- Rules text



Example:



```json

{

&#x20; "title": {

&#x20;   "bg": "Котаракът и Спасението на Аврея",

&#x20;   "en": "The Cat and the Salvation of Avrea"

&#x20; }

}

```



During implementation planning it was decided this introduces unnecessary complexity for the MVP.



A translated gamebook can initially be treated as a separate book.



\## Decision



For the MVP, each `GameBook` contains exactly one language.



A translation is represented as another `GameBook`.



Example:



```text

GameBook

&#x20; Title: Котаракът и Спасението на Аврея

&#x20; Language: bg





GameBook

&#x20; Title: The Cat and the Salvation of Avrea

&#x20; Language: en

```



The domain model stores language at the book level.



Example:



```text

GameBook



&#x20;├── Title

&#x20;├── Description

&#x20;├── Language

&#x20;│

&#x20;├── Episodes

&#x20;│    └── Text

&#x20;│

&#x20;└── Choices

&#x20;     └── Text

```



\## Removed MVP Complexity



The MVP will not include:



```text

GameBookTranslation



EpisodeTranslation



ChoiceTranslation



LocalizedText

```



Fields remain simple:



```csharp

public string Title { get; private set; }



public string Description { get; private set; }



public string Language { get; private set; }

```



Episodes:



```csharp

public string OriginalText { get; private set; }



public string DisplayText { get; private set; }

```



Choices:



```csharp

public string OriginalText { get; private set; }



public string DisplayText { get; private set; }

```



\## Gamebook Package Format



The JSON import format follows the same rule.



Example:



```json

{

&#x20; "formatVersion": "1.0",



&#x20; "language": "bg",



&#x20; "title": "Котаракът и Спасението на Аврея",



&#x20; "episodes": \[

&#x20;   {

&#x20;     "key": "1",



&#x20;     "originalText": "...",



&#x20;     "displayText": "..."

&#x20;   }

&#x20; ]

}

```



Avoid:



```json

{

&#x20; "title": {

&#x20;   "bg": "...",

&#x20;   "en": "..."

&#x20; }

}

```



\## Future Extension



This decision does not prevent future multilingual support.



Possible future model:



```text

BookFamily



&#x20;   |



GameBook(bg)



GameBook(en)



GameBook(de)

```



or:



```text

GameBook



&#x20;   |



Translations

```



The future solution will be decided when:



\- multiple translations exist

\- translation workflow is required

\- community authors/translators are supported



\## Relation to ADR-0010



ADR-0010 originally stated:



"Support multilingual content from the start."



This ADR refines that decision.



Meaning:



Still supported:



\- Multiple languages in the platform

\- Browsing books by language

\- Different language editions



Changed:



\- A single book does not contain multiple languages in MVP.



ADR-0025 supersedes the implementation approach of ADR-0010 for MVP.



\## Reasons



Positive:



\- Simpler domain model.

\- Simpler database schema.

\- Easier import format.

\- Easier admin editor.

\- Faster MVP delivery.

\- Avoids premature translation complexity.



Negative:



\- Translations are duplicated books initially.

\- No shared translation workflow.

\- Statistics/saves are separate per translated edition.



\## Consequences



MVP aggregate becomes:



```text

GameBook (Aggregate Root)



&#x20;├── Language

&#x20;├── Metadata

&#x20;├── InitialState

&#x20;├── Rules

&#x20;│

&#x20;├── Episodes

&#x20;│

&#x20;│     └── Choices

&#x20;│

&#x20;└── AccessSettings

```



Not:



```text

GameBook



&#x20;└── Translations



&#x20;     └── Episodes

```



All future development must assume:



```text

One GameBook = One Language

```



until this ADR is replaced.

