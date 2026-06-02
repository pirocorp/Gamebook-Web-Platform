# Database Architecture

## Database

PostgreSQL is the primary database.

## EF Core

Schema changes use EF Core migrations from day one.

Do not use manual schema files or `EnsureCreated()` for the app schema.

## JSONB

Use strongly typed C# objects serialized to JSONB for:

- player state
- history
- conditions
- effects
- rules

## Persistence mapping

Domain entities live in `GameBook.Core`.

EF Core Fluent API mappings live in `GameBook.Data`.

No EF attributes are allowed in Core.
