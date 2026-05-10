#!/usr/bin/env python3
"""Process Metal Gate at Strides Premier project photos.

Source: /home/user/workspace/IMG_1143..1148 .jpg (5 photos).
- IMG_1146 and IMG_1148 are visually similar (similar wide front view of the
  installed gate). Use IMG_1148 as the primary cover (cleaner, end-of-install
  framing) and include IMG_1146 in the gallery for context (people on site).
- IMG_1145 is the strongest landscape view of the full sliding mesh gate panel
  and works well as a wide hero, but IMG_1148 is the cleanest finished shot.
"""
from PIL import Image, ImageOps
from pathlib import Path

SRC = Path('/home/user/workspace')
DST_BASE = Path(__file__).resolve().parent.parent / 'assets' / 'images' / 'projects'
GALLERY_DIR = DST_BASE / 'gallery' / 'strides-premier-metal-gate'
GALLERY_DIR.mkdir(parents=True, exist_ok=True)

PRIMARY = (1600, 1200)
MAX_LONG = 1600

# Story order:
# 1. IMG_1148 — cleanest finished installation, wide front view (also primary cover)
# 2. IMG_1145 — wide landscape view of full sliding mesh gate panel
# 3. IMG_1146 — site context with team during installation
# 4. IMG_1143 — open gate, mesh panel and steel frame detail
# 5. IMG_1144 — mid-installation view of mesh panel against opening
ORDER = ['1148', '1145', '1146', '1143', '1144']


def load(name: str) -> Image.Image:
    p = SRC / f'IMG_{name}.jpg'
    im = ImageOps.exif_transpose(Image.open(p)).convert('RGB')
    return im


def fit_max(im, m):
    w, h = im.size
    L = max(w, h)
    if L <= m:
        return im
    s = m / L
    return im.resize((int(w * s), int(h * s)), Image.LANCZOS)


def cover_crop(im, tw, th):
    w, h = im.size
    ta, sa = tw / th, w / h
    if sa > ta:
        nw = int(h * ta)
        x0 = (w - nw) // 2
        im = im.crop((x0, 0, x0 + nw, h))
    else:
        nh = int(w / ta)
        y0 = max(0, (h - nh) // 3)
        im = im.crop((0, y0, w, y0 + nh))
    return im.resize((tw, th), Image.LANCZOS)


# Primary: IMG_1148 cropped to 4:3 landscape card
primary_src = load('1148')
primary = cover_crop(primary_src, *PRIMARY)
primary_path = DST_BASE / 'proj-strides-premier-metal-gate-2024.jpg'
primary.save(primary_path, 'JPEG', quality=82, progressive=True, optimize=True)
print(f'primary: {primary_path}  {primary.size}  {primary_path.stat().st_size//1024} KB')

# Gallery: copy the five selected, EXIF-stripped, ≤1600 px long edge
for idx, name in enumerate(ORDER, start=1):
    im = load(name)
    im = fit_max(im, MAX_LONG)
    out = GALLERY_DIR / f'{idx:02d}.jpg'
    im.save(out, 'JPEG', quality=82, progressive=True, optimize=True)
    print(f'  {out.name}  {im.size}  {out.stat().st_size//1024} KB')

print('Done.')
