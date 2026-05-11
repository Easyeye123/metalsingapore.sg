# MetalSingapore.sg — deployment guide

There are **two different ZIP files** for this project, and uploading the
wrong one to cPanel is the most common cause of the "Failed to load module
script: MIME type application/octet-stream … main.tsx" error.

| ZIP | Purpose | Where to use it |
| --- | ------- | --------------- |
| `metalsingapore_sg_source.zip` | Full developer source (React/Vite SPA + Python prerenderer) | Local development / handoff to Claude Code / code review. **Do not upload to cPanel.** |
| `metalsingapore_sg_cpanel_deploy.zip` | Pre-rendered static HTML + admin + mail handler | **This is the ZIP you upload to cPanel `public_html/`.** |

The deploy ZIP contains only compiled HTML, CSS, images, the PHP admin and
the contact mail handler. It has no `src/`, no `*.tsx`, no `node_modules/`,
no `package.json`, no `vite.config.ts`. The browser never asks for a
TypeScript file, so the MIME-type error cannot occur.

---

## 1. If you only want to deploy (cPanel)

1. Download / build `metalsingapore_sg_cpanel_deploy.zip` (see §3).
2. In cPanel **File Manager**, open `public_html/`.
3. Upload the ZIP, then **right-click → Extract** into `public_html/`.
   The archive is *flat*: `index.html`, `assets/`, `portfolio-admin/`,
   `contact-submit.php`, `.htaccess`, `robots.txt`, `sitemap.xml` etc.
   land directly inside `public_html/`. Do **not** put them inside a
   `metalsingapore_sg_cpanel_deploy/` subfolder.
4. (First deploy only) Visit
   `https://metalsingapore.sg/portfolio-admin/setup.php` once to set the
   admin passcode and TOTP secret. The credentials file is written to
   `portfolio-admin/config/credentials.json` (mode 0600); never commit it.
5. Verify the homepage loads at `https://metalsingapore.sg/` and that
   network requests in DevTools show `text/html` for HTML pages and
   `text/css` / `image/*` for assets. No request should be made for
   `/src/main.tsx`.

The bundled `.htaccess` in the deploy ZIP handles:

- HTTPS canonical redirect
- Trailing-slash normalisation for clean URLs
- `X-Content-Type-Options: nosniff` + standard security headers
- `ErrorDocument 404 /404.html`
- Denying direct access to raw `*.md` files

Apache on cPanel already ships sensible MIME defaults for `.html`, `.css`,
`.js`, `.png`, `.svg`, `.webp`. No JavaScript module is served from
source — the deploy bundle ships only pre-rendered HTML — so no extra
MIME rule is required.

---

## 2. If you want to preview locally (developer)

You need `metalsingapore_sg_source.zip` (not the deploy ZIP), Node.js 18+
and Python 3.9+.

```bash
unzip metalsingapore_sg_source.zip
cd metalsingapore.sg-*
npm install
npm run dev          # http://localhost:5173 — live SPA, hot reload
# or:
npm run build        # Vite production bundle to ./dist
npm run preview      # http://localhost:4173 — serves ./dist
# or, exactly what cPanel will see:
npm run build:static # python3 build/site.py — writes ./out
```

The contents of `./out` are byte-for-byte what ends up inside
`metalsingapore_sg_cpanel_deploy.zip`.

---

## 3. Rebuilding the deploy ZIP from source

From the extracted source folder:

```bash
npm install                              # one-time, for the Vite tooling
bash scripts/build-deploy-archive.sh     # writes /home/user/workspace/metalsingapore_sg_cpanel_deploy.zip
# or pick your own output path:
bash scripts/build-deploy-archive.sh /tmp/metalsingapore_sg_cpanel_deploy.zip
```

The script:

1. Runs `python3 build/site.py` to regenerate `out/`.
2. Refuses to produce a ZIP if any HTML inside `out/` still references
   `/src/*.tsx` (it would mean the prerender is misconfigured).
3. Zips the **contents** of `out/` (not `out/` itself) so the archive
   extracts flat into `public_html/`.

---

## 4. Why the "MIME type application/octet-stream / main.tsx" error happens

When the **source ZIP** is uploaded to cPanel, `public_html/index.html`
ends up with the raw Vite dev tag:

```html
<script type="module" src="/src/main.tsx"></script>
```

The browser then fetches `/src/main.tsx`. Apache has no MIME mapping for
`.tsx`, so it returns `application/octet-stream`, which is not a valid
JavaScript module type — and the page fails to boot.

The **deploy ZIP** ships pre-rendered HTML that has no `<script
type="module" src="/src/main.tsx">` tag at all (each route is a fully
rendered static document). The browser never asks for a TypeScript file,
so the error cannot occur. If you ever see it on production again, you
have uploaded the source ZIP by mistake — re-upload the deploy ZIP and
overwrite.

---

## 5. What is in each ZIP

### `metalsingapore_sg_cpanel_deploy.zip` (production)

```
index.html                          ← Home (pre-rendered)
about-us/index.html
services/index.html
services/<slug>/index.html          ← 7 service detail pages
projects/index.html
blog/index.html
blog/<slug>/index.html              ← 11 blog posts
faq/index.html
contact-us/index.html
404.html
sitemap.xml
robots.txt
.htaccess
contact-submit.php                  ← PHP mail handler for the contact form
portfolio-admin/                    ← PHP password + TOTP admin (noindex)
assets/css/site.css
assets/images/…
assets/data/…
```

### `metalsingapore_sg_source.zip` (developers / Claude only)

Everything above **plus** `src/`, `vite.config.ts`, `tsconfig.json`,
`package.json`, `build/`, `scripts/`, `README.md`, `HANDOFF.md`,
`DEPLOYMENT.md`. Excludes `node_modules/`, `dist/`, `out/`, `.env*` and
secrets under `portfolio-admin/config/`.

---

## 6. After every content / code change

Rebuild **both** ZIPs so they stay in sync:

```bash
npm run build:static                       # refresh ./out
bash scripts/build-deploy-archive.sh       # refresh deploy ZIP
```

Then re-zip the source from the workspace root (excluding the usual
generated dirs and secrets) — see the project handoff notes for the
exact `zip` invocation.
