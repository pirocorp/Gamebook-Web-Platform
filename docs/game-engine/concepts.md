# Game Engine Concepts

## Episode

A numbered passage in a gamebook.

## Choice

A continuation from one episode to another. Choices may have conditions and effects.

## Condition

A rule that determines whether a choice is available.

Milestone 1 conditions:

- hasItem
- hasSkill
- hasCodeWord
- missingCodeWord
- moneyAtLeast
- all
- any

## Effect

A state change applied when a choice is selected.

Milestone 1 effects:

- addItem
- removeItem
- addCodeWord
- removeMoney
- addMoney
- setCurrentEpisode

## Player state

The digital equivalent of the adventure diary.
