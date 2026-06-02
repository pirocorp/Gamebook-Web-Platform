# ADR-0001: Use PostgreSQL as the primary database

## Status

Accepted

## Context

The platform needs to store relational data such as users, books, versions, episodes, choices, saves, tags, and media metadata.

It also needs flexible data structures for gamebook-specific rules, player state, conditions, effects, and custom mechanics.

Alternatives considered:

- PostgreSQL
- MS SQL Server
- MongoDB

## Decision

Use PostgreSQL as the primary database.

## Reasons

- Strong relational database support.
- Excellent JSONB support for flexible game data.
- Works well with Docker and Linux.
- Free and open source.
- Good support in C# through EF Core and Npgsql.
- Easier initial deployment on an Ubuntu server.
- Suitable for later migration to managed PostgreSQL options.

## Consequences

Positive:

- Good fit for both relational and semi-structured game data.
- JSONB can support flexible mechanics without constantly changing the schema.
- Avoids SQL Server licensing and container-size concerns.

Negative:

- Less Microsoft-native tooling than SQL Server.
- The team must be comfortable with PostgreSQL-specific features such as JSONB and GIN indexes.
