# SOFT2301 LMS

Interactive walkthrough of your SOFT2301 Software Project Management lecture notes.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new, import the repo.
3. Vercel auto-detects Next.js — just click **Deploy**.

Or with the CLI:

```bash
npm i -g vercel
vercel
```

## Content

All lesson content lives in `content/*.md`. Edit the markdown files and the LMS updates automatically.

To add a new lesson: drop a new `.md` into `content/`, then register its title/week/order in `lib/lessons.ts` (the `META` map).

## Stack

- Next.js 14 (App Router) — Vercel-ready
- React Markdown + remark-gfm for tables
- Tailwind CSS for styling
- Progress tracked in `localStorage` (no backend)
