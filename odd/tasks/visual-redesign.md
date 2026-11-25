# visual-redesign

Objective: replace the whole visual identity of the site while keeping its content and functions. Branch `feat/ninth-anniversary`. Delivery: `single-pr` on user approval (no push without it). Runner: none configured; checks are `npm run type-check`, the design detector and browser inspection.

## Specs

- S1. Full visual reformulation, content kept. User: "pedi directamente una reformulacion completa con el contenido".
- S2. Rejected and must not return: "la font los colores los degradados", emoji as visuals ("no tanto emoji"), and the generated raster emblem ("esa imagen tampoco mejora mucho").
- S3. Real SVGs drawn with Codex: "svg reales creados con codex".
- S4. Animations stay: "quiero que si existan cosas como animaciones eso si".
- S5. Birthday copy is gone from always-on surfaces; the site celebrates the ninth anniversary ("ya no es cumpleaños si no aniversario de 9 años").
- S6. Order: content and dates live in one place instead of being hardcoded per page; dead code removed. User: "refactorizar visualmente y orden ademas de actualizar la informacion".
- S7. Working split: Fable decides direction and visuals; raw code goes to Opus 5.5 at medium effort; Codex for images, SVG and animation assets.

Direction (decided by Fable, assumption until the user confirms): "Almanaque". The site is a tear-off wall calendar that has been counting since 25 Nov 2017. Cobalt blue field, cool paper white, ink black, marker yellow for hand-circled dates; giant condensed numerals (Big Shoulders Display), Hanken Grotesk for text, Covered By Your Grace for short handwritten notes; no gradients; photographs as dated prints.

## Tasks

- [x] T1 (S5) inline. Birthday copy to ninth anniversary on home, loading, login, metadata.
- [ ] T2 (S1-S4) inline. Design tokens, fonts, global styles, header, Codex SVG set, shared `lib/site.ts`. In progress.
- [ ] T3 (S1-S4) inline. Home rebuilt as the reference surface. In progress.
- [ ] T4 (S1-S4, S6) delegated, Opus 5.5 medium. Gallery, LoveStory, PhotoLightbox; photos to `content/photos.ts`.
- [ ] T5 (S1-S4, S6) delegated. About page; timeline to `content/timeline.ts`; ninth-year entry needs the user's text.
- [ ] T6 (S1-S4, S6) delegated. Music page and global player; playlist to `content/playlist.ts`.
- [ ] T7 (S1-S4) delegated. Auth, games, chat, birthday pages.
- [ ] T8 (S6) inline. Remove dead files, unused deps, old tokens and the old font import once T4-T7 land.

## Log

- L1 (2026-11-25, user): "no me gusta la mayoria de cosas la font los colores los degradados esa imagen tampoco mejora mucho por eso pedi directamente una reformulacion completa con el contenido no tanto emoji svg reales creados con codex y esas cosas usalo no mas"
- L2 (2026-11-25): Direction chosen without an interview because the user asked to proceed. T4-T7 wait for the user to see the home, since a rejected direction would waste four delegated units.
