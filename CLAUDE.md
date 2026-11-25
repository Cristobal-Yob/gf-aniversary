# GF Anniversary

Anniversary web app. Frontend-only Next.js 14 (App Router) in `frontend/`.

## Stack

- Next.js 14.0.3, React 18, TypeScript 5
- Tailwind CSS 3 (+ forms, typography), Framer Motion, Swiper, lucide-react
- State: zustand, React contexts (`src/contexts/`)
- Forms: react-hook-form + zod

## Commands (run inside `frontend/`)

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — production build (`output: 'standalone'`)
- `npm run lint` — ESLint
- `npm run type-check` — `tsc --noEmit`

Claude Code preview: `.claude/launch.json` config `frontend`.

## Layout

- `frontend/src/app/` — routes: `about`, `auth`, `birthday`, `chat`, `gallery`, `games`, `music`
- `frontend/src/components/` — shared UI (intro, music player, hearts, lightbox, navbar)
- `frontend/src/contexts/` — `AuthContext` (client-side login, token in localStorage), `MusicPlayerContext`
- `frontend/src/hooks/` — `useAudioBeat`
- `frontend/public/` — static assets (images, music)

## Rules

- Pushing to `main` deploys to production (Cloud Run via `.github/workflows/ci-cd.yml`). Work on a branch; never push to `main` without explicit approval.
- No backend: `NEXT_PUBLIC_API_URL` defaults to `http://localhost:8000` but auth is client-side only.
- Run `npm run type-check` and `npm run lint` before committing.
- Conventional commits, no AI attribution.
