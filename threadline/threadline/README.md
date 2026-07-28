# Threadline

A Linktree-style link-in-bio app: a customizable public page for each user
(`/username`), and a dashboard where users log in to manage their own links,
bio, and theme.

Stack: **Next.js 14 (App Router)** + **Supabase** (Postgres database + auth).

## 1. Create a Supabase project

1. Go to https://supabase.com, sign up, and create a new project.
2. Open **SQL Editor** → **New query**, paste the contents of
   `supabase/schema.sql`, and run it. This creates the `profiles` and `links`
   tables, row-level security policies (so users can only edit their own
   data), and a trigger that auto-creates a profile on signup.
3. Go to **Authentication → Providers → Email** and, for quick local testing,
   turn **off** "Confirm email" (so you can log in immediately after signing
   up). Turn it back on before going live publicly.
4. Go to **Settings → API** and copy your **Project URL** and **anon public
   key**.

## 2. Configure the app

```bash
cp .env.local.example .env.local
```

Paste your Project URL and anon key into `.env.local`.

## 3. Install and run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

- `/signup` — create an account (this also creates your public page)
- `/dashboard` — your admin panel: edit bio, avatar, theme, and links
- `/your-username` — your public page, viewable by anyone

## 4. Deploy

Push this folder to a GitHub repo, then import it on
[vercel.com](https://vercel.com). Add the same two environment variables
(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
`NEXT_PUBLIC_SITE_URL` set to your live domain) in the Vercel project
settings, then deploy.

## How it's put together

- `supabase/schema.sql` — database tables + security rules (the "backend")
- `middleware.js` — keeps sessions alive and blocks `/dashboard` for logged-out visitors
- `app/dashboard/` — the admin panel (profile form, theme picker, link manager)
- `app/[username]/` — the public page anyone can visit
- `app/login/`, `app/signup/` — auth screens

## Customizing further

- **Themes**: add more presets in `app/dashboard/ThemeEditor.jsx` (the `THEMES` array).
- **Analytics**: `links.click_count` already tracks clicks per link; you could
  add a `link_clicks` table with timestamps for a proper analytics chart.
- **Custom domains, drag-to-reorder, image uploads to Supabase Storage**: all
  natural next additions once the core flow feels right.
