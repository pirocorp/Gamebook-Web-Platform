# ADR-0023: Use EF Core migrations for database evolution

## Status

Accepted

## Context

The application uses:

- ASP.NET Core
- Entity Framework Core
- PostgreSQL
- Npgsql provider

The database schema will evolve as the platform grows.

Expected future changes include:

- Gamebook structure changes
- Rules engine improvements
- Player state evolution
- Save system changes
- Authentication changes
- Admin features
- Media management
- Community features

A consistent database evolution strategy is required.

Alternatives considered:

1. Manual SQL scripts

Example:

```text
database/
  schema.sql
  update-v2.sql
```

2. EF Core EnsureCreated

Example:

```csharp
db.Database.EnsureCreated();
```

3. EF Core migrations

Example:

```bash
dotnet ef migrations add AddGameBooks
dotnet ef database update
```

## Decision

Use EF Core migrations from the beginning.

All database schema changes must be represented by migrations.

The database schema must not be changed manually outside the migration system.

Schema flow:

```text
C# Entity Model

        |

EF Core Migration

        |

PostgreSQL Schema
```

## Rules

When changing the database model:

1. Update entity/configuration code.
2. Generate an EF Core migration.
3. Review the generated migration.
4. Commit the migration.
5. Apply the migration.

Example:

```bash
dotnet ef migrations add AddSaveGames
```

Then:

```bash
dotnet ef database update
```

## Project Structure

Database-related code belongs in:

```text
GameBook.Data/

├── Entities/
│
│   GameBookEntity.cs
│   EpisodeEntity.cs
│   ChoiceEntity.cs
│
├── Configurations/
│
│   GameBookConfiguration.cs
│   EpisodeConfiguration.cs
│
├── Migrations/
│
└── GameBookDbContext.cs
```

## PostgreSQL Specific Features

PostgreSQL features should be configured through EF Core.

Example JSONB mapping:

```csharp
builder
    .Property(x => x.State)
    .HasColumnType("jsonb");
```

Expected JSONB fields:

```text
Choice conditions
Choice effects
Player state
Gamebook rules
Media metadata
```

## Docker Development

Database containers may be recreated during development.

Schema restoration should happen through:

```text
EF Core migrations
        +
seed/import process
```

not manually maintained SQL dumps.

Example:

```text
Fresh PostgreSQL container

        |

Apply migrations

        |

Import seed gamebook packages
```

## Production Deployment

When deployed on the Ubuntu server:

```text
New application version

        |

Run pending migrations

        |

Start updated application
```

Migration execution strategy should be automated later during deployment planning.

## AI Development Rules

AI assistants modifying database structure must:

- Never directly edit database schema.
- Never create standalone schema.sql files.
- Add or modify entities/configurations first.
- Generate migrations for schema changes.
- Preserve existing migrations.
- Consider existing saved games before modifying tables.

Before changing schema, check:

```text
docs/decisions/
database documentation
existing migrations
```

## Reasons

Positive:

- Database history is tracked.
- Code and schema remain synchronized.
- Easier upgrades.
- Works well with Docker.
- Supports production deployments.
- Easier collaboration.
- AI can understand schema evolution.

Negative:

- Requires migration discipline.
- Generated migrations must be reviewed.
- Some PostgreSQL-specific changes may need manual migration adjustments.

## Consequences

The project will not use:

```text
EnsureCreated()
manual schema.sql initialization
database-first development
```

EF Core migrations become the single source of truth for schema evolution.

Database seed data and gamebook content import remain separate concerns.

Gamebook content is managed through:

```text
content/gamebooks/

        |

ImportService

        |

PostgreSQL data
```

not through migrations.