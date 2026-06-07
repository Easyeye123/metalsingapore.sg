#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

UP = "/tmp/vid2/src"
DR = "/tmp/vid2/draw"
OUT = "/tmp/vid2/segv"
os.makedirs(OUT, exist_ok=True)

W, H = 1080, 1920
ORANGE = (255, 138, 0)
WHITE = (244, 247, 250)
SUB = (203, 211, 219)
SAFE_BOTTOM = H - 250   # keep captions above Shorts UI

FB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
def font(b,s): return ImageFont.truetype(FB if b else FR, s)
f_head=font(True,62); f_sub=font(False,36); f_brand=font(True,30); f_tag=font(True,26)

def tw(d,t,f): b=d.textbbox((0,0),t,font=f); return b[2]-b[0]
def wrap(d,t,f,mw):
    out=[]; cur=""
    for w in t.split():
        test=(cur+" "+w).strip()
        if tw(d,test,f)<=mw: cur=test
        else:
            if cur: out.append(cur)
            cur=w
    if cur: out.append(cur)
    return out

def steel_bg():
    base=Image.new("RGB",(W,H)); px=base.load(); top=(26,34,46); bot=(9,12,17)
    for y in range(H):
        t=y/H; px2=(int(top[0]*(1-t)+bot[0]*t),int(top[1]*(1-t)+bot[1]*t),int(top[2]*(1-t)+bot[2]*t))
        for x in range(W): px[x,y]=px2
    return base

def cover(img,w,h): return ImageOps.fit(img,(w,h),Image.LANCZOS)
def contain(img,w,h): im=img.copy(); im.thumbnail((w,h),Image.LANCZOS); return im

def bottom_gradient(canvas,height,strength=235):
    g=Image.new("L",(1,height),0)
    for i in range(height): g.putpixel((0,i),int(strength*(i/height)**1.25))
    g=g.resize((W,height)); blk=Image.new("RGB",(W,height),(4,6,9))
    canvas.paste(blk,(0,H-height),g)

def chrome(canvas,tag):
    d=ImageDraw.Draw(canvas,"RGBA")
    d.ellipse((60,72,82,94),fill=ORANGE)
    d.text((96,66),"EZZOGENICS PTE LTD",font=f_brand,fill=WHITE)
    d.text((96,104),"METALSINGAPORE.SG · METALGLASSWORKSINGAPORE.COM",font=font(False,18),fill=(150,160,170))
    if tag:
        tg=tag.upper(); twd=tw(d,tg,f_tag); pad=16
        d.rounded_rectangle((60,150,60+twd+pad*2,192),radius=8,fill=(255,138,0,235))
        d.text((60+pad,156),tg,font=f_tag,fill=(20,20,20))

def text_block(canvas,head,sub):
    d=ImageDraw.Draw(canvas,"RGBA"); x=70; mw=W-150
    hlines=wrap(d,head,f_head,mw); slines=wrap(d,sub,f_sub,mw) if sub else []
    lh=76; sh=50
    block_h=len(hlines)*lh + (18+len(slines)*sh if slines else 0)
    top=SAFE_BOTTOM-block_h
    d.rounded_rectangle((x,top+6,x+10,top+len(hlines)*lh-8),radius=5,fill=ORANGE)
    tx=x+32; y=top
    for ln in hlines:
        d.text((tx,y),ln,font=f_head,fill=WHITE); y+=lh
    if slines:
        y+=18
        for ln in slines:
            d.text((tx,y),ln,font=f_sub,fill=SUB); y+=sh

def build_photo(path,head,sub,tag,out):
    src=ImageOps.exif_transpose(Image.open(path).convert("RGB"))
    bg=cover(src,W,H).filter(ImageFilter.GaussianBlur(30)); bg=Image.eval(bg,lambda p:int(p*0.42))
    canvas=bg.copy()
    fg=contain(src,W-60,int(H*0.74))
    canvas.paste(fg,((W-fg.width)//2,int(H*0.085)))
    bottom_gradient(canvas,int(H*0.46))
    chrome(canvas,tag); text_block(canvas,head,sub)
    canvas.save(out); print("v-photo",os.path.basename(out),fg.size)

def build_draw(path,head,sub,tag,out):
    canvas=steel_bg(); src=Image.open(path).convert("RGB")
    pad=38; max_w,max_h=W-60,int(H*0.56)
    dd=contain(src,max_w-pad*2,max_h-pad*2)
    cw,ch=dd.width+pad*2,dd.height+pad*2
    cx=(W-cw)//2; cy=max(215,int((215+1400)/2 - ch/2))  # center between header and captions
    card=Image.new("RGB",(cw,ch),(252,252,252)); card.paste(dd,((cw-dd.width)//2,(ch-dd.height)//2))
    mask=Image.new("L",(cw,ch),0); ImageDraw.Draw(mask).rounded_rectangle((0,0,cw,ch),radius=22,fill=255)
    sh=Image.new("RGBA",(W,H),(0,0,0,0)); ImageDraw.Draw(sh).rounded_rectangle((cx-6,cy-6,cx+cw+6,cy+ch+10),radius=26,fill=(0,0,0,150))
    sh=sh.filter(ImageFilter.GaussianBlur(18))
    canvas=Image.alpha_composite(canvas.convert("RGBA"),sh).convert("RGB")
    canvas.paste(card,(cx,cy),mask)
    ImageDraw.Draw(canvas,"RGBA").rounded_rectangle((cx,cy,cx+cw,cy+ch),radius=22,outline=(255,138,0,230),width=3)
    bottom_gradient(canvas,int(H*0.40),245)
    chrome(canvas,tag); text_block(canvas,head,sub)
    canvas.save(out); print("v-draw",os.path.basename(out),dd.size)

P=lambda n:os.path.join(UP,n); D=lambda n:os.path.join(DR,n)
segs=[
 ("photo","01_workshop_ladder_cage_layout.jpeg","Two 18 m cat-ladders — fabrication","Aluminium alloy AA 6063-T6","Workshop"),
 ("photo","02_workshop_cage_assembly.jpeg","Safety cages, rung by rung","50x6 straps · 75x6 hoops","Workshop"),
 ("photo","03_yard_sections_staged.jpeg","A dual-ladder system","Both ladders prepped","Yard"),
 ("draw","cage_platform.png","Cage & mid-stage platform","Ø700 hoops · mesh deck","Drawing"),
 ("photo","05_site_ladder_rising.jpeg","Installed from a boom-lift","Section by section","On Site"),
 ("photo","06_site_bracket_welding_harness.jpeg","Brackets fixed to structure","Workers harnessed","Installation"),
 ("draw","fischer_anchor.png","Fischer FAZ II M16 anchors","210x210x10 plate · 85 mm","Drawing"),
 ("photo","T1_fischer_pullout_test_gauge.jpeg","Proof-load tested on site","Fischer pull-out test","Load Test"),
 ("photo","08_view_down_midplatform.jpeg","Middle landing platform","A rest point on the climb","Mid Platform"),
 ("photo","09_roof_top_landing.jpeg","Top landing & roof access","Cage to the roof","Roof Access"),
 ("photo","14_base_anticlimb_guard.jpeg","Lockable gate at the base","Access kept secure","Security"),
 ("photo","10b_completed_hero.jpeg","Dual 18 m vertical access","Two cages · two platforms","Completed"),
 ("photo","11_completed_hero_port.jpeg","Safe, PE-certified access","To Singapore Standards","Completed"),
 ("photo","13_completed_fullrun.jpeg","Engineered. Anchored. Safe.","Ezzogenics · metalsingapore.sg","Ezzogenics"),
]
for i,s in enumerate(segs):
    out=os.path.join(OUT,f"s{i:02d}.png")
    p=os.path.join(UP,s[1]) if s[0]=="photo" else os.path.join(DR,s[1])
    (build_photo if s[0]=="photo" else build_draw)(p,s[2],s[3],s[4],out)
print("DONE",len(segs))
