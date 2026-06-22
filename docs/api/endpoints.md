# API Endpoints

This document describes the endpoints currently implemented in the backend.

Current implementation note:

- `GET /api/books` and `GET /api/books/{slug}` read catalog metadata stored in PostgreSQL
- the anonymous play endpoints load the playable runtime package from `content/gamebooks/{slug}/gamebook.json`
- the full episode/choice graph is not stored in PostgreSQL yet

Base URLs:

- Docker Compose: `http://localhost:8080`
- local `dotnet run`: `http://localhost:5019`

Interactive API UI:

- Scalar: `GET /scalar`

## Health

### `GET /api/health`

What it does:

- confirms that the API process is running and responding

Returns:

- `200 OK` with a small JSON payload like:

```json
{
  "status": "ok"
}
```

Use it for:

- quick smoke checks
- Docker/runtime verification
- basic uptime probes during development

## Books

### `GET /api/books`

What it does:

- returns the list of gamebooks currently available in the catalog
- the catalog is seeded automatically from the curated package files on startup

Current behavior:

- returns one seeded curated book: `kotarakat-avreya`
- data comes from the same package source used by the play flow

Returns:

- `200 OK` with an array of book summaries

Current response shape:

```json
[
  {
    "id": "guid",
    "slug": "kotarakat-avreya",
    "title": "Котаракът и Спасението на Аврея"
  }
]
```

### `GET /api/books/{slug}`

What it does:

- returns details for one catalog book by slug

Path parameter:

- `slug`: the gamebook slug, for example `kotarakat-avreya`

Returns:

- `200 OK` when the book exists
- `404 Not Found` when the slug is unknown

Use it for:

- future `/books/{slug}` frontend page
- verifying a specific book is available before starting play

## Anonymous Games

Anonymous play is stateless from the backend point of view.

The browser owns the save record in `localStorage` and sends the current save
state to the backend for validation and rule execution. The backend returns the
updated state that the browser should persist.

Current supported mechanics:

- `moneyAtLeast`
- `addItem`
- `removeMoney`

Deferred mechanics such as code-word branching remain outside the first backend
slice.

### `POST /api/games/anonymous/start`

What it does:

- starts a new anonymous game from a gamebook slug
- loads the curated package
- copies the package `initialState`
- returns the first episode and available choices

Request body:

```json
{
  "gamebookSlug": "kotarakat-avreya"
}
```

Returns:

- `200 OK` with the initial anonymous game state
- `400 Bad Request` when the request payload is invalid
- `404 Not Found` when the gamebook slug does not exist

Response shape:

```json
{
  "gamebookSlug": "kotarakat-avreya",
  "gamebookTitle": "Котаракът и Спасението на Аврея",
  "save": {
    "gamebookSlug": "kotarakat-avreya",
    "currentEpisodeKey": "1",
    "playerState": {
      "readerName": "",
      "rating": null,
      "money": 100,
      "items": [],
      "skills": [],
      "codeWords": [],
      "notes": "",
      "custom": {}
    }
  },
  "episode": {
    "key": "1",
    "title": "Episode 1",
    "displayText": "Episode text...",
    "choices": [
      {
        "key": "1-to-31",
        "label": "Choice label"
      }
    ]
  },
  "isCompleted": false
}
```

### `POST /api/games/anonymous/state`

What it does:

- rebuilds the current reader-facing game state from a browser-owned anonymous save
- validates the current episode against the package
- filters choices based on currently supported rules

Use it for:

- restoring a game from `localStorage`
- refreshing the current episode state after the frontend loads `/play/{gameId}`

Request body:

```json
{
  "save": {
    "gamebookSlug": "kotarakat-avreya",
    "currentEpisodeKey": "1",
    "playerState": {
      "readerName": "",
      "rating": null,
      "money": 100,
      "items": [],
      "skills": [],
      "codeWords": [],
      "notes": "",
      "custom": {}
    }
  }
}
```

Returns:

- `200 OK` with the current episode and currently available choices
- `400 Bad Request` when the save payload is invalid
- `404 Not Found` when the book or episode does not exist

### `POST /api/games/anonymous/choice`

What it does:

- validates a selected choice against the current anonymous save
- ensures the choice exists in the current episode
- checks whether the choice is currently available
- applies the supported effects
- moves the save to the target episode
- returns the updated game state for storage in `localStorage`

Request body:

```json
{
  "save": {
    "gamebookSlug": "kotarakat-avreya",
    "currentEpisodeKey": "1",
    "playerState": {
      "readerName": "",
      "rating": null,
      "money": 100,
      "items": [],
      "skills": [],
      "codeWords": [],
      "notes": "",
      "custom": {}
    }
  },
  "choiceKey": "1-to-31"
}
```

Returns:

- `200 OK` with the updated anonymous game state
- `400 Bad Request` when the request payload is invalid
- `404 Not Found` when the book, episode, or choice cannot be found
- `409 Conflict` when the choice exists but is not currently available

Use it for:

- main play loop choice submission
- backend-owned rule execution with frontend-owned local persistence

## Not Implemented Yet

These documented milestone endpoints are not implemented in the current backend
slice:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- authenticated save endpoints
- server-side save retrieval by save id

Those remain later work after this anonymous backend slice.
