# Ezzogenics.com hub site

Production-ready hub site for **Ezzogenics Pte Ltd**, a Singapore contractor
covering flooring, commercial renovation, work at height (rope access and
boomlift) and glass &amp; metal works. Deploys as a static HTML/CSS/JS bundle
to cPanel; the React/Vite source under `/src` is the maintainable mirror for
code review and future SPA features.

## Repo layout

```
src/                       React/Vite SPA source (route mirror of static site)
build/                     Python static site generator + QA scanner
build/site.py              Renders out/<page>/index.html for every public route
build/qa_check.py          H1/title/meta/JSON-LD/banned-string scan
assets/css/site.css        Single stylesheet served verbatim by static + SPA
assets/images/             Approved Ezzogenics photos and logos
assets/data/blogs/         Markdown + PDF source for resource posts
portfolio-admin/           PHP password + TOTP admin (cPanel deploy target)
server/contact-submit.php  Mail handler for the contact form
out/                       Deployable static-site output (generated)
dist/                      Vite build output (source-review only)
```

## Quick start

```bash
# Install Node deps for the SPA mirror
npm install

# Type-check the React source
npm run typecheck

# Run the SPA dev server (source review)
npm run dev                      # http://localhost:5173

# Build the deployable static site
npm run build:static             # writes ./out

# QA scan over the static build
python3 build/qa_check.py
```

## Deploy to cPanel

1. `python3 build/site.py` — writes the static site to `out/`.
2. Upload **the contents of `out/`** plus the `portfolio-admin/` directory
   into `public_html/` on the cPanel host.
3. Upload `server/contact-submit.php` to `public_html/contact-submit.php`.
4. Visit `https://ezzogenics.com/portfolio-admin/setup.php` to set up the
   admin passcode and Google Authenticator (TOTP) secret. The credentials
   file is written to `portfolio-admin/config/credentials.json` with mode
   0600 — never commit it.
5. Confirm the contact details on `/contact-us/` and `useContactInfo.ts`
   match the production phone, email, and physical address before
   removing the *pending owner confirmation* banner.

## SEO highlights

- One `<title>`, `<meta description>`, canonical, OG and Twitter tag set
  per route — emitted in static HTML and refreshed by `RouteHead` in the
  SPA mirror.
- `LocalBusiness` JSON-LD on Home, `Service` on each service page,
  `BlogPosting` on each blog detail, `FAQPage` on `/faq/`,
  `BreadcrumbList` on every non-home page.
- `sitemap.xml` and `robots.txt` are emitted by the build (robots
  references the sitemap; admin paths only are disallowed).
- Hero image preloaded; below-the-fold images are `loading="lazy"
  decoding="async"` with explicit width/height.
- Two font families (Cabinet Grotesk + Satoshi via Fontshare), four
  weights total. CSS budget is well under 50 KB gzipped.

## Photos & projects

Approved photos live in `assets/images/` with kebab-case filenames. Project
descriptions in `src/data/projects.ts` and `build/projects_seed.json` are
factual and ~50 words; uncertain labels are flagged
`needsConfirmation: true` rather than published with invented detail.

## Confirm-before-go-live list

- Contact details (`SITE` constants in `src/data/site.ts` / `build/site.py`)
  — phone numbers, email, office address, and Google Maps embed URL.
- Project labels marked `pending confirmation` in
  `build/projects_seed.json`.
- Production credentials for `portfolio-admin` (set up via `setup.php`).
- The `og:image` (currently `cat-flooring.jpg`) — pick the preferred
  hub image and add a 1200×630 social variant if needed.
