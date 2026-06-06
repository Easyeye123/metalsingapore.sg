#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

UP = "/root/.claude/uploads/2d11a447-9f46-51e3-bac9-5f928b152c50"
DR = "/tmp/vid/draw"
OUT = "/tmp/vid/seg"
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
 ("photo", P("4cf3e56a-IMG_4949.jpeg"),
   "Stainless Steel Handrails & Cat-Ladder Access",
   "8-storey data centre  ·  6 Sunview Drive, Singapore", "Project"),
 ("photo", P("2290fa33-IMG_4942.jpeg"),
   "Railings built around live PTU & STS containers",
   "Fabricated and fitted inside a congested, operational M&E plant", "On Site"),
 ("photo", P("89b08535-IMG_4038.jpeg"),
   "Challenge 1 — no welding allowed on the container",
   "Every connection had to be mechanical, not welded", "The Challenge"),
 ("draw",  D("bp2.png"),
   "Solution: base plates bolted to existing C-channel",
   "6 nos GR8.8 M16 anchor bolts  ·  240×150 plate + backing plate  ·  SS304 fixings", "Engineering Drawing"),
 ("photo", P("92f5a323-IMG_4032.jpeg"),
   "Handrails in marine-grade stainless steel",
   "Ø44.45 & Ø48.3mm CHS  ·  PE-endorsed to Eurocode 3", "Fabrication"),
 ("photo", P("234dffd3-IMG_4944.jpeg"),
   "Challenge 2 — securing the cat-ladder for safe access",
   "Climbing access protected by a fall-arrestor system", "Fall Protection"),
 ("draw",  D("frame_srl.png"),
   "Overhead anchorage on a 100×50×5 RHS support frame",
   "HARU HE-10 self-retracting lifeline  ·  EN360 certified  ·  with karabiner & anchor", "Engineering Drawing"),
 ("draw",  D("ladconn.png"),
   "Cat-ladder fixed to existing C-channel & unistrut",
   "SS304 25×50×3mm ladder  ·  435mm clearance  ·  PE-endorsed design", "Engineering Drawing"),
 ("photo", P("02072201-IMG_4948.jpeg"),
   "Engineered. Bolted. Certified safe.",
   "By Ezzogenics Pte Ltd  —  metalsingapore.sg  ·  metalglassworksingapore.com", "Ezzogenics"),
]

for i,s in enumerate(segs):
    out=os.path.join(OUT,f"s{i:02d}.png")
    if s[0]=="photo": build_photo(s[1],s[2],s[3],s[4],out)
    else: build_draw(s[1],s[2],s[3],s[4],out)
print("DONE", len(segs))
