#!/usr/bin/env python3
"""Process Jalan Penhas SS304 mailbox installation photos.

Source: /home/user/workspace/IMG_1927..1936.jpg.

Duplicate handling (per parent):
  - IMG_1929-1.jpg is a visual duplicate of IMG_1929.jpg → drop 1929-1.
  - IMG_1932.jpg is similar to IMG_1928.jpg (both wide overviews, 1932 has
    a vivo camera watermark) → keep 1928, drop 1932.
  - IMG_1933.jpg is a different action shot (person operating the mailbox)
    so it is kept.

Final order — narrative: clean front cover, fabrication/measure, install
overview, detail close-ups, in-use action, side context.
"""
from PIL import Image, ImageOps
from pathlib import Path

SRC = Path('/home/user/workspace')
DST_BASE = Path(__file__).resolve().parent.parent / 'assets' / 'images' / 'projects'
GALLERY_DIR = DST_BASE / 'gallery' / 'jalan-penhas-ss304-mailbox'
GALLERY_DIR.mkdir(parents=True, exist_ok=True)

PRIMARY = (1600, 1200)
MAX_LONG = 1600

# Tuples: (source filename stem, gallery index in narrative order).
# Hero is the front view of the completed mailbox bank (1929).
HERO = '1929'
ORDER = [
    '1929',  # 01 — clean completed front view (also hero)
    '1928',  # 02 — wide install overview with worker fitting slot trim
    '1927',  # 03 — single mailbox unit being measured during fabrication
    '1930',  # 04 — angled side view showing slot row and framing
    '1931',  # 05 — low-angle detail of mid-section slots
    '1934',  # 06 — close-up of slot opening with hand for scale
    '1933',  # 07 — resident/worker operating an opened mailbox
    '1936',  # 08 — side context view during install
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
primary_path = DST_BASE / 'proj-jalan-penhas-ss304-mailbox-2024.jpg'
primary.save(primary_path, 'JPEG', quality=82, progressive=True, optimize=True)
print(f'primary: {primary_path}  {primary.size}  {primary_path.stat().st_size//1024} KB')

for idx, name in enumerate(ORDER, start=1):
    im = load(name)
    im = fit_max(im, MAX_LONG)
    out = GALLERY_DIR / f'{idx:02d}.jpg'
    im.save(out, 'JPEG', quality=82, progressive=True, optimize=True)
    print(f'  {out.name}  {im.size}  {out.stat().st_size//1024} KB')

print('Done.')
