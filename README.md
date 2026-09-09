# Jiaming Li — portfolio

Two static presentations share `lib/content.ts`: the story edition on Sites and the archive edition on GitHub Pages.

## Develop and build

Use Node 22.13+ and `npm ci`. `npm run dev` previews the story edition. Set `PORTFOLIO_EDITION=archive` before starting to preview the archive.

- `npx tsc --noEmit` — type check
- `npm run lint` — authored-code lint (generated, unmodified Shadcn catalog excluded)
- `node scripts/build.mjs story` — creates `outputs/story` and Sites-ready `dist/client`
- `node scripts/build.mjs archive` — creates `outputs/archive`
- `node scripts/serve.mjs outputs/story 4173` — production preview

Builds must run sequentially because vinext shares its output directory. The wrapper adds directory index files for portable static case URLs, working around a beta trailing-slash prerender redirect issue.

## Update

Edit shared facts in `lib/content.ts`, presentation in `app/portfolio.tsx`, and styles in `app/globals.css`. Put approved public assets in `public/`. Do not commit original CVs, phone numbers, research data, tokens or API keys. The MCDA mini demo uses synthetic benefit scores and normalised weighted sums; it is not the research dataset or a complete MCDA application.

Pushing `main` runs GitHub Pages validation, build and deployment. For Sites, build the story edition, push the exact commit to its source remote using a temporary credential, package with the Sites helper, save a version and deploy it. Never save credentials in Git config or files. Sites and Pages use the same source commit and content, but have separate visual builds.

## Evidence

Project facts were checked against the four linked repositories' READMEs on 2026-09-08. Experience and education come from the supplied CV and user clarifications. No unmeasured commercial or performance improvements are claimed. Diagrams are labelled simplified workflows, not screenshots. Connoisseur remains a mock-first MVP.

The included public resume omits the phone number. The original PDF remains outside this repository.
