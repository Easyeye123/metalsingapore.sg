# Sunview Drive — Handrail & Fall-Arrestor promo video

A ~30s 1920×1080 promo video for Ezzogenics Pte Ltd (promoting **metalsingapore.sg**
and **metalglassworksingapore.com**), built from on-site photos and the project's
engineering drawings.

Output: [`assets/videos/Ezzogenics_Sunview_Handrail_FallArrestor_30s.mp4`](../../assets/videos/Ezzogenics_Sunview_Handrail_FallArrestor_30s.mp4)

## Story
8-storey data centre at 6 Sunview Drive. Stainless-steel maintenance handrails and a
cat-ladder mounted on PTU/STS containers where **no welding on the container is
allowed**, plus cat-ladder access secured with a **fall-arrestor (SRL) system**.

The cut weaves site photos with cropped, pertinent details from the PE-endorsed
drawings:
- Base plate **bolted to the existing C-channel** — 6 nos GR8.8 M16 anchor bolts (no weld to container).
- Overhead anchorage on a **100×50×5 RHS** support frame — **HARU HE-10 SRL, EN360**.
- Cat-ladder (SS304 25×50×3) fixed to existing C-channel & unistrut.

## Rebuild
Requires `ffmpeg`, `poppler-utils`, and Python `Pillow`.

1. `build_frames.py` — composites the nine 1920×1080 slides into `/tmp/vid/seg`
   (photos with blurred-fill + lower-third captions; drawings on a white card).
   Source photos and the rendered drawing crops are read from local paths and are
   **not** committed (client material).
2. `render.py` — Ken-Burns motion (zoompan) + 0.6s crossfades (xfade) → `video.mp4`.
3. A subtle ambient audio bed is generated and muxed (see commands in the PR notes).

> Source client photos and engineering-drawing PDFs are intentionally **not**
> committed to this public repo. Only the finished, publish-intended video is.
