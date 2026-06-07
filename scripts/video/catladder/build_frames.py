#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

UP = "/tmp/vid2/src"
DR = "/tmp/vid2/draw"
OUT = "/tmp/vid2/seg"
os.makedirs(OUT, exist_ok=True)

W, H = 1920, 1080
ORANGE = (255, 138, 0)
WHITE = (244, 247, 250)
SUB = (200, 208, 216)

FB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
def font(b, s): return ImageFont.truetype(FB if b else FR, s)

f_head = font(True, 62)
f_sub  = font(False, 34)
f_brand= font(True, 28)
f_tag  = font(True, 24)
f_chip = font(True, 26)

def tw(d, t, f):
    b = d.textbbox((0,0), t, font=f); return b[2]-b[0]

def wrap(d, t, f, maxw):
    words = t.split(); lines=[]; cur=""
    for w in words:
        test = (cur+" "+w).strip()
        if tw(d, test, f) <= maxw: cur=test
        else:
            if cur: lines.append(cur)
            cur=w
    if cur: lines.append(cur)
    return lines

def steel_bg():
    base = Image.new("RGB",(W,H),(13,17,23))
    top=(26,34,46); bot=(9,12,17)
    px=base.load()
    for y in range(H):
        t=y/H
        r=int(top[0]*(1-t)+bot[0]*t); g=int(top[1]*(1-t)+bot[1]*t); b=int(top[2]*(1-t)+bot[2]*t)
        for x in range(0,W,1): px[x,y]=(r,g,b)
    return base

def cover(img, w, h):
    return ImageOps.fit(img, (w,h), method=Image.LANCZOS)

def contain(img, w, h):
    im=img.copy(); im.thumbnail((w,h), Image.LANCZOS); return im

def bottom_gradient(canvas, height=460, strength=235):
    grad=Image.new("L",(1,height),0)
    for i in range(height):
        grad.putpixel((0,i), int(strength*(i/height)**1.3))
    grad=grad.resize((W,height))
    black=Image.new("RGB",(W,height),(4,6,9))
    canvas.paste(black,(0,H-height),grad)

def draw_chrome(canvas, tag):
    d=ImageDraw.Draw(canvas,"RGBA")
    # top brand
    d.ellipse((70,64,90,84), fill=ORANGE)
    d.text((102,60),"EZZOGENICS PTE LTD", font=f_brand, fill=WHITE)
    d.text((102,94),"METALSINGAPORE.SG  ·  METALGLASSWORKSINGAPORE.COM", font=font(False,18), fill=(150,160,170))
    # top-right tag chip
    if tag:
        pad=18; tg=tag.upper(); twd=tw(d,tg,f_tag)
        x1=W-70-twd-pad*2;
        d.rounded_rectangle((x1,62,W-70,98), radius=8, fill=(255,138,0,235))
        d.text((x1+pad,68), tg, font=f_tag, fill=(20,20,20))

def text_block(canvas, head, sub):
    d=ImageDraw.Draw(canvas,"RGBA")
    x=120
    # accent bar
    lines=wrap(d, head, f_head, W-260)
    line_h=78
    total_h=len(lines)*line_h
    head_top = H-300 if sub else H-230
    d.rounded_rectangle((x,head_top+8,x+10,head_top+total_h), radius=5, fill=ORANGE)
    tx=x+34
    y=head_top
    for ln in lines:
        d.text((tx,y), ln, font=f_head, fill=WHITE)
        y+=line_h
    if sub:
        slines=wrap(d, sub, f_sub, W-300)
        sy=y+14
        for ln in slines:
            d.text((tx,sy), ln, font=f_sub, fill=SUB)
            sy+=46

def build_photo(path, head, sub, tag, out, focus=0.5):
    src=Image.open(path).convert("RGB")
    src=ImageOps.exif_transpose(src)
    bg=cover(src,W,H).filter(ImageFilter.GaussianBlur(28))
    bg=Image.eval(bg, lambda p:int(p*0.45))
    canvas=bg.copy()
    fg=contain(src, W-160, H-120)
    fx=(W-fg.width)//2
    fy=(H-fg.height)//2 - 30
    # soft shadow
    canvas.paste(fg,(fx,fy))
    bottom_gradient(canvas)
    draw_chrome(canvas, tag)
    text_block(canvas, head, sub)
    canvas.save(out); print("photo", os.path.basename(out), fg.size)

def build_draw(path, head, sub, tag, out):
    canvas=steel_bg()
    src=Image.open(path).convert("RGB")
    # size the white card to the drawing's aspect, centered in the upper area
    pad=42
    max_w, max_h = W-360, 540
    dd=contain(src, max_w-pad*2, max_h-pad*2)
    card_w, card_h = dd.width+pad*2, dd.height+pad*2
    cx=(W-card_w)//2; cy=124+(max_h-card_h)//2
    card=Image.new("RGB",(card_w,card_h),(252,252,252))
    card.paste(dd, ((card_w-dd.width)//2,(card_h-dd.height)//2))
    # rounded corners + border
    mask=Image.new("L",(card_w,card_h),0)
    ImageDraw.Draw(mask).rounded_rectangle((0,0,card_w,card_h),radius=22,fill=255)
    # shadow
    sh=Image.new("RGBA",(W,H),(0,0,0,0))
    ImageDraw.Draw(sh).rounded_rectangle((cx-6,cy-6,cx+card_w+6,cy+card_h+10),radius=26,fill=(0,0,0,150))
    sh=sh.filter(ImageFilter.GaussianBlur(18))
    canvas=Image.alpha_composite(canvas.convert("RGBA"), sh).convert("RGB")
    canvas.paste(card,(cx,cy),mask)
    d=ImageDraw.Draw(canvas,"RGBA")
    d.rounded_rectangle((cx,cy,cx+card_w,cy+card_h),radius=22,outline=(255,138,0,230),width=3)
    bottom_gradient(canvas, height=360, strength=245)
    draw_chrome(canvas, tag)
    text_block(canvas, head, sub)
    canvas.save(out); print("draw", os.path.basename(out), dd.size)

P=lambda n: os.path.join(UP,n)
D=lambda n: os.path.join(DR,n)

segs=[
 ("photo","01_workshop_ladder_cage_layout.jpeg","Two 18-metre cat-ladders — fabrication begins","Aluminium alloy AA 6063-T6  ·  light & corrosion-resistant","Workshop"),
 ("photo","02_workshop_cage_assembly.jpeg","Full safety cages, assembled rung by rung","50x6 vertical straps  ·  75x6 hoops","Workshop"),
 ("photo","03_yard_sections_staged.jpeg","A matched, dual-ladder system","Both ladders prepped for site","Yard"),
 ("draw","cage_platform.png","Safety cage & mid-stage landing platform","Ø700 cage hoops  ·  mesh landing deck","Engineering Drawing"),
 ("photo","04_site_cage_install_boomlift.jpeg","Installed from a boom-lift","Lifted and fixed section by section","On Site"),
 ("photo","06_site_bracket_welding_harness.jpeg","Brackets fixed to the structure","Every worker on a fall-arrest harness","Installation"),
 ("draw","fischer_anchor.png","Anchored with Fischer FAZ II M16","210x210x10 bearing plate  ·  85mm embedment","Engineering Drawing"),
 ("photo","T1_fischer_pullout_test_gauge.jpeg","Anchors proof-load tested on site","Fischer pull-out test — verified before handover","Load Test"),
 ("photo","04c_midplatform_clear.jpeg","A middle landing platform","A safe rest point on the long climb","Mid Platform"),
 ("photo","09_roof_top_landing.jpeg","Top landing & roof access","Cage carried through to the roof","Roof Access"),
 ("photo","14_base_anticlimb_guard.jpeg","Lockable anti-climb gate at the base","Access kept secure","Security"),
 ("photo","10b_completed_hero.jpeg","Completed — dual 18-metre vertical access","Two cages  ·  two mid-stage platforms","Completed"),
 ("photo","11_completed_hero_port.jpeg","Safe, PE-certified roof access","Buroh Street warehouse  ·  Singapore","Completed"),
 ("photo","13_completed_fullrun.jpeg","Engineered. Anchored. Safe.","By Ezzogenics  —  metalsingapore.sg  ·  metalglassworksingapore.com","Ezzogenics"),
]

for i,s in enumerate(segs):
    out=os.path.join(OUT,f"s{i:02d}.png")
    if s[0]=="photo": build_photo(os.path.join(UP,s[1]),s[2],s[3],s[4],out)
    else: build_draw(os.path.join(DR,s[1]),s[2],s[3],s[4],out)
print("DONE", len(segs))
