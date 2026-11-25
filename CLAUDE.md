# GF Anniversary

Anniversary web app. Frontend-only Next.js 14 (App Router) in `frontend/`.

## Stack

- Next.js 14.0.3, React 18, TypeScript 5
- Tailwind CSS 3 (+ forms), Framer Motion, sharp (image optimization)
- State: React contexts (`src/contexts/`)

## Commands (run inside `frontend/`)

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — production build (`output: 'standalone'`)
- `npm run lint` — ESLint (`next/core-web-vitals`)
- `npm run type-check` — `tsc --noEmit`

Claude Code preview: `.claude/launch.json` config `frontend`.

## Design

`DESIGN.md` is the binding visual spec ("Almanaque": the site as a tear-off calendar; calipso, paper, ink, marker yellow). `PRODUCT.md` holds product context. Read both before any UI change. No gradients, no emoji, no rounded corners.

## Layout

- `frontend/src/app/` — routes: `about`, `auth`, `birthday`, `chat`, `gallery`, `games`, `music`, plus `not-found`
- `frontend/src/content/` — all copy and data: photos, story, timeline, playlist, milestones
- `frontend/src/lib/site.ts` — names, start date, day/year counters, shared easing
- `frontend/src/components/` — `icons/` and `illustrations/` (SVG sets), `ui/` (shared), one folder per page
- `frontend/src/contexts/` — `AuthContext` (client-side login, token in localStorage), `MusicPlayerContext`
- `frontend/public/` — photos (`photos/fotos`, `photos/nuevas`), `illustrations/`, `music/`, `games/`
- `odd/tasks/` — task documents for larger pieces of work

## Hosting

- Public address: https://cristobal-y-josefa.web.app (Firebase Hosting site `cristobal-y-josefa` in project `capable-droplet-446401-t5`).
- Firebase Hosting only forwards every request to the Cloud Run service `gf-aniversary` (`us-central1`); see `firebase.json`. It needs redeploying only if that rule changes: `npx firebase-tools deploy --only hosting`.
- The Cloud Run addresses keep working: `https://gf-aniversary-981460085209.us-central1.run.app`.

## Rules

- Pushing to `main` deploys to production (Cloud Run via `.github/workflows/ci-cd.yml`). Work on a branch; never push to `main` without explicit approval.
- Content lives in `src/content/`; pages never hardcode copy, dates or year counts. Anything that depends on today's date is computed after mount.
- Tailwind scans `src/content/` because photos store their aspect ratio as a class.
- No backend: auth is client-side only and is not a real protection.
- Run `npm run type-check` and `npm run lint` before committing.
- Conventional commits, no AI attribution.
