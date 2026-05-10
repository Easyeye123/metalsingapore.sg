"""
Generates neutral, technical category and hero placeholder images for
metalsingapore.sg as no live project photos are available from the WordPress
SQL dump (all referenced URLs point to the demo theme bracketweb/voldor-demo).

Output: high-quality JPEG placeholders with gradient + grid overlay + label.
Replace each file with a real project photo when available — see
MEDIA_REPLACEMENT_LIST.md.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "images"
OUT.mkdir(parents=True, exist_ok=True)


def _font(size: int) -> ImageFont.ImageFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for c in candidates:
        if Path(c).exists():
            try:
                return ImageFont.truetype(c, size=size)
            except Exception:
                continue
    return ImageFont.load_default()


# Brand palette — industrial steel/charcoal/zinc with a copper accent.
PALETTE = {
    "ink": (16, 20, 26),         # Charcoal
    "ink2": (32, 38, 48),        # Steel-charcoal
    "graphite": (52, 60, 72),
    "zinc": (158, 165, 174),
    "zinc2": (190, 196, 204),
    "snow": (245, 246, 248),
    "accent": (188, 109, 60),    # Restrained copper / oxide accent
    "accent2": (135, 78, 42),
}


def gradient_image(size: tuple[int, int], top: tuple[int, int, int],
                   bottom: tuple[int, int, int]) -> Image.Image:
    img = Image.new("RGB", size, top)
    pixels = img.load()
    w, h = size
    for y in range(h):
        t = y / max(1, h - 1)
        r = int(top[0] * (1 - t) + bottom[0] * t)
        g = int(top[1] * (1 - t) + bottom[1] * t)
        b = int(top[2] * (1 - t) + bottom[2] * t)
        for x in range(w):
            pixels[x, y] = (r, g, b)
    return img


def add_grid(img: Image.Image, color=(255, 255, 255, 18), step: int = 32) -> None:
    w, h = img.size
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for x in range(0, w, step):
        d.line([(x, 0), (x, h)], fill=color, width=1)
    for y in range(0, h, step):
        d.line([(0, y), (w, y)], fill=color, width=1)
    img.alpha_composite(overlay) if img.mode == "RGBA" else img.paste(
        Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    )


def build_card(
    out_path: Path,
    label: str,
    eyebrow: str = "MetalSingapore.sg",
    size: tuple[int, int] = (1200, 800),
    top=PALETTE["ink2"],
    bottom=PALETTE["graphite"],
    accent_strip: bool = True,
) -> None:
    base = gradient_image(size, top, bottom).convert("RGBA")
    add_grid(base, color=(255, 255, 255, 14), step=40)

    # Diagonal hatch overlay for industrial feel
    hatch = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(hatch)
    for i in range(-size[1], size[0], 18):
        d.line([(i, 0), (i + size[1], size[1])], fill=(255, 255, 255, 8), width=1)
    base.alpha_composite(hatch)

    # Soft shape — implied panel
    shape = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(shape)
    pad = int(size[0] * 0.04)
    d.rounded_rectangle(
        (pad, pad, size[0] - pad, size[1] - pad),
        radius=int(size[0] * 0.012),
        outline=(255, 255, 255, 36),
        width=2,
    )
    base.alpha_composite(shape)

    # Accent bar on the left
    if accent_strip:
        bar = Image.new("RGBA", size, (0, 0, 0, 0))
        d = ImageDraw.Draw(bar)
        d.rectangle((pad + 8, pad + 24, pad + 14, size[1] - pad - 24),
                    fill=(*PALETTE["accent"], 220))
        base.alpha_composite(bar)

    # Text labels
    d = ImageDraw.Draw(base)
    eb_font = _font(int(size[1] * 0.034))
    title_font = _font(int(size[1] * 0.085))
    lbl_color = (235, 238, 242, 255)
    eb_color = (PALETTE["zinc"][0], PALETTE["zinc"][1], PALETTE["zinc"][2], 235)

    text_x = pad + 36
    eb_y = int(size[1] * 0.36)
    d.text((text_x, eb_y), eyebrow.upper(), font=eb_font, fill=eb_color)

    # Multi-line label wrap (max ~22 chars)
    words = label.split()
    lines, current = [], ""
    for w in words:
        candidate = (current + " " + w).strip()
        if len(candidate) > 24:
            lines.append(current)
            current = w
        else:
            current = candidate
    if current:
        lines.append(current)
    line_h = int(size[1] * 0.10)
    for i, line in enumerate(lines):
        d.text((text_x, eb_y + 56 + i * line_h), line, font=title_font, fill=lbl_color)

    base.convert("RGB").save(out_path, quality=86, optimize=True)


def build_logo() -> None:
    # Square favicon (32x32) — recognizable steel "MS" mark
    icon = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
    d = ImageDraw.Draw(icon)
    d.rounded_rectangle((8, 8, 248, 248), radius=28, fill=PALETTE["ink"])
    # Diagonal accent
    d.polygon([(8, 220), (60, 220), (110, 130), (60, 130)], fill=PALETTE["accent"])
    f = _font(140)
    # Centre 'M'
    d.text((52, 50), "M", font=f, fill=(245, 246, 248))
    f2 = _font(80)
    d.text((150, 90), "S", font=f2, fill=PALETTE["zinc"])
    icon.save(OUT / "metalsg-icon.png")
    icon.resize((128, 128)).save(OUT / "metalsg-icon-128.png")
    # Favicon 32x32
    icon.resize((48, 48)).save(OUT / "metalsg-favicon.png")

    # Wordmark for header (transparent)
    wm = Image.new("RGBA", (640, 192), (0, 0, 0, 0))
    d = ImageDraw.Draw(wm)
    d.rounded_rectangle((8, 28, 152, 164), radius=18, fill=PALETTE["ink"])
    d.polygon([(8, 144), (38, 144), (66, 86), (38, 86)], fill=PALETTE["accent"])
    f = _font(96)
    d.text((36, 36), "M", font=f, fill=(245, 246, 248))
    f2 = _font(60)
    d.text((100, 70), "S", font=f2, fill=PALETTE["zinc"])
    f3 = _font(44)
    d.text((176, 50), "MetalSingapore", font=f3, fill=PALETTE["ink"])
    f4 = _font(22)
    d.text((178, 110), "Custom metal works · SG", font=f4, fill=PALETTE["graphite"])
    wm.save(OUT / "metalsg-logo.png")


def build_all() -> None:
    build_logo()

    services = [
        ("cat-custom-metal-works", "Custom Metal Works", PALETTE["ink2"], PALETTE["graphite"]),
        ("cat-stainless-steel-fabrication", "Stainless Steel Fabrication", (40, 50, 64), (75, 88, 102)),
        ("cat-metal-gates", "Metal Gates", (24, 28, 36), (52, 60, 72)),
        ("cat-metal-railings", "Metal Railings", (32, 40, 56), (62, 74, 92)),
        ("cat-fencing-and-grilles", "Fencing & Grilles", (28, 36, 50), (60, 70, 86)),
        ("cat-cat-ladders-and-access-metalwork", "Cat Ladders & Access", (20, 26, 36), (54, 62, 78)),
        ("cat-outdoor-trellis-and-structural-metalwork", "Outdoor Trellis & Structural", (28, 34, 46), (58, 68, 82)),
    ]
    for slug, label, top, bottom in services:
        build_card(OUT / f"{slug}.jpg", label, eyebrow="Service", top=top, bottom=bottom)

    projects = [
        ("proj-jalan-binchang-gate", "Metal Gate · Jalan Binchang"),
        ("proj-stratton-cat-ladder", "Aluminium Cat Ladder · Stratton"),
        ("proj-outdoor-trellis", "Outdoor Trellis Fabrication"),
        ("proj-wis-changi-railing", "Exterior Railing · WIS@Changi"),
        ("proj-jalan-membina-catwalk", "Catwalk · Jalan Membina"),
        ("proj-st-mary-railing", "Railing · St. Mary Church"),
        ("proj-macpherson-railing", "Railing · MacPherson Road"),
        ("proj-lorong-23-locker", "Custom Locker · Geylang Lor 23"),
        ("proj-grey-lane-metalworks", "Metal Works · Grey Lane"),
    ]
    for slug, label in projects:
        build_card(OUT / f"{slug}.jpg", label, eyebrow="Project")

    # Hero
    build_card(OUT / "hero-metalsingapore.jpg",
               "Custom metal works in Singapore",
               eyebrow="MetalSingapore.sg",
               size=(1600, 1000),
               top=(18, 22, 30), bottom=(70, 80, 96))

    # Open Graph (1200x630)
    build_card(OUT / "og-metalsingapore.jpg",
               "Metal works contractor — Singapore",
               eyebrow="MetalSingapore.sg",
               size=(1200, 630),
               top=(20, 26, 36), bottom=(80, 92, 110))


if __name__ == "__main__":
    build_all()
    print("OK")
