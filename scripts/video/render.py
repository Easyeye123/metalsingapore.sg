#!/usr/bin/env python3
import os, subprocess, shlex

SEG = "/tmp/vid/seg"
OUTV = "/tmp/vid/video.mp4"
FPS = 30
T = 0.5  # xfade duration (matches VO-aligned duration math)

# (file, duration, is_drawing) — durations timed to the ElevenLabs voiceover
segs = [
 ("s00.png", 5.25, False),  # L1 title
 ("s01.png", 2.35, False),  # L2 containers
 ("s02.png", 2.35, False),  # L2 b-roll (walkway)
 ("s03.png", 2.35, False),  # L2 b-roll (install/harness)
 ("s04.png", 5.06, False),  # L3 no welding
 ("s05.png", 5.16, True),   # L4 bolted (drawing)
 ("s06.png", 2.91, False),  # L5 SS304/PE
 ("s07.png", 2.90, False),  # L5 b-roll (engineer)
 ("s08.png", 2.91, False),  # L5 b-roll (workshop)
 ("s09.png", 2.90, False),  # L5 b-roll (workshop 2)
 ("s10.png", 2.45, False),  # L6 fall-arrestor
 ("s11.png", 2.45, False),  # L6 b-roll
 ("s12.png", 5.63, True),   # L7 SRL frame (drawing)
 ("s13.png", 3.07, True),   # L8 ladder (drawing)
 ("s14.png", 3.06, False),  # L8 b-roll
 ("s15.png", 5.93, False),  # L9 completed
 ("s16.png", 7.07, False),  # L10 closing
]

inputs = []
for f,d,_ in segs:
    inputs += ["-loop","1","-framerate",str(FPS),"-t",f"{d:.3f}","-i",os.path.join(SEG,f)]

fc = []
labels = []
for i,(f,d,is_draw) in enumerate(segs):
    N = max(2, round(d*FPS))
    if is_draw:
        # gentle slow zoom-in, very small to avoid line shimmer
        z = f"1+0.018*on/{N-1}"
    else:
        z = f"1+0.045*on/{N-1}"
    chain = (f"[{i}:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,"
             f"zoompan=z='{z}':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps={FPS},"
             f"setsar=1,format=yuv420p[v{i}]")
    fc.append(chain)
    labels.append(f"[v{i}]")

# xfade chain
prev = "[v0]"
cum = segs[0][1]
for i in range(1, len(segs)):
    off = cum - T
    out = f"[x{i}]" if i < len(segs)-1 else "[vout]"
    fc.append(f"{prev}[v{i}]xfade=transition=fade:duration={T}:offset={off:.3f}{out}")
    prev = out
    cum = cum + segs[i][1] - T

filter_complex = ";".join(fc)

cmd = ["ffmpeg","-y"] + inputs + [
    "-filter_complex", filter_complex,
    "-map","[vout]",
    "-c:v","libx264","-preset","medium","-crf","19",
    "-pix_fmt","yuv420p","-movflags","+faststart",
    OUTV]

print("Total duration:", round(cum,2),"s")
r = subprocess.run(cmd, stderr=subprocess.PIPE)
if r.returncode!=0:
    print(r.stderr.decode()[-3000:])
    raise SystemExit(1)
print("VIDEO OK", OUTV)
