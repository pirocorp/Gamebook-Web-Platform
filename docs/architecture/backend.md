# Backend Architecture

## Stack

- ASP.NET Core
- Controllers
- MediatR
- Vertical Slice Architecture
- Clean Architecture boundaries
- EF Core
- PostgreSQL
- ASP.NET Core Identity cookie authentication

## Structure

```text
backend/

GameBook.Api/
  Controllers/
  Features/
  Common/

GameBook.Core/
  Domain/
  GameEngine/
  Rules/
  Effects/
  Interfaces/

GameBook.Data/
  GameBookDbContext.cs
  Configurations/
  Repositories/
  Migrations/

GameBook.Tests/
```

## Request Flow

```text
HTTP API Request
      |
Controller
      |
MediatR Command/Query
      |
Feature Handler
      |
Core Domain / Game Engine
      |
Repository
      |
EF Core / PostgreSQL
```

## Controllers

Controllers are thin.

They may:

- define HTTP routes
- bind requests
- apply `[Authorize]`
- call MediatR
- return HTTP responses

They must not:

- contain game rules
- access DbContext directly
- contain domain workflows
- apply choice effects directly
- render public/auth Razor or MVC views in MVP

## Features

Feature code is grouped by use case.

Example:

```text
Features/
  Games/
    ExecuteChoice/
      ExecuteChoiceCommand.cs
      ExecuteChoiceHandler.cs
      ExecuteChoiceResponse.cs
      ExecuteChoiceValidator.cs
```

Avoid large generic folders such as:

```text
Services/
DTOs/
Validators/
```

unless they are truly shared infrastructure concerns.

## Core

`GameBook.Core` contains:

- rich domain entities
- aggregate roots
- game engine
- rules engine
- effects engine
- interfaces

Core must not reference:

- ASP.NET Core
- EF Core
- PostgreSQL
- MediatR

## Data

`GameBook.Data` contains:

- EF Core DbContext
- Fluent API configurations
- repository implementations
- migrations

No EF attributes are used in Core.

## Authentication

MVP uses ASP.NET Core Identity cookie authentication.

The same cookie authentication protects:

- classic pages
- `/play` SPA API calls
- REST API endpoints

API endpoints must return `401` or `403` for unauthorized requests, not redirect to login HTML.

JWT bearer authentication is not part of MVP.

## Frontend Integration

The backend is API-first in MVP. Public and auth pages are implemented as Vite multipage frontend pages that call API endpoints.
