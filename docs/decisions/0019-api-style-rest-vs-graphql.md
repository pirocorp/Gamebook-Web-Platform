# ADR-0019: API style: REST vs GraphQL

## Status

Accepted

## Decision

Use REST API first.

GraphQL is not part of the MVP, but backend architecture must not prevent adding GraphQL later.

## Architecture requirement

Controllers must not contain business logic.

Flow:

REST Controllers
 -> Application Services
 -> Game Engine / Domain

Future GraphQL support should reuse the same application services.

## Reasons

- REST fits command-based gameplay actions.
- ASP.NET Core has excellent REST/OpenAPI support.
- Keeps MVP simple.
- Does not block future GraphQL adoption.
