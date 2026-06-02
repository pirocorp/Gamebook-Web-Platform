# Game Engine Examples

## Condition example

```json
{
  "type": "all",
  "conditions": [
    { "type": "hasItem", "item": "кинжал" },
    { "type": "moneyAtLeast", "amount": 20 }
  ]
}
```

## Effect example

```json
[
  { "type": "removeMoney", "amount": 20 },
  { "type": "addCodeWord", "codeWord": "княз" },
  { "type": "setCurrentEpisode", "episodeKey": "56" }
]
```
