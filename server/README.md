# PlayNearby API

Express + PostgreSQL (via Prisma) + Clerk auth.

## 1. Install & configure

```bash
npm install
cp .env.example .env
```

Fill in `.env`:
- `DATABASE_URL` — your Postgres connection string (local Postgres, or a free
  Neon/Supabase/Railway instance work fine to start).
- `CLERK_SECRET_KEY` / `CLERK_PUBLISHABLE_KEY` — from your Clerk dashboard's
  API Keys page. **Use the same Clerk application** your Next.js frontend is
  already using — same project, same keys — not a separate one, or tokens
  issued by the frontend won't verify against this backend.
- `CLERK_WEBHOOK_SECRET` — see step 3.

## 2. Create the database schema

```bash
npm run prisma:migrate
```

This creates the tables from `prisma/schema.prisma` and generates the
type-safe Prisma client. Re-run this any time you edit the schema.

Optional: `npm run prisma:studio` opens a GUI to browse/edit rows directly.

## 3. Wire up the Clerk webhook (keeps Postgres in sync with Clerk)

Clerk owns your users' identity (email, password, sessions) — this backend
never sees a password. It only needs to know a user *exists* so it can attach
app-specific data to them (hearts, hosted games, bookings).

1. Run the server (`npm run dev`) and expose it publicly for testing —
   easiest is `npx ngrok http 4000` (or deploy it somewhere reachable).
2. In the Clerk dashboard: **Webhooks → Add Endpoint**.
   - URL: `https://<your-public-url>/api/webhooks/clerk`
   - Subscribe to: `user.created`, `user.updated`, `user.deleted`
3. Copy the **Signing Secret** Clerk gives you into `CLERK_WEBHOOK_SECRET`.

Now every signup on the frontend automatically creates a matching row in your
`User` table within moments.

## 4. Run it

```bash
npm run dev
```

API is live at `http://localhost:4000`. Check `GET /api/health` first.

## 5. Connecting from the Next.js frontend

This is the part that's easy to get wrong: your frontend and this API are
**two separate servers**, so Clerk's session isn't automatically "known" to
Express — the frontend has to explicitly attach the session token to every
request.

In a Next.js Server Component or Route Handler:

```ts
import { auth } from "@clerk/nextjs/server";

const { getToken } = await auth();
const token = await getToken();

const res = await fetch("http://localhost:4000/api/games", {
  headers: { Authorization: `Bearer ${token}` },
});
```

In a Client Component:

```ts
"use client";
import { useAuth } from "@clerk/nextjs";

const { getToken } = useAuth();

async function createGame(payload: object) {
  const token = await getToken();
  return fetch("http://localhost:4000/api/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}
```

`@clerk/express`'s `clerkMiddleware()` (already wired up in `app.ts`) reads
that header and verifies it against Clerk's public keys automatically — no
manual JWT code needed on this end. Routes that call `requireAuth()` will
403 if the header is missing or invalid.

## What's scaffolded vs. what's next

**Done:**
- `GET /api/venues/nearby?lat=&lng=&radiusKm=` — powers Heroes.tsx's map,
  same haversine math the frontend already does, just server-side over real data.
- `GET /api/venues`, `GET /api/venues/:id`
- `GET /api/games`, `GET /api/games/:id`, `POST /api/games` (host a game),
  `POST /api/games/:id/join`, `DELETE /api/games/:id/join`
- `GET /api/sports`
- Clerk auth wired end-to-end, with Postgres user sync via webhook

**Not built yet — natural next steps:**
- Venue booking flow (`Booking` model exists in the schema, no routes yet)
- Blog CRUD (`Blog` model exists, no routes yet — needed for Blogs.tsx)
- Image uploads (venue photos, avatars) — likely S3/Cloudinary + presigned URLs
- Rate limiting on write routes (`POST /api/games`, join/leave)
- Tests
