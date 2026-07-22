# The Producer's Desk

An editorial, tactile portfolio for an executive producer in advertising. The current build contains the complete 16-project structure, five configured film links, draggable desktop polaroids, keyboard navigation, responsive layouts, project folders, bio, and film selection.

## Start locally

```bash
pnpm install
pnpm dev
```

Validation commands:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
pnpm test:e2e
```

## Replace the personal placeholders

Edit `src/config/site.ts` once to add the producer name, email, city, profile URL, Instagram URL, introduction, and approved biography. Bracketed values are intentionally not shown as real portfolio data.

## Project assets

Place real campaign assets at the paths below. Until then, the interface uses branded local graphic placeholders and never displays a broken image or an unrelated campaign still.

| Project                     | Slug                       | Cover                                           | Poster                                           | Gallery                                             | Film               |
| --------------------------- | -------------------------- | ----------------------------------------------- | ------------------------------------------------ | --------------------------------------------------- | ------------------ |
| KFC Goodometer              | `kfc-goodometer`           | `/projects/kfc-goodometer/cover.webp`           | `/projects/kfc-goodometer/poster.webp`           | `/projects/kfc-goodometer/01.webp` onward           | Vimeo `952131096`  |
| Old Spice                   | `old-spice`                | `/projects/old-spice/cover.webp`                | `/projects/old-spice/poster.webp`                | `/projects/old-spice/01.webp` onward                | pending            |
| BBVA Nómina                 | `bbva-nomina`              | `/projects/bbva-nomina/cover.webp`              | `/projects/bbva-nomina/poster.webp`              | `/projects/bbva-nomina/01.webp` onward              | pending            |
| BBVA La Quincena del Ahorro | `bbva-quincena-del-ahorro` | `/projects/bbva-quincena-del-ahorro/cover.webp` | `/projects/bbva-quincena-del-ahorro/poster.webp` | `/projects/bbva-quincena-del-ahorro/01.webp` onward | pending            |
| Lofibeats                   | `lofibeats`                | `/projects/lofibeats/cover.webp`                | `/projects/lofibeats/poster.webp`                | `/projects/lofibeats/01.webp` onward                | Vimeo `1007819738` |
| Nestlé Sublime              | `nestle-sublime`           | `/projects/nestle-sublime/cover.webp`           | `/projects/nestle-sublime/poster.webp`           | `/projects/nestle-sublime/01.webp` onward           | pending            |
| Hermanos Yapean             | `hermanos-yapean`          | `/projects/hermanos-yapean/cover.webp`          | `/projects/hermanos-yapean/poster.webp`          | `/projects/hermanos-yapean/01.webp` onward          | YouTube configured |
| KE Personajes Video         | `ke-personajes-video`      | `/projects/ke-personajes-video/cover.webp`      | `/projects/ke-personajes-video/poster.webp`      | `/projects/ke-personajes-video/01.webp` onward      | YouTube configured |
| Yango Videos                | `yango-videos`             | `/projects/yango-videos/cover.webp`             | `/projects/yango-videos/poster.webp`             | `/projects/yango-videos/01.webp` onward             | pending            |
| KFC Nuggets Sound Test      | `kfc-nuggets-sound-test`   | `/projects/kfc-nuggets-sound-test/cover.webp`   | `/projects/kfc-nuggets-sound-test/poster.webp`   | `/projects/kfc-nuggets-sound-test/01.webp` onward   | Vimeo `937817150`  |
| Atún Florida                | `atun-florida`             | `/projects/atun-florida/cover.webp`             | `/projects/atun-florida/poster.webp`             | `/projects/atun-florida/01.webp` onward             | pending            |
| Jeffry                      | `jeffry`                   | `/projects/jeffry/cover.webp`                   | `/projects/jeffry/poster.webp`                   | `/projects/jeffry/01.webp` onward                   | pending            |
| Leche Gloria                | `leche-gloria`             | `/projects/leche-gloria/cover.webp`             | `/projects/leche-gloria/poster.webp`             | `/projects/leche-gloria/01.webp` onward             | pending            |
| Atlantic Video              | `atlantic-video`           | `/projects/atlantic-video/cover.webp`           | `/projects/atlantic-video/poster.webp`           | `/projects/atlantic-video/01.webp` onward           | pending            |
| Betsson                     | `betsson`                  | `/projects/betsson/cover.webp`                  | `/projects/betsson/poster.webp`                  | `/projects/betsson/01.webp` onward                  | pending            |
| KFC Streetwear              | `kfc-streetwear`           | `/projects/kfc-streetwear/cover.webp`           | `/projects/kfc-streetwear/poster.webp`           | `/projects/kfc-streetwear/01.webp` onward           | pending            |

Suggested export: WebP, sRGB, around 1800 px on the long edge for covers and posters. Add matching entries to each project's `gallery` array in `src/content/projects.ts` when stills are ready.

## Content model

All project records live in `src/content/projects.ts`. Missing year, role, agency, director, production company, challenge, approach, outcome, and credits remain absent by design. Add only approved information; empty fields are hidden.
