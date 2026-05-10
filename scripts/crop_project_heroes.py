"""
Crop project hero images to remove baked-in PDF caption text and page borders.

Strategy: Each project image started life as a PDF page screenshot containing
caption text on the left and one or more photos on the right. We extract a
single clean photo region per project, with per-image bounding boxes.

Coords are (left, top, right, bottom) as fractions of the original image
(values in [0, 1]).

Output: 1200x900 (4:3), high quality JPEG. Cards display ~560x220px so this is
already 2x — no aggressive upscaling required.
"""
from PIL import Image
from pathlib import Path
import sys

PROJECTS_DIR = Path("/home/user/workspace/metalsingapore-sg/assets/images/projects")
BACKUP_DIR = PROJECTS_DIR / "originals_backup"
TARGET_W, TARGET_H = 1200, 900

# (left_frac, top_frac, right_frac, bottom_frac) of the *original* image.
# Tuned by visual inspection.
CROP_BOXES = {
    # Group A: text-heavy left, photos on right — pick widest single photo
    # macpherson-road railing: full right photo
    "proj-macpherson-road-railing-2022.jpg":      (0.42, 0.03, 0.99, 0.92),
    # pasir panjang: balcony barrier full right
    "proj-pasir-panjang-balcony-barrier-2025.jpg":(0.42, 0.03, 0.99, 0.82),
    # buroh lane: 2 photos side-by-side; take both right photos with their gutter, but exclude text
    "proj-buroh-lane-ramp-repair-2023.jpg":       (0.42, 0.03, 0.99, 0.92),
    # aluminium glass door: 2 doors side by side
    "proj-aluminium-glass-door-2019.jpg":         (0.42, 0.03, 0.99, 0.91),
    # collapsible gate: single photo; trim white bottom
    "proj-collapsible-gate-2021.jpg":             (0.42, 0.03, 0.99, 0.74),
    # spire: single photo
    "proj-spire-metal-glass-2024.jpg":            (0.42, 0.03, 0.99, 0.83),
    # park east: 2 photos stacked vertically; pick BOTTOM (After) to avoid Before badge
    "proj-park-east-condo-frame-2019.jpg":        (0.42, 0.55, 0.78, 0.94),
    # 434 macpherson: middle horizontal strip is the only photo
    "proj-434-macpherson-railing-ramp-2021.jpg":  (0.42, 0.20, 0.99, 0.66),

    # Group B: clean photo grids — pick a generous single-photo region
    # arthur-118: 4-photo 2x2 grid; take the bottom row (railings) for variety
    "proj-arthur-118-metal-bed-2021.jpg":         (0.05, 0.50, 0.99, 0.97),
    # grey-lane: After photo top half
    "proj-grey-lane-metal-works-2022.jpg":        (0.05, 0.02, 0.59, 0.50),
    # lorong-23: top photo of locker bank
    "proj-lorong-23-geylang-locker-2024.jpg":     (0.05, 0.02, 0.99, 0.55),
    # outdoor-trellis: bottom row (better view)
    "proj-outdoor-trellis-2024.jpg":              (0.05, 0.43, 0.99, 0.97),
    # parkway-parade: top row (full buildings)
    "proj-parkway-parade-metal-2023.jpg":         (0.05, 0.02, 0.99, 0.36),
    # st-mary: 3 vertical photos; take left+middle for breadth
    "proj-st-mary-church-railing-2023.jpg":       (0.05, 0.02, 0.66, 0.96),
    # supply-fabricate: large left photo
    "proj-supply-fabricate-ramp-2022.jpg":        (0.05, 0.02, 0.55, 0.92),
    # wis-changi: 2 photos side by side; both
    "proj-wis-changi-railing-2022.jpg":           (0.05, 0.02, 0.99, 0.85),
}

SKIP = {
    "proj-tuas-view-cat-ladder-2024.jpg",
    "proj-buroh-street-cat-ladder-2024.jpg",
}


def cover_fit(im: Image.Image, target_w: int, target_h: int) -> Image.Image:
    w, h = im.size
    src_ratio = w / h
    target_ratio = target_w / target_h
    if src_ratio > target_ratio:
        new_w = int(round(h * target_ratio))
        offset = (w - new_w) // 2
        im = im.crop((offset, 0, offset + new_w, h))
    elif src_ratio < target_ratio:
        new_h = int(round(w / target_ratio))
        offset = (h - new_h) // 2
        im = im.crop((0, offset, w, offset + new_h))
    return im.resize((target_w, target_h), Image.LANCZOS)


def process(filename: str, box: tuple) -> None:
    src_path = BACKUP_DIR / filename
    dst_path = PROJECTS_DIR / filename
    if not src_path.exists():
        src_path = dst_path
    im = Image.open(src_path).convert("RGB")
    w, h = im.size

    l, t, r, b = box
    crop_box = (
        int(round(w * l)),
        int(round(h * t)),
        int(round(w * r)),
        int(round(h * b)),
    )
    cropped = im.crop(crop_box)
    cw, ch = cropped.size
    final = cover_fit(cropped, TARGET_W, TARGET_H)
    final.save(dst_path, "JPEG", quality=88, optimize=True)
    print(f"  {filename}: {w}x{h} -> crop {cw}x{ch} -> {TARGET_W}x{TARGET_H}")


def main() -> int:
    print("Cropping project hero images to single photo regions...")
    for filename, box in CROP_BOXES.items():
        if filename in SKIP:
            print(f"  {filename}: SKIP")
            continue
        process(filename, box)
    print("Done.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
