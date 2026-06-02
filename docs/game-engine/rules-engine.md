# Rules Engine

The backend owns game rule evaluation.

Frontend must not authoritatively decide whether a choice is valid.

## Milestone 1 conditions

- hasItem
- hasSkill
- hasCodeWord
- missingCodeWord
- moneyAtLeast
- all
- any

## Milestone 1 effects

- addItem
- removeItem
- addCodeWord
- removeMoney
- addMoney
- setCurrentEpisode

## Flow

```text
Load SaveGame
  |
Load current Episode
  |
Evaluate choice conditions
  |
Return available choices
  |
Execute selected choice
  |
Apply effects
  |
Update SaveGame
```
