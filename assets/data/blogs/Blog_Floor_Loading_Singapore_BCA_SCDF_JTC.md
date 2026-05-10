# Floor Loading in Singapore — Who Sets the Numbers, How They're Calculated, and Where SCDF Actually Fits In

> **A practical engineer's guide to BCA, JTC and SCDF floor-load requirements — with the maths, the diagrams, and the citations.**
>
> *Written for QPs, M&E coordinators and project managers preparing slab-loading submissions, equipment laydown plans, fire-engine accessways and storey-shelter rebars in Singapore.*

---

## 1.  The single most-misquoted fact about Singapore floor loading

If you read tenant fit-out brochures or industrial-property listings, you will see lines like *"SCDF requires 7.5 kN/m² floor loading."* That sentence is almost always wrong.

**SCDF does not regulate general floor loading.** SCDF regulates **fire-specific** loads only:

- the slabs that form a Civil Defence **Storey Shelter** ([SCDF TR-SS 2021, Cl. 2.3](https://www.scdf.gov.sg/home/civil-defence-shelter/acts-and-requirements/technical-requirements-for-storey-shelters-2021/chapter-2-architectural-requirements/clause-2.3-wall-and-slab-thickness-of-thickness-of-ss-and-ns)),
- a **fire-engine accessway** that the appliance has to drive over and jack on ([SCDF Fire Code, Appendix G](https://www.scdf.gov.sg/docs/default-source/fire-safety-docs/downloads/fire-code-2007-master-version/appendix_g.pdf?sfvrsn=72c0a641_1)),
- and the live-load arithmetic of an **Area of Refuge / refuge floor** ([SCDF Fire Code 2023, Cl. 9.2](https://www.scdf.gov.sg/fire-safety-services-listing/fire-code-2023/table-of-content/chapter-9-additional-requirements-for-each-purpose-group/clause-9.2-purpose-group-ii-occupancy)).

Everything else — the office at 2.5 kN/m², the warehouse at 15 kN/m², the gym mezzanine at 5 kN/m² — is set by **BCA via the Eurocodes** and (for industrial estates) by **JTC**.

![Authority hierarchy for floor loading in Singapore](blog_images/floor_loading/05_authority.png)

The Building Control Act delegates structural-load setting to BCA's *Approved Document*, which has formally adopted the Eurocodes since 2013 ([BCA Approved Document](https://www.bca.gov.sg/publications/BuildingControlAct/others/Approveddocument.pdf)). For industrial buildings on JTC land, JTC's tenancy and design-guide minimums layer **on top** of BCA. SCDF's fire-specific loads layer **on top** of both. **All three apply in parallel — the structural design must satisfy the most onerous of them.**

---

## 2.  How a floor load is actually specified — UDL vs point load

Engineers don't pick a single "floor load" number. Eurocode 1 specifies imposed loads as **two simultaneous values** ([EN 1991-1-1 §6.3.1.2](https://eurocodes.jrc.ec.europa.eu/sites/default/files/2022-06/EN1991_2_Malakatas.pdf)):

| Symbol | Name | Units | What it represents |
|---|---|---|---|
| **qₖ** | Characteristic UDL | kN/m² | Smeared load across the whole floor — used for global effects (deflection, span moments, column loads) |
| **Qₖ** | Characteristic point load | kN | A concentrated load on a small footprint (50 × 50 mm) — used for local effects (punching shear, slab top reinforcement, finishes) |

Both must be considered, **but never simultaneously on the same element** — whichever produces the worst effect governs.

![UDL vs point load on a slab](blog_images/floor_loading/01_udl_vs_point.png)

### Why two numbers?

Because a real floor sees both kinds of load at once. An office suite at 2.5 kN/m² UDL also has to take a single 2.7 kN load from a server cabinet wheel ([SS EN 1991-1-1 NA, Table NA.3](https://www.singaporestandardseshop.sg/Product/GetPdf?fileName=180331113347NA%28plus%29A1-2017+to+SS+EN+1991-1-1-2008+%282017%29_Preview.pdf&pdtid=0a46b2e7-732c-4287-b8ef-b0cb67914c6d)). The UDL says "the slab as a whole won't deflect"; the point load says "the slab won't punch through where the wheel sits."

---

## 3.  The general regime — Singapore National Annex to SS EN 1991-1-1

Within SS EN 1991-1-1 the recommended European values are bracketed ranges (e.g. Cat A floors *qₖ* 1.5 – 2.0 kN/m²). Singapore's **National Annex** (NA + A1:2017) closes the brackets and adds local sub-categories. The values you must use in Singapore are in **Table NA.3** (residential / office / public / shop) and **Table NA.5** (storage) ([SS EN 1991-1-1 NA Tables NA.3 & NA.5](https://www.singaporestandardseshop.sg/Product/GetPdf?fileName=180331113347NA%28plus%29A1-2017+to+SS+EN+1991-1-1-2008+%282017%29_Preview.pdf&pdtid=0a46b2e7-732c-4287-b8ef-b0cb67914c6d)).

![Imposed-load values from Singapore NA Tables NA.3 and NA.5](blog_images/floor_loading/02_categories.png)

| Sub-cat | Use | qₖ (kN/m²) | Qₖ (kN) |
|---|---|---|---|
| A1 | Self-contained dwelling unit | 1.5 | 2.0 |
| A2 | Communal areas in flats with limited use | 1.5 | 2.0 |
| A3 | Communal corridor (general blocks of flats) | 2.0 | 2.0 |
| A4 | Stairs in residential | 2.0 | 2.7 |
| A5 | Balconies in dwellings | 2.5 | 2.0 |
| B1 | General office | 2.5 | 2.7 |
| C3 | Corridor / function rooms | 4.0 | 4.5 |
| C5 | Areas susceptible to overcrowding | 5.0 | 3.6 |
| D1 | Shop floor — general retail | 4.0 | 3.6 |
| E11 | Light storage | 2.0 | 1.8 |
| E13 | Bulk storage | 2.4 per metre of storage height | 7.0 |
| E14 | Dense storage / cold-store | 5.0 | 4.5 |

> **Equipment & pump rooms.** The Singapore NA explicitly notes that for equipment and pump rooms imposed loads should be **5 kN/m² or higher**, set by client / authority ([SS EN 1991-1-1 NA, Table NA.3 Note](https://www.singaporestandardseshop.sg/Product/GetPdf?fileName=180331113347NA%28plus%29A1-2017+to+SS+EN+1991-1-1-2008+%282017%29_Preview.pdf&pdtid=0a46b2e7-732c-4287-b8ef-b0cb67914c6d)).
>
> **Industrial Cat E2.** SS EN 1991-1-1 deliberately leaves Cat E2 (industrial use) **without a fixed value** — it must be agreed with the client and/or relevant authority. PD 6688 minimums may be used in the absence of agreement.

This is precisely where **JTC steps in** for industrial tenancies.

---

## 4.  JTC's industrial minimums — the regime that fills Cat E2

JTC publishes minimum **superimposed live-load** values that its tenants must design or verify against. These numbers are higher than the Eurocode defaults precisely because Eurocode E2 is open-ended.

| JTC space type | Typical superimposed live load | Source |
|---|---|---|
| **B1 flatted factory** | 7.5 – 15 kN/m² (ground floor higher) | [Warehouse Rental Singapore — JTC flatted factory](https://warehouserentalsingapore.com/ex-jtc-flatted-factory/) |
| **B2 industrial / general industry** | 15 – 20 kN/m² (ground), 5 kN/m² mezzanine office | [SpaceLookUp — JTC Defu Industrial City](https://spacelookup.com.sg/property/jtc-defu-industrial-city-for-rent/) |
| **JTC investor benchmark (heavy equipment ready)** | ≥ 12.5 kN/m² | [Proptiply — Singapore industrial roundup 2026](https://www.proptiply.com.sg/top-singapore-industrial-areas-an-investors-roundup-for-2026/) |
| **Tier-3 data centre (Singapore)** | 7.5 – 12 kN/m² white space | [Strateq Singapore via Baxtel](https://baxtel.com/data-center/strateq-singapore), [Digital Realty SIN10](https://inflect.com/building/29a-international-business-park-singapore/digital-realty/datacenter/digital-realty-29a-international-business-park), [Leaseweb SIN-12](https://www.leaseweb.com/en/why-leaseweb/platform/data-centers/sin-12) |

**Why ground floors are higher than upper floors.** The ground slab sits on engineered fill or piles and only has to take its own dead load plus the live load — there is no upper-storey self-weight or cumulative column-load limit. Upper floors are limited by what the columns and the slab itself can carry without deflection.

**Practical rule of thumb for a tenant:**

1. Read the tenancy schedule — the lease will quote a slab UDL.
2. Check it against your equipment footprint — compute the *effective UDL* of your heaviest cabinet over its base area, plus a 1.5× safety factor.
3. If your effective UDL exceeds the slab capacity, you need a **load-spreading plate** or a **structural endorsement** from a Professional Engineer.

---

## 5.  How the floor-load arithmetic actually works — worked example

A client wants to install a 2,500 kg battery rack in a B1 flatted factory unit advertised at **7.5 kN/m²**. The rack footprint is 2.0 m × 0.8 m.

**Step 1 — Total weight as a force:**
\[ W = 2{,}500 \text{ kg} \times 9.81 \text{ m/s}^2 = 24{,}525 \text{ N} \approx 24.5 \text{ kN} \]

**Step 2 — Effective UDL:**
\[ q_\text{eff} = \frac{W}{A} = \frac{24.5}{2.0 \times 0.8} = \frac{24.5}{1.6} = 15.3 \text{ kN/m}^2 \]

**Step 3 — Compare to slab capacity:**
15.3 kN/m² **>** 7.5 kN/m² ⇒ direct placement fails.

**Step 4 — Required spreader-plate area:**
\[ A_\text{req} = \frac{W}{q_\text{slab}} = \frac{24.5}{7.5} = 3.27 \text{ m}^2 \]

A 1.8 m × 1.8 m steel base plate (3.24 m²) is borderline; a 2.0 m × 1.8 m plate (3.6 m²) gives ≈ 6.8 kN/m² — comfortably below the 7.5 kN/m² limit. The PE will also check the **point-load** limit (Qₖ) at each rack foot — usually the spreader plate's role is to convert four 6 kN feet into a smeared UDL.

This is the same logic you apply for a Diesel rotary UPS, a transformer, an Aggreko genset, or a server rack — only the numbers change.

---

## 6.  SCDF — the three places it actually sets a load

### 6.1  Storey-Shelter slabs (TR-SS 2021, Cl. 2.3)

Storey shelters are designed to resist blast and ground-shock. SCDF prescribes **slab thicknesses, concrete grade and rebar grade** rather than a kN/m² UDL — because the governing action is impulsive, not static ([SCDF Cl. 2.3](https://www.scdf.gov.sg/home/civil-defence-shelter/acts-and-requirements/technical-requirements-for-storey-shelters-2021/chapter-2-architectural-requirements/clause-2.3-wall-and-slab-thickness-of-thickness-of-ss-and-ns)).

![SCDF Storey Shelter slab thicknesses](blog_images/floor_loading/04_storey_shelter.png)

| Element | Minimum thickness | Notes |
|---|---|---|
| Top SS ceiling slab (highest level) | **300 mm** | Resists rubble loading from collapse above |
| Slab between two stacked SSs | **200 mm** | Lower demand — protected on both sides |
| Bottom SS slab in soil contact | **300 mm** | Resists ground shock + groundwater |
| Concrete grade | **≥ C32/40** | Per SCDF Cl. 2.3 |
| Reinforcement | **≥ 500 N/mm² yield** | Per SCDF Cl. 2.3 |

**The 12.5 g shock-load rule (Cl. 2.11.2)** applies *only* to the cat-ladder fixings inside the shelter that lead to the rescue-hatch opening — not to general roof-access cat ladders. The wording is explicit: *"Cat-ladder shall be provided for access through rescue hatch opening"*. This 12.5 × g requirement is for the **embedment and bracketry**, not the floor slab itself.

### 6.2  Fire-engine accessway loads (Fire Code Appendix G)

The accessway is the strip of pavement / podium / driveway that the fire appliance drives over to reach the riser. SCDF specifies the **vehicle reference load**:

![SCDF fire-engine accessway loads](blog_images/floor_loading/03_fire_engine.png)

| Item | Value | Source |
|---|---|---|
| Reference vehicle | 30-tonne fire engine | [SCDF Appendix G](https://www.scdf.gov.sg/docs/default-source/fire-safety-docs/downloads/fire-code-2007-master-version/appendix_g.pdf?sfvrsn=72c0a641_1) |
| Front axle | 7,500 kg / 2 wheels | Same |
| Rear axle | 21,000 kg / 8 wheels (so ≈ 2,625 kg per wheel) | Same |
| Outrigger jack | ≤ **80 N/cm²** over a **923 cm²** rectangular pad | Same |
| Surcharge UDL (general slab) | **10 kN/m²** minimum | Same |

The 80 N/cm² figure converts to **800 kPa** — that is the local bearing pressure under the jack, and it is what governs the design of any **podium deck or basement transfer slab** the appliance has to operate on. A normal car-park slab designed to EN 1991-1-1 Cat F (≈ 2.5 kN/m²) is **two orders of magnitude** below this — which is why fire-engine accessways are a separate structural exercise.

### 6.3  Areas of Refuge / refuge floors (Fire Code 2023, Cl. 9.2.2)

For super-high-rise residential (Purpose Group II) buildings, SCDF requires a **refuge floor every 20 storeys or fewer**, sized at **0.3 m² per person** with at least 50 % of the floor as holding area, and a 2-hour fire-resistance rating ([SCDF Cl. 9.2](https://www.scdf.gov.sg/fire-safety-services-listing/fire-code-2023/table-of-content/chapter-9-additional-requirements-for-each-purpose-group/clause-9.2-purpose-group-ii-occupancy)).

The structural live load on a refuge floor is taken at **C5 (5.0 kN/m²)** because it is, by design, an area liable to overcrowding ([SS EN 1991-1-1 NA, Table NA.3](https://www.singaporestandardseshop.sg/Product/GetPdf?fileName=180331113347NA%28plus%29A1-2017+to+SS+EN+1991-1-1-2008+%282017%29_Preview.pdf&pdtid=0a46b2e7-732c-4287-b8ef-b0cb67914c6d)). Note that **the load value still comes from the Eurocode** — what SCDF specifies is the *occupancy density*, not the kN/m².

---

## 7.  Putting it together — a checklist for design submissions

Before you sign off a slab-loading drawing or accept a tenancy schedule:

1. **Identify the use** — match it to the closest sub-category in Singapore NA Table NA.3 / NA.5.
2. **Check the Eurocode UDL and point load** — both numbers, not just qₖ.
3. **If on JTC land** — verify the lease minimum (often 7.5 – 20 kN/m²) and apply the higher of {Eurocode, JTC}.
4. **If equipment > slab UDL** — design a load-spreader, get a PE endorsement, or relocate.
5. **If a Storey Shelter is involved** — slab thickness is fixed by Cl. 2.3; concrete C32/40 and high-tensile rebar are non-negotiable.
6. **If a fire-engine accessway is involved** — design the slab for the 30-tonne reference vehicle plus 80 N/cm² jack pressure plus 10 kN/m² surcharge.
7. **If a refuge floor is involved** — design at Cat C5 (5.0 kN/m²) and verify floor area against the 0.3 m²/person rule.

> **A clean rule of thumb:** *BCA tells you the structural number, JTC tells you the industrial minimum, SCDF tells you the fire-specific number. The slab has to satisfy whichever is highest.*

---

## 8.  Common myths to avoid

| Myth | Reality |
|---|---|
| "SCDF requires 7.5 kN/m² floor loading." | False. SCDF only specifies fire-specific loads. The 7.5 kN/m² figure is a **JTC** B1 floor-loading minimum, not an SCDF rule. |
| "Eurocode and Singapore values are the same." | No. The Singapore NA closes Eurocode brackets — e.g. Cat A floor *qₖ* = 1.5 kN/m² in Singapore (NA.3) but recommended 2.0 kN/m² in EN 1991-1-1 default ([JRC Eurocode briefing](https://eurocodes.jrc.ec.europa.eu/sites/default/files/2022-06/EN1991_2_Malakatas.pdf)). |
| "Industrial floors don't need a code value." | The slab still must be designed — Cat E2 is open-ended in EN 1991-1-1 precisely because the **client** must specify it. JTC fills that gap on JTC land. |
| "The 12.5 g shock load applies to all cat ladders." | No. It applies only to the cat-ladder fixings inside a Storey Shelter that access the rescue hatch ([SCDF TR-SS Cl. 2.11.2](https://www.scdf.gov.sg/home/civil-defence-shelter/acts-and-requirements/technical-requirements-for-storey-shelters-2021)). |

---

*Compiled for engineering teams in Singapore. Cross-checked against SS EN 1991-1-1:2008 + Singapore NA + A1:2017, SCDF Fire Code 2023, SCDF TR-SS 2021, the BCA Approved Document and JTC tenancy reference data. All citations link to primary sources. Final values for any project should be confirmed by the appointed Qualified Person.*
