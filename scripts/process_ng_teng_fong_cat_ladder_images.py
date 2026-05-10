#!/usr/bin/env python3
"""Process Ng Teng Fong Hospital M&E ancillary building cat ladder photos.

Source: /home/user/workspace/IMG_1909..1917 (9 unique images; the *-1.jpg
duplicates were excluded by the parent agent after exact-duplicate checks).
"""
from PIL import Image, ImageOps
from pathlib import Path

SRC = Path('/home/user/workspace')
DST_BASE = Path(__file__).resolve().parent.parent / 'assets' / 'images' / 'projects'
GALLERY_DIR = DST_BASE / 'gallery' / 'ng-teng-fong-hospital-cat-ladder'
GALLERY_DIR.mkdir(parents=True, exist_ok=True)

PRIMARY = (1600, 1200)
MAX_LONG = 1600

ORDER = ['1909', '1910', '1911', '1912', '1913', '1914', '1915', '1916', '1917']


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


# Primary cover: first photo (completed/finished installation)
primary_src = load(ORDER[0])
primary = cover_crop(primary_src, *PRIMARY)
primary_path = DST_BASE / 'proj-ng-teng-fong-hospital-cat-ladder-2024.jpg'
primary.save(primary_path, 'JPEG', quality=82, progressive=True, optimize=True)
print(f'primary: {primary_path}  {primary.size}  {primary_path.stat().st_size//1024} KB')

for idx, name in enumerate(ORDER, start=1):
    im = load(name)
    im = fit_max(im, MAX_LONG)
    out = GALLERY_DIR / f'{idx:02d}.jpg'
    im.save(out, 'JPEG', quality=82, progressive=True, optimize=True)
    print(f'  {out.name}  {im.size}  {out.stat().st_size//1024} KB')

print('Done.')
