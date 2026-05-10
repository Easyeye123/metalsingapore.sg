"""
Static site builder for MetalSingapore.sg — produces pre-rendered HTML files
that mirror the React SPA. The static HTML is the cPanel deployment target;
the React source under /src is the maintainable mirror.

Run: python3 build/site.py
Outputs:
  out/                       (deployable directory tree)
    index.html               (Home)
    about-us/index.html
    services/index.html
    services/<slug>/index.html
    projects/index.html
    blog/index.html
    blog/<slug>/index.html
    faq/index.html
    contact-us/index.html
    404.html
    sitemap.xml
    robots.txt
    assets/...               (copied from /assets)
    portfolio-admin/...      (copied from /portfolio-admin if present)
    contact-submit.php       (copied from /server)

Data source: build/data.json — produced by `node build/dump_data.mjs`.
The build script auto-runs the dumper if the JSON is missing or stale.

Tone: factual, contractor, hedged on regulatory and certification claims.
No "best/cheapest/QP-endorsed" statements. References to standards or
authorities are factual; specific approvals are confirmed per project.
"""

from __future__ import annotations

import html
import json
import os
import re
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "out"
DATA_JSON = ROOT / "build" / "data.json"


# --- Data load --------------------------------------------------------------

def ensure_data_json() -> dict:
    """Re-run the Node dumper if the JSON is missing or older than any TS data file."""
    ts_files = sorted((ROOT / "src" / "data").glob("*.ts"))
    needs_rebuild = not DATA_JSON.exists()
    if not needs_rebuild:
        json_mtime = DATA_JSON.stat().st_mtime
        if any(t.stat().st_mtime > json_mtime for t in ts_files):
            needs_rebuild = True
    if needs_rebuild:
        print("[build] Regenerating build/data.json from src/data/*.ts ...")
        with open(DATA_JSON, "w", encoding="utf-8") as fp:
            subprocess.run(
                ["node", "build/dump_data.mjs"], cwd=ROOT, check=True, stdout=fp
            )
    with open(DATA_JSON, "r", encoding="utf-8") as fp:
        return json.load(fp)


D = ensure_data_json()
SITE = D["SITE"]
SPOKES = D["SPOKES"]
CATEGORIES = D["CATEGORIES"]
CATEGORY_ORDER = D["CATEGORY_ORDER"]
SERVICES = D["services"]
BLOG_POSTS = D["blogPosts"]
PROJECTS = D["projects"]
FAQS = D["faqs"]

SERVICES_BY_SLUG = {s["slug"]: s for s in SERVICES}


# --- HTML helpers -----------------------------------------------------------

def esc(s: str) -> str:
    return html.escape(s or "", quote=True)


def origin() -> str:
    return SITE["origin"].rstrip("/")


def canonical(path: str) -> str:
    if not path.startswith("/"):
        path = "/" + path
    if not path.endswith("/") and "." not in path.rsplit("/", 1)[-1]:
        path = path + "/"
    return origin() + path


# --- Layout building blocks -------------------------------------------------

def head_block(*, title: str, description: str, canonical_path: str,
               og_image: str | None = None, jsonld: list[dict] | None = None,
               extra_meta: str = "") -> str:
    image_url = og_image or (origin() + SITE["ogImage"])
    if not image_url.startswith("http"):
        image_url = origin() + image_url
    cu = canonical(canonical_path)
    jsonld_blocks = ""
    for obj in (jsonld or []):
        jsonld_blocks += '\n<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False) + "</script>"
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>{esc(title)}</title>
<meta name="description" content="{esc(description)}" />
<link rel="canonical" href="{esc(cu)}" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta name="theme-color" content="#0f1419" />
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/metalsg-favicon.png" />
<link rel="icon" type="image/png" sizes="128x128" href="/assets/images/metalsg-icon-128.png" />
<link rel="apple-touch-icon" href="/assets/images/metalsg-icon.png" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="{esc(SITE['name'])}" />
<meta property="og:title" content="{esc(title)}" />
<meta property="og:description" content="{esc(description)}" />
<meta property="og:url" content="{esc(cu)}" />
<meta property="og:image" content="{esc(image_url)}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{esc(title)}" />
<meta name="twitter:description" content="{esc(description)}" />
<meta name="twitter:image" content="{esc(image_url)}" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/assets/css/site.css" />
{extra_meta}{jsonld_blocks}
</head>
<body>
"""


def nav_block(active: str = "") -> str:
    def link(href: str, label: str, key: str) -> str:
        cls = ' class="active"' if active == key else ""
        return f'<a href="{href}"{cls}>{label}</a>'
    return f"""<header class="site-header">
  <div class="container nav-row">
    <a class="brand" href="/" aria-label="{esc(SITE['name'])} home">
      <img src="/assets/images/metalsg-logo.png" alt="" width="34" height="34" />
      <span class="brand-text"><strong>{esc(SITE['shortName'])}</strong>.sg</span>
    </a>
    <nav class="primary-nav" aria-label="Primary">
      {link('/', 'Home', 'home')}
      {link('/about-us/', 'About', 'about')}
      {link('/services/', 'Services', 'services')}
      {link('/projects/', 'Projects', 'projects')}
      {link('/blog/', 'Blog', 'blog')}
      {link('/faq/', 'FAQ', 'faq')}
      {link('/contact-us/', 'Contact', 'contact')}
    </nav>
    <a class="btn btn-primary nav-cta" href="/contact-us/">Get a quote</a>
  </div>
</header>
"""


def footer_block() -> str:
    cat_links = "\n".join(
        f'<li><a href="/services/{esc(slug)}/">{esc(CATEGORIES[slug]["title"])}</a></li>'
        for slug in CATEGORY_ORDER
    )
    spoke_links = "\n".join(
        f'<li><a href="{esc(s["href"])}" rel="noopener">{esc(s["title"])}</a></li>'
        for s in SPOKES
    )
    return f"""<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <h3>{esc(SITE['shortName'])}.sg</h3>
      <p>{esc(SITE['tagline'])}</p>
      <p class="muted">{esc(SITE['legalName'])}. Operating as {esc(SITE['name'])}. Singapore.</p>
    </div>
    <div>
      <h4>Services</h4>
      <ul class="footer-links">{cat_links}</ul>
    </div>
    <div>
      <h4>Group sites</h4>
      <ul class="footer-links">{spoke_links}</ul>
    </div>
    <div>
      <h4>Contact</h4>
      <ul class="footer-links">
        <li><a href="mailto:{esc(SITE['email'])}">{esc(SITE['email'])}</a></li>
        <li><a href="tel:{esc(SITE['phone_display_1'].replace(' ', ''))}">{esc(SITE['phone_display_1'])}</a></li>
        <li><a href="{esc(SITE['whatsapp'])}" rel="noopener">WhatsApp {esc(SITE['phone_display_2'])}</a></li>
        <li>{esc(SITE['address1'])}<br />{esc(SITE['address2'])}<br />{esc(SITE['address3'])}</li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>&copy; {datetime.now().year} {esc(SITE['legalName'])}. Operating as {esc(SITE['name'])}.</p>
  </div>
</footer>
</body>
</html>
"""


def cta_block(heading: str | None = None, body: str | None = None) -> str:
    h = heading or f"Plan your project with {SITE['shortName']}"
    b = body or "Send dimensions, photos and a brief — we will reply with material options, scope assumptions and an itemised quotation."
    return f"""<section class="cta-band">
  <div class="container cta-band-row">
    <div>
      <h2>{esc(h)}</h2>
      <p>{esc(b)}</p>
    </div>
    <div class="cta-band-actions">
      <a class="btn btn-primary" href="/contact-us/">Request a quote</a>
      <a class="btn btn-ghost" href="{esc(SITE['whatsapp'])}" rel="noopener">WhatsApp us</a>
    </div>
  </div>
</section>
"""


def crumbs_block(items: list[tuple[str, str]]) -> str:
    parts = []
    for i, (label, href) in enumerate(items):
        if i == len(items) - 1:
            parts.append(f'<li aria-current="page">{esc(label)}</li>')
        else:
            parts.append(f'<li><a href="{esc(href)}">{esc(label)}</a></li>')
    return f'<nav class="breadcrumbs container" aria-label="Breadcrumb"><ol>{"".join(parts)}</ol></nav>\n'


def breadcrumb_jsonld(items: list[tuple[str, str]]) -> dict:
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": i + 1,
                "name": label,
                "item": (origin() + href) if href.startswith("/") else href,
            }
            for i, (label, href) in enumerate(items)
        ],
    }


def organization_jsonld() -> dict:
    return {
        "@context": "https://schema.org",
        "@type": ["Organization", "LocalBusiness"],
        "name": SITE["name"],
        "legalName": SITE["legalName"],
        "url": origin() + "/",
        "logo": origin() + "/assets/images/metalsg-logo.png",
        "image": origin() + SITE["ogImage"],
        "telephone": SITE["phone_display_1"],
        "email": SITE["email"],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": f"{SITE['address1']}, {SITE['address2']}",
            "addressLocality": "Singapore",
            "postalCode": "417808",
            "addressCountry": "SG",
        },
        "sameAs": [s["href"] for s in SPOKES],
        "areaServed": "Singapore",
    }


# --- Pages ------------------------------------------------------------------

def home_page() -> str:
    services_grid = "\n".join(
        f'''
      <a class="service-card" href="/services/{esc(slug)}/">
        <div class="service-card-image" style="background-image:url('{esc(CATEGORIES[slug]["cover"])}')"></div>
        <div class="service-card-body">
          <h3>{esc(CATEGORIES[slug]["title"])}</h3>
          <p>{esc(CATEGORIES[slug]["short"])}</p>
          <span class="link-arrow">View service →</span>
        </div>
      </a>'''
        for slug in CATEGORY_ORDER
    )
    featured = [p for p in PROJECTS if p.get("featured")][:6]
    def _cat_title(slug: str) -> str:
        return CATEGORIES[slug]["title"] if slug in CATEGORIES else slug
    project_cards = "\n".join(
        f'''
      <a class="project-mini" href="/projects/#{esc(p["id"])}">
        <div class="project-mini-image" style="background-image:url('{esc(p.get("image", ""))}')"></div>
        <div class="project-mini-body">
          <span class="project-mini-cat">{esc(_cat_title(p["category"]))}</span>
          <h4>{esc(p["title"])}</h4>
        </div>
      </a>'''
        for p in featured
    )
    blog_top = BLOG_POSTS[:3]
    blog_cards = "\n".join(
        f'''
      <a class="blog-mini" href="/blog/{esc(b["slug"])}/">
        <h4>{esc(b["title"])}</h4>
        <p>{esc(b["excerpt"])}</p>
        <span class="link-arrow">Read article →</span>
      </a>'''
        for b in blog_top
    )

    title = f"{SITE['name']} — Custom metal works contractor in Singapore"
    description = SITE["tagline"]
    crumbs = [("Home", "/")]
    jsonld = [
        organization_jsonld(),
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": origin() + "/",
            "name": SITE["name"],
            "publisher": {"@type": "Organization", "name": SITE["legalName"]},
        },
    ]

    body = head_block(
        title=title, description=description, canonical_path="/",
        jsonld=jsonld,
    )
    body += nav_block("home")
    body += f"""<section class="hero">
  <div class="container hero-row">
    <div class="hero-text">
      <span class="eyebrow">Singapore metal works contractor</span>
      <h1>Custom metal works for buildings, homes and industrial sites in Singapore.</h1>
      <p class="lead">Gates, railings, fencing, cat ladders, trellis frames, stainless steel fabrication and structural metalwork — designed, fabricated and installed end-to-end.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="/contact-us/">Request a quote</a>
        <a class="btn btn-ghost" href="/services/">Browse services</a>
      </div>
      <ul class="hero-meta">
        <li>Site survey to install — single point of contact</li>
        <li>Mild steel, galvanised, SS304 / SS316, aluminium 6063-T6</li>
        <li>PE / QP coordination where required by the project</li>
      </ul>
    </div>
    <div class="hero-art">
      <img src="/assets/images/hero-metalsingapore.jpg" alt="MetalSingapore custom metal works in Singapore" width="720" height="540" />
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <header class="section-head">
      <span class="eyebrow">What we do</span>
      <h2>Seven metal works streams under one Singapore contractor</h2>
      <p>Each stream is supported by in-house fabrication, on-site welding and a defect walk-through before sign-off.</p>
    </header>
    <div class="services-grid">{services_grid}</div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <header class="section-head">
      <span class="eyebrow">Featured projects</span>
      <h2>Recent metal works delivered across Singapore</h2>
    </header>
    <div class="projects-mini-grid">{project_cards}</div>
    <p class="section-foot"><a class="link-arrow" href="/projects/">View all projects →</a></p>
  </div>
</section>

<section class="section">
  <div class="container">
    <header class="section-head">
      <span class="eyebrow">From the blog</span>
      <h2>Material selection, anchor sizing and code references</h2>
    </header>
    <div class="blog-mini-grid">{blog_cards}</div>
    <p class="section-foot"><a class="link-arrow" href="/blog/">All articles →</a></p>
  </div>
</section>
"""
    body += cta_block()
    body += footer_block()
    return body


def about_page() -> str:
    title = f"About {SITE['name']} — Singapore metal works contractor"
    description = "MetalSingapore.sg is the metal works arm of Ezzogenics Pte Ltd — workshop, on-site welders and PE/QP coordination across Singapore."
    crumbs = [("Home", "/"), ("About", "/about-us/")]
    jsonld = [breadcrumb_jsonld(crumbs), organization_jsonld()]
    body = head_block(title=title, description=description, canonical_path="/about-us/", jsonld=jsonld)
    body += nav_block("about")
    body += crumbs_block(crumbs)
    body += f"""<section class="section">
  <div class="container narrow">
    <span class="eyebrow">About us</span>
    <h1>A Singapore metal works contractor — workshop, site, sign-off.</h1>
    <p class="lead">{esc(SITE['name'])} is the metal works arm of {esc(SITE['legalName'])}. We deliver custom metal fabrication and installation for residential, commercial and industrial properties across Singapore.</p>

    <h2>How we operate</h2>
    <p>Every project runs through a single point of contact, from site survey to defect walk-through. Workshop fabrication is paired with on-site welders and installers. We coordinate with the appointed Professional Engineer (PE) or Qualified Person (QP) where structural sign-off is required by the relevant authority or the project consultant.</p>

    <h2>Materials</h2>
    <ul>
      <li>Mild steel sections (S275, S355) for structural frames.</li>
      <li>Galvanised mild steel for outdoor scopes.</li>
      <li>Stainless steel SS304 for general service; SS316 for marine and corrosive exposure.</li>
      <li>Aluminium 6063-T6 for lightweight ladders, awning and trellis frames.</li>
    </ul>

    <h2>Anchors and substrate</h2>
    <p>Anchor selection — Hilti or Fischer chemical and mechanical anchors with European Technical Assessment (ETA) where applicable — is matched to the substrate (RC, masonry, AAC, hollow brick) and the cracked / uncracked state of the concrete. ETA-Option-1 (cracked concrete) anchors are the conservative default for tension-zone fixings.</p>

    <h2>Safety and site coordination</h2>
    <p>On occupied or live sites, hot works, work-at-height and site protection are coordinated with the main contractor or property manager. Group sites — including Work at Height SG and Rope Access Singapore — are available for paired access scopes.</p>

    <h2>Where we serve</h2>
    <p>Office and workshop coordination at {esc(SITE['address1'])}, {esc(SITE['address2'])}, {esc(SITE['address3'])}. Site coverage extends across Singapore — CBD commercial, landed homes, condominiums, schools, places of worship and JTC-zone industrial premises.</p>

    <h2>What we do not claim</h2>
    <p>We do not advertise as the "best" or "cheapest" contractor, and we do not claim universal QP endorsement on every scope. Where structural design or regulatory submission is required, the project Professional Engineer or Qualified Person carries the design responsibility — we coordinate but do not act as the QP unless one is engaged separately for the project.</p>
  </div>
</section>
"""
    body += cta_block()
    body += footer_block()
    return body


def services_hub_page() -> str:
    cards = "\n".join(
        f'''
      <a class="service-card" href="/services/{esc(slug)}/">
        <div class="service-card-image" style="background-image:url('{esc(CATEGORIES[slug]["cover"])}')"></div>
        <div class="service-card-body">
          <h3>{esc(CATEGORIES[slug]["title"])}</h3>
          <p>{esc(CATEGORIES[slug]["short"])}</p>
          <span class="link-arrow">View service →</span>
        </div>
      </a>'''
        for slug in CATEGORY_ORDER
    )
    title = "Services — MetalSingapore.sg"
    description = "Seven metal works streams: custom metal works, stainless steel fabrication, gates, railings, fencing and grilles, cat ladders and access metalwork, outdoor trellis and structural metalwork."
    crumbs = [("Home", "/"), ("Services", "/services/")]
    jsonld = [breadcrumb_jsonld(crumbs)]
    body = head_block(title=title, description=description, canonical_path="/services/", jsonld=jsonld)
    body += nav_block("services")
    body += crumbs_block(crumbs)
    body += f"""<section class="section">
  <div class="container">
    <span class="eyebrow">Services</span>
    <h1>Seven metal works streams under one Singapore contractor.</h1>
    <p class="lead">Each stream is supported by in-house fabrication, on-site welders and a defect walk-through before sign-off.</p>
    <div class="services-grid">{cards}</div>
  </div>
</section>

<section class="section section-alt">
  <div class="container narrow">
    <span class="eyebrow">How to brief us</span>
    <h2>Three things that speed up your quote</h2>
    <div class="brief-grid">
      <div class="brief-card">
        <h3>1. Photos and dimensions</h3>
        <p>Site photos plus rough dimensions (post-to-post opening, climb height, fence run) let us size sections and propose a finish.</p>
      </div>
      <div class="brief-card">
        <h3>2. Service environment</h3>
        <p>Indoor / sheltered outdoor / coastal / pool deck — exposure drives material grade (mild steel + finish vs SS304 vs SS316 vs aluminium).</p>
      </div>
      <div class="brief-card">
        <h3>3. Approvals required</h3>
        <p>Tell us if a PE / QP submission, MCST approval or URA / JTC notification is expected — we coordinate in parallel with fabrication.</p>
      </div>
    </div>
  </div>
</section>
"""
    body += cta_block()
    body += footer_block()
    return body


def service_detail_page(svc: dict) -> str:
    slug = svc["slug"]
    cat = CATEGORIES[slug]
    related_blogs = [b for b in BLOG_POSTS if slug in b.get("categories", [])][:4]
    related_blog_html = ""
    if related_blogs:
        items = "\n".join(
            f'<li><a href="/blog/{esc(b["slug"])}/">{esc(b["title"])}</a></li>'
            for b in related_blogs
        )
        related_blog_html = f"""<section class="section section-alt">
  <div class="container narrow">
    <h2>Related articles</h2>
    <ul class="related-list">{items}</ul>
  </div>
</section>
"""
    related_projects = [p for p in PROJECTS if p["category"] == slug][:6]
    related_project_html = ""
    if related_projects:
        cards = "\n".join(
            f'''
      <a class="project-mini" href="/projects/#{esc(p["id"])}">
        <div class="project-mini-image" style="background-image:url('{esc(p.get("image", ""))}')"></div>
        <div class="project-mini-body">
          <h4>{esc(p["title"])}</h4>
          <p>{esc(p.get("location", ""))}</p>
        </div>
      </a>'''
            for p in related_projects
        )
        related_project_html = f"""<section class="section">
  <div class="container">
    <h2>Recent projects in this stream</h2>
    <div class="projects-mini-grid">{cards}</div>
  </div>
</section>
"""

    def li_list(items: list[str]) -> str:
        return "".join(f"<li>{esc(x)}</li>" for x in items)

    subtopics_html = ""
    if svc.get("subtopics"):
        parts = []
        for sub in svc["subtopics"]:
            parts.append(
                f'<div class="subtopic"><h3>{esc(sub["title"])}</h3><p>{esc(sub["body"])}</p></div>'
            )
        subtopics_html = f'<div class="subtopics">{"".join(parts)}</div>'

    crumbs = [("Home", "/"), ("Services", "/services/"), (cat["title"], f"/services/{slug}/")]
    jsonld = [
        breadcrumb_jsonld(crumbs),
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": cat["title"],
            "provider": {"@type": "Organization", "name": SITE["legalName"]},
            "areaServed": "Singapore",
            "url": canonical(f"/services/{slug}/"),
            "description": svc["metaDescription"],
        },
    ]
    body = head_block(
        title=svc["metaTitle"],
        description=svc["metaDescription"],
        canonical_path=f"/services/{slug}/",
        og_image=cat["cover"],
        jsonld=jsonld,
    )
    body += nav_block("services")
    body += crumbs_block(crumbs)
    body += f"""<section class="section">
  <div class="container narrow">
    <span class="eyebrow">{esc(cat["title"])}</span>
    <h1>{esc(svc["h1"])}</h1>
    <p class="lead">{esc(svc["lead"])}</p>

    <h2>What this scope is</h2>
    <p>{esc(svc["whatItIs"])}</p>

    <h2>Who this is for</h2>
    <ul>{li_list(svc["whoForBullets"])}</ul>

    <h2>Scope of works</h2>
    <ul>{li_list(svc["scopeBullets"])}</ul>

    <h2>How we run a project</h2>
    <ul>{li_list(svc["processBullets"])}</ul>

    {subtopics_html}

    <h2>Things to confirm before fabrication</h2>
    <ul>{li_list(svc["cautions"])}</ul>
  </div>
</section>
{related_project_html}
{related_blog_html}
"""
    body += cta_block()
    body += footer_block()
    return body


def project_card(p: dict) -> str:
    cat = CATEGORIES[p["category"]] if p["category"] in CATEGORIES else {"title": p["category"]}
    gallery_html = ""
    if p.get("gallery"):
        thumbs = "".join(
            f'<a class="gallery-thumb" href="{esc(g["src"])}" data-caption="{esc(g.get("alt", ""))}">'
            f'<img src="{esc(g["src"])}" alt="{esc(g.get("alt", ""))}" loading="lazy" /></a>'
            for g in p["gallery"]
        )
        gallery_html = f'<div class="project-gallery">{thumbs}</div>'

    note_html = ""
    if p.get("note"):
        note_html = f'<p class="project-note"><strong>Note:</strong> {esc(p["note"])}</p>'

    related_html = ""
    if p.get("related"):
        items = "".join(
            f'<li><a href="{esc(r["to"])}">{esc(r["label"])}</a></li>'
            for r in p["related"]
        )
        related_html = f'<ul class="project-related">{items}</ul>'

    return f"""<article class="project-card" id="{esc(p["id"])}">
  <div class="project-card-image" style="background-image:url('{esc(p.get("image", ""))}')"></div>
  <div class="project-card-body">
    <span class="project-card-cat">{esc(cat["title"])}</span>
    <h3>{esc(p["title"])}</h3>
    <p class="project-card-loc">{esc(p.get("location", ""))} · {esc(str(p.get("year", "")))}</p>
    <p>{esc(p.get("description", ""))}</p>
    {gallery_html}
    {note_html}
    {related_html}
  </div>
</article>
"""


def projects_page() -> str:
    cards = "\n".join(project_card(p) for p in PROJECTS)
    title = "Projects — MetalSingapore.sg"
    description = "Recent metal works delivered across Singapore — gates, railings, cat ladders, custom fabrication and structural metalwork."
    crumbs = [("Home", "/"), ("Projects", "/projects/")]
    jsonld = [breadcrumb_jsonld(crumbs)]
    body = head_block(title=title, description=description, canonical_path="/projects/", jsonld=jsonld)
    body += nav_block("projects")
    body += crumbs_block(crumbs)
    body += f"""<section class="section">
  <div class="container">
    <span class="eyebrow">Projects</span>
    <h1>Recent metal works across Singapore.</h1>
    <p class="lead">A selection of fabrication and installation projects — residential, commercial, institutional and industrial.</p>
    <div class="projects-grid">{cards}</div>
  </div>
</section>
"""
    body += cta_block()
    body += footer_block()
    # Inline lightbox script for static gallery
    body = body.replace(
        "</body>",
        """<script>
(function(){
  var thumbs = document.querySelectorAll('.gallery-thumb');
  if (!thumbs.length) return;
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img class="lightbox-img" alt="" /><p class="lightbox-caption"></p>';
  document.body.appendChild(overlay);
  var img = overlay.querySelector('.lightbox-img');
  var cap = overlay.querySelector('.lightbox-caption');
  function show(src, alt){ img.src = src; img.alt = alt || ''; cap.textContent = alt || ''; overlay.classList.add('open'); }
  function hide(){ overlay.classList.remove('open'); img.src = ''; }
  thumbs.forEach(function(t){
    t.addEventListener('click', function(e){ e.preventDefault(); show(t.getAttribute('href'), t.getAttribute('data-caption')); });
  });
  overlay.addEventListener('click', function(e){ if (e.target === overlay || e.target.classList.contains('lightbox-close')) hide(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') hide(); });
})();
</script>
</body>""",
    )
    return body


# --- Markdown rendering -----------------------------------------------------

def render_md(md: str) -> str:
    """Minimal Markdown → HTML renderer matching the React Markdown component."""
    lines = md.split("\n")
    out_lines: list[str] = []
    i = 0
    in_code = False
    code_buf: list[str] = []
    in_table = False
    table_buf: list[str] = []

    def flush_table():
        nonlocal table_buf
        if not table_buf:
            return
        rows = [r for r in table_buf if r.strip()]
        if len(rows) < 2:
            for r in rows:
                out_lines.append(f"<p>{r}</p>")
            table_buf = []
            return
        # Drop the alignment row
        header = rows[0]
        alignment = rows[1] if "---" in rows[1] or ":-" in rows[1] else None
        body_rows = rows[2:] if alignment else rows[1:]

        def split(line: str) -> list[str]:
            line = line.strip()
            if line.startswith("|"):
                line = line[1:]
            if line.endswith("|"):
                line = line[:-1]
            return [c.strip() for c in line.split("|")]

        h_cells = split(header)
        out_lines.append("<div class=\"table-wrap\"><table>")
        out_lines.append("<thead><tr>" + "".join(f"<th>{c}</th>" for c in h_cells) + "</tr></thead>")
        out_lines.append("<tbody>")
        for r in body_rows:
            out_lines.append("<tr>" + "".join(f"<td>{c}</td>" for c in split(r)) + "</tr>")
        out_lines.append("</tbody></table></div>")
        table_buf = []

    while i < len(lines):
        line = lines[i]

        if line.strip().startswith("```"):
            if not in_code:
                in_code = True
                code_buf = []
            else:
                in_code = False
                out_lines.append("<pre><code>" + esc("\n".join(code_buf)) + "</code></pre>")
                code_buf = []
            i += 1
            continue
        if in_code:
            code_buf.append(line)
            i += 1
            continue

        # Tables
        if line.strip().startswith("|") and line.strip().endswith("|") and "|" in line.strip()[1:-1]:
            in_table = True
            table_buf.append(line)
            i += 1
            continue
        else:
            if in_table:
                flush_table()
                in_table = False

        # Headings
        m = re.match(r"^(#{1,4})\s+(.*)$", line)
        if m:
            level = len(m.group(1))
            txt = inline_md(m.group(2))
            out_lines.append(f"<h{level}>{txt}</h{level}>")
            i += 1
            continue

        # Lists
        if re.match(r"^\s*[-*]\s+", line):
            items: list[str] = []
            while i < len(lines) and re.match(r"^\s*[-*]\s+", lines[i]):
                items.append(re.sub(r"^\s*[-*]\s+", "", lines[i]))
                i += 1
            out_lines.append("<ul>" + "".join(f"<li>{inline_md(x)}</li>" for x in items) + "</ul>")
            continue
        if re.match(r"^\s*\d+\.\s+", line):
            items = []
            while i < len(lines) and re.match(r"^\s*\d+\.\s+", lines[i]):
                items.append(re.sub(r"^\s*\d+\.\s+", "", lines[i]))
                i += 1
            out_lines.append("<ol>" + "".join(f"<li>{inline_md(x)}</li>" for x in items) + "</ol>")
            continue

        if line.strip() == "":
            i += 1
            continue

        # Paragraph (collect consecutive non-blank, non-special lines)
        buf = [line]
        i += 1
        while i < len(lines) and lines[i].strip() != "" and not re.match(r"^(#{1,4}\s|\s*[-*]\s|\s*\d+\.\s|```|\|)", lines[i]):
            buf.append(lines[i])
            i += 1
        out_lines.append("<p>" + inline_md(" ".join(buf)) + "</p>")

    if in_table:
        flush_table()
    return "\n".join(out_lines)


def inline_md(text: str) -> str:
    # We escape full text first, then re-introduce links and emphasis with markers
    text = esc(text)
    # Links [label](url)
    text = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>',
        text,
    )
    # Bold **text**
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    # Italic *text* (single-asterisk runs)
    text = re.sub(r"(?<!\*)\*([^*\n]+)\*(?!\*)", r"<em>\1</em>", text)
    # Inline code `text`
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    return text


def blog_hub_page() -> str:
    cards = []
    for b in BLOG_POSTS:
        cats = " · ".join(CATEGORIES[c]["title"] for c in b.get("categories", []) if c in CATEGORIES)
        cards.append(f"""<a class="blog-card" href="/blog/{esc(b["slug"])}/">
        <div class="blog-card-body">
          <span class="blog-card-cat">{esc(cats)}</span>
          <h3>{esc(b["title"])}</h3>
          <p>{esc(b["excerpt"])}</p>
          <span class="link-arrow">Read article →</span>
        </div>
      </a>""")
    grid = "\n".join(cards)
    title = "Blog — MetalSingapore.sg"
    description = "Material selection, anchor sizing, code references and project notes from a Singapore metal works contractor."
    crumbs = [("Home", "/"), ("Blog", "/blog/")]
    jsonld = [breadcrumb_jsonld(crumbs)]
    body = head_block(title=title, description=description, canonical_path="/blog/", jsonld=jsonld)
    body += nav_block("blog")
    body += crumbs_block(crumbs)
    body += f"""<section class="section">
  <div class="container">
    <span class="eyebrow">Blog</span>
    <h1>Material, anchors, and code references for Singapore metal works.</h1>
    <p class="lead">Working notes from real fabrication and installation jobs — written for owners, architects, ID firms and main contractors.</p>
    <div class="blog-grid">{grid}</div>
  </div>
</section>
"""
    body += cta_block()
    body += footer_block()
    return body


def blog_detail_page(post: dict) -> str:
    slug = post["slug"]
    md_path = ROOT / "assets" / "data" / "blogs" / f"{post['baseFile']}.md"
    md = md_path.read_text(encoding="utf-8") if md_path.exists() else f"# {post['title']}\n\n{post['excerpt']}"
    # Strip front-matter heading if duplicate (md often starts with H1 = title)
    md_lines = md.split("\n", 1)
    if md_lines and md_lines[0].startswith("# "):
        md = md_lines[1] if len(md_lines) > 1 else ""
    rendered = render_md(md)

    cats = " · ".join(CATEGORIES[c]["title"] for c in post.get("categories", []) if c in CATEGORIES)
    pdf_link = ""
    pdf_path = ROOT / "assets" / "data" / "blogs" / f"{post['baseFile']}.pdf"
    downloads_html = ""
    if post.get("downloads"):
        items = "".join(
            f'<li><a href="{esc(d["href"])}" download>{esc(d["label"])}</a></li>'
            for d in post["downloads"]
        )
        downloads_html += f"<h3>Downloads</h3><ul class=\"downloads\">{items}</ul>"
    if pdf_path.exists():
        downloads_html += f'<p><a class="btn btn-ghost" href="/assets/data/blogs/{esc(post["baseFile"])}.pdf" download>Download article PDF</a></p>'

    image = post.get("image") or "/assets/images/og-metalsingapore.jpg"
    crumbs = [("Home", "/"), ("Blog", "/blog/"), (post["title"], f"/blog/{slug}/")]
    article_jsonld = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post["title"],
        "description": post["metaDescription"],
        "image": (origin() + image) if image.startswith("/") else image,
        "datePublished": post["publishedISO"],
        "dateModified": post["publishedISO"],
        "author": {"@type": "Organization", "name": SITE["legalName"]},
        "publisher": {
            "@type": "Organization",
            "name": SITE["legalName"],
            "logo": {"@type": "ImageObject", "url": origin() + "/assets/images/metalsg-logo.png"},
        },
        "mainEntityOfPage": canonical(f"/blog/{slug}/"),
    }
    jsonld = [breadcrumb_jsonld(crumbs), article_jsonld]
    body = head_block(
        title=post["metaTitle"],
        description=post["metaDescription"],
        canonical_path=f"/blog/{slug}/",
        og_image=image,
        jsonld=jsonld,
    )
    body += nav_block("blog")
    body += crumbs_block(crumbs)
    pub_date = post["publishedISO"]
    body += f"""<article class="section">
  <div class="container narrow">
    <span class="eyebrow">{esc(cats)}</span>
    <h1>{esc(post["title"])}</h1>
    <p class="article-meta"><time datetime="{esc(pub_date)}">{esc(pub_date)}</time> · {int(post.get("readingMinutes", 6))} min read</p>
    <div class="article-body">
      {rendered}
    </div>
    {downloads_html}
  </div>
</article>
"""
    body += cta_block()
    body += footer_block()
    return body


def faq_page() -> str:
    items_html = []
    for i, f in enumerate(FAQS):
        open_attr = " open" if i == 0 else ""
        items_html.append(
            f'<details class="faq-item"{open_attr}><summary>{esc(f["q"])}</summary><div>{esc(f["a"])}</div></details>'
        )
    title = "FAQ — MetalSingapore.sg"
    description = "Frequently asked questions about metal works in Singapore — materials, PE/QP sign-off, anchors, cat ladder height, warranties."
    crumbs = [("Home", "/"), ("FAQ", "/faq/")]
    jsonld = [
        breadcrumb_jsonld(crumbs),
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": f["q"],
                    "acceptedAnswer": {"@type": "Answer", "text": f["a"]},
                }
                for f in FAQS
            ],
        },
    ]
    body = head_block(title=title, description=description, canonical_path="/faq/", jsonld=jsonld)
    body += nav_block("faq")
    body += crumbs_block(crumbs)
    body += f"""<section class="section">
  <div class="container narrow">
    <span class="eyebrow">FAQ</span>
    <h1>Frequently asked questions about metal works in Singapore.</h1>
    <p class="lead">Materials, PE/QP sign-off, anchors, cat ladder height limits, MC and ID-firm coordination, and warranty.</p>
    <div class="faq-list">
      {"".join(items_html)}
    </div>
  </div>
</section>
"""
    body += cta_block()
    body += footer_block()
    return body


def contact_page() -> str:
    options = "\n".join(
        f'<option value="{esc(slug)}">{esc(CATEGORIES[slug]["title"])}</option>'
        for slug in CATEGORY_ORDER
    )
    title = "Contact — MetalSingapore.sg"
    description = "Send dimensions, photos and a brief — we will reply with material options, scope assumptions and an itemised quotation."
    crumbs = [("Home", "/"), ("Contact", "/contact-us/")]
    jsonld = [breadcrumb_jsonld(crumbs), organization_jsonld()]
    body = head_block(title=title, description=description, canonical_path="/contact-us/", jsonld=jsonld)
    body += nav_block("contact")
    body += crumbs_block(crumbs)
    body += f"""<section class="section">
  <div class="container">
    <div class="contact-grid">
      <div>
        <span class="eyebrow">Contact</span>
        <h1>Plan your metal works project.</h1>
        <p class="lead">Send dimensions, photos and a brief. We will reply with material options, scope assumptions and an itemised quotation.</p>

        <h3>Office &amp; workshop coordination</h3>
        <p>{esc(SITE['address1'])}<br />{esc(SITE['address2'])}<br />{esc(SITE['address3'])}</p>

        <h3>Direct contact</h3>
        <ul class="contact-list">
          <li>Email: <a href="mailto:{esc(SITE['email'])}">{esc(SITE['email'])}</a></li>
          <li>Phone: <a href="tel:{esc(SITE['phone_display_1'].replace(' ', ''))}">{esc(SITE['phone_display_1'])}</a></li>
          <li>WhatsApp: <a href="{esc(SITE['whatsapp'])}" rel="noopener">{esc(SITE['phone_display_2'])}</a></li>
        </ul>

        <h3>Hours</h3>
        <p>{esc(SITE['hoursWeekday'])}<br />{esc(SITE['hoursSaturday'])}<br />{esc(SITE['hoursSunday'])}</p>
      </div>

      <form class="contact-form" method="POST" action="/contact-submit.php">
        <label>Your name<input type="text" name="name" required maxlength="200" /></label>
        <label>Email<input type="email" name="email" required /></label>
        <label>Phone<input type="tel" name="phone" maxlength="64" /></label>
        <label>Service stream
          <select name="category">
            <option value="">Select a service</option>
            {options}
          </select>
        </label>
        <label>Project brief<textarea name="message" rows="6" required maxlength="6000"></textarea></label>
        <div class="hp" aria-hidden="true" style="position:absolute;left:-10000px;top:-10000px;">
          <label>Website<input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
        </div>
        <button class="btn btn-primary" type="submit">Send enquiry</button>
        <p class="muted small">By sending, you agree to be contacted at the email and phone above. We do not share enquiry details outside the project team.</p>
      </form>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <h2>Where to find us</h2>
    <div class="map-wrap">
      <iframe src="{esc(SITE['mapsEmbedUrl'])}" title="{esc(SITE['mapsAddressForTitle'])}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>
"""
    body += footer_block()
    return body


def not_found_page() -> str:
    title = "Page not found — MetalSingapore.sg"
    description = "Page not found."
    body = head_block(title=title, description=description, canonical_path="/404.html",
                      extra_meta='<meta name="robots" content="noindex,nofollow" />')
    body += nav_block("")
    body += """<section class="section">
  <div class="container narrow center">
    <span class="eyebrow">404</span>
    <h1>Page not found.</h1>
    <p class="lead">The page you were looking for has moved or no longer exists.</p>
    <p><a class="btn btn-primary" href="/">Back to home</a> <a class="btn btn-ghost" href="/services/">Browse services</a></p>
  </div>
</section>
"""
    body += footer_block()
    return body


# --- Sitemap & robots -------------------------------------------------------

def build_sitemap() -> str:
    urls: list[tuple[str, str]] = [
        ("/", BLOG_POSTS[0]["publishedISO"] if BLOG_POSTS else "2026-05-10"),
        ("/about-us/", "2026-05-10"),
        ("/services/", "2026-05-10"),
        ("/projects/", "2026-05-10"),
        ("/blog/", BLOG_POSTS[0]["publishedISO"] if BLOG_POSTS else "2026-05-10"),
        ("/faq/", "2026-05-10"),
        ("/contact-us/", "2026-05-10"),
    ]
    for slug in CATEGORY_ORDER:
        urls.append((f"/services/{slug}/", "2026-05-10"))
    for b in BLOG_POSTS:
        urls.append((f"/blog/{b['slug']}/", b["publishedISO"]))

    items = "\n".join(
        f"  <url><loc>{origin()}{path}</loc><lastmod>{lastmod}</lastmod></url>"
        for path, lastmod in urls
    )
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{items}
</urlset>
"""


def build_robots() -> str:
    return f"""User-agent: *
Allow: /
Disallow: /portfolio-admin/
Disallow: /server/
Disallow: /assets/data/blogs/*.md$

Sitemap: {origin()}/sitemap.xml
"""


# --- Main -------------------------------------------------------------------

def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def write_page(out_subpath: str, content: str) -> None:
    if out_subpath.endswith("/"):
        target = OUT / out_subpath.strip("/") / "index.html"
    else:
        target = OUT / out_subpath.lstrip("/")
    write(target, content)


def copy_tree(src: Path, dst: Path, exclude: set[str] | None = None) -> None:
    exclude = exclude or set()
    if not src.exists():
        return
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst, ignore=lambda d, names: [n for n in names if n in exclude])


def main() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True, exist_ok=True)

    # Pages
    write_page("/", home_page())
    write_page("/about-us/", about_page())
    write_page("/services/", services_hub_page())
    for svc in SERVICES:
        write_page(f"/services/{svc['slug']}/", service_detail_page(svc))
    write_page("/projects/", projects_page())
    write_page("/blog/", blog_hub_page())
    for post in BLOG_POSTS:
        write_page(f"/blog/{post['slug']}/", blog_detail_page(post))
    write_page("/faq/", faq_page())
    write_page("/contact-us/", contact_page())
    write_page("/404.html", not_found_page())

    # Sitemap + robots
    write(OUT / "sitemap.xml", build_sitemap())
    write(OUT / "robots.txt", build_robots())

    # Static assets
    copy_tree(ROOT / "assets", OUT / "assets")
    # Portfolio admin (PHP) — copy intact
    copy_tree(ROOT / "portfolio-admin", OUT / "portfolio-admin")
    # Contact handler (PHP) — copy to root
    contact_php = ROOT / "server" / "contact-submit.php"
    if contact_php.exists():
        shutil.copy2(contact_php, OUT / "contact-submit.php")

    # .htaccess at root — block direct .md access in /assets/data/blogs/ and force HTTPS
    htaccess = """RewriteEngine On
# HTTPS canonical
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Add trailing slash to clean URLs (skip files)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !\\.[a-zA-Z0-9]+$
RewriteRule ^(.*)$ /$1/ [L,R=301]

# Block raw markdown source files
<FilesMatch "\\.md$">
  Require all denied
</FilesMatch>

# Standard cache + security headers
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
  Header set X-Frame-Options "SAMEORIGIN"
</IfModule>

ErrorDocument 404 /404.html
"""
    write(OUT / ".htaccess", htaccess)

    # Summary
    pages = sum(1 for _ in OUT.rglob("*.html"))
    print(f"[build] Wrote {pages} HTML pages to {OUT}")
    print(f"[build] Sitemap entries: {build_sitemap().count('<url>')}")
    print(f"[build] Done.")


if __name__ == "__main__":
    main()
