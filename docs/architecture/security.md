# Security Architecture

## MVP authentication

MVP browser authentication uses ASP.NET Core Identity cookies.

- HttpOnly cookies
- Secure cookies in production
- SameSite=Lax
- no JWT bearer authentication in MVP
- no frontend token storage

## API behavior

Protected API endpoints use `[Authorize]` and return `401` or `403` for API requests.

## CSRF

CSRF protection for authenticated mutations is out of scope for Milestone 1.

Because cookies authenticate unsafe requests, CSRF protection must be implemented before public exposure.

## Infrastructure Security

Milestone 1 does not include non-trivial infrastructure security hardening.

Out of scope for MVP:

- production hosting security model
- public CORS policy
- reverse proxy hardening
- HTTPS and certificate setup
- backup, monitoring, and logging hardening
