# PlayNearby API — MongoDB + Mongoose

This is a complete server folder, not a patch. Nothing carries over from
Prisma/Kysely/Convex — no residual files from those needed.

## 1. Replace your server folder

**Back up or delete your current `server` folder entirely**, then copy this
whole folder in its place, renamed to `server`.

## 2. Get a MongoDB database — recommended: Atlas (free, no local install)

Given everything that went wrong with local Postgres on Windows, I'd
strongly suggest **not** installing MongoDB locally this time:

1. Go to https://cloud.mongodb.com, sign up free.
2. Create a free "M0" cluster (no credit card needed).
3. **Database Access** → add a database user (username + password — write
   these down).
4. **Network Access** → add IP address → "Allow access from anywhere" (fine
   for development).
5. **Database** → **Connect** → **Drivers** → copy the connection string. It
   looks like `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/...`
6. Replace `<user>` and `<password>` with what you set in step 3.

If you'd genuinely rather run MongoDB locally, install **MongoDB Community
Server**, and your connection string is just `mongodb://localhost:27017/playnearby`
— no separate `mongosh`/permission-granting dance like Postgres needed; a
local MongoDB just accepts a database name in the URL and creates it
automatically the first time you write to it.

## 3. Install and configure

```powershell
npm install
cp .env.example .env
```

Fill in `.env`: your `MONGODB_URI` from step 2, and your Clerk keys (same
ones from before — Clerk itself didn't change).

## 4. Seed some data

```powershell
npm run seed
```

## 5. Run it

```powershell
npm run dev
```

Check `http://localhost:4000/api/health`, then `http://localhost:4000/api/games`
and `http://localhost:4000/api/venues`.

## 6. Clerk webhook

Same as before — Clerk dashboard → Webhooks → point at
`https://<your-public-url>/api/webhooks/clerk`, subscribe to
`user.created`/`user.updated`/`user.deleted`, copy the signing secret into
`CLERK_WEBHOOK_SECRET`.

## What's different from the Postgres versions

- **No migrations.** MongoDB doesn't require a schema-change step to add a
  field — Mongoose schemas describe what your *application* expects, not
  a rigid table structure the database enforces. Add a field to a model
  file, restart, done.
- **No separate join table** for who's playing a game — `GameSession`
  documents embed their `participants` array directly. Fewer files, fewer
  concepts, one collection instead of two.
- **`.populate()`** replaces the manual "fetch main rows, fetch related
  rows, assemble in JS" pattern from the Kysely/plain-SQL versions —
  Mongoose does that stitching for you when you ask for related documents.

## API surface

- `GET /api/venues`, `GET /api/venues/nearby`, `GET /api/venues/:id`, `POST /api/venues`
- `GET /api/games`, `GET /api/games/:id`, `POST /api/games`, `POST /api/games/:id/join`, `DELETE /api/games/:id/join`
- `POST /api/play-requests`, `GET /api/play-requests`, `POST /api/play-requests/:id/respond`, `POST /api/play-requests/:id/cancel`
- `GET /api/communities`, `POST /api/communities`, `POST /api/communities/:id/join`
- `GET /api/sports`

Your frontend's `lib/api.ts` and existing components don't need to change —
same URLs, same response shapes as the Postgres versions had.

## Not built yet, on purpose

No frontend pages for Play Requests or Communities. No map integration.
Both are real, separate pieces of work — see the note about the map API in
the chat response, and say the word on which page to build next.
