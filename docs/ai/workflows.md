# AI Workflows

## Backend feature workflow

1. Read related ADRs.
2. Create feature folder under `GameBook.Api/Features/{Area}/{Action}`.
3. Add command/query, handler, response, and validator if needed.
4. Keep controller thin.
5. Add tests.
6. Update docs if behavior changes.

## Database workflow

1. Update domain entity/configuration.
2. Add EF Core migration.
3. Review generated migration.
4. Update tests.

## Frontend workflow

1. Use Vanilla TypeScript.
2. Keep API calls in shared API modules.
3. Use cookie credentials for authenticated API calls.
4. Do not implement authoritative game rules in frontend.
