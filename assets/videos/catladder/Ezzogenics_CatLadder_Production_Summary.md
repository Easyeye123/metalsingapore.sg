# Ezzogenics — Dual 18 m Cat-Ladder Promo · Production Summary

A one-page summary of how this YouTube video is made, what's in it, and how to
rebuild or re-upload it. (Companion to the Sunview handrail summary.)

---

## 1. The video, in one line
A ~79-second promo for **Ezzogenics Pte Ltd** showing **two 18-metre aluminium
cat-ladders** with full **safety cage** and a **mid-stage landing platform**,
built for a **Buroh Street** warehouse and its adjoining repair facility — with
on-site **Fischer pull-out (proof-load) testing**.

## 2. Deliverables (in `assets/videos/catladder/`)
| File | Aspect | Use | Audio |
|---|---|---|---|
| `..._YouTube_Landscape_16x9_Voiceover.mp4` | 16:9 | Standard YouTube | VO + music |
| `..._YouTube_Shorts_9x16_Voiceover.mp4` | 9:16 | YouTube Shorts | VO + music |

- `720p/` — smaller, mobile-friendly copies of each.
- `CatLadder_Captions.srt` — subtitles, timed to the ~79s cut.
- `CatLadder_YouTube_SEO.md` — title/description/tags/chapters/thumbnail pack.
- `voiceover_Ruzgar_catladder.mp3` — the ElevenLabs narration track.
- Specs: 1920×1080 / 1080×1920, H.264 Main profile, AAC, +faststart, ~79s,
  embedded MP4 metadata (title/artist/comment/keywords).

## 3. Source material used
- **Site/workshop photos** (IMG_1708–1876, IMG_4995–5035): aluminium ladder &
  rolled cage fabrication, yard staging, boom-lift install, bracket fixing,
  Fischer pull-out test (dial gauge + ram), mid-stage platform, top/roof
  landing, base anti-climb gate, completed dual run.
- **Engineering drawing** (PE-endorsed): *Buroh St Cat Ladder* — cropped to the
  Safety-Cage + Mid-Platform section (Section C-C) and the Fischer FAZ II M16
  anchor / bearing-plate detail.
- **Spec source** (drawing notes): aluminium **AA 6063-T6**; cage straps 50×6 &
  75×6; brackets 75×75×6; bearing plates 200/210×…×10; **Fischer FAZ II M16**
  anchors (~85 mm embedment); mid-platform mesh deck; PE-endorsed.
- **Logo**: `EZZ_Logo_Ezzogenics` (welcome + ending cards).
- **Voiceover**: ElevenLabs "Ruzgar" (deep/authoritative), sped 1.2× for pace.
- ⚠️ Excluded: the Sunview drawing (wrong project) and the internal QA
  comments PDF. Client photos/drawings are **not** committed to this public repo.

## 4. Structure (welcome → title → story → contact)
1. **Welcome card** (Ezzogenics logo) — 2.5 s.
2. **Project title card** — "Dual 18-Metre Cat-Ladders · with Safety Cage &
   Mid-Stage Landing Platform · Buroh Street Warehouse · Singapore" — 3 s.
3. **14 scenes** (main, ~69 s) in narration order: workshop/aluminium →
   safety-cage drawing → mid-stage platform → boom-lift install → bracket
   welding + Fischer-anchor drawing → **Fischer pull-out test** → base gate →
   completed/PE-certified → tagline.
4. **Ending card** — "Works by Ezzogenics", 4 sites, Bartley Biz Centre address,
   WhatsApp David & office — 6 s.
Lower-third captions on every scene; Ken-Burns motion; crossfades; generated
music bed ducked under the voice. "Buroh Street" appears spoken + on title +
in a caption (per request).

## 5. Narration script (current, Ruzgar)
> Two eighteen-metre cat-ladders. Engineered vertical access for a Buroh Street
> warehouse and its adjoining repair facility. Built from high-strength
> aluminium alloy. Lightweight. Corrosion-resistant. Built to perform. Each
> ladder is enclosed in a full safety cage. Assembled rung by rung. To
> specification. A mid-height landing platform breaks the climb. A
> code-compliant rest point on the ascent. Installation was executed from a
> boom-lift under full fall-arrest protocol. Every worker harnessed. Every
> movement controlled. And a vertical access system is only as safe as its
> anchor. So we anchored it with galvanised mild steel brackets, and Fischer
> M16 anchor bolts. Every anchor is proof-load tested on site. A Fischer
> pull-out test—documented, and verified before handover. We don't assume. We
> verify. Lockable gates at the base secure the access. Two eighteen-metre runs.
> Professional Engineer-certified. Load-calculated. Built to perform.
> Ezzogenics. Custom-engineered. Anchored. Certified. See more at
> metalsingapore.sg, or metalglassworksingapore.com.

## 6. How it's built (pipeline, in `scripts/video/catladder/`)
1. `build_frames.py` / `build_frames_vertical.py` — composite each scene to a
   1920×1080 / 1080×1920 PNG (photos = blurred-fill + caption; drawings = white
   card). Shared Ezzogenics welcome/ending cards are reused from the first
   project; a dedicated **project title card** is generated for this one.
2. `music.py` — generate the royalty-free music bed to the exact length.
3. Voiceover sync — detect sentence pauses in the ElevenLabs MP3, map the 10
   narrative beats to the 14 scenes, set each scene's duration so visuals land
   on the matching line; music is sidechain-ducked under the voice. The VO is
   sped 1.2× (pitch-preserved) to tighten pace.
4. `render.py` — Ken-Burns motion (zoompan) + 0.5 s crossfades (xfade).
5. Assembly — welcome ⨉ title ⨉ main ⨉ ending; export H.264 Main + faststart;
   then 720p copies; embed MP4 metadata.

> Requires `ffmpeg`, `poppler-utils`, Python `Pillow`/`numpy`. To re-time to a
> new VO: drop in the MP3, re-detect pauses, update `render.py` durations, re-run.

## 7. Upload checklist (see `CatLadder_YouTube_SEO.md` for copy-paste)
- [ ] 16:9 as a normal video; 9:16 as a Short (add `#Shorts`).
- [ ] Paste title, description, tags; add hashtags.
- [ ] Upload **`CatLadder_Captions.srt`** (Subtitles → English).
- [ ] Custom thumbnail (completed run or Fischer pull-out gauge + 3-word overlay).
- [ ] Category Science & Technology; language English; location Singapore.
- [ ] End screen / cards linking the websites; add to a playlist.

## 8. Status
Work lives on branch `claude/stainless-handrail-video-SWg9q` (draft PR #4).
