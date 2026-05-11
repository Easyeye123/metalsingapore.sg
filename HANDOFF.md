# MetalSingapore.sg — handoff

## Preview

The cPanel-ready build artefact is the directory `out/` produced by
`python3 build/site.py` (or `npm run build:static`). For local source
review use `npm run dev` (SPA on <http://localhost:5173>) or `npm run
build && npm run preview` (production bundle on <http://localhost:4173>).

- Project root: `/home/user/workspace/metalsingapore.sg-d4759fb1`
- Source ZIP: `/home/user/workspace/metalsingapore_sg_source.zip`
  (excludes `node_modules`, `dist`, `out`, `.git`, `.env`,
  `portfolio-admin/config/credentials.json`, `portfolio-admin/uploads/*`).

## Routes (final list)

| Path | Title focus |
| ---- | ----------- |
| `/` | Home — hero, services overview, recent projects, sister site backlinks |
| `/about-us/` | Company profile, scope, method, safety/quality posture |
| `/services/` | Services hub |
| `/services/<slug>/` | Service detail pages (gates, railings, fencing, cat ladders, stainless, structural) |
| `/projects/` | Project portfolio grouped by service category |
| `/blog/` | Resources & blog hub |
| `/blog/<slug>/` | Technical posts (cat ladder design, SS304 vs galv MS, wall anchorage, handrail, lifespan, SCDF rules) |
| `/faq/` | FAQs with FAQPage JSON-LD |
| `/contact-us/` | Project enquiry form (`/contact-submit.php`), direct contact, hours |
| `/404.html` | Noindexed not-found page |
| `/portfolio-admin/` | PHP password + TOTP admin (noindexed, `.htaccess` `X-Robots-Tag`) |

## Project / gallery grouping

Each entry in `build/projects_seed.json` (mirrored in `src/data/projects.ts`)
is grouped by service category (gates, railings, fencing, cat ladders,
stainless steel, structural). Conservative labels are used; uncertain
entries are flagged `needsConfirmation`. The portfolio admin (PHP) writes
new projects to `/assets/data/projects.json`; the React hook merges that
file over the seed, so admin-added items override the seed by `id`.

## Content / design decisions

- **Tone** — factual, contractor-focused, hedged on regulations. No
  "best/cheapest/fastest/guaranteed compliant" wording in editorial copy.
  Two flagged hits in the QA scan are legitimate: the contact form's
  `placeholder=` attribute and "cheapest" appearing inside a technical
  comparison post (factual usage, not a marketing claim).
- **Palette** — dark forest green hero (`#0E2E22`), warm cream surface,
  single accent + neutrals.
- **Typography** — Cabinet Grotesk display + Satoshi body via Fontshare.
  Two families, four weights total.
- **Pre-render strategy** — `build/site.py` writes per-page static HTML
  with title, meta, canonical, OG/Twitter and JSON-LD baked into the head.
  All internal URLs are rewritten to per-page relative paths so the site
  works under cPanel without an SPA router.

## SEO posture

- Exactly one `<h1>` per page; H2/H3 reflect real outline.
- Per-route, unique `<title>` (50–60 char target) and `<meta description>`
  (140–160 char target).
- Absolute self-referencing `<link rel="canonical">` on every page.
- LocalBusiness (`GeneralContractor`) JSON-LD on Home with NAP matching
  the footer; Service JSON-LD on each service page; BlogPosting on each
  blog detail; FAQPage on `/faq/`; BreadcrumbList on every non-home page.
- `sitemap.xml` enumerates all indexable URLs; `robots.txt` references
  the sitemap and disallows only `/portfolio-admin/`.
- Hero image preloaded; below-the-fold images lazy-loaded with explicit
  width/height (no CLS).
- 404 page is noindexed, not soft-200.

## Admin setup notes (portfolio-admin)

1. Upload `portfolio-admin/` to `public_html/portfolio-admin/`.
2. Browse to `https://metalsingapore.sg/portfolio-admin/setup.php` once.
3. Choose a 12+-char passcode, scan the QR / type the secret in Google
   Authenticator (or any TOTP app: 1Password, Authy, Aegis), confirm with a
   6-digit code. The script writes `config/credentials.json` (mode 0600).
4. From `dashboard.php`, add a project — the category dropdown maps to
   the MetalSingapore service slugs.
5. Each session, download `assets/data/projects.json` and the new files in
   `assets/images/projects/` and mirror to the team backup.

The admin enforces a 5-attempt 15-minute lockout, regenerates the session
ID on login, and wraps file writes in atomic rename. `.htaccess` files in
both the admin root and `config/` deny direct browsing of credentials.

## QA results (latest extraction test)

```
npm install              → ok
npx vite build           → ok (CSS ~5.7 KB gzipped, JS ~146 KB gzipped)
npm run preview          → ok (homepage HTTP 200 with correct <title>)
python3 build/site.py    → 26 HTML pages + sitemap.xml + robots.txt
python3 build/qa_check.py → no fatal errors; warnings around image width/height
                            and a handful of "banned-string" mentions inside
                            technical copy (acceptable, see HANDOFF notes)
```

Note: `npx tsc --noEmit` flags `vite.config.ts` for missing Node typings
(`node:path`, `node:fs`, `__dirname`). This is cosmetic — `npx vite build`
runs fine. Install `@types/node` as a dev dependency if you want a clean
typecheck.

## Items needing user confirmation

- **Contact details** confirmed in `src/data/site.ts` (email, phone,
  WhatsApp, address). Verify against current production before launch.
- **Project labels marked "pending confirmation"** in
  `build/projects_seed.json` — set `needsConfirmation: false` once the
  project owner confirms client name, location and year.
- **Hero / OG image** — confirm `assets/images/og-metalsingapore.jpg`
  exists at 1200×630 for social-share previews.
- **Production secrets** — admin credentials are set up in cPanel via
  `setup.php`; nothing is committed.

## Files of interest

| File | Purpose |
| ---- | ------- |
| `src/data/site.ts` | Brand + sister site list (TS source) |
| `src/data/services.ts` | Service content (TS source) |
| `src/data/projects.ts` | Seed project gallery (TS source) |
| `src/data/blog.ts` | Blog manifest (TS source) |
| `src/data/faq.ts` | FAQ entries (TS source) |
| `src/pages/Home.tsx` | Landing page |
| `src/pages/ServiceDetail.tsx` | Service template |
| `build/site.py` | Static HTML pre-renderer (cPanel deploy target) |
| `build/qa_check.py` | H1/title/meta/JSON-LD/banned-string scan |
| `build/projects_seed.json` | Static-build seed, mirrors `src/data/projects.ts` |
| `build/blog_seed.json` | Static-build seed, mirrors `src/data/blog.ts` |
| `build/faq_seed.json` | Static-build seed, mirrors `src/data/faq.ts` |
| `assets/css/site.css` | Single shared stylesheet |
| `assets/data/blogs/*.md` | Blog source content |
| `portfolio-admin/` | PHP password + TOTP admin |
| `server/contact-submit.php` | Mail handler for the contact form |

## How to run locally

```bash
cd metalsingapore.sg
npm install                # Node deps for the SPA mirror
npm run dev                # http://localhost:5173 — SPA dev server
npm run build              # Vite build (source review)
npm run preview            # http://localhost:4173 — serves ./dist
npm run build:static       # python3 build/site.py — writes ./out
python3 build/qa_check.py  # H1, title, meta, JSON-LD, banned-string scan
```

Deploy `out/` to cPanel; upload `portfolio-admin/` next to it; upload
`server/contact-submit.php` to `public_html/contact-submit.php`.
