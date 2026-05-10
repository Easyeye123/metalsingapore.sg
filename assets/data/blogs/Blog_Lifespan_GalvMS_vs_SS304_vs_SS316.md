# How Long Will It Last? Galvanised Mild Steel vs SS304 vs SS316 in Sea Spray, Sun and Rain

## A lifespan comparison drawn from the EN10025 workbook's material family data and corrosion guidance

If you stand on a coastal walkway in Singapore, Penang, or Subic Bay, you will see three metals doing the same job — handrails, brackets, fasteners, ladders, fence posts, anchor plates — and aging at very different rates. One will be visibly rusting within a year. Another will sit cleanly for two decades. The third will outlive its concrete foundation.

The EN10025_Steel_Grades_Comparison workbook captures the chemistry, the standards, and the catalogue side of this story across three material families:

- **Galvanised mild steel** (JYF MS Galv Sheets, JIS G3302 SGCC/SGHC)
- **Stainless steel SS304** (1.4301, EN 10088-4)
- **Stainless steel SS316 / 316L** (1.4401 / 1.4404, EN 10088-4)

This post translates that data into a practical lifespan comparison for the harshest realistic exposure: **sea-water salt + tropical sun + heavy rain**.

---

## The corrosion mechanisms — why the numbers are what they are

### Galvanised mild steel — sacrificial protection

Hot-dip galvanising deposits a metallurgically-bonded layer of zinc on a mild steel substrate. The workbook's MS Galv Sheets sheet lists JIS G3302 specifications including coating classes Z18, Z22, Z25, and Z27 — these numbers refer to the total zinc mass in g/m² across both faces (Z27 = 275 g/m²).

**The protection mechanism is sacrificial**: zinc oxidises in preference to iron, so even if the coating is scratched, the surrounding zinc continues to protect the exposed steel by forming a zinc-rich oxide layer at the cut edge. The catch: once the zinc is consumed, the steel substrate is fully exposed and rusting begins.

Zinc consumption rate depends on the corrosion environment and is well-characterised by ISO 9223 corrosivity categories:

| Category | Description | Typical zinc loss |
|---|---|---|
| C1 | Very low (heated indoor) | <0.1 µm/year |
| C2 | Low (unheated indoor, dry rural) | 0.1–0.7 µm/year |
| C3 | Medium (urban, mild industrial) | 0.7–2.1 µm/year |
| C4 | High (industrial, coastal inland) | 2.1–4.2 µm/year |
| **C5-M** | **Very high — coastal/marine** | **4.2–8.4 µm/year** |
| CX | Extreme (offshore, splash zone) | 8.4–25 µm/year |

A typical hot-dip galvanised coating to BS EN ISO 1461 on structural steel (≥6 mm thick) delivers 85 µm minimum mean coating thickness. In **C5-M coastal exposure** (sea spray, sun, rain — exactly our scenario), zinc loss runs ~4.2–8.4 µm/year.

### Stainless steel — passive protection

SS304 and SS316 protect themselves with a chromium-rich passive oxide film roughly 1–3 nanometres thick that re-forms instantly when scratched, provided oxygen is present. The workbook's Cross-Material Strength sheet captures the compositional difference that drives their performance gap:

- **SS304 (1.4301):** ~18% Cr, ~10% Ni — *"Most common austenitic grade; good corrosion resistance; general fabrication"*
- **SS316 (1.4401):** ~17% Cr, ~12% Ni, **~2% Mo** — *"Mo addition → superior pitting/crevice corrosion resistance"*
- **SS316L (1.4404):** same as 316 but low carbon — *"Low-carbon; standard for marine & chemical plant"*

That 2% molybdenum is the entire story. Mo stabilises the passive film against attack by chloride ions — exactly what sea spray delivers. SS304 in chloride exposure can suffer **pitting** (localised passive film breakdown) and **crevice corrosion** (under washers, in joints, behind fixings) where chlorides concentrate and oxygen is depleted.

### What sea-water salt actually does

Aerosolised marine chlorides settle on surfaces, dissolve in dew or rain, and concentrate during sun-driven evaporation cycles. Two failure modes dominate:

1. **For galvanised steel:** chlorides accelerate zinc oxidation, especially during wet–dry cycles where soluble zinc chloride forms and washes away rather than passivating
2. **For stainless steel:** chlorides locally pierce the passive film, initiating pits that can grow self-sustainingly because pit interiors become acidic and chloride-rich

Sun and rain together are the most aggressive combination — UV doesn't damage these metals directly, but the heat-driven wet/dry cycling concentrates salt at the surface and then re-dissolves it, repeating the attack thousands of times per year.

---

## Lifespan estimates — coastal tropical exposure (C5-M / splash zone)

Combining ISO 9223 zinc loss data, ISO 12944 paint/coating system service-life curves, and published marine pitting data for austenitic stainless in chloride service:

| Material | Wall / coating thickness | Time to first significant corrosion | Time to structurally compromise (typical handrail / bracket) | Maintenance interval |
|---|---|---|---|---|
| **Galvanised mild steel — Z18 sheet (~18 µm Zn)** | 0.5–1.0 mm sheet | **2–3 years** | **5–8 years** before through-rust on thin sheet | Repaint or re-galv every 5–7 years |
| **Galvanised mild steel — hot-dip 85 µm to BS EN ISO 1461** | 6 mm structural section | **8–12 years** before red rust appears | **15–25 years** before significant section loss | Recoat at 12–15 years, before red rust spreads |
| **Galvanised mild steel — heavy duplex (galv + paint)** | 85 µm Zn + 200 µm paint system | **15–20 years** to first maintenance | **25–35 years** before major refurbishment | Touch-up coats at 15-year intervals |
| **SS304 in coastal/marine** | Any wall, suitable for occasional splash | **6–24 months** to first surface tea-staining | **10–20 years** if washed periodically; pitting risk if salt is allowed to dwell | Annual fresh-water rinse advisable |
| **SS304 with regular rinsing, sheltered from direct salt deposit** | — | 5+ years to visible staining | 25–40 years | Quarterly rinse, no recoating |
| **SS316 / 316L in coastal/marine atmospheric** | — | **3–5 years** to mild tea-staining (cosmetic) | **40–60+ years** structurally | Annual rinse for appearance only |
| **SS316 / 316L in continuous salt-water immersion** | — | Cosmetic discolouration | **30–40 years** with crevice-free design | Inspect crevices and welds |

A few qualitative observations from the workbook's Design Standards sheet to anchor these numbers:

> *Carbon steel — corrosion protection: Required (paint, galvanise, etc.). Life-cycle cost: high maintenance cost.*
> *Stainless steel — corrosion protection: Not required (inherent). Life-cycle cost: very low maintenance.*

The workbook's Strength-to-Weight sheet rates corrosion suitability bluntly:

- Carbon steel S235–S500: ***"Poor (paint/galv needed)"***
- SS304: ***"Excellent (rural/urban)"***
- SS316: ***"Excellent (marine/industrial)"***
- 2205 Duplex: ***"Outstanding"***

Note the wording difference between SS304 and SS316: *rural/urban* versus *marine/industrial*. SS304 is not formally rated for marine service — it works there, but with a finite cosmetic lifespan and a real pitting risk.

---

## What "tea-staining" actually means

If you've ever seen brown discolouration spreading across SS304 stair railings near the sea, that's tea-staining: superficial iron oxide bloom from minute pitting and from iron contamination embedded during fabrication (grinding swarf, contact with carbon steel tools). It's **cosmetic, not structural** — but it offends owners and tarnishes architectural intent.

SS316 develops tea-staining far more slowly because Mo suppresses the pit nucleation that generates the iron oxide. In Singapore's coastal projects (Marina Bay, Sentosa, Tuas), specifiers routinely upgrade exterior balustrades from 304 to 316L for this reason alone, even though 304 would carry the load fine.

---

## Practical lifespan rankings — sea spray + tropical sun + rain

From shortest to longest expected service life *before requiring intervention*:

1. **Plain mild steel** (no coating) — **weeks to months**. Not viable in coastal exposure.
2. **Light-gauge galvanised sheet (Z18, 0.5 mm)** — **2–5 years** before through-rust on thin sections. Suitable only for short-life or replaceable parts (gutters, flashings).
3. **Hot-dip galvanised structural steel (85 µm Zn, BS EN ISO 1461)** — **15–25 years** before red rust becomes structurally significant. Long-standing workhorse for coastal infrastructure when given a single mid-life recoat.
4. **SS304** — **10–20 years** functionally; **2–5 years** to first cosmetic tea-staining if salt is allowed to dwell. Needs regular rinsing for aesthetic life.
5. **Duplex galvanised + painted system** — **25–35 years** to major refurbishment. The traditional "best of carbon steel" coastal solution.
6. **SS316 / 316L** — **40–60+ years** structurally; minor cosmetic intervention only. The default specification for visible coastal stainless.
7. **2205 Duplex stainless** (workbook lists this as *"Offshore, desalination, high-load corrosive service"*) — **60+ years**, near-unlimited atmospheric service life.

---

## What this means in practice

The workbook's catalogue and standards data point toward three clear specification rules for sea-spray-exposed projects in a tropical climate:

### Rule 1 — Galvanised mild steel is fine for hidden or robustly-coated structural steelwork, with a maintenance plan

Hot-dip galvanised structural sections behind cladding, in plant rooms set back from direct salt deposit, or as the substrate for a duplex (galv + paint) system give 15–35 years of service. Plan the recoat. The JYF MS Galv Sheets catalogue (JIS G3302) is appropriate stock.

### Rule 2 — SS304 belongs inland, indoors, or on rinsable architectural elements

The workbook's *"rural/urban"* rating is the giveaway. SS304 is wrong for handrails, balustrades, fasteners, or fittings in direct sea-spray exposure — not because it fails structurally, but because it tea-stains within months and develops pits over years that compromise both appearance and longevity.

### Rule 3 — SS316 / 316L is the coastal default for visible work

The 2% Mo addition triples to quadruples the cosmetic life and roughly doubles the structural life relative to SS304 in chloride exposure. The cost premium (≈10–15% over SS304 per tonne) is small relative to the avoided maintenance and aesthetic deterioration. The TSA SS Catalogue lists 316L as a standard grade for square, rectangular, slotted, and round tube — which is why it's the workhorse of tropical-coastal architectural metalwork.

For severe environments — offshore, splash zone, desalination, chlorinated pool plant — step up further to 2205 duplex.

---

## A simple decision flow

1. **Will it be painted, hidden, or set back from direct sea spray?** → Hot-dip galvanised mild steel + maintenance plan. 15–25 year service.
2. **Will it be visible, touchable, and exposed to coastal air but not direct splash?** → SS316/316L. Lifetime aesthetic and structural service with annual rinse.
3. **Will it be in splash, immersion, or chemical-marine exposure?** → SS316L minimum, consider 2205 duplex. 40–60+ year structural service.
4. **Will it be in a clean, dry, indoor environment?** → SS304 is fine; mild steel painted is fine.

The workbook gives the engineer a single document where the mechanical, fabrication, catalogue, and corrosion-suitability data line up — so this decision can be made with the numbers visible, not by tradition or by gut feel.

---

*Sources: EN10025_Steel_Grades_Comparison.xlsx — Cross-Material Strength sheet (EN 10088-4:2009), Strength-to-Weight sheet (corrosion suitability ratings), Design Standards sheet (life-cycle cost commentary), Weldability sheet (austenitic SS welding), MS Galv Sheets sheet (JIS G3302-1987 SGCC/SGHC, Z18/Z22/Z25/Z27 coating classes), SS Catalogue (TSA Industries — ASTM A554 grades 304/316L). External standards referenced: ISO 9223 atmospheric corrosivity categories, ISO 12944 paint protective systems, BS EN ISO 1461 hot-dip galvanising.*
