# AI Development Instructions

## Stack

Backend:
ASP.NET Core + EF Core + PostgreSQL

Frontend:
Vanilla TypeScript + Vite

## Rules

- Do not introduce React
- Do not replace PostgreSQL
- Do not put game logic in the frontend
- Backend validates choices
- Backend is the source of truth for game rules.
- Use JSONB for flexible game rules
- Keep published gamebook versions immutable
- Do not hardcode books into the engine.
