#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

LOGO="/root/.claude/uploads/2d11a447-9f46-51e3-bac9-5f928b152c50/1367426c-EZZ_Logo_Ezzogenics.jpeg"
OUT="/tmp/vid"
GREEN=(140,198,63)
LIGHT=(228,234,240)
SUBC=(160,170,180)
FB="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FR="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
def font(b,s): return ImageFont.truetype(FB if b else FR, s)

def steel_bg(W,H):
    base=Image.new("RGB",(W,H)); px=base.load(); top=(28,36,48); bot=(9,12,17)
    for y in range(H):
        t=y/H; c=(int(top[0]*(1-t)+bot[0]*t),int(top[1]*(1-t)+bot[1]*t),int(top[2]*(1-t)+bot[2]*t))
        for x in range(W): px[x,y]=c
    return base

def tw(d,t,f): b=d.textbbox((0,0),t,font=f); return b[2]-b[0]

def make(W,H,out, logo_frac, head_s, web_s, tag_s):
    canvas=steel_bg(W,H)
    logo=Image.open(LOGO).convert("RGB")
    # white plate sized to logo
    lw=int(W*logo_frac); lh=int(lw*logo.height/logo.width)
    logo=logo.resize((lw,lh), Image.LANCZOS)
    pad=int(lw*0.06)
    cw,ch=lw+pad*2, lh+pad*2
    cx=(W-cw)//2; cy=int(H*0.30)-ch//2 if H>W else int(H*0.34)-ch//2
    # shadow
    sh=Image.new("RGBA",(W,H),(0,0,0,0))
    ImageDraw.Draw(sh).rounded_rectangle((cx-8,cy-6,cx+cw+8,cy+ch+12),radius=30,fill=(0,0,0,160))
    sh=sh.filter(ImageFilter.GaussianBlur(22))
    canvas=Image.alpha_composite(canvas.convert("RGBA"),sh).convert("RGB")
    plate=Image.new("RGB",(cw,ch),(255,255,255)); plate.paste(logo,(pad,pad))
    mask=Image.new("L",(cw,ch),0); ImageDraw.Draw(mask).rounded_rectangle((0,0,cw,ch),radius=26,fill=255)
    canvas.paste(plate,(cx,cy),mask)
    d=ImageDraw.Draw(canvas,"RGBA")
    # green accent underline beneath plate
    aw=int(cw*0.5); ax=(W-aw)//2; ay=cy+ch+int(H*0.045)
    d.rounded_rectangle((ax,ay,ax+aw,ay+6),radius=3,fill=GREEN)
    # tagline
    f_tag=font(True,tag_s)
    tag="STEEL FABRICATION · GLASS · SAFETY ACCESS SOLUTIONS"
    d.text(((W-tw(d,tag,f_tag))//2, ay+int(H*0.03)), tag, font=f_tag, fill=SUBC)
    # heading
    f_head=font(True,head_s)
    htxt="EZZOGENICS PTE LTD"
    d.text(((W-tw(d,htxt,f_head))//2, ay+int(H*0.075)), htxt, font=f_head, fill=LIGHT)
    # websites (green)
    f_web=font(True,web_s)
    web="metalsingapore.sg     metalglassworksingapore.com"
    d.text(((W-tw(d,web,f_web))//2, ay+int(H*0.075)+head_s+int(H*0.018)), web, font=f_web, fill=GREEN)
    canvas.save(out); print("intro", os.path.basename(out), (W,H))

make(1920,1080, OUT+"/intro_h.png", logo_frac=0.46, head_s=44, web_s=34, tag_s=24)
make(1080,1920, OUT+"/intro_v.png", logo_frac=0.74, head_s=44, web_s=30, tag_s=21)
