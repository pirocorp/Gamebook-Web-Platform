# ADR-0020: Frontend routing strategy

## Status

Accepted

## Decision

Use a hybrid routing approach.

Public areas behave like a classic multipage website.

Examples:

/books
/books/book-slug
/authors

Interactive areas behave as single page applications.

Examples:

/play/{id}
/admin

## Reasons

- Better public website experience.
- Better future SEO possibilities.
- Game reader remains fast and app-like.
- Fits future community platform goals.
