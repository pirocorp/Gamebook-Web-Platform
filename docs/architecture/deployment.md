# Deployment Architecture

Deployment hardening is out of scope for Milestone 1.

## Development

- PostgreSQL runs in Docker.
- API can run locally or in Docker.
- Frontend can run locally with Vite or in Docker.
- Docker Compose should support the full stack.

## Later production hardening

- reverse proxy
- HTTPS
- certificates
- backups
- logging
- monitoring
