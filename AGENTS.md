# AI Development Instructions

## Stack



\## Backend Architecture



The backend uses:



Vertical Slice Architecture

\+

Clean Architecture boundaries

\+

MediatR



Features are organized by use case.



Example:



backend/GameBook.Api/Features/Games/ExecuteChoice/



Contains:

\- Endpoint

\- Command/Query

\- Handler

\- Validator

\- Response



Do not create generic folders:



\- Controllers/

\- Services/

\- DTOs/

\- Validators/



unless they are infrastructure-level concerns.



Business rules belong in GameBook.Core.



MediatR handlers orchestrate workflows but do not contain domain rules.





\## Frontend:


Vanilla TypeScript + Vite











## Rules

* Do not introduce React
* Do not replace PostgreSQL
* Do not put game logic in the frontend
* Backend validates choices
* Backend is the source of truth for game rules.
* Use JSONB for flexible game rules
* Keep published gamebook versions immutable
* Do not hardcode books into the engine.

