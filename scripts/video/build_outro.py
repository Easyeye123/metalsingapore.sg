#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

LOGO="/root/.claude/uploads/2d11a447-9f46-51e3-bac9-5f928b152c50/1367426c-EZZ_Logo_Ezzogenics.jpeg"
GREEN=(140,198,63); LIGHT=(230,236,242); SUBC=(165,175,185); WHITEC=(245,248,250)
FB="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FR="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
def font(b,s): return ImageFont.truetype(FB if b else FR, s)

def steel_bg(W,H):
    base=Image.new("RGB",(W,H)); px=base.load(); top=(28,36,48); bot=(9,12,17)
    for y in range(H):
        t=y/H; c=(int(top[0]*(1-t)+bot[0]*t),int(top[1]*(1-t)+bot[1]*t),int(top[2]*(1-t)+bot[2]*t))
        for x in range(W): px[x,y]=c
    return base

def make(W,H,out, logo_w, sizes):
    s_head,s_serv,s_web,s_lbl,s_addr,s_con = sizes
    canvas=steel_bg(W,H); d=ImageDraw.Draw(canvas,"RGBA")
    def ctext(y,txt,f,fill,gap=0):
        b=d.textbbox((0,0),txt,font=f); w=b[2]-b[0]
        d.text(((W-w)//2,y),txt,font=f,fill=fill); return y+(b[3]-b[1])+gap
    # logo plate (top, centered)
    logo=Image.open(LOGO).convert("RGB"); lw=logo_w; lh=int(lw*logo.height/logo.width)
    logo=logo.resize((lw,lh),Image.LANCZOS); pad=int(lw*0.05)
    cw,ch=lw+pad*2,lh+pad*2; cx=(W-cw)//2; cy=int(H*0.055)
    sh=Image.new("RGBA",(W,H),(0,0,0,0))
    ImageDraw.Draw(sh).rounded_rectangle((cx-6,cy-4,cx+cw+6,cy+ch+8),radius=24,fill=(0,0,0,150))
    sh=sh.filter(ImageFilter.GaussianBlur(18))
    canvas=Image.alpha_composite(canvas.convert("RGBA"),sh).convert("RGB"); d=ImageDraw.Draw(canvas,"RGBA")
    plate=Image.new("RGB",(cw,ch),(255,255,255)); plate.paste(logo,(pad,pad))
    mask=Image.new("L",(cw,ch),0); ImageDraw.Draw(mask).rounded_rectangle((0,0,cw,ch),radius=20,fill=255)
    canvas.paste(plate,(cx,cy),mask)

    y=cy+ch+int(H*0.045)
    y=ctext(y,"WORKS BY EZZOGENICS",font(True,s_head),LIGHT,int(H*0.024))
    aw=int(W*0.26); d.rounded_rectangle(((W-aw)//2,y,(W+aw)//2,y+6),radius=3,fill=GREEN); y+=int(H*0.035)
    y=ctext(y,"Metal Fabrication  ·  Glass Works  ·  Handrails  ·  Cat-Ladders  ·  Fall-Arrestor Access",
            font(True,s_serv),SUBC,int(H*0.03))
    # websites
    y=ctext(y,"ezzogenics.com    ·    metalsingapore.sg",font(True,s_web),GREEN,int(H*0.012))
    y=ctext(y,"metalglassworksingapore.com    ·    ezzo.sg",font(True,s_web),GREEN,int(H*0.045))
    # address
    y=ctext(y,"15 Kaki Bukit Road 4, #01-44 Bartley Biz Centre",font(False,s_addr),LIGHT,int(H*0.010))
    y=ctext(y,"Singapore 417808",font(False,s_addr),LIGHT,int(H*0.040))
    # contacts
    y=ctext(y,"WhatsApp David  9632 0750",font(True,s_con),WHITEC,int(H*0.012))
    y=ctext(y,"Office  6968 3098",font(True,s_con),WHITEC,0)
    canvas.save(out); print("outro",os.path.basename(out),(W,H))

# H: sizes (head,serv,web,lbl,addr,con)
make(1920,1080,"/tmp/vid/outro_h.png", logo_w=440, sizes=(66,34,44,30,42,52))
make(1080,1920,"/tmp/vid/outro_v.png", logo_w=780, sizes=(66,32,44,30,46,56))
