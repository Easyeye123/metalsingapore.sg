# MetalSingapore.sg

Production source for **MetalSingapore.sg**, the Singapore custom metal works
microsite operated by Ezzogenics Pte Ltd. Scope: gates, railings, fencing,
cat ladders, stainless steel (SS304 / SS316) fabrication and structural
metalwork. The cPanel-deployable artefact is a pre-rendered static HTML
bundle; the React/Vite SPA under `/src` is the maintainable mirror used for
development and code review.

## Quick preview (after extracting the ZIP)

You need Node.js 18+ and npm. From the extracted folder:

```bash
npm install                # one-time, installs the SPA dependencies
npm run dev                # http://localhost:5173 — live SPA preview
```

Open <http://localhost:5173/> in a browser. The home page should load with
the dark-green hero and the four service cards.

To preview the production bundle instead of the dev server:

```bash
npm run build              # writes ./dist
npm run preview            # http://localhost:4173 — serves ./dist
```

Either preview is enough to spot-check copy, images and routing locally;
no PHP, database or hosting account is required for SPA preview.

## Repo layout

```
src/                       React/Vite SPA source (route mirror of the static site)
build/                     Python static site generator + QA scanner
build/site.py              Renders out/<page>/index.html for every public route
build/qa_check.py          H1/title/meta/JSON-LD/banned-string scan
assets/css/site.css        Single stylesheet served by both static + SPA
assets/images/             Approved MetalSingapore project photos and brand assets
assets/data/blogs/         Markdown sources for resource posts
portfolio-admin/           PHP password + TOTP admin (cPanel deploy target)
server/contact-submit.php  Mail handler for the contact form
out/                       Deployable static-site output (generated, gitignored)
dist/                      Vite build output (source review only, gitignored)
```

## Available scripts

| Command | What it does |
| ------- | ------------ |
| `npm install` | Install Node dependencies (`react`, `vite`, `typescript`) |
| `npm run dev` | Start the SPA dev server on <http://localhost:5173> |
| `npm run build` | Vite production build → `./dist` |
| `npm run preview` | Serve the built `./dist` on <http://localhost:4173> |
| `npm run typecheck` | `tsc --noEmit` over `/src` and `vite.config.ts` |
| `npm run build:static` | `python3 build/site.py` — renders the cPanel bundle to `./out` |
| `npm run qa` | `python3 build/qa_check.py` — title/meta/JSON-LD/banned-string scan |

The Python build is the deployable artefact; the Vite SPA is for source
review and dev preview only.

## Public routes

```
/                            Home (hub-and-spoke landing)
/about-us/                   Company profile, scope, method, safety/quality posture
/services/                   Services hub
/services/<slug>/            Service detail pages (gates, railings, fencing, cat ladders, stainless, structural)
/projects/                   Project portfolio
/blog/                       Resources & blog hub
/blog/<slug>/                Blog post detail
/faq/                        FAQ with FAQPage JSON-LD
/contact-us/                 Enquiry form → /contact-submit.php
/404.html                    Noindexed not-found page
/portfolio-admin/            PHP password + TOTP admin (noindexed)
```

## Deploy to cPanel

1. `npm run build:static` — writes the static site to `./out`.
2. Upload **the contents of `out/`** plus the `portfolio-admin/` directory
   into `public_html/` on the cPanel host.
3. Upload `server/contact-submit.php` to `public_html/contact-submit.php`.
4. Visit `https://metalsingapore.sg/portfolio-admin/setup.php` to set the
   admin passcode and Google Authenticator (TOTP) secret. The credentials
   file is written to `portfolio-admin/config/credentials.json` with mode
   0600 — never commit it.
5. Confirm the contact details in `src/data/site.ts` (and the `SITE`
   constants in `build/site.py`) match the production phone, email and
   physical address before going live.

## SEO highlights

- One `<title>`, `<meta description>`, canonical, OG and Twitter tag set
  per route — emitted in static HTML and refreshed by `RouteHead` in the
  SPA mirror.
- `LocalBusiness` JSON-LD on Home, `Service` on each service page,
  `BlogPosting` on each blog detail, `FAQPage` on `/faq/`,
  `BreadcrumbList` on every non-home page.
- `sitemap.xml` and `robots.txt` are emitted by the build (admin paths
  only are disallowed; sitemap is referenced from robots).
- Hero image preloaded; below-the-fold images are `loading="lazy"
  decoding="async"` with explicit width/height to avoid CLS.

## Photos & projects

Approved photos live in `assets/images/` with kebab-case filenames. Project
descriptions in `src/data/projects.ts` and `build/projects_seed.json` are
factual and concise; uncertain labels are flagged
`needsConfirmation: true` rather than published with invented detail.

## Troubleshooting preview

- **Blank page or 404 on every route under `npm run preview`** — `vite preview`
  only knows about `/index.html`; deep links rely on the static build
  served by a real web server. For deep-link routing during preview use
  `npm run dev` instead.
- **Images appear broken** — confirm you ran the build from the extracted
  folder (not a parent directory) so the `assets/` paths resolve.
- **`python3 build/site.py` fails** — Python 3.9+ is required; only the
  standard library is used (no `pip install` step).
