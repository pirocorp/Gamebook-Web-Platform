# ADR-0022: Use Vertical Slice Architecture with MediatR

## Status

Accepted

## Context

The backend must support a growing set of independent features: browsing books, starting games, executing choices, saves, authentication, administration, media management, and import/export.

The project keeps Clean Architecture boundaries while organizing application code by business use case.

## Decision

Use Vertical Slice Architecture with MediatR.

Each feature owns its request flow:

```text
Feature
 ├── Command or Query
 ├── Handler
 ├── Validator
 └── Response
```

Controllers remain thin and call MediatR.

Example:

```text
Features/Games/ExecuteChoice/
  ExecuteChoiceCommand.cs
  ExecuteChoiceHandler.cs
  ExecuteChoiceValidator.cs
  ExecuteChoiceResponse.cs
```

## Architecture Rules

```text
HTTP Request
  |
Controller
  |
MediatR
  |
Handler
  |
Core domain / game engine
  |
Repository
  |
Database
```

- Core must not reference API, EF Core, PostgreSQL, ASP.NET Core, or MediatR.
- MediatR handlers orchestrate use cases.
- Business rules belong in Core.
- Database access belongs in Data.

## MediatR Usage

Use MediatR for commands, queries, feature handlers, and pipeline behaviors such as validation, logging, transactions, and authorization.

The handler should not contain low-level game rule evaluation. It should delegate to `GameEngine`, `RulesEngine`, and `EffectsEngine`.

## AI Development Rules

AI assistants must:

- Add new backend functionality as vertical slices.
- Avoid generic Services/DTOs/Validators dumping grounds.
- Keep feature files together.
- Keep game rules outside handlers.
- Preserve dependency direction.

## Licensing Note

The project uses MediatR under an available Community license. Licensing must be reviewed before larger commercial launch or if license limits are exceeded.

## Consequences

The first vertical slice should implement a complete user flow:

```text
Book Library
  |
Start Game
  |
Load Episode
  |
Execute Choice
  |
Update Player State
```
