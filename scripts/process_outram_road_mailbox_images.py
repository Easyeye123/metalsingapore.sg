#!/usr/bin/env python3
"""Process Outram Road SS304 mailbox + entrance door painting photos.

Source: /home/user/workspace/IMG_1937..1941.jpg (5 distinct photos, no
exact or near-duplicates per parent).

Order: completed mailbox detail first, then in-context views, then
painting/site preparation, then completed entrance door view.
"""
from PIL import Image, ImageOps
from pathlib import Path

SRC = Path('/home/user/workspace')
DST_BASE = Path(__file__).resolve().parent.parent / 'assets' / 'images' / 'projects'
GALLERY_DIR = DST_BASE / 'gallery' / 'outram-road-ss304-mailbox-door'
GALLERY_DIR.mkdir(parents=True, exist_ok=True)

PRIMARY = (1600, 1200)
MAX_LONG = 1600

# Hero: SS304 mailbox installed on the wall against the entrance — picks
# up both stainless mailbox and the door area in a single in-context
# composition (IMG_1939).
HERO = '1939'
ORDER = [
    '1939',  # 01 — in-context view, SS304 mailbox installed beside corridor
    '1938',  # 02 — wider front view of mailbox in entrance area
    '1937',  # 03 — completed SS304 mailbox unit wrapped before delivery
    '1940',  # 04 — painter applying paint to the entrance door surround
    '1941',  # 05 — completed/repainted entrance door with mailbox at side
]


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


primary_src = load(HERO)
primary = cover_crop(primary_src, *PRIMARY)
primary_path = DST_BASE / 'proj-outram-road-ss304-mailbox-door-2024.jpg'
primary.save(primary_path, 'JPEG', quality=82, progressive=True, optimize=True)
print(f'primary: {primary_path}  {primary.size}  {primary_path.stat().st_size//1024} KB')

for idx, name in enumerate(ORDER, start=1):
    im = load(name)
    im = fit_max(im, MAX_LONG)
    out = GALLERY_DIR / f'{idx:02d}.jpg'
    im.save(out, 'JPEG', quality=82, progressive=True, optimize=True)
    print(f'  {out.name}  {im.size}  {out.stat().st_size//1024} KB')

print('Done.')
