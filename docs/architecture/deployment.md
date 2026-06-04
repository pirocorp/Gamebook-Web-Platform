# Deployment Architecture

Production hosting and deployment hardening are out of scope for Milestone 1.

Milestone 1 focuses on a fully working local/development platform, not production infrastructure.

## Development

- PostgreSQL runs in Docker.
- API can run locally or in Docker.
- Frontend can run locally with Vite or in Docker.
- Docker Compose should support the full stack.
- Local frontend development should use a Vite dev proxy or another same-origin-style setup to avoid CORS complexity.

## Later production hardening

- production hosting model
- reverse proxy
- HTTPS
- certificates
- public CORS policy, if a later deployment needs cross-origin access
- backups
- logging
- monitoring
