# Jiaming Li — portfolio

Two static presentations share `lib/content.ts`: the story edition ("Profile Sheet" home), published on GitHub Pages and Sites, and the archive edition (sidebar + project archive), which is built locally only. Both include the case studies (`/work/[slug]/`) and the web résumé (`/resume/`).

## Develop and build

Use Node 22.13+ and `npm ci`. `npm run dev` previews the story edition. Set `PORTFOLIO_EDITION=archive` before starting to preview the archive.

- `npx tsc --noEmit` — type check
- `npm run lint` — authored-code lint (generated, unmodified Shadcn catalog excluded)
- `node scripts/build.mjs story` — creates `outputs/story` and Sites-ready `dist/client`
- `node scripts/build.mjs archive` — creates `outputs/archive`
- `node scripts/serve.mjs outputs/story 4173` — production preview

Builds must run sequentially because vinext shares its output directory. The wrapper adds directory index files for portable static case and résumé URLs, working around a beta trailing-slash prerender redirect issue.

## Update

- Facts and copy: `lib/content.ts`. Every user-facing string is `{ en, zh }`.
- Presentation: `app/portfolio.tsx` (Home, Case, Résumé, Archive).
- Styles and design tokens: `app/globals.css`. Light theme, hairline rules, no shadows.
- Language: `app/language.ts`, persisted in `localStorage['jl-site-lang']` and reflected in `<html lang>`.
- Motion: `app/use-site-motion.ts` (`data-reveal`, `data-speed`, `data-follow`, `data-tilt`, `data-magnet`, `data-spot`, `data-progress`) and `app/hero-chart.tsx`. All of it is disabled under `prefers-reduced-motion`.

Put approved public assets in `public/`. **Never commit the phone number**, original CVs, research data, tokens or API keys. The public résumé PDF is exported with the phone hidden; the version with the phone stays private.

Location copy everywhere: "Open to data analyst roles worldwide · visa sponsorship needed". Do not name a preferred country.

Pushing `main` runs GitHub Pages validation, build and deployment. For Sites, build the story edition, push the exact commit to its source remote using a temporary credential, package with the Sites helper, save a version and deploy it. Never save credentials in Git config or files. Sites and Pages use the same source commit and content, but have separate visual builds.

## Evidence

Project facts were checked against the four linked repositories' READMEs on 2026-09-08. Experience and education come from the supplied CV and user clarifications. No unmeasured commercial or performance improvements are claimed. Interface screenshots use synthetic, simulated or fictional data. Connoisseur remains a mock-first MVP. The hero chart is decorative synthetic data.
