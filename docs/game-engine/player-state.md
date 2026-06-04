# Player State

Player state represents the adventure diary.

Milestone 1 fields:

```text
readerName
rating
money
items
skills
codeWords
notes
custom
```

Initial gamebook packages use this shape:

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

Runtime saves may also track save metadata such as `startedAt` outside the package `initialState`.

The state is represented by strongly typed C# objects and persisted as JSONB for saves and initial book state.

Anonymous saves store equivalent state in browser localStorage and are addressed by a browser-only local save id.
