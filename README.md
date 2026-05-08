# My Portfolio (Next.js + Supabase)

This repository contains a personal portfolio site built with Next.js (App Router), TypeScript, React and Supabase for content storage and authentication. The project includes an admin UI for managing Skills, Experience, Projects, and Design assets (images stored in Supabase Storage).

If you want me to tailor this README further (more infra steps, SQL snippets, or CI), tell me which section and I will expand it.

## Table of contents

- Overview
- Tech stack
- Local setup
- Environment variables
- Supabase setup (tables + storage)
- Admin / auth flow
- Server API endpoints
- Image upload & storage conventions
- Build & deploy
- Troubleshooting
- Next steps

## Overview

The site is a Next.js App Router application. Content is read from Supabase (client for public reads, server service-role client for admin writes & storage uploads). The admin UI (at `/admin`) allows authenticated users to CRUD Skills, Experience, Projects, and manage design asset images located in the `design-assets` bucket.

Key implementation choices

- R/W separation: browser uses an anon Supabase client for reads; privileged writes and storage operations are handled by server API routes that use the `SUPABASE_SERVICE_ROLE_KEY`.
- Server-side admin guard: the admin layout checks an HttpOnly cookie set after login so unauthenticated requests are redirected to `/login` server-side (prevents indexing).

## Tech stack

- Next.js 15 (App Router)
- React + TypeScript
- Supabase (Postgres + Auth + Storage)
- Tailwind CSS for styling

## Local setup

Prereqs

- Node.js 18+ (use the version in `package.json` if provided)
- npm (or pnpm/yarn)
- A Supabase project (you'll need the project URL and keys)

Clone and install

```powershell
git clone <repo-url>
cd my-portfolio
npm install
```

Environment variables

Create a `.env.local` file in the project root with these values:

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key # server-only, keep secret
EMAILJS_PUBLIC_KEY=your-emailjs-public-key     # required by EmailJS REST
EMAILJS_PRIVATE_KEY=your-emailjs-private-key   # server-only, keep secret
```

Do NOT commit `SUPABASE_SERVICE_ROLE_KEY` to source control.

Run dev server

```powershell
npm run dev
# open http://localhost:3000
```

Build for production

```powershell
npm run build
npm run start
```

## Supabase setup

Tables (suggested)

- `skills` — `id` (uuid pk), `name` (text), `category` (text), `created_at`
- `experience` — `id`, `company`, `role`, `date_start`, `date_end`, `order_index`, `created_at`
- `projects` — `id`, `title`, `image_url` (text), `github_url` (text), `is_published` (boolean), `order_index` (int), `created_at`

Storage buckets

- `design-assets` — prefix-based folders:
  - `triad/announcement/`
  - `triad/event/`
  - `lcup/`
  - `freelance/logo/`
  - `freelance/banner/`

Project images in the repo are uploaded to `design-assets/project` by default. If you'd prefer a different bucket or prefix, update `src/app/api/admin/upload/route.ts`.

Row-Level Security

This project expects server-side admin endpoints to perform writes (so you can safely enable RLS on tables). The server endpoints validate a bearer token sent from the client and then use the service-role client for mutations.

## Admin / auth flow

- Login page: `/login` — uses `supabaseClient.auth.signInWithPassword`. After successful login the client posts the session access token to `/api/admin/session` which sets an HttpOnly cookie `sb_admin_token`.

Protection

- Server: `src/app/admin/layout.tsx` is a server component that reads the `sb_admin_token` cookie, validates it with Supabase. If missing/invalid the request is redirected to `/login` (this prevents indexing and unauthenticated access at the HTML level).
- Client: `src/app/admin/page.tsx` additionally checks client-side session for UX, but the server-side layout is authoritative.

Sign-out: the server session cookie can be cleared by `DELETE /api/admin/session`. Ensure your `SignOutButton` calls this route to fully sign out.

## Server API endpoints (admin)

All admin endpoints live under `/api/admin` and validate the incoming bearer token before performing writes with the service-role client.

- `/api/admin/skills` — GET/POST/PATCH/DELETE
- `/api/admin/experience` — GET/POST/PATCH/DELETE
- `/api/admin/projects` — GET/POST/PATCH/DELETE (store `image_url` as text)
- `/api/admin/upload` — POST (single file) — used for project image uploads; returns a public URL
- `/api/admin/design` — GET (list by prefix), POST (upload to prefix), DELETE (remove by path)
- `/api/admin/session` — POST (set HttpOnly cookie), DELETE (clear it)

See `src/app/api/admin/*` for the server implementations.

## Contact & EmailJS

The contact page submits messages to a server-side route that relays them to EmailJS. This keeps the EmailJS private key off the client and out of the bundle.

Server route

- `POST /api/email` — forwards the form payload to EmailJS (`service_fpu5tab`, `template_s8wic18`) using the `EMAILJS_PRIVATE_KEY` from environment.

Environment

- Set `EMAILJS_PRIVATE_KEY` in `.env.local` and in your hosting provider's environment settings.

Payload shape

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "topic": "Web Development",
  "message": "Hello from the portfolio contact form!"
}
```

Template params

- The server maps form values to EmailJS `template_params` as:
  - `name`, `email`, `topic`, `message`, and `time` (server timestamp via `new Date().toLocaleString()`).

Testing locally

```powershell
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "topic":"General Inquiry",
    "message":"This is a test message"
  }'
```

Notes

- The EmailJS service and template IDs are configured in the server route. If you change them, update `src/app/api/email/route.ts` accordingly.
- Errors from EmailJS are returned as JSON with a 502 status to the client; the contact page shows a friendly alert on failure and a brief "CLEARED" state on success.

## Image upload & storage conventions

- Project image upload: admin UI uploads the file to `/api/admin/upload` (server stores file and returns public URL), then the client stores the URL in `projects.image_url`.
- Design assets: managed under `design-assets/<prefix>`; admin UI lists/uploads/deletes via `/api/admin/design`.
- Filenames include a timestamp prefix to avoid collisions: `<timestamp>_<original_name>`.

## Build & deploy

Vercel

1. Create a Vercel project and connect the repository.
2. Add required environment variables in the Vercel dashboard (see `.env.local` above). Mark `SUPABASE_SERVICE_ROLE_KEY` as a secret.

Other hosts

Make sure the environment variables are available at runtime and that the host supports Next.js App Router server components.

## Troubleshooting

- "Permission denied" on client writes — enable RLS and use the server admin endpoints. Ensure the client sends the bearer token in Authorization header and server validates it.
- Uploads failing or not visible — confirm bucket/prefix names, public access or that you request a signed URL. Server returns public URL with `supabase.storage.from(bucket).getPublicUrl(path)`.
- Admin still indexable — ensure the server layout `src/app/admin/layout.tsx` exists and your login flow sets the `sb_admin_token` cookie. Crawlers will still see pages if you accidentally serve admin HTML without the layout check.
- Email not sending — verify `EMAILJS_PRIVATE_KEY` is set on the server, service/template IDs are correct, and outbound requests to `https://api.emailjs.com/api/v1.0/email/send` are allowed by your host.