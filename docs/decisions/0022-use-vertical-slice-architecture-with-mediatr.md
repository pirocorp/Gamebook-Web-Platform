\# ADR-0022: Use Vertical Slice Architecture with MediatR



\## Status



Accepted



\## Context



The backend must support a growing set of independent features:



\- Public gamebook browsing

\- Starting games

\- Executing player choices

\- Managing saves

\- Authentication

\- Administration

\- Book editing

\- Media management

\- Import/export functionality



The original architecture decision was based on Clean Architecture principles with separate API, Core, Data, and Test projects.



During implementation planning, the project direction changed toward a feature-oriented approach.



The goal is to keep:



\- Clean Architecture boundaries

\- Independent features

\- Testable business logic

\- AI-friendly code organization



while avoiding large technical folders such as:



```text

Controllers/

Services/

DTOs/

Validators/

