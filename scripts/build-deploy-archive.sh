#!/usr/bin/env bash
# build-deploy-archive.sh
#
# Produces the cPanel deployment ZIP for MetalSingapore.sg.
#
# The ZIP contains ONLY the production output that should sit inside
# public_html/ on the cPanel host:
#   - Pre-rendered static HTML (no /src/*.tsx references)
#   - assets/, sitemap.xml, robots.txt, .htaccess, 404.html
#   - portfolio-admin/  (PHP password + TOTP admin)
#   - contact-submit.php
#
# It does NOT contain: src/, node_modules/, dist/, package.json, vite
# config, build/, .git, screenshots, README/HANDOFF docs, source maps.
#
# Usage (from repo root):
#   bash scripts/build-deploy-archive.sh                              # default output path
#   bash scripts/build-deploy-archive.sh /path/to/output.zip          # custom output

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

OUTPUT="${1:-/home/user/workspace/metalsingapore_sg_cpanel_deploy.zip}"

echo "[deploy] Regenerating static site (python3 build/site.py)…"
python3 build/site.py

if [[ ! -d "out" ]]; then
  echo "[deploy] ERROR: out/ directory was not produced. Aborting." >&2
  exit 1
fi

# Sanity: refuse to ship if any HTML in out/ still references /src/*.tsx
if grep -RIl --include='*.html' '/src/main\.tsx\|/src/.*\.tsx' out/ >/dev/null 2>&1; then
  echo "[deploy] ERROR: out/ HTML still references /src/*.tsx — this would break in production." >&2
  echo "[deploy]        Files:" >&2
  grep -RIl --include='*.html' '/src/main\.tsx\|/src/.*\.tsx' out/ >&2
  exit 2
fi

rm -f "$OUTPUT"
mkdir -p "$(dirname "$OUTPUT")"

echo "[deploy] Writing $OUTPUT…"
# Zip the *contents* of out/ at the archive root, so extracting into
# public_html/ drops index.html directly into the web root.
( cd out && zip -rq "$OUTPUT" . -x '*.DS_Store' '__MACOSX/*' )

# Show contents summary
echo "[deploy] ZIP summary:"
unzip -l "$OUTPUT" | tail -1
echo "[deploy] Top-level entries:"
unzip -l "$OUTPUT" | awk 'NR>3 && $4 !~ "/" {print "  " $4} NR>3 && $4 ~ "^[^/]+/$" {print "  " $4}' | sort -u | head -30

echo "[deploy] Done: $OUTPUT"
