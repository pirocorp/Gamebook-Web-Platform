# Player State

Player state represents the adventure diary.

Milestone 1 fields:

```text
readerName
currentDate or startedAt
rating
codeWords
items
skills
money
notes
custom
```

The state is represented by strongly typed C# objects and persisted as JSONB for saves and initial book state.

Anonymous saves store equivalent state in browser localStorage and are addressed by a browser-only local save id.
