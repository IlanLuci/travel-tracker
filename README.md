# Travel Tracker

A small Node/Express app that visualizes the countries, US states, and Canadian provinces I've visited (and ones I've planned) on an interactive amCharts world map. Visits are stored in a local SQLite database via Prisma, and the UI supports browsing place lists and logging new visits.

## Stack

- Node + Express server (`index.js`, `routes/api.js`)
- Prisma + SQLite for persistence (`prisma/schema.prisma`, `prisma/dev.db`)
- Static frontend in `static/index.html` using vendored amCharts 5 (`static/lib/amcharts5/`)

## Running locally

```bash
npm install
npx prisma db push    # create the SQLite tables
node index.js         # starts on PORT from .env (default 5556)
```

Then open `http://localhost:5556/`.

`.env` only needs:

```
DATABASE_URL="file:./dev.db"
PORT=5556
```

## API

- `GET /api/visits` — list all visits
- `POST /api/visits` — upsert `{ type, code, status, visitedAt }` where `type` is `country` / `state` / `province` and `status` is `visited` / `planned`
- `DELETE /api/visits/:id` — remove a visit

`prisma/seed.js` is an optional example for bulk-inserting visits (empty by default).

## AI usage

AI was used to add the backend, visit-logging UI, and place list view in June of 2026. Everything else on this project was created by Ilan Luciano without the use of AI.
