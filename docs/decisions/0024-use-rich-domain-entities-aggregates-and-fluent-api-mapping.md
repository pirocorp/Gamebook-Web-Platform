# ADR-0024: Use rich domain entities, aggregates, and Fluent API persistence mapping

## Status

Accepted

## Context

The domain model should not become anemic CRUD data structures only. The model should allow behavior and invariants to live close to the data they protect.

## Decision

Use shared rich domain entities in `GameBook.Core`.

These domain entities may be persisted by EF Core, but they must not depend on EF Core. EF Core configuration must live in `GameBook.Data` and use Fluent API.

Do not use EF Core attributes in domain entities.

## Rules

Domain entities may have:

- private setters
- private constructors for EF Core
- domain methods
- validation
- invariants
- encapsulated collections
- value objects

Domain entities must not use EF-specific attributes such as:

```csharp
[Table]
[Column]
[Key]
[ForeignKey]
[NotMapped]
```

## Persistence Mapping

EF Core mapping belongs in:

```text
GameBook.Data/Configurations/
```

Mappings must use Fluent API.

## Aggregates

Use DDD aggregate concepts to define consistency boundaries.

Initial aggregate roots:

```text
GameBook
SaveGame
MediaAsset
```

MVP aggregate structure:

```text
GameBook
 └── Episodes
      └── Choices

SaveGame
 └── PlayerState

MediaAsset
```

`GameBookVersion` is postponed for MVP.

## Repository Boundaries

Repositories should load and save aggregate roots.

Prefer:

```csharp
IGameBookRepository
ISaveGameRepository
IMediaAssetRepository
```

Avoid creating repositories for every child entity by default:

```csharp
IEpisodeRepository
IChoiceRepository
```

Child entities should usually be accessed and modified through their aggregate root.

## Game Engine Boundary

The game engine remains part of `GameBook.Core`.

The engine may operate on domain entities such as `SaveGame`, `PlayerState`, `Episode`, and `Choice`.

The engine must not depend on EF Core, DbContext, PostgreSQL, ASP.NET Core, or MediatR.

## Consequences

The project will not use separate persistence entities by default.

The default model is:

```text
Core domain entity
  |
mapped by Fluent API
  |
persisted by EF Core
```

Read models and projections may still be introduced for list pages, admin grids, and performance-sensitive queries.
