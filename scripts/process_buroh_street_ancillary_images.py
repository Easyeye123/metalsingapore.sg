#!/usr/bin/env python3
"""Process Buroh Street ancillary building cat ladder add-on photos.

Source: /home/user/workspace/IMG_1873..1879 (selected: 1873,1874,1875,1878,1879).
These are appended to the existing buroh-street-cat-ladder gallery as add-on
images numbered 09-13 to preserve the existing 01-08 gallery.
"""
from PIL import Image, ImageOps
from pathlib import Path

SRC = Path('/home/user/workspace')
DST_BASE = Path(__file__).resolve().parent.parent / 'assets' / 'images' / 'projects'
GALLERY_DIR = DST_BASE / 'gallery' / 'buroh-street-cat-ladder-ancillary'
GALLERY_DIR.mkdir(parents=True, exist_ok=True)

MAX_LONG = 1600

ORDER = ['1873', '1874', '1875', '1878', '1879']


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


for idx, name in enumerate(ORDER, start=1):
    im = load(name)
    im = fit_max(im, MAX_LONG)
    out = GALLERY_DIR / f'{idx:02d}.jpg'
    im.save(out, 'JPEG', quality=82, progressive=True, optimize=True)
    print(f'  {out.name}  {im.size}  {out.stat().st_size//1024} KB')

print('Done.')
