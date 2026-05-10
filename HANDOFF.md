# Ezzogenics.com hub — handoff

## Preview

The static deploy is live as a Perplexity-hosted preview. The cPanel-ready
build artefact is the directory `out/` produced by `python3 build/site.py`.

- Project root: `/home/user/workspace/ezzogenics-hub-site`
- Source ZIP: `/home/user/workspace/ezzogenics-hub-site-source.zip` (4.7 MB,
  118 files; excludes `node_modules`, `dist`, `out`, `.git`, `.env`,
  `portfolio-admin/config/credentials.json`, `portfolio-admin/uploads/*`).

## Routes (final list)

| Path | Title focus |
| ---- | ----------- |
| `/` | Home — hub-and-spoke, four specialisations, recent projects, spoke backlinks, blog teaser |
| `/about-us/` | Company profile, scope, method, safety/quality posture |
| `/services/` | Services hub — four specialisations |
| `/services/flooring/` | Flooring service detail |
| `/services/commercial-renovation/` | Commercial renovation service detail |
| `/services/work-at-height/` | Work at height service detail (rope access, boomlift, MEWP, suspended scaffold) |
| `/services/glass-and-metal/` | Glass & metal works service detail |
| `/projects/` | Project portfolio grouped under four specialisations with category jump-links |
| `/blog/` | Resources & blog hub |
| `/blog/<slug>/` | 7 technical posts (cat ladder design, Alu vs SS304 vs Galv MS, wall anchorage, Hilti vs Fischer, handrail SS304 vs MS, lifespan, SCDF cat-ladder rules) |
| `/faq/` | 7 FAQs with FAQPage JSON-LD |
| `/contact-us/` | Project enquiry form (`/contact-submit.php`), direct contact, hours |
| `/404.html` | Noindexed not-found page |
| `/portfolio-admin/` | PHP password + TOTP admin (noindexed, `.htaccess` `X-Robots-Tag`) |

## Project / gallery grouping summary

Each entry in `build/projects_seed.json` (mirrored in `src/data/projects.ts`)
is grouped under one of the four specialisations. Conservative labels are
used; uncertain entries are flagged `needsConfirmation`.

| Category | Featured | Pending confirmation |
| -------- | -------- | -------------------- |
| Flooring | Orchid Park parquet, Fisherman of Christ vinyl | Generic vinyl plank install |
| Commercial Renovation | Parc Olympia A&A | Code Bright office fit-out |
| Work at Height | Ruby Lane waterproof + paint | Generic waterproofing repair, Pasir Panjang awning |
| Glass & Metal | Eunos welding | Skylight install, frameless staircase glass |

Locations were taken from the photo filenames; project owner sign-off is
needed before promoting any "pending confirmation" item. The portfolio
admin (PHP) writes new projects to `/assets/data/projects.json`; the
React hook merges that file over the seed, so admin-added items override
the seed by `id`.

## Content / design decisions

- **Tone** — factual, contractor-focused, hedged on regulations. No
  "best/cheapest/fastest/guaranteed compliant" wording in editorial copy.
  Two flagged hits in the QA scan are legitimate: the contact form's
  `placeholder=` attribute and the word "cheapest" appearing inside a
  technical comparison post (factual usage, not a marketing claim).
- **Palette** — deep navy ink (`#0F2A44`), warm cream surface (`#F7F5EE`),
  Hydra Teal accent (`#01696F`). Single accent + neutrals only.
- **Typography** — Cabinet Grotesk display + Satoshi body via Fontshare.
  Two families, four weights — within the SEO protocol budget.
- **Hub-and-spoke** — Home presents four spoke cards into the four
  specialisation pages and a dedicated "Specialist sites" section listing
  all nine partner spoke domains with descriptive anchors. Each
  specialisation page also links to its relevant spoke sites in the
  sidebar.
- **Blogs** — Markdown sources from `/assets/data/blogs/*.md` are rendered
  by the static build (Python) and by the React mirror (`Markdown.tsx`).
  PDF downloads are linked from each detail page.
- **Pre-render strategy** — `build/site.py` writes per-page static HTML
  with title, meta, canonical, OG/Twitter and JSON-LD baked into the head.
  All internal URLs (`/assets/`, `/services/`, …) are rewritten to
  per-page relative paths so the site works under both cPanel and the
  Perplexity proxy preview without an SPA router.

## SEO posture

- Exactly one `<h1>` per page; H2/H3 reflect real outline.
- Per-route, unique `<title>` (50–60 char target) and `<meta description>`
  (140–160 char target).
- Absolute self-referencing `<link rel="canonical">` on every page.
- LocalBusiness (`GeneralContractor`) JSON-LD on Home with NAP matching the
  footer; Service JSON-LD on each service page; BlogPosting on each blog
  detail; FAQPage on `/faq/`; BreadcrumbList on every non-home page.
- `sitemap.xml` enumerates all 14 indexable URLs; `robots.txt` references
  the sitemap and disallows only `/portfolio-admin/`.
- Hero image preloaded; below-the-fold images lazy-loaded with explicit
  width/height (no CLS).
- 404 page is noindexed, not soft-200.

## Admin setup notes (portfolio-admin)

1. Upload `portfolio-admin/` to `public_html/portfolio-admin/`.
2. Browse to `https://ezzogenics.com/portfolio-admin/setup.php` once.
3. Choose a 12+-char passcode, scan the QR / type the secret in Google
   Authenticator (or any TOTP app: 1Password, Authy, Aegis), confirm with a
   6-digit code. The script writes `config/credentials.json` (mode 0600).
4. From `dashboard.php`, add a project — the category dropdown maps to
   the four Ezzogenics slugs (`flooring`, `commercial-renovation`,
   `work-at-height`, `glass-and-metal`, plus `other`).
5. Each session, download `assets/data/projects.json` and the new files in
   `assets/img/projects/` and mirror to the team Google Drive (`Ezzogenics
   > Website > projects-json`) under `david@ezzogenics.com`.

The admin enforces a 5-attempt 15-minute lockout, regenerates the session
ID on login, and wraps file writes in atomic rename. `.htaccess` files in
both the admin root and `config/` deny direct browsing of credentials.

## QA results

```
npm run typecheck     → 0 errors
npx vite build        → 1.42 KB CSS gzipped, 115 KB JS gzipped
python3 build/site.py → 14 HTML pages + sitemap + robots
python3 build/qa_check.py → 0 errors, 2 warnings (both legitimate)
```

Warnings (acceptable):
- `/contact-us/` — the word "placeholder" appears inside form
  `placeholder=` attributes (not in editorial copy).
- `/blog/cat-ladder-aluminium-vs-ss304-vs-galvanised-mild-steel/` — the
  word "cheapest" appears inside a technical comparison table for
  galvanised mild steel ("cheapest, longest life when dry") — factual
  technical content.

## Items needing user confirmation

- **Contact details — SIGNED OFF (2026-05-09).** The office address, phone
  numbers, email and WhatsApp link are confirmed by the owner and match
  the details used on earlier Ezzogenics-affiliated sites:
  - Email: `david@ezzogenics.com`
  - Phone: `+65 6968 3098`
  - Phone / WhatsApp: `+65 9632 0750`
  - WhatsApp link: `https://wa.me/6596320750`
  - Address: Bartley Biz Centre, Blk 15 Kaki Bukit Rd 4, #01-44,
    Singapore 417808

  The `/contact-us/` confirmation banner is now suppressed:
  `contactNeedsConfirmation: false` in `src/data/site.ts` and
  `"contact_needs_confirmation": False` in `build/site.py`. The Contact
  page now also embeds a Google Maps view of the office address using
  the keyless public `maps.google.com/maps?...&output=embed` URL stored
  in `SITE.mapsEmbedUrl` / `SITE['maps_embed_url']` — no API key or
  secret is committed. The iframe has a descriptive `title`,
  `loading="lazy"` and `referrerpolicy="no-referrer-when-downgrade"`.
- **Project labels marked "pending confirmation"** — five project entries
  in `build/projects_seed.json`. Once the project owner confirms the
  client name, location and year, set `needsConfirmation: false`.
- **Hero / OG image** — currently `cat-flooring.jpg`. If a 1200×630
  branded social-share variant is preferred, add it to
  `assets/images/og-1200x630.jpg` and update `head()` in `build/site.py`.
- **Production secrets** — admin credentials are set up in cPanel via
  `setup.php`; nothing is committed.
- **Spoke site backlinks** — verified anchors include Flooring Singapore,
  Wood Floor SG, Commercial Renovation SG, Work at Height SG, Rope
  Access Singapore, Facade Inspection SG, Glass Expert Singapore,
  Metal & Glass Work Singapore and Metal Singapore. Confirm any URL
  changes before launch.

## Files of interest

| File | Purpose |
| ---- | ------- |
| `src/data/site.ts` | Brand + spoke site list (TS source) |
| `src/data/services.ts` | Four-service content (TS source) |
| `src/data/projects.ts` | Seed project gallery (TS source) |
| `src/data/blog.ts` | Blog manifest (TS source) |
| `src/data/faq.ts` | FAQ entries (TS source) |
| `src/pages/Home.tsx` | Hub-and-spoke landing page |
| `src/pages/ServiceDetail.tsx` | Service template |
| `build/site.py` | Static HTML pre-renderer (cPanel deploy target) |
| `build/qa_check.py` | H1/title/meta/JSON-LD/banned-string scan |
| `build/projects_seed.json` | Static-build seed, mirrors `src/data/projects.ts` |
| `build/blog_seed.json` | Static-build seed, mirrors `src/data/blog.ts` |
| `build/faq_seed.json` | Static-build seed, mirrors `src/data/faq.ts` |
| `assets/css/site.css` | Single shared stylesheet |
| `assets/data/blogs/*.md`, `*.pdf` | Blog source content (rendered by both surfaces) |
| `portfolio-admin/` | PHP password + TOTP admin |
| `server/contact-submit.php` | Mail handler for the contact form |

## How to run locally

```bash
cd /home/user/workspace/ezzogenics-hub-site
npm install                # Node deps for the SPA mirror
npm run typecheck          # tsc --noEmit, returns 0 errors
npm run dev                # http://localhost:5173 — SPA dev server
npm run build              # Vite build (source review)
npm run build:static       # python3 build/site.py — writes ./out
python3 build/qa_check.py  # H1, title, meta, JSON-LD, banned-string scan
```

Deploy `out/` to cPanel; upload `portfolio-admin/` next to it; upload
`server/contact-submit.php` to `public_html/contact-submit.php`.
