# moneyU

Income, expense, logistics, manpower and salary management for a shop.

Next.js (App Router) + Postgres (Prisma) + Google login. No separate backend —
server actions talk to the database directly.

## Local development

1. `npm install`
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL` (any Postgres
   instance) and the Google OAuth credentials below.
3. `npx prisma migrate dev`
4. `npm run dev` → http://localhost:3000

### Google OAuth credentials

1. https://console.cloud.google.com/apis/credentials → Create credentials →
   OAuth client ID → Web application.
2. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   (add the production URL too once deployed).
3. Put the client ID/secret in `.env` as `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`.
4. `AUTH_SECRET` — any random string, e.g. `openssl rand -base64 32`.

## Deploy (Vercel + Neon)

1. Create a free Postgres database at https://neon.tech (or Supabase, or any
   Postgres host) and copy its connection string.
2. Import this repo into https://vercel.com/new.
3. Add the four env vars from `.env.example` in the Vercel project settings.
4. Add `https://<your-vercel-domain>/api/auth/callback/google` as a second
   authorized redirect URI on the Google OAuth client.
5. Deploy. The build runs `prisma migrate deploy` automatically, so the
   database schema stays in sync on every push.
