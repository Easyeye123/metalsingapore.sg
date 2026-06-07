#!/usr/bin/env python3
import os, subprocess, shlex

SEG = "/tmp/vid2/seg"
OUTV = "/tmp/vid2/video.mp4"
FPS = 30
T = 0.5  # xfade duration (matches VO-aligned duration math)

# (file, duration, is_drawing) — timed to Ruzgar voiceover
segs = [
 ("s00.png", 3.55, False),
 ("s02.png", 3.55, False),
 ("s01.png", 6.47, False),
 ("s03.png", 6.21, True),
 ("s08.png", 5.72, False),
 ("s04.png", 8.18, False),
 ("s05.png", 5.28, False),
 ("s06.png", 5.28, True),
 ("s07.png", 9.38, False),
 ("s10.png", 3.2, False),
 ("s09.png", 2.95, False),
 ("s11.png", 2.95, False),
 ("s12.png", 2.95, False),
 ("s13.png", 10.18, False),
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
