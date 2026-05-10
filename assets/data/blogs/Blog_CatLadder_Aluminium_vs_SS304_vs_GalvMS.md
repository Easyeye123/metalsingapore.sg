# Cat Ladders for Singapore Buildings: Choosing Between Aluminium, SS304 and Galvanised Mild Steel

*Companion to the EN10025 Steel Grades Comparison workbook — for designers and contractors specifying fixed access ladders to BS EN ISO 14122-4, SS 570 and SCDF requirements.*

---

## Why this blog matters

A "cat ladder" is the industry term for a **fixed vertical ladder** — the kind found on roof access points, water tanks, plant decks, mezzanines, telecom shelters, and SCDF-mandated rescue hatches in storey shelters. It looks simple: two stiles, a row of rungs, a few wall brackets. But it is a **life-safety component**: a person at the top of a 6 m run can be carrying 100 kg of body + tools, and the ladder must stay rigid even after a slip-fall arrest event.

Three materials dominate the market in Singapore:

1. **Aluminium** (typically alloy **6061-T6** or **6063-T6**) — light, corrosion-resistant, premium price.
2. **Stainless Steel SS304** — strong, corrosion-resistant, medium-heavy weight, premium price.
3. **Galvanised Mild Steel** — usually a **S235 / S275 / S355** structural section, hot-dip galvanised to **BS EN ISO 1461**. Lowest material cost, heaviest, requires re-coating long-term.

This blog walks through the **structural strength differences** that drive the choice, with reference to **BS EN ISO 14122-4** (the EN ladder design code), **SS 570** (Singapore PPE/fall-protection standard), and **SCDF storey-shelter cat-ladder requirements**.

---

## 1. The design loads every cat ladder must meet

The starting point for any selection is **what the ladder must carry**. Per **BS EN ISO 14122-4:2016 (Safety of machinery — Permanent means of access — Part 4: Fixed ladders)**:

| Load case | Magnitude | Where applied |
|---|---|---|
| Rung load **F1** (one person) | **1.5 kN** | Mid-rung, distributed over 100 mm |
| Stile load **F2** (one person) | **1.5 kN** | Each stile, 2 m apart |
| Fall-arrester anchor load | **≥ 6 kN** | Top anchor, when device activates |
| Each anchorage point to wall | **≥ 3 kN** per stile (two-stile ladder) | Each of four anchor points |
| Single-stile ladder | **≥ 6 kN** | Through the single stile |

For comparison, **OSHA 29 CFR 1910.23** requires every fixed ladder to support **≥ 250 lb (≈ 1.13 kN)** on any two consecutive rungs simultaneously ([OSHA fixed ladder requirements](https://okeeffes.com/a-brief-guide-to-oshas-fixed-ladder-requirements/)).

In Singapore, **SCDF Technical Requirements for Storey Shelters 2021, Clause 2.11.2** mandates that **"the cat-ladder shall be made of either stainless steel or aluminium or equivalent"**, and **"the mounting connections of cat-ladder to the SS wall shall be designed to withstand shock loads of at least 12.5 g in all directions"** ([SCDF](https://www.scdf.gov.sg/home/civil-defence-shelter/acts-and-requirements/technical-requirements-for-storey-shelters-2021/chapter-2-architectural-requirements/clause-2.11-design-requirements-of-ss)). For an 80 kg cat ladder, 12.5 g translates to a **10 kN shock load** in each direction — a very onerous requirement that filters out flimsy materials immediately.

> **Takeaway:** SCDF actively excludes mild steel for shelter cat ladders. For non-shelter applications (factory roof access, water tanks, plant rooms), all three materials are permitted, but **EN 14122-4 is the load benchmark the designer must satisfy regardless of material**.

---

## 2. Material strength compared

Drawing on data from the **Cross-Material Strength** and **Strength-to-Weight** sheets in the workbook, plus ASTM/EN handbook values:

| Property | Galv MS (S275) | Galv MS (S355) | SS304 | Aluminium 6063-T6 | Aluminium 6061-T6 |
|---|---|---|---|---|---|
| Yield strength fy | **275 MPa** | **355 MPa** | **210 MPa** | **214 MPa** | **276 MPa** |
| Ultimate tensile strength | 410–560 MPa | 470–630 MPa | 515–720 MPa | 241 MPa | 310 MPa |
| Density ρ | 7,850 kg/m³ | 7,850 kg/m³ | 8,000 kg/m³ | **2,700 kg/m³** | **2,700 kg/m³** |
| Modulus of elasticity E | **210 GPa** | 210 GPa | 200 GPa | **69 GPa** | 69 GPa |
| Strength-to-weight (fy/ρ) | 35 kN·m/kg | 45 kN·m/kg | 26 kN·m/kg | **79 kN·m/kg** | **102 kN·m/kg** |
| EN partial factor γM0 | 1.00 | 1.00 | **1.10** (EN 1993-1-4) | 1.10 (EN 1999) | 1.10 (EN 1999) |
| Elongation at break | 22–26% | 22% | **45%** | 12% | 12% |

Sources: workbook *Cross-Material Strength* sheet, [Kloeckner 6061 vs 6063](https://www.kloecknermetals.com/blog/comparing-6061-vs-6063-aluminum/), [AMD Supply](https://amdaluminum.com/6061-mill-finish-vs-6063-mill-finish/).

### What this means for ladder design

**(a) Stiffness — not strength — usually governs cat ladder design.**
A cat ladder is a long slender column subject to load away from the wall. Deflection and lateral stability govern far more than yield. Aluminium has only **one-third** the stiffness of steel (E = 69 GPa vs 210 GPa). So although **6061-T6 has yield strength comparable to S275 mild steel**, an aluminium stile must be **deeper or thicker** to match the same deflection limit. EN ISO 14122-4 implicitly recognises this: most aluminium ladders use thicker box-section stiles (e.g. 50×50×4 mm hollow) instead of the typical 50×10 mm flat stile used for steel.

**(b) Stainless SS304 has lower yield, higher elongation, and a 10% strength penalty.**
SS304 yields at 210 MPa, slightly *below* even S235 mild steel. It also carries a higher partial factor (**γM0 = 1.10** per EN 1993-1-4 vs **1.00** for carbon steel per EN 1993-1-1) — meaning the designer must reduce its capacity by another ~10% in calculations. To compensate, SS304 ladders are usually fabricated from **slightly thicker stiles** than mild-steel equivalents. The pay-off is **45% elongation** (more than double mild steel's 22–26%), which gives SS304 superb energy absorption during a fall-arrest event.

**(c) Galvanised mild steel has the best raw strength — when uncorroded.**
S275 galvanised is the workhorse material for industrial cat ladders. Yield is high, stiffness is high, and the section can be slim. The catch is **corrosion**: once the galvanising is breached the underlying steel rusts rapidly, and section loss erodes capacity. For an outdoor ladder in Singapore (humid, rain, salt-laden coastal air), a typical 80 µm hot-dip galvanising lasts **15–25 years in C3 environments**, but only **5–10 years in C5-M coastal/industrial** zones (BS EN ISO 14713-1).

---

## 3. Worked example — a 4 m roof access cat ladder

Let's apply EN ISO 14122-4 loads to a typical **4 m rise, 400 mm rung width, 4-bracket fixing** ladder, and see what stile section each material needs.

**Design action on each stile (worst case, person at mid-height):**
- F2 = 1.5 kN per stile, applied 2 m apart → bending moment in stile ≈ **0.75 kN·m**
- Plus self-weight bending and a 1.0 kN service torque from a slip event (typical assumption)
- Total design moment **MEd ≈ 1.0 kN·m**

**Required plastic section modulus Wpl,Rd:**

\[
W_{pl,Rd} \geq \frac{M_{Ed} \cdot \gamma_{M0}}{f_y}
\]

| Material | fy | γM0 | Required Wpl | Typical stile section |
|---|---|---|---|---|
| Galv MS S275 | 275 MPa | 1.00 | **3.6 cm³** | **40 × 8 mm flat** (Wpl = 3.2 cm³) — slightly under, use 50×8 (Wpl = 5.0 cm³) |
| SS304 | 210 MPa | 1.10 | **5.2 cm³** | **50 × 10 mm flat** (Wpl = 6.25 cm³) ✓ |
| Al 6061-T6 | 276 MPa | 1.10 | **4.0 cm³** | **50 × 50 × 4 mm SHS** (Wpl = 5.4 cm³) ✓ — but check deflection |
| Al 6063-T6 | 214 MPa | 1.10 | **5.1 cm³** | **60 × 60 × 4 mm SHS** (Wpl = 7.4 cm³) ✓ |

Now the interesting part — **deflection** under F2 = 1.5 kN at mid-stile, simply supported between brackets at 1.5 m centres:

\[
\delta = \frac{F L^3}{48 E I}
\]

For the same stile sections above:

| Material | I (cm⁴) | E (GPa) | δ at 1.5 kN over L = 1.5 m |
|---|---|---|---|
| MS S275, 50×8 flat | 8.3 | 210 | **0.5 mm** |
| SS304, 50×10 flat | 10.4 | 200 | **0.6 mm** |
| Al 6061-T6, 50×50×4 SHS | 22.0 | 69 | **0.7 mm** |

> The **aluminium SHS** is the bulkiest section but achieves comparable deflection because of its larger second moment of area I — the engineer trades section depth for the lower modulus.

This is exactly why aluminium cat ladders **look chunkier** than steel ones for the same span — and why a "spindly" aluminium ladder is a red flag for under-design.

---

## 4. Suitability summary — when to pick each material

| Application | Best choice | Why |
|---|---|---|
| **SCDF storey-shelter rescue hatch** | **SS304 or Aluminium** (mandated) | Mild steel not permitted; 12.5 g shock requirement |
| **Indoor plant room, dry environment** | **Galv MS** | Lowest material cost, longest life when dry, easy to weld and modify |
| **Coastal / marine roof access** | **SS316** preferred, **SS304 acceptable** | Galv life < 10 years; aluminium pits in chloride splash |
| **Petrochemical / industrial C5 zone** | **SS316** | Galv corrodes; SS304 risks pitting from chlorides + chemicals |
| **Lightweight rooftop ladder, low load** | **Aluminium 6061-T6** | Easy to install single-handed; no painting; rust-free |
| **Heavy industrial cat ladder, frequent traffic** | **Galv MS S355** | Highest stiffness, lowest cost, easy to inspect and repair |
| **Food / pharma plant** | **SS304/SS316** | Hygienic, no flaking paint, easy to clean |

---

## 5. Compliance snapshot — what to specify on the drawing

Whichever material you pick, the drawing should call up:

- **Geometry**: Rung spacing 225–300 mm constant (EN 14122-4 §5.2.2.2). Clear width ≥ 150 mm and ≤ 250 mm between stile and slip-protection (§5.2.2.3). Tread surface ≥ 20 mm flat (§5.2.2.4).
- **Clearance**: ≥ 650 mm in front of rungs, ≥ 200 mm behind (EN 14122-4 §4.4). 7-inch (≈ 178 mm) minimum behind for OSHA-aligned design.
- **Fall protection** (above 3 m climbing height per EN 14122-4 §4.4.2.2, or 24 ft per OSHA 1910.28): cage **or** ladder safety system **or** personal fall arrest. For new ladders > 24 ft (7.3 m), most modern standards now require a rail-based safety system rather than a cage ([OSHA 2017 update](https://www.lapeyrestair.com/blog/is-your-caged-ladder-osha-compliant/)).
- **Single-flight max length**: 6 m without a rest platform; **rest platform required at ≥ 12 m** with fall arrester, ≥ 24 m without ([KRAUSE EN 14122-4 guide](https://www.krause-systems.co.uk/fileadmin/krauseproducts/files/Fixed%20ladders%20according%20to%20DIN%2014122-4.pdf)).
- **Material grade + finish**:
  - Galv MS: "S275JR to BS EN 10025-2, hot-dip galvanised to BS EN ISO 1461, minimum coating 85 µm"
  - SS304: "1.4301 to BS EN 10088-2, polished to 240-grit, all welds passivated"
  - Aluminium: "6061-T6 or 6063-T6 to BS EN 573-3, anodised 25 µm minimum"
- **Anchorage design**: each anchor **≥ 3 kN** (or ≥ 6 kN single-stile); **shock 12.5 g** if SCDF storey-shelter.
- **Welding**: SS304 use 308L/308LSi filler, avoid sensitisation 425–850 °C (workbook *Weldability* sheet). MS: E7018 or equivalent. Aluminium: 4043 or 5356 filler depending on alloy.

---

## 6. Cost reality (Singapore market, indicative 2024–2026)

For a typical **4 m, 2-stile cat ladder with 4 wall brackets, no cage**, fabricated and installed:

| Material | Indicative cost | Service life (Singapore tropical) |
|---|---|---|
| Galv MS S275 | **S$ 350–500** | 15–25 years inland; 5–10 years coastal |
| SS304 | **S$ 1,200–1,800** | 25+ years inland; 15–20 years coastal |
| SS316 | **S$ 1,600–2,400** | 30+ years coastal; 50+ inland |
| Aluminium 6061-T6 | **S$ 1,000–1,500** | 30+ years (no rust, anodising lasts) |

When you divide **cost by service life**, SS304 and aluminium often beat galvanised mild steel for **outdoor coastal applications**. For dry indoor plant access, galv MS remains the most cost-effective.

---

## 7. Bottom line

- **For sheer strength-per-millimetre, S355 galvanised mild steel still wins** — but durability is the limiting factor in Singapore's climate.
- **SS304 is the best all-round structural choice**, especially for life-safety installations where the ladder must remain trustworthy for decades.
- **Aluminium is the lightest and most corrosion-immune option**, but the lower stiffness (E = 69 GPa) forces designers to use thicker stiles — a "skinny" aluminium ladder is almost certainly under-designed.
- **SCDF mandates SS or aluminium for storey-shelter cat ladders**, with a 12.5 g shock-load anchorage check that is far more onerous than the EN 14122-4 baseline.
- Whatever material you pick, **specify to BS EN ISO 14122-4** for geometry and loads, and call up the matching coating standard.

The next blog in this series covers **how the ladder is anchored to the wall** — concrete vs AAC vs cement block — and the engineering details that prevent the most common failure mode: anchor pull-out.

---

*References cited inline. Workbook source: EN10025_Steel_Grades_Comparison.xlsx (Cross-Material Strength, Strength-to-Weight, Design Standards, Weldability sheets).*
