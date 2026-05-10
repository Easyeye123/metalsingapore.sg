#!/usr/bin/env python3
"""Process Tuas View cat ladder photos for the project page.

Source: /home/user/workspace/IMG_1857.jpg .. IMG_1862.jpg (1080x1440 portrait JPEGs).
Outputs:
- /assets/images/projects/proj-tuas-view-cat-ladder-2024.jpg  (primary 1200x900 landscape crop, hero card)
- /assets/images/projects/gallery/tuas-view-cat-ladder/01..06.jpg  (max 1600px long edge, EXIF stripped)

Each output is auto-rotated using EXIF orientation, then re-encoded JPEG q=82 progressive.
The primary card uses photo 1858 (showing the ladder going up through the access panel from below) as
that frame best communicates the 'cat ladder + roof access panel' scope at a glance.
"""
from PIL import Image, ImageOps
from pathlib import Path

SRC = Path('/home/user/workspace')
DST_BASE = Path('/home/user/workspace/metalsingapore-sg/assets/images/projects')
GALLERY_DIR = DST_BASE / 'gallery' / 'tuas-view-cat-ladder'
GALLERY_DIR.mkdir(parents=True, exist_ok=True)

MAX_LONG = 1600
PRIMARY = (1600, 1200)  # 4:3 landscape card

ORDER = ['1858', '1857', '1859', '1861', '1860', '1862']

def load(name: str) -> Image.Image:
    im = Image.open(SRC / f'IMG_{name}.jpg')
    im = ImageOps.exif_transpose(im).convert('RGB')
    return im

def fit_max(im: Image.Image, max_edge: int) -> Image.Image:
    w, h = im.size
    long_edge = max(w, h)
    if long_edge <= max_edge:
        return im
    scale = max_edge / long_edge
    return im.resize((int(w * scale), int(h * scale)), Image.LANCZOS)

def cover_crop(im: Image.Image, target_w: int, target_h: int) -> Image.Image:
    """Center-crop to target aspect, then resize."""
    w, h = im.size
    target_aspect = target_w / target_h
    src_aspect = w / h
    if src_aspect > target_aspect:
        # too wide -> crop sides
        new_w = int(h * target_aspect)
        x0 = (w - new_w) // 2
        im = im.crop((x0, 0, x0 + new_w, h))
    else:
        # too tall -> crop top/bottom; keep upper-middle (subject usually upper)
        new_h = int(w / target_aspect)
        y0 = max(0, (h - new_h) // 3)  # bias toward top third
        im = im.crop((0, y0, w, y0 + new_h))
    return im.resize((target_w, target_h), Image.LANCZOS)

# Primary card: photo 1858 (looking up through the roof access panel, ladder visible).
primary_src = load('1858')
primary = cover_crop(primary_src, *PRIMARY)
primary_path = DST_BASE / 'proj-tuas-view-cat-ladder-2024.jpg'
primary.save(primary_path, 'JPEG', quality=82, progressive=True, optimize=True)
print(f'wrote {primary_path}  {primary.size}  {primary_path.stat().st_size//1024} KB')

# Gallery: all six in chosen order, EXIF-stripped, long edge 1600.
for idx, name in enumerate(ORDER, start=1):
    im = load(name)
    im = fit_max(im, MAX_LONG)
    out = GALLERY_DIR / f'{idx:02d}.jpg'
    im.save(out, 'JPEG', quality=82, progressive=True, optimize=True)
    print(f'wrote {out}  {im.size}  {out.stat().st_size//1024} KB')

print('Done.')
