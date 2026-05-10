"""QA scanner for the Ezzogenics static build.

Walks `out/` and reports:
  - HTML pages with missing or duplicate <h1>
  - HTML pages with missing/short/long titles or meta descriptions
  - Banned strings ("readdy", "lorem", "placeholder", "example.com",
    unsupported claim words like "best", "cheapest", "fastest",
    "guaranteed compliant")
  - <img> tags missing alt or width/height
  - JSON-LD blocks that fail to parse
  - Internal links that point to a missing page

Exit code is 0 if no errors, 1 otherwise.
"""

import json
import re
import sys
from pathlib import Path
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "out"

BANNED = [
    "readdy.ai",
    "readdy",
    "example.com",
    "lorem ipsum",
    "lorem",
    "placeholder",
    "best contractor",
    "cheapest",
    "fastest",
    "guaranteed compliant",
    "100% guaranteed",
]

errors: list[str] = []
warnings: list[str] = []

class Page(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.title = ""
        self._in_title = False
        self.meta_desc = ""
        self.canonical = ""
        self.h1s: list[str] = []
        self._in_h1 = False
        self._h1_buf = ""
        self.images: list[dict] = []
        self.jsonld: list[str] = []
        self._in_jsonld = False
        self._jsonld_buf = ""
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list) -> None:
        d = dict(attrs)
        if tag == "title":
            self._in_title = True
        elif tag == "meta":
            if d.get("name") == "description":
                self.meta_desc = d.get("content", "") or ""
        elif tag == "link" and d.get("rel") == "canonical":
            self.canonical = d.get("href", "") or ""
        elif tag == "h1":
            self._in_h1 = True
            self._h1_buf = ""
        elif tag == "img":
            self.images.append({
                "src": d.get("src", ""),
                "alt": d.get("alt"),
                "width": d.get("width"),
                "height": d.get("height"),
                "loading": d.get("loading"),
            })
        elif tag == "script" and d.get("type") == "application/ld+json":
            self._in_jsonld = True
            self._jsonld_buf = ""
        elif tag == "a":
            href = d.get("href", "")
            if href:
                self.links.append(href)

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False
        elif tag == "h1":
            self._in_h1 = False
            self.h1s.append(self._h1_buf.strip())
        elif tag == "script" and self._in_jsonld:
            self._in_jsonld = False
            self.jsonld.append(self._jsonld_buf)

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title += data
        elif self._in_h1:
            self._h1_buf += data
        elif self._in_jsonld:
            self._jsonld_buf += data


def page_url(path: Path) -> str:
    rel = path.relative_to(OUT)
    parts = rel.parts
    if parts[-1] == "index.html":
        parts = parts[:-1]
    if not parts:
        return "/"
    return "/" + "/".join(parts) + "/"


def check_page(html_path: Path) -> None:
    text = html_path.read_text(encoding="utf-8")
    p = Page()
    p.feed(text)

    page_id = page_url(html_path)
    is_404 = html_path.name == "404.html"

    # Title
    if not p.title.strip():
        errors.append(f"{page_id}: missing <title>")
    elif not is_404:
        if len(p.title) < 30:
            warnings.append(f"{page_id}: short title ({len(p.title)} chars): {p.title!r}")
        elif len(p.title) > 65:
            warnings.append(f"{page_id}: long title ({len(p.title)} chars): {p.title!r}")

    # Meta description
    if not p.meta_desc.strip() and not is_404:
        errors.append(f"{page_id}: missing meta description")
    elif p.meta_desc:
        if len(p.meta_desc) < 70:
            warnings.append(f"{page_id}: short meta description ({len(p.meta_desc)})")
        elif len(p.meta_desc) > 165:
            warnings.append(f"{page_id}: long meta description ({len(p.meta_desc)})")

    # Canonical
    if not p.canonical and not is_404:
        errors.append(f"{page_id}: missing canonical")

    # H1
    if len(p.h1s) == 0:
        errors.append(f"{page_id}: missing <h1>")
    elif len(p.h1s) > 1:
        errors.append(f"{page_id}: multiple <h1> ({len(p.h1s)})")

    # Banned strings
    body_lower = text.lower()
    for word in BANNED:
        if word in body_lower:
            warnings.append(f"{page_id}: banned/risky string {word!r} found")

    # Images
    for img in p.images:
        if img["alt"] is None:
            errors.append(f"{page_id}: image missing alt — {img['src']}")
        if not img["width"] or not img["height"]:
            warnings.append(f"{page_id}: image missing width/height — {img['src']}")

    # JSON-LD parse
    for block in p.jsonld:
        try:
            json.loads(block)
        except Exception as e:
            errors.append(f"{page_id}: JSON-LD parse error — {e}")

    # Internal links: each /path/ should resolve to an out/<path>/index.html or out/<file>
    for href in p.links:
        if not href.startswith("/") or href.startswith("//"):
            continue
        link = href.split("#")[0].split("?")[0]
        if not link or link == "/":
            continue
        # Strip leading /
        rel = link.strip("/")
        # File-style or directory-style
        candidate1 = OUT / rel / "index.html"
        candidate2 = OUT / rel
        if candidate1.exists() or (candidate2.exists() and candidate2.is_file()):
            continue
        # /assets/* may be present
        if rel.startswith("assets/") and (OUT / rel).exists():
            continue
        # PHP endpoints
        if rel.endswith(".php") or rel.startswith("portfolio-admin"):
            continue
        warnings.append(f"{page_id}: internal link to missing target — {href}")


for html_path in OUT.rglob("*.html"):
    check_page(html_path)

# Sitemap & robots presence
if not (OUT / "sitemap.xml").exists():
    errors.append("sitemap.xml missing")
if not (OUT / "robots.txt").exists():
    errors.append("robots.txt missing")
else:
    robots = (OUT / "robots.txt").read_text()
    if "Sitemap:" not in robots:
        errors.append("robots.txt missing Sitemap directive")

print(f"\nQA scan: {len(errors)} error(s), {len(warnings)} warning(s)\n")
if errors:
    print("ERRORS")
    for e in errors:
        print("  - " + e)
if warnings:
    print("\nWARNINGS")
    for w in warnings:
        print("  - " + w)

sys.exit(1 if errors else 0)
