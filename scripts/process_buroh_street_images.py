#!/usr/bin/env python3
"""Process Buroh Street cat ladder photos.

Source: /home/user/workspace/IMG_1708..1713 + 1863, 1864, 1868 .jpeg.
- IMG_1712 and IMG_1712-1 are byte-identical duplicates; only one is used.
- Output primary card: IMG_1710 (full-height landscape view of two cat ladder
  sets with mid-platform; clearest 'two sets' shot).
"""
from PIL import Image, ImageOps
from pathlib import Path

SRC = Path('/home/user/workspace')
DST_BASE = Path('/home/user/workspace/metalsingapore-sg/assets/images/projects')
GALLERY_DIR = DST_BASE / 'gallery' / 'buroh-street-cat-ladder'
GALLERY_DIR.mkdir(parents=True, exist_ok=True)

PRIMARY = (1600, 1200)
MAX_LONG = 1600

# Order chosen to tell the project story:
# 1. wide context (1709), 2. two-set view (1710), 3. detail (1713), 4. context (1708),
# 5. context (1711), 6. anchor pull-out test (1863), 7. welder on harness (1864),
# 8. cage detail at top (1868).
ORDER = ['1709', '1710', '1713', '1708', '1711', '1863', '1864', '1868']

def load(name: str) -> Image.Image:
    p = SRC / f'IMG_{name}.jpeg'
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

# Primary: 1710 (two cat ladder sets visible end-to-end)
primary_src = load('1710')
primary = cover_crop(primary_src, *PRIMARY)
primary_path = DST_BASE / 'proj-buroh-street-cat-ladder-2024.jpg'
primary.save(primary_path, 'JPEG', quality=82, progressive=True, optimize=True)
print(f'primary: {primary_path}  {primary.size}  {primary_path.stat().st_size//1024} KB')

# Gallery: copy the eight selected, EXIF-stripped, ≤1600 px long edge
for idx, name in enumerate(ORDER, start=1):
    im = load(name)
    im = fit_max(im, MAX_LONG)
    out = GALLERY_DIR / f'{idx:02d}.jpg'
    im.save(out, 'JPEG', quality=82, progressive=True, optimize=True)
    print(f'  {out.name}  {im.size}  {out.stat().st_size//1024} KB')

print('Done.')
