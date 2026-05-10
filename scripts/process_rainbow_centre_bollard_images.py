#!/usr/bin/env python3
"""Process Stainless Steel Bollard Installation at Rainbow Centre project photos.

Source: /home/user/workspace/IMG_1899..1903 .jpg (5 photos, all distinct).
Order chosen for narrative: completed bollard line first, then close-ups, then
context views.
"""
from PIL import Image, ImageOps
from pathlib import Path

SRC = Path('/home/user/workspace')
DST_BASE = Path(__file__).resolve().parent.parent / 'assets' / 'images' / 'projects'
GALLERY_DIR = DST_BASE / 'gallery' / 'rainbow-centre-stainless-bollards'
GALLERY_DIR.mkdir(parents=True, exist_ok=True)

PRIMARY = (1600, 1200)
MAX_LONG = 1600

ORDER = ['1899', '1900', '1901', '1902', '1903']


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


# Primary cover: first image in order
primary_src = load(ORDER[0])
primary = cover_crop(primary_src, *PRIMARY)
primary_path = DST_BASE / 'proj-rainbow-centre-stainless-bollards-2024.jpg'
primary.save(primary_path, 'JPEG', quality=82, progressive=True, optimize=True)
print(f'primary: {primary_path}  {primary.size}  {primary_path.stat().st_size//1024} KB')

for idx, name in enumerate(ORDER, start=1):
    im = load(name)
    im = fit_max(im, MAX_LONG)
    out = GALLERY_DIR / f'{idx:02d}.jpg'
    im.save(out, 'JPEG', quality=82, progressive=True, optimize=True)
    print(f'  {out.name}  {im.size}  {out.stat().st_size//1024} KB')

print('Done.')
