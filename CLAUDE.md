# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at localhost:4321
npm run build     # build production site to ./dist/
npm run preview   # serve the production build locally
npm run astro ...  # run Astro CLI commands (e.g. `npm run astro check`)
```

There is no test suite and no linter configured. Formatting is via Prettier
(`prettier-plugin-astro`), config in `.prettierrc.mjs` — no separate lint
script, run `npx prettier --write .` if needed.

## Architecture

Astro static site (`output: "static"`), deployed to GitHub Pages via
`.github/workflows/*.yml` on every push to `master` (uses `withastro/action`
+ `actions/deploy-pages`). The site is served under a subpath, so
`astro.config.mjs` sets `base: "/portfolio"` and `site:
"https://eduardo732.github.io"` — every internal link/asset path must go
through the `base` normalization pattern used throughout the components
(see below), not be hardcoded as `/something`.

**Rendering approach: Astro components + React islands.** Existing UI lives
in `.astro` components (`src/components/*.astro`) and renders to static
HTML by default — no client JS ships unless a component opts into
hydration. `@astrojs/react` is configured in `astro.config.mjs` so new
interactive pieces can be written as React components (`.tsx`) and mounted
with an Astro client directive (`client:load`, `client:visible`, etc.). See
`docs/DECISIONS.md` for why this hybrid approach was chosen over a full
Next.js/React rewrite. Prefer `.astro` for static content and reserve React
islands for things that actually need client-side state/interactivity.

### i18n

Two locales, Spanish (`es`, default) and English (`en`), implemented by
hand (no Astro i18n routing helpers, no external library):

- `src/i18n/es.json` / `src/i18n/en.json` hold **all** page copy (hero,
  about, experience entries, project/SEO strings) as one translation tree
  per locale. `src/pages/index.astro` renders `es` at `/`,
  `src/pages/en/index.astro` renders `en` at `/en` (`prefixDefaultLocale:
  false` in the Astro i18n config, so the default locale has no `/es`
  prefix).
- `src/i18n/utils.ts` provides the helpers every component uses:
  `getLangFromUrl(url)` (detects locale from the pathname, accounting for
  the `/portfolio` base), `useTranslations(lang)` returns a `t("a.b.c")`
  dot-path lookup function, and `getLocalizedPath` /
  `translatePath` compute the equivalent URL in the other locale (used by
  the language switcher in `Header.astro`).
- When adding UI copy, add the key to **both** `es.json` and `en.json` with
  the same shape — components pull strings via `t("section.key")`, there is
  no fallback/missing-key handling beyond returning the key itself.
- The experience timeline (`Experience.astro` / `ExperienceItem.astro`) is
  data-driven off `t('experience.jobs')`, an array of `{id, date, title,
  company, description}` — new jobs are added by appending to that array in
  both locale files, not by editing the component.

### Base path normalization

Because the site is hosted under `/portfolio`, several components
(`AboutMe.astro`, `Header.astro`) independently derive a normalized base
path from `import.meta.env.BASE_URL`, ensuring it starts and ends with `/`,
before building asset URLs (e.g. `${base}me.webp`) or localized links. Any
new component that needs to reference a static asset or internal link
should follow the same normalization pattern rather than assuming `/`.

## Notes

- `docs/DECISIONS.md` tracks architecture decisions (currently: Astro +
  React islands vs. a full Next.js/Vite+React rewrite). Add new entries
  there rather than only in commit messages when a non-obvious technical
  direction is chosen.
- The profile photo lives at `public/me.webp` and is referenced by both
  `Header.astro` (circular avatar) and `AboutMe.astro` (large square,
  `object-cover`) — since both use a center-cropped square, any replacement
  image should be pre-cropped so the subject's face is centered in a square
  region, not left to browser cropping.
