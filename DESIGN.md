# Design system: "Almanaque"

The site is a tear-off wall calendar that has been counting since 25 November 2017. Every page is a sheet of that calendar. The reference implementation is the home page: `frontend/src/app/page.tsx`. Read it before building anything.

## What is banned

- Gradients of any kind (`bg-gradient-*`, gradient text, gradient borders).
- Emoji or Unicode glyphs used as icons, bullets or decoration. Emoji are also stripped from copy.
- The old tokens and classes: `primary-*`, `secondary-*`, `accent-*`, `cream`, `font-serif`, `font-script`, `font-cursive`, `font-handwriting`, `.btn-primary`, `.btn-secondary`, `.card`, `.gradient-text`, `.gold-text`, `.glass-effect`, `animate-gradient`, `animate-shimmer`.
- Rounded corners (`rounded-*`), pills, glass/blur panels, soft pastel shadows, glow shadows.
- Pink, rose, purple, burgundy, gold. The palette below is the whole palette.
- Cards of icon + heading + text as page structure. Use ruled rows, grids and full-bleed fields.
- A small label (kicker/eyebrow) above a heading. Section numbers like 01 / 02 / 03.
- Everything looping at once. At most one continuously moving element per screen.

## Tokens (Tailwind)

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#F4F5F1` | Default page ground, text on dark fields |
| `ink` | `#0F1115` | Text on paper, rules, dark fields |
| `cobalt` | `#1F35D1` | The drenched field: heroes, active states, "today" |
| `cobalt-deep` | `#16269C` | Pressed/hover on cobalt |
| `cobalt-tint` | `#C9D0FF` | Secondary text on cobalt (never gray on blue) |
| `marker` | `#FFD60A` | Hand marks, highlighted dates, active nav, hover on paper buttons |
| `rule` | `#D5D8D2` | Hairlines on paper, secondary text on ink |
| `dim` | `#575C66` | Secondary text on paper |

Text on `marker` is always `ink`. Text on `cobalt` and `ink` is `paper`.

## Type

- `font-display` (Big Shoulders Display, weights 600/800/900): headings, numerals, nav, buttons, labels. Always `uppercase`. Headings use `font-black` or `font-extrabold` with `leading-[0.9]`. Numerals use `tabular-nums`.
- `font-body` (Hanken Grotesk): running text. It is the body default; do not add a font class for normal text.
- `font-hand` (Covered By Your Grace): Cristóbal's own words only, such as photo captions, song memories and short dedications. Never for UI. Size it large (`text-2xl` and up) and color it `text-marker` on dark fields or `text-cobalt` on paper.
- Fluid display sizes use `clamp()`, for example `text-[clamp(3rem,11vw,7.5rem)]`. Check that the real copy fits at 375px.
- Body copy maxes at `max-w-2xl`.

## Layout

- Page shell: `<Navbar />` then `<main>`; the footer of each page is a dark `bg-ink` or `bg-cobalt` closing band. The global music player is rendered by the root layout, fixed at the bottom; leave `pb-28` of clearance at the end of every page.
- Content width: `mx-auto max-w-7xl px-4 md:px-8`.
- Each inner page opens with a calendar-sheet header: a full-bleed `bg-cobalt text-paper` section starting with `<BindingRings className="h-8 w-full text-paper md:h-10" />`, then a ruled row (`border-b-2 border-paper`) with small display labels left and right, then the page `h1` in giant display type, and `<TornEdge className="absolute inset-x-0 top-full z-10 -mt-px h-4 w-full text-cobalt md:h-6" />` as its bottom edge (the section must be `relative`).
- Rules are structure: `border-ink` at 2px between major rows, `border-rule` at 1px for minor ones.
- Corners are square. Depth appears only on photo prints.

## Components that exist

- `@/components/Navbar` (already restyled).
- `@/components/ui/PhotoPrint`: a photo as a paper print with a dated caption. Use it wherever a photo is shown as an object. Rotate prints slightly (between -5 and 5 degrees) when they are placed loosely.
- `@/components/ui/DrawOnView`: wraps a marker mark and draws it when it scrolls into view.
- `@/components/home/MonthGrid`: the months grid.
- `@/components/icons`: `IconMenu`, `IconClose`, `IconArrowRight`, `IconArrowUpRight`, `IconChevronDown`, `IconPlay`, `IconPause`, `IconSkipNext`, `IconSkipPrev`, `IconVolume`, `IconVolumeMute`, `IconCamera`, `IconMusicNote`, `IconBook`, `IconHeart`, `IconRing`, `IconLock`, `IconCalendar`, `IconInfinity`, `IconExpand`, `IconGamepad`, `IconChat`, `IconLogout`, `IconUser`. They take `className` for size and inherit `currentColor`.
- `@/components/illustrations`: marker marks `MarkCircle`, `MarkUnderline`, `MarkArrow`, `MarkHeart`, `MarkCross` (colored through `[--accent:theme(colors.marker)]` on an ancestor, stretched with `className="h-full w-full"` inside a positioned `DrawOnView`); hardware `BindingRings`, `Perforation`, `TornEdge`; `MonogramJC`; `StampNine`.
- Buttons: the `.btn-almanac` class plus color classes. On cobalt: primary `border-paper bg-paper text-ink hover:bg-marker`, secondary `border-paper text-paper hover:bg-paper hover:text-ink`. On paper: primary `border-ink bg-ink text-paper hover:bg-cobalt hover:border-cobalt`, secondary `border-ink hover:bg-ink hover:text-paper`.
- Form fields: `w-full border-2 border-ink bg-paper px-4 py-3.5 text-base placeholder:text-dim focus:border-cobalt focus:outline-none focus:ring-0`; labels in `font-display text-lg font-semibold uppercase tracking-wide`.

## Content

All content lives in `frontend/src/content/` and `frontend/src/lib/site.ts`. Pages import it; they never define their own copies.

- `content/photos.ts`: `photos`, `photoCategories`.
- `content/story.ts`: `storyCards`.
- `content/timeline.ts`: `timeline`.
- `content/playlist.ts`: `playlist`, `birthdayTrack`, `Track`.
- `content/milestones.ts`: `milestones`.
- `lib/site.ts`: `COUPLE`, `RELATIONSHIP_START`, `daysTogether()`, `yearsTogether()`, `formatCount()`, `EASE_OUT`.

Copy is Cristóbal's and stays word for word, in Spanish. Never rewrite, translate or "improve" it. Numbers of years and days are computed, never typed.

Anything that depends on today's date is computed after mount (`useEffect`), because pages are prerendered at build time.

## Motion

Motion is part of the gift. Every page has scroll-driven life, but one idea at a time.

- Library: Framer Motion (`framer-motion` v10) and CSS transitions. No new dependencies.
- Easing: `EASE_OUT` from `lib/site.ts` (`[0.23, 1, 0.32, 1]`) for entrances; `[0.77, 0, 0.175, 1]` for things moving across the screen. Never `ease-in`.
- Animate `transform`, `opacity` and `clip-path` only. In Framer Motion pass full transform strings (`transform: 'translateY(14px) rotate(0deg)'`), with the same functions in the same order at both ends, instead of the `x`/`y`/`scale` shorthands. An inline animated transform overrides Tailwind transform classes on the same element.
- Never enter from `scale(0)`; start from `scale(0.94)` or more.
- Entrances are 0.5-0.9s; UI feedback (hover, press, menu) is 150-250ms. Stagger lists by 40-120ms.
- Scroll: reveal with `whileInView` and `viewport={{ once: true, margin: '0px 0px -10% 0px' }}`; use `useScroll` + `useTransform` for scroll-linked effects such as a line that draws along a timeline, parallax between photo prints, a sticky sequence that swaps photos, or a progress rule. Scroll-linked values must drive `transform`/`opacity`/`clipPath`.
- Signature moves of this world: a sheet tearing away (translate up with a slight rotation from the top-left corner), a photo print being dropped onto the page (from above, over-rotated, settling), a marker mark being drawn, a stamp landing (from `scale(1.35)` to `scale(1)` in 0.35s, once), calendar cells filling in sequence, numerals flipping through years.
- Hover effects go behind `@media (hover: hover)`; Tailwind's `hover:` is acceptable for color changes.
- Reduced motion: `useReducedMotion()` from Framer Motion. Keep opacity fades, drop movement, rotation, parallax and looping; Tailwind `motion-reduce:` and `motion-safe:` for CSS.

## Accessibility

- Visible focus is global (yellow outline); do not remove outlines.
- Icon-only buttons need `aria-label` in Spanish.
- Photos need their `alt` from the content file.
- Body text contrast at least 4.5:1: `dim` on `paper`, `cobalt-tint` on `cobalt`, `rule` on `ink`.
