# VOC Repository Web App

Static Next.js app for the **VOC Repository** demo experience in this repo.
It renders six read-only product intelligence views from typed sample data and
exports a weekly brief as Markdown.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- Static export via `next build`

## Routes

- `/` — dashboard overview
- `/records` — VOC signal records
- `/accounts` — account evidence board
- `/themes` — ranked theme board
- `/briefs` — weekly decision brief + Markdown export
- `/queue` — build-next priority queue

## Local development

```bash
cd webapp
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run build
npx tsc --noEmit
npm run lint
```

## GitHub Pages build

The repo deploy workflow builds this app with:

```bash
NEXT_PUBLIC_BASE_PATH=/web-app-idea-lab npm run build
```

That keeps route links correct under the project Pages URL:
`https://akillness.github.io/web-app-idea-lab/`
