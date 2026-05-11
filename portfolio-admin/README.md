# MetalSingapore.sg Portfolio Admin

Lightweight, password + Google Authenticator (TOTP) admin for the
MetalSingapore.sg project gallery. Designed for cPanel hosting next to the
public static site at `/portfolio-admin/`.

## What it does

- Lets a non-programmer add, edit and delete portfolio projects on
  metalsingapore.sg.
- Validates uploaded JPEG / PNG / WebP / GIF files (≤6 MB, server-side
  type-sniffed) and writes them to `/assets/images/projects/`.
- Writes the public `/assets/data/projects.json` consumed by the React /
  static site at runtime, with a 50-word soft cap on each description.
- Is gated by:
  - a hashed admin passcode (PHP `password_hash`, `password_verify`)
  - a 6-digit TOTP code (compatible with Google Authenticator, 1Password,
    Authy, Aegis, etc.)
  - a 5-attempt 15-minute lockout on bad logins
- Emits `noindex, nofollow` on every page, denies `config/credentials.json`
  via `.htaccess`, and sits behind a hidden URL.

## First-time setup

1. Copy this directory to `public_html/portfolio-admin/` on the host.
2. Browse to `https://metalsingapore.sg/portfolio-admin/setup.php`.
3. Choose a long passcode (12+ chars), scan the QR / enter the secret in
   Google Authenticator and confirm with a 6-digit code. The script writes
   `config/credentials.json` (mode 0600) — do not commit this file to git.
4. Future visits land on `login.php`. After login, `dashboard.php` lets
   you add a project, upload an image, write a 50-word summary, and pick
   one of the MetalSingapore service categories:
   - custom-metal-works
   - stainless-steel-fabrication
   - metal-gates
   - metal-railings
   - fencing-and-grilles
   - cat-ladders-and-access-metalwork
   - outdoor-trellis-and-structural-metalwork
   - other

## Categories

The category dropdown writes the slug used by the public site. Use the
slug values exactly so the JSON merges cleanly with `src/data/projects.ts`
(the `CategorySlug` union is the source of truth).

## Backups & sync

`projects.json` is plain JSON. The recommended workflow is:

- After each session, download `assets/data/projects.json` and the new
  files in `assets/images/projects/`.
- Mirror them into the team backup location.
- The site source on git ships only seed data — runtime additions live
  in cPanel and the backup.

## Environment / secrets

Never commit `config/credentials.json` or any image uploads. The `.gitignore`
at the project root lists both. The setup-time TOTP secret is one-time —
if it leaks before login, regenerate by deleting `config/credentials.json`
and re-running setup.
