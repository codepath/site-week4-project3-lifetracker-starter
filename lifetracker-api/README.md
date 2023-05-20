# LifeTracker Express API

This repo holds the backend code for the LifeTracker Express API.

## Dev Setup

Copy the .env.template into a `.env` file.

```bash
cp .env.template .env
```

And fill in the appropriate env vars:

```bash
DATABASE_USER=postgres
DATABASE_PASS=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=lifetracker
DATABASE_TEST_NAME=lifetracker_test
```

These should be updated with values needed for your PostgreSQL connection string.

Then setup the database by running `psql -f lifetracker.sql`.

Run `npm install` to get the appropriate dependencies.

Start up the server in dev with `npm run dev` (`npm run dev-win` for Windows users).