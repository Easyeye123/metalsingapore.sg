#!/usr/bin/env python3
import subprocess, os, json

WORK="/tmp/vid/vo"; os.makedirs(WORK, exist_ok=True)
VOICE="en-GB"

# (scene start of crossfade) from render.py offsets
offs=[0.0,3.4,6.1,9.1,12.5,15.2,18.2,21.9,25.3]
TOTAL=29.3
# narration, one line per scene
lines=[
 "Stainless steel access. Sunview Drive data centre.",
 "Handrails, on live containers.",
 "The catch: no welding allowed.",
 "So base plates bolt to the steel channel.",
 "Handrails, built to Eurocode three.",
 "The cat ladder, fall arrestor secured.",
 "A self retracting lifeline, on a steel frame.",
 "Fixed to existing structure. No welds.",
 "Engineered. Bolted. Certified safe.",
]
# start each line shortly after the scene appears
starts=[o+ (0.30 if i==0 else 0.25) for i,o in enumerate(offs)]
def win(i):
    nxt = offs[i+1] if i+1<len(offs) else TOTAL
    return (nxt - offs[i]) - 0.20

def dur(f):
    r=subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","json",f],
                     capture_output=True,text=True)
    return float(json.loads(r.stdout)["format"]["duration"])

fitted=[]
for i,txt in enumerate(lines):
    raw=os.path.join(WORK,f"raw{i}.wav")
    subprocess.run(["pico2wave","-l",VOICE,"-w",raw,txt],check=True)
    d=dur(raw); w=win(i)
    out=os.path.join(WORK,f"line{i}.wav")
    tempo=1.0
    if d > w:
        tempo=min(1.22, d/w)
    # normalize loudness a bit + optional speedup + small lead-in trim of silence
    af=f"atempo={tempo:.4f},highpass=f=90,lowpass=f=8000,dynaudnorm=f=200:g=8"
    subprocess.run(["ffmpeg","-y","-i",raw,"-af",af,"-ar","44100","-ac","1",out],
                   stderr=subprocess.DEVNULL,check=True)
    fitted.append(out)
    print(f"line{i}: raw={d:.2f}s win={w:.2f}s tempo={tempo:.2f} -> start {starts[i]:.2f}")

# Build voice timeline + duck music + mix
inputs=["-i","/tmp/vid/music.wav"]
for f in fitted: inputs+=["-i",f]
fc=[]
voxlabels=[]
for i,_ in enumerate(fitted):
    delay=int(starts[i]*1000)
    fc.append(f"[{i+1}:a]aresample=44100,pan=stereo|c0=c0|c1=c0,adelay={delay}|{delay},volume=2.4[v{i}]")
    voxlabels.append(f"[v{i}]")
fc.append("".join(voxlabels)+f"amix=inputs={len(fitted)}:normalize=0,alimiter=limit=0.95,asplit=2[voxA][voxB]")
# duck music when voice present
fc.append("[0:a]volume=0.9[m0]")
fc.append("[m0][voxA]sidechaincompress=threshold=0.02:ratio=8:attack=10:release=300:makeup=2[duck]")
fc.append("[duck][voxB]amix=inputs=2:normalize=0,alimiter=limit=0.97,afade=t=out:st=27.8:d=1.5[out]")
filt=";".join(fc)
cmd=["ffmpeg","-y"]+inputs+["-filter_complex",filt,"-map","[out]","-t",str(TOTAL),
     "-c:a","aac","-b:a","192k","/tmp/vid/voiceover_mix.aac"]
r=subprocess.run(cmd,stderr=subprocess.PIPE)
if r.returncode:
    print(r.stderr.decode()[-2500:]); raise SystemExit(1)
print("MIX OK -> /tmp/vid/voiceover_mix.aac")
