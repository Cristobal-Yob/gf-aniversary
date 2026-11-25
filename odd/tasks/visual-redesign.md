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

Direction (decided by Fable; user said "muy bueno" on 2026-11-25 and asked only for a colour change): "Almanaque". The site is a tear-off wall calendar that has been counting since 25 Nov 2017. Calipso field with ink type, cool paper white, marker yellow for hand-circled dates; giant condensed numerals (Big Shoulders Display), Hanken Grotesk for text, Covered By Your Grace for short handwritten notes; no gradients; photographs as dated prints.

- S8. User: "incorpora estas fotos tambien" (the folder `Downloads/fotos jose yob`), "genera muchas imagenes y visualizaciones con codex animaciones scroll", "incorpora algunas canciones de ed sheran como bad habits y esas cosas si puedes si no no importa".
- S9. User: "cerrarlo todo dejarlo limpio y funcionando despues lo conectas con gcp cloudrun", "deberia estar arriba todo ok sin preguntarme nada mas".
- S10. User: "muy bueno lo unico evita el morado como base inicial ojala colorimetria asociada al celeste(calipso o cosas del estilo) y puede que algunas cosas moradas pero no nos representaa tanto".
- S11 (optional, not started). User: "si quieres incorporar chat con ia pidele a codex los secretos y cosas para crear backend langraph y alguna ia con historia de nosotros".
- S12. User (2026-11-25): login password changed; "come to me no es romantic el creador es goo goo dolls"; "dejar como todo lo de 3287 dias juntos aparezcan como que llevamos mas dias juntos que y agregar diferentes casuisticas interesantes"; "me gustaria un icono mas bonito"; "enlos meses agrega los meses faltantes 26 diciembre viviendo juntos noviembre 27 islandia y algo como despues de eso un infinito juntos"; "se ve como que recuerdos lo tapa"; "en pc al menos nunca encajan bien al scrolear las secciones"; three graduation photos; review of photo descriptions.

## Tasks

- [x] T1 (S5) inline. Birthday copy to ninth anniversary on home, loading, login, metadata.
- [x] T2 (S1-S4) inline. Design tokens, fonts, global styles, header, Codex SVG set, shared `lib/site.ts`, content files, `DESIGN.md`. Commit `a6acd46`.
- [x] T3 (S1-S4) inline. Home rebuilt as the reference surface. Type-check passes; seen in the browser at 800px. Commit `a6acd46`.
- [x] T4 (S1-S4, S6) delegated, Opus 5.5 medium, session `w-gallery`. Gallery, LoveStory, PhotoLightbox. Parent fix: Tailwind now scans `src/content` (photo aspect classes were not generated).
- [x] T5 (S1-S4, S6) delegated, session `w-about`. About page with scroll timeline.
- [x] T6 (S1-S4, S6) delegated, session `w-music`. Music page, global player, context cleanup.
- [x] T7 (S1-S4) delegated, session `w-misc`. Auth, games, chat, birthday, Confetti, ProtectedRoute, not-found. Parent fixes: game file path, microphone cleanup on the candle.
- [x] T8 (S6) inline. Dead files, 14 unused dependencies, old tokens and the old font import removed; ESLint configured; `sharp` added for image optimization.
- [x] T9 (S8) inline. 14 new photos; 10 Codex risograph illustrations (`public/illustrations/*.webp`) and 17 extra SVG components (`illustrations/extra.tsx`).
- [x] T11 (S10) inline. Base colour moved from cobalt to calipso across tokens, pages and illustrations.
- [x] T10 (S9) inline. `main` fast-forwarded to `c43e71d` and pushed; workflow run 45611158460 succeeded and created Cloud Run service `gf-aniversary` (revision `gf-aniversary-00001-ljs`) at https://gf-aniversary-gw5z6vdu4q-uc.a.run.app.
- [x] T12 (S12) inline. Password hash, artist fix, day comparisons, future months with infinity, Codex logo and favicon, three photos, local review page for photo texts (not tracked).
- [x] T13 (S12) delegated to the four page sessions. Fit pass: shared `h-view` utilities, sections measured at 1900x830 and 1440x760.
- [ ] T14 (S12) waiting on the user: photo titles, captions and descriptions to be corrected from the review page.

## Log

- L1 (2026-11-25, user): "no me gusta la mayoria de cosas la font los colores los degradados esa imagen tampoco mejora mucho por eso pedi directamente una reformulacion completa con el contenido no tanto emoji svg reales creados con codex y esas cosas usalo no mas"
- L2 (2026-11-25): Direction chosen without an interview because the user asked to proceed. T4-T7 wait for the user to see the home, since a rejected direction would waste four delegated units.
- L3 (2026-11-25, user): "ya no pares de construir trabaja con el flujo completo [...] no pares en cosas para preguntar [...] ese es el objetivo cerrarlo todo dejarlo limpio y funcionando despues lo conectas con gcp cloudrun si no sabes como preguntale a codex y deberia estar arriba todo ok sin preguntarme nada mas"
- L4 (2026-11-25): The checkpoint in L2 is withdrawn by L3; rollout started with four parallel Opus 5.5 sessions on disjoint files. No Ed Sheeran file other than the three already in the playlist exists on this machine, and copyrighted audio is not downloaded, so "Bad Habits" is not added. Cloud Run service `gf-aniversary` does not exist yet in project `capable-droplet-446401-t5`; the image repository and the `GCP_SA_KEY` secret do, and the workflow has no recorded runs.
- L5 (2026-11-25): T4-T11 verified by the parent: `tsc` and `next lint` clean, production build passes, standalone server returns 200 on all eight routes and 404 on a missing one, image optimization returns WebP, a scripted contrast audit finds no text under 3.2:1 on any route, and pages were viewed at 1280px and 375px. Not verified: reduced-motion behaviour in a browser, touch swipe in the lightbox, and animations frame by frame (the Browser pane throttles hidden pages).
- L6 (2026-11-25): Live check over HTTP: eight routes return 200 and a missing one 404, optimized photos and illustrations return WebP, audio returns 206, the served CSS carries the calipso token and the home has no birthday copy. S11 (AI chat backend) is not started: it needs the owner to approve enabling a model API and its cost on their GCP project.
- L7 (2026-11-25): Fit measured by the parent at 1900x830: home hero 692, login 698, about opening 698, music now-playing 698, gallery sticky chapters 698 and short categories 490 against a visible area of 698 (643 under the tab bar). Gallery interior could only be measured with the tab fronted, because the Browser pane stops requestAnimationFrame in background tabs.
