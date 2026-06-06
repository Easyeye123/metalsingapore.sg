#!/usr/bin/env python3
# Upbeat royalty-free music bed (generated) for the Ezzogenics promo.
import numpy as np, wave, struct

SR = 44100
DUR = 29.3
BPM = 124.0
beat = 60.0/BPM
bar = 4*beat
N = int(DUR*SR)
t_all = np.arange(N)/SR
mix = np.zeros(N, dtype=np.float64)

def m2f(n): return 440.0*2**((n-69)/12.0)

def env(length, a, d, s, r, sus=0.7):
    n=length; e=np.zeros(n); ai=int(a*SR); di=int(d*SR); ri=int(r*SR)
    ai=max(ai,1); di=max(di,1); ri=max(ri,1)
    idx=0
    e[:ai]=np.linspace(0,1,ai)
    e[ai:ai+di]=np.linspace(1,sus,di)
    st=ai+di; en=max(st,n-ri)
    e[st:en]=sus
    e[en:]=np.linspace(e[en-1] if en>0 else sus,0,n-en)
    return e

def add(sig, start):
    s=int(start*SR); e=min(N, s+len(sig))
    if s>=N: return
    mix[s:e]+=sig[:e-s]

def tone(freq, length, amp, harms=(1,0.5,0.25,0.12), detune=0.0):
    n=int(length*SR); tt=np.arange(n)/SR; y=np.zeros(n)
    for i,h in enumerate(harms, start=1):
        y+=h*np.sin(2*np.pi*freq*i*tt + 0.0)
        if detune: y+=h*0.5*np.sin(2*np.pi*freq*i*(1+detune)*tt)
    return y*amp

def pluck(freq, length, amp):
    n=int(length*SR); tt=np.arange(n)/SR
    y=(np.sin(2*np.pi*freq*tt)+0.5*np.sin(2*np.pi*2*freq*tt)+0.3*np.sin(2*np.pi*3*freq*tt))
    e=np.exp(-tt*7.0)*(1-np.exp(-tt*400))
    return y*e*amp

def bass(freq, length, amp):
    n=int(length*SR); tt=np.arange(n)/SR
    y=np.sin(2*np.pi*freq*tt)+0.35*np.sin(2*np.pi*2*freq*tt)
    # slight square for punch
    y+=0.2*np.sign(np.sin(2*np.pi*freq*tt))
    e=np.exp(-tt*3.0)*(1-np.exp(-tt*300))
    return y*e*amp

def kick(amp=1.0, length=0.32):
    n=int(length*SR); tt=np.arange(n)/SR
    f=110*np.exp(-tt*28)+48
    ph=2*np.pi*np.cumsum(f)/SR
    y=np.sin(ph)*np.exp(-tt*7.0)
    y+=0.6*np.sin(2*np.pi*55*tt)*np.exp(-tt*16)
    return y*amp

def hat(amp=0.3, length=0.05, open_=False):
    n=int((0.16 if open_ else length)*SR); tt=np.arange(n)/SR
    y=np.random.uniform(-1,1,n)
    # highpass-ish via diff
    y=np.diff(np.concatenate([[0],y]))
    e=np.exp(-tt*(20 if open_ else 60))
    return y*e*amp

def clap(amp=0.5):
    n=int(0.18*SR); tt=np.arange(n)/SR
    y=np.random.uniform(-1,1,n)
    y=np.diff(np.concatenate([[0],y]))
    e=np.exp(-tt*16)
    # add a couple of quick repeats for clap texture
    for off in (0.008,0.016):
        s=int(off*SR); e2=np.exp(-(tt)*16); y[s:]+=0.7*np.random.uniform(-1,1,n-s)*e2[:n-s]
    return y*np.exp(-tt*12)*amp

# --- chord progression (D major): D, A, Bm, G ; one chord per bar ---
# voicings as MIDI: pad/arp tones, plus bass root
chords = [
    dict(pad=[50,57,62,66], arp=[62,66,69,74], bass=38),  # D
    dict(pad=[45,52,57,61], arp=[57,61,64,69], bass=33),  # A
    dict(pad=[47,54,59,62], arp=[59,62,66,71], bass=35),  # Bm
    dict(pad=[43,50,55,59], arp=[55,59,62,67], bass=31),  # G
]

num_bars = int(np.ceil(DUR/bar))+1

for b in range(num_bars):
    ch = chords[b % len(chords)]
    bstart = b*bar
    if bstart >= DUR: break
    intro = b < 1
    build = b < 2

    # PAD (whole bar)
    pad_len = bar*1.02
    padsig=np.zeros(int(pad_len*SR))
    for nmid in ch['pad']:
        s=tone(m2f(nmid), pad_len, 0.06, harms=(1,0.6,0.3,0.15,0.08), detune=0.004)
        padsig[:len(s)]+=s[:len(padsig)]
    padsig*=env(len(padsig), 0.08, 0.1, 0.0, 0.25, sus=0.9)
    add(padsig*(0.5 if intro else 1.0), bstart)

    # BASS — eighth notes on root, octave bounce
    for i in range(8):
        bt=bstart+i*beat/2
        if bt>=DUR: break
        note=ch['bass'] + (12 if i%2==1 else 0)
        add(bass(m2f(note), beat/2*0.95, 0.5 if not intro else 0.35), bt)

    # KICK — four on the floor (intro: beats 1 & 3)
    for i in range(4):
        bt=bstart+i*beat
        if bt>=DUR: break
        if intro and i%2==1: continue
        add(kick(0.9), bt)

    # CLAP/snare on beats 2 & 4 (from bar 1)
    if not intro:
        for i in (1,3):
            bt=bstart+i*beat
            if bt<DUR: add(clap(0.33), bt)

    # HI-HATS — offbeat 8ths from bar 1; closed 16ths from bar 2
    if not intro:
        step = beat/ (4 if b>=2 else 2)
        cnt = 16 if b>=2 else 8
        for i in range(cnt):
            bt=bstart+i*step
            if bt>=DUR: break
            opn = (i%8==7) and b>=2
            add(hat(0.16 if not opn else 0.12, open_=opn), bt)

    # ARP — bright 16th-note pluck from bar 2 onward
    if b>=2:
        arp = ch['arp']
        pat = arp + arp[::-1][1:3]   # up then partial down
        for i in range(16):
            bt=bstart+i*(beat/4)
            if bt>=DUR: break
            note=pat[i%len(pat)] + (12 if (i//len(pat))%2 else 0)
            add(pluck(m2f(note), beat/4*1.6, 0.20), bt)

# Riser into the first full bar (white-noise sweep) for lift
ris_len=bar*2
rn=int(ris_len*SR); rt=np.arange(rn)/SR
ris=np.random.uniform(-1,1,rn)
ris=np.diff(np.concatenate([[0],ris]))
ris*= (rt/ris_len)**2 * 0.12
add(ris, 0.0)

# soft high-shelf sparkle: add a quiet octave shimmer of the whole mix? skip.

# ---- master ----
# gentle high-pass (remove DC), soft compression via tanh, normalize
mix -= np.mean(mix)
peak=np.max(np.abs(mix))+1e-9
mix/=peak
mix=np.tanh(mix*1.6)/np.tanh(1.6)   # soft saturation/glue
# overall fades
fi=int(0.25*SR); fo=int(2.6*SR)
mix[:fi]*=np.linspace(0,1,fi)
mix[-fo:]*=np.linspace(1,0,fo)
mix*=0.92

# write 16-bit stereo wav
data=np.clip(mix,-1,1)
pcm=(data*32767).astype('<i2')
stereo=np.repeat(pcm[:,None],2,axis=1).tobytes()
with wave.open('/tmp/vid/music.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(stereo)
print("MUSIC OK  bars=",num_bars,"dur=",len(mix)/SR)
