# Ezzogenics — Sunview Drive Promo Video · Production Summary

A one-page summary of how this YouTube video is made, what's in it, and how to
rebuild or re-upload it.

---

## 1. The video, in one line
A ~64-second promo for **Ezzogenics Pte Ltd** showing stainless-steel handrails
and a fall-arrestor cat-ladder built for an 8-storey data centre at **6 Sunview
Drive, Singapore** — where **no welding on the container** was allowed.

## 2. Deliverables (in `assets/videos/`)
| File | Aspect | Use | Audio |
|---|---|---|---|
| `..._YouTube_Landscape_16x9_Voiceover.mp4` | 16:9 | Standard YouTube | VO + music |
| `..._YouTube_Landscape_16x9_MusicOnly.mp4` | 16:9 | Standard YouTube | music |
| `..._YouTube_Shorts_9x16_Voiceover.mp4` | 9:16 | YouTube Shorts | VO + music |
| `..._YouTube_Shorts_9x16_MusicOnly.mp4` | 9:16 | YouTube Shorts | music |

- `720p/` — smaller copies of each (mobile-friendly previews).
- `Ezzogenics_Promo_Captions.srt` — subtitles, timed to the video.
- `Ezzogenics_YouTube_SEO.md` — title/description/tags/chapters/thumbnail pack.
- `voiceover_Ruzgar.mp3` — the ElevenLabs narration track.
- Specs: 1920×1080 / 1080×1920, H.264 Main profile, AAC, +faststart, ~64s.

## 3. Source material used
- **Site photos** (IMG_4026–4069 range): handrails on containers, bolted base
  plates, fall-arrestor blocks, grating walkways, the completed install, plus
  on-site install and **workshop fabrication** shots.
- **Engineering drawings** (PE-endorsed PDFs): base-plate-to-C-channel bolted
  detail, HARU HE-10 SRL support-frame detail, cat-ladder section — cropped to
  the pertinent details only.
- **Design reports**: SS304, Eurocode 3 / Singapore Standards, PE load-calc,
  EN360 SRL, 100×50×5 RHS frame, GR8.8 M16 anchors.
- **Logo**: `EZZ_Logo_Ezzogenics` (welcome + ending cards).
- **Voiceover**: ElevenLabs (current = "Ruzgar", deep/authoritative).
- ⚠️ Client photos & drawing PDFs are **not** committed (public repo) — only the
  finished, publish-intended video.

## 4. Structure (welcome → story → contact)
1. **Welcome card** (logo, websites) — 2.5s, fades in.
2. **10 narration beats / 17 scenes** weaving site photos + cropped drawings:
   title → live containers → no welding → bolted to steel channel → SS304/PE
   handrails (+ workshop b-roll) → cat-ladder fall-arrestor → SRL support frame
   → fixed to structure/no welds → completed → tagline.
3. **Ending card** — "Works by Ezzogenics", 4 websites, Bartley Biz Centre
   address, WhatsApp David 9632 0750, Office 6968 3098 (~6s hold).
Lower-third captions on every scene; subtle Ken-Burns motion; crossfades;
generated upbeat music bed ducked under the voice.

## 5. Narration script (current)
> Stainless steel maintenance access — at a data centre on Sunview Drive.
> Handrails and access cat-ladder, mounted on the side of data containers.
> The challenge? No welding allowed on the container.
> So every base plate is bolted to the existing steel channel.
> SS304-grade handrails, engineered to Singapore Standards and Professional
> Engineer approved for load calculation. The cat-ladder is secured safe for the
> user with a fall-arrestor system using a certified self-retracting lifeline
> mounted on a stainless steel support frame. This frame structure is fixed to
> the existing structure. No welds. Full strength.
> The result: safe, Professional Engineer certified maintenance access.
> By Ezzogenics. Engineered, bolted, safe.

## 6. How it's built (pipeline, in `scripts/video/`)
1. `build_frames.py` / `build_frames_vertical.py` — composite each scene to a
   1920×1080 / 1080×1920 PNG (photos = blurred-fill + caption; drawings = white
   card; captions, brand chip, tags).
2. `build_intro.py` / `build_outro.py` — the logo welcome & contact cards.
3. `music.py` — generate the royalty-free music bed to the exact length.
4. Voiceover sync — detect sentence pauses in the ElevenLabs MP3 and set each
   scene's duration so visuals land on the matching line; music is sidechain-
   ducked under the voice.
5. `render.py` — Ken-Burns motion (zoompan) + 0.5s crossfades (xfade).
6. Assembly — intro ⨉ main ⨉ ending with crossfades; export H.264 Main +
   faststart; then 720p copies; embed MP4 metadata.

> Requires `ffmpeg`, `poppler-utils`, Python `Pillow`/`numpy`. To change wording
> or pacing: edit the captions in the build scripts and the durations in
> `render.py`, then re-run the steps above.

## 7. Upload checklist (see `Ezzogenics_YouTube_SEO.md` for copy-paste)
- [ ] Upload **16:9** as a normal video; **9:16** as a Short (add `#Shorts`).
- [ ] Paste the **title, description, tags**; add **hashtags**.
- [ ] Upload **`Ezzogenics_Promo_Captions.srt`** (Subtitles → English).
- [ ] Set a **custom thumbnail** (completed shot + 3-word overlay + logo).
- [ ] Category Science & Technology; language English; location Singapore.
- [ ] Add end screen / cards linking the websites; add to a playlist.

## 8. Status
Work lives on branch `claude/stainless-handrail-video-SWg9q` (draft PR #4).
