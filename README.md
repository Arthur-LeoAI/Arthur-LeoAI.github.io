# Jiaming Li — portfolio

A static, single-page portfolio with an EN/中文 toggle and a printable web résumé. It has no dependencies and no framework.

The previous Next.js (vinext) portfolio is kept unchanged on the **`classic`** branch.

## Layout

- `site/index.html`: the home page. All copy lives in the `T`, `PROJECTS`, `JOBS`, `EDU` and `SKILLS` objects in its script, with `{ en, zh }` for every string.
- `site/resume/index.html`: the web résumé. Add `?lang=zh` for Chinese. It prints to one A4 page.
- `site/assets/`: images and the résumé PDFs.
- `site/_redirects`: Cloudflare Pages redirects old classic-site URLs (`/work/*`, `/lab`) to the home page.

## Deploy

There is no build step. `site/` is published as is.

- **Cloudflare Pages:** build command empty, output directory `site`, production branch `main`.
- **GitHub Pages:** `.github/workflows/pages.yml` uploads `site/`.
- **Local preview:** `node scripts/serve.mjs site 4175`.

## Résumé PDFs

Export the PDFs with headless Chrome against a local preview:

```
chrome --headless=new --no-pdf-header-footer --virtual-time-budget=12000 --print-to-pdf=site/assets/jiaming-li-resume.pdf "http://localhost:4175/resume/?lang=en"
chrome --headless=new --no-pdf-header-footer --virtual-time-budget=12000 --print-to-pdf=site/assets/jiaming-li-resume-zh.pdf "http://localhost:4175/resume/?lang=zh"
```

**Never commit the phone number.** The public PDFs leave it out.

## Switching back to the classic site

Either set Cloudflare's production branch to `classic`, or reset `main` to the `classic` branch.
