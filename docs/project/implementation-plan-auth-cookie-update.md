# Implementation Plan Update: Cookie Authentication

Apply this update to `docs/project/implementation-plan.md`.

## Replace

Any MVP references to:

```text
JWT
JWT authentication
JWT token storage
TokenStorage
Authorization: Bearer
localStorage token
```

## With

```text
ASP.NET Core Identity cookie authentication
HttpOnly authentication cookie
browser-managed cookies
fetch(..., { credentials: "include" })
```

## Updated Authentication Scope

Included in Milestone 1:

- ASP.NET Core Identity
- cookie authentication
- register
- login
- logout
- `/api/auth/me`
- authenticated API calls using cookies

Excluded from Milestone 1:

- JWT bearer authentication
- frontend token storage
- password reset
- email confirmation
- external login

## Updated Auth Slice Tasks

- configure ASP.NET Identity
- configure cookie authentication
- configure API unauthorized behavior to return 401/403 instead of redirects
- create register slice
- create login slice
- create logout endpoint
- create `/api/auth/me`
- create frontend login page
- create frontend register page

## Updated Frontend Rule

Frontend API calls should use:

```typescript
fetch("/api/auth/me", {
    credentials: "include"
});
```

Do not store auth tokens in localStorage or sessionStorage.
