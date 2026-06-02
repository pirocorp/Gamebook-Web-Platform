\# ADR-0024: Use rich domain entities, aggregates, and Fluent API persistence mapping



\## Status



Accepted



\## Context



The backend uses:



\- ASP.NET Core

\- EF Core

\- PostgreSQL

\- Clean Architecture boundaries

\- Vertical Slice Architecture with MediatR



The domain model should not become anemic CRUD data structures only.



The project should support domain concepts such as:



\- Gamebooks

\- Gamebook versions

\- Episodes

\- Choices

\- Save games

\- Player state

\- Rules

\- Effects

\- Media assets



The model should allow behavior and invariants to live close to the data they protect.



\## Decision



Use shared rich domain entities in `GameBook.Core`.



These domain entities may be persisted by EF Core, but they must not depend on EF Core.



EF Core configuration must live in `GameBook.Data` and use Fluent API.



Do not use EF Core attributes in domain entities.



\## Rules



Domain entities may have:



\- private setters

\- private constructors for EF Core

\- domain methods

\- validation

\- invariants

\- encapsulated collections

\- value objects



Domain entities must not use:



```csharp

\[Table]

\[Column]

\[Key]

\[ForeignKey]

\[NotMapped]

```



or any other EF-specific attributes.



\## Persistence Mapping



EF Core mapping belongs in:



```text

GameBook.Data/



Configurations/

&#x20; GameBookConfiguration.cs

&#x20; GameBookVersionConfiguration.cs

&#x20; EpisodeConfiguration.cs

&#x20; ChoiceConfiguration.cs

&#x20; SaveGameConfiguration.cs

```



Mappings must use Fluent API.



Example:



```csharp

public sealed class GameBookConfiguration

&#x20;   : IEntityTypeConfiguration<GameBook>

{

&#x20;   public void Configure(EntityTypeBuilder<GameBook> builder)

&#x20;   {

&#x20;       builder.ToTable("gamebooks");



&#x20;       builder.HasKey(x => x.Id);



&#x20;       builder.Property(x => x.Slug)

&#x20;           .IsRequired()

&#x20;           .HasMaxLength(200);



&#x20;       builder.HasIndex(x => x.Slug)

&#x20;           .IsUnique();

&#x20;   }

}

```



\## Aggregates



Use DDD aggregate concepts to define consistency boundaries.



Aggregate roots are the main entry points for loading and saving related domain data.



Initial aggregate roots:



```text

GameBook

SaveGame

MediaAsset

```



Possible aggregate structure:



```text

GameBook

&#x20; └── GameBookVersion

&#x20;       └── Episode

&#x20;             └── Choice



SaveGame

&#x20; └── PlayerState



MediaAsset

```



\## Repository Boundaries



Repositories should load and save aggregate roots.



Prefer:



```csharp

IGameBookRepository

ISaveGameRepository

IMediaAssetRepository

```



Avoid creating repositories for every child entity by default.



Avoid unless strongly justified:



```csharp

IEpisodeRepository

IChoiceRepository

```



Child entities should usually be accessed and modified through their aggregate root.



Example:



```csharp

var gameBook = await gameBookRepository.GetBySlugAsync(slug);



gameBook.AddVersion(version);

gameBook.PublishVersion(versionId);



await unitOfWork.SaveChangesAsync();

```



\## Domain Behavior



Domain behavior should live in the domain model or domain services when appropriate.



Examples:



```csharp

gameBook.AddVersion(version);

gameBook.PublishVersion(versionId);

saveGame.ApplyResult(gameResult);

playerState.AddCodeWord("княз");

playerState.RemoveMoney(20);

```



Avoid placing domain behavior only in handlers.



MediatR handlers orchestrate use cases. They do not own domain rules.



\## Game Engine Boundary



The game engine remains part of `GameBook.Core`.



The engine may operate on domain entities such as:



```text

SaveGame

PlayerState

Episode

Choice

```



The engine should not depend on:



```text

EF Core

DbContext

PostgreSQL

ASP.NET Core

MediatR

```



\## Data Access



The repository layer may return rich domain entities.



The repository implementation lives in `GameBook.Data`.



Example:



```csharp

public interface IGameBookRepository

{

&#x20;   Task<GameBook?> GetBySlugAsync(

&#x20;       string slug,

&#x20;       CancellationToken cancellationToken);



&#x20;   Task AddAsync(

&#x20;       GameBook gameBook,

&#x20;       CancellationToken cancellationToken);

}

```



Implementation:



```csharp

public sealed class GameBookRepository : IGameBookRepository

{

&#x20;   private readonly GameBookDbContext \_db;



&#x20;   public GameBookRepository(GameBookDbContext db)

&#x20;   {

&#x20;       \_db = db;

&#x20;   }



&#x20;   public async Task<GameBook?> GetBySlugAsync(

&#x20;       string slug,

&#x20;       CancellationToken cancellationToken)

&#x20;   {

&#x20;       return await \_db.GameBooks

&#x20;           .FirstOrDefaultAsync(x => x.Slug == slug, cancellationToken);

&#x20;   }



&#x20;   public Task AddAsync(

&#x20;       GameBook gameBook,

&#x20;       CancellationToken cancellationToken)

&#x20;   {

&#x20;       \_db.GameBooks.Add(gameBook);

&#x20;       return Task.CompletedTask;

&#x20;   }

}

```



\## AI Development Rules



AI assistants must:



\- Put domain entities in `GameBook.Core`.

\- Keep domain entities free of EF attributes.

\- Put EF mappings in `GameBook.Data`.

\- Use Fluent API for persistence configuration.

\- Prefer repositories around aggregate roots.

\- Avoid creating repositories for every table.

\- Avoid anemic models when behavior naturally belongs in the domain.

\- Avoid placing domain logic in controllers.

\- Avoid placing domain logic directly in MediatR handlers.



\## Reasons



Positive:



\- Stronger domain model.

\- Better encapsulation.

\- Cleaner business logic.

\- Better fit with DDD and Clean Architecture.

\- Fewer duplicate persistence/domain models.

\- Repositories work with meaningful aggregates instead of random tables.



Negative:



\- EF Core mapping can be more complex.

\- Rich entities require careful constructor and collection mapping.

\- Developers must understand aggregate boundaries.

\- Some read-only queries may still need projection models for performance.



\## Consequences



The project will not use separate persistence entities by default.



The default model is:



```text

Core domain entity

&#x20;       |

&#x20;       mapped by Fluent API

&#x20;       |

&#x20;       persisted by EF Core

```



Read models and projections may still be introduced where useful, especially for list pages, admin grids, and performance-sensitive queries.



This ADR complements:



\- ADR-0015: Clean Architecture boundaries

\- ADR-0022: Vertical Slice Architecture with MediatR

\- ADR-0023: EF Core migrations for database evolution

