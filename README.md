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
- Motion: `app/use-site-motion.ts` (`data-reveal`, `data-speed`, `data-follow`, `data-tilt`, `data-magnet`, `data-spot`, `data-progress`) and `app/hero-flow.tsx` (a simulated multilingual listing-review pipeline). Under `prefers-reduced-motion` the hero draws one still frame.

Put approved public assets in `public/`. **Never commit the phone number**, original CVs, research data, tokens or API keys. The public résumé PDF is exported with the phone hidden; the version with the phone stays private.

Positioning: implementation and business systems. Map how operations really run, build the tools that improve them, and help teams adopt them, using AI where it genuinely helps. Target roles, in order: Implementation Analyst / Associate Consultant, Business Systems / Process Analyst, Technical / Data Business Analyst, AI Adoption / AI Operations; e-commerce and supply-chain analyst roles are fallback options. E-commerce operations is presented as domain background, not the identity. Only tools and methods the owner has confirmed appear in skills or experience; the process map is labelled illustrative.

Location copy comes from `location` in `lib/content.ts`: China-based, open to Europe and the UK, North America, Australia and New Zealand; visa sponsorship required. The hero prioritises professional positioning and target roles.

Homepage order: hero (positioning, name, target roles, résumé, LinkedIn, GitHub), summary strip, about with portrait and strengths, experience with tool tags, case studies with direct code links, How I work (six-step method plus an illustrative BPMN-style current/future-state process map in app/process-map.tsx), skills, education, contact. The Transformer explorer lives on its own /lab page. Each case separates the problem, context/constraints, individual contribution, implementation, outcomes, limitations, future work, technologies and evidence links. `tier` (`featured`, `supporting`, `also`) controls display priority only; `status` describes the actual lifecycle. MCDA is a completed research project; Drone Monitoring is a working demo with simulated telemetry; MoTai is a working desktop prototype; Connoisseur is a mock-data MVP. Drafts (`draft: true`) are never rendered or exported. The "Multilingual Listing Compliance Checker" remains a planned, unpublished draft.

The Transformer explorer is on the /lab page (linked from Skills) and is code-split with React Suspense. `lib/transformer.ts` computes a four-dimensional, two-head, single-block teaching decoder with fixed untrained weights. Visitors inspect token IDs, sinusoidal positions, Q/K/V attention, causal masking, post-norm residuals, a ReLU feed-forward layer, vocabulary probabilities, temperature and greedy autoregressive generation. It computes values locally and is not a trained language model. Run `node scripts/check-transformer.mjs` to check normalization, causal isolation, weighted values and other mathematical invariants. The reference is [Attention Is All You Need](https://arxiv.org/abs/1706.03762).

Project screenshots remain until a hosted preview URL is provided. `app/project-preview.tsx` supports optional `NEXT_PUBLIC_MCDA_PREVIEW_URL`, `NEXT_PUBLIC_DRONE_PREVIEW_URL`, `NEXT_PUBLIC_MOTAI_PREVIEW_URL`, and `NEXT_PUBLIC_CONNOISSEUR_PREVIEW_URL`. With a URL, it renders an on-demand iframe window and an open-in-new-tab link. Without one, it renders the existing screenshot. The destination must allow embedding through its CSP/frame headers. No projects were publicly deployed for this change.

Résumé PDFs are printed from `/resume/` with headless Chrome: `chrome --headless=new --no-pdf-header-footer --virtual-time-budget=12000 --print-to-pdf=public/jiaming-li-resume.pdf "http://127.0.0.1:4173/resume/?lang=en"` (and `?lang=zh` → `jiaming-li-resume-zh.pdf`) against a local production preview. Wait for hydration and fonts when automating export. The résumé's `beforeprint` handler resolves case links against the public portfolio URL, so a PDF never sends a recruiter to localhost; `afterprint` restores local navigation. The current EN/ZH exports each use two A4 pages.

Pushing `main` runs GitHub Pages validation, build and deployment. For Sites, build the story edition, push the exact commit to its source remote using a temporary credential, package with the Sites helper, save a version and deploy it. Never save credentials in Git config or files. Sites and Pages use the same source commit and content, but have separate visual builds.

## Evidence

Public documentation reviewed on 2026-10-23: [MCDA README.txt](https://github.com/Arthur-LeoAI/MCDA-Tool-2.0/blob/main/README.txt) and `app.js` (weighted sum, TOPSIS, Pareto), [Drone README](https://github.com/Arthur-LeoAI/Drone-monitoring-platform-demo/blob/main/README.md), [MoTai README](https://github.com/Arthur-LeoAI/MoTai-Story/blob/main/README.md), and [Connoisseur README](https://github.com/Arthur-LeoAI/connoisseur/blob/main/README.md). This verifies documented features, not a fresh end-to-end test of those separate applications or proof of production adoption.

Experience titles, dates and degrees are retained from the existing portfolio. The owner confirmed on 2026-10-23 that US Amazon operations were added to the current Triple A role in October 2026. No new employer or past US role is inferred. Specific campaign ownership, ad spend, deployment impact, research-team counts and class-rank claims are not substantiated by this review and are not added to the recruitment copy. Historical production-platform claims are separated from the publicly evidenced telemetry demo.

No unmeasured commercial or performance improvements are claimed. All interface captures use synthetic, simulated or fictional data. MoTai captures show an earlier interface and are labelled accordingly; current AI credentials are runtime-managed. The hero animation is a simulated listing-review pipeline; its counter is labelled "simulated" and reports no real volumes or time savings. EN/ZH web and PDF résumés must be regenerated together when résumé content changes. Validate with type checking, lint, the Transformer checks, both static builds and browser smoke checks.
