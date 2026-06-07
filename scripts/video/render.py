#!/usr/bin/env python3
import os, subprocess, shlex

SEG = "/tmp/vid/seg"
OUTV = "/tmp/vid/video.mp4"
FPS = 30
T = 0.5  # xfade duration (matches VO-aligned duration math)

# (file, duration, is_drawing) — timed to Ruzgar voiceover
segs = [
 ("s00.png", 4.91, False),
 ("s01.png", 2.18, False),
 ("s02.png", 2.18, False),
 ("s03.png", 2.17, False),
 ("s04.png", 4.41, False),
 ("s05.png", 4.50, True),
 ("s06.png", 2.87, False),
 ("s07.png", 2.87, False),
 ("s08.png", 2.87, False),
 ("s09.png", 2.87, False),
 ("s10.png", 3.09, False),
 ("s11.png", 3.08, False),
 ("s12.png", 5.99, True),
 ("s13.png", 3.48, True),
 ("s14.png", 3.47, False),
 ("s15.png", 4.46, False),
 ("s16.png", 8.73, False),
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
