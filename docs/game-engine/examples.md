# Game Engine Examples

## Condition Examples

Simple conditions:

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

Alternative condition:

```json
{
  "type": "any",
  "conditions": [
    { "type": "hasSkill", "skill": "skill-key" },
    { "type": "hasCodeWord", "codeWord": "code-word-key" }
  ]
}
```

## Effect Examples

```json
[
  { "type": "removeMoney", "amount": 20 },
  { "type": "addMoney", "amount": 10 },
  { "type": "addItem", "item": "item-key" },
  { "type": "removeItem", "item": "item-key" },
  { "type": "addCodeWord", "codeWord": "code-word-key" }
]
```

Use `targetEpisodeKey` for ordinary choice navigation:

```json
{
  "key": "1-to-31",
  "originalLabel": "Original choice label.",
  "displayLabel": "Reader-facing choice label.",
  "targetEpisodeKey": "31",
  "conditions": null,
  "effects": []
}
```

`setCurrentEpisode` remains available for special engine-driven redirects, but should not be used for ordinary choices in the curated subset.
