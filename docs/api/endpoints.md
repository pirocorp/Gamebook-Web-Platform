# API Endpoints

Milestone 1 API endpoints.

## Books

```http
GET /api/books
GET /api/books/{slug}
```

## Auth

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

Authentication uses ASP.NET Core Identity cookies. The API does not use JWT bearer authentication in MVP.

## Games

```http
POST /api/games/start
GET  /api/games/{saveId}
POST /api/games/{saveId}/choice
```

Authenticated server-save endpoints use `[Authorize]`. API endpoints must return `401` or `403`, not HTML login redirects.
