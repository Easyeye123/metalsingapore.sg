# Critical Wall & Anchor Considerations for Cat Ladders: Cracked vs Uncracked Bolt Grades, Hilti vs Fischer, and Bolt Sizing for Aluminium / SS304 / Galvanised MS Ladders

*A working engineer's reference for Singapore cat-ladder retrofits and new builds — substrate matters more than brand, but the brand does matter.*

---

## 1. Why This Blog Exists

Most cat-ladder failures in Singapore are not caused by the ladder breaking. They are caused by the **anchor pulling out of the wall**. The ladder steel might be perfectly designed to BS EN ISO 14122-4, but if the four bolts fixing each bracket are wrong for the substrate, undersized for the rung loads, or specified with no European Technical Assessment (ETA), the entire system is one shock load away from a coroner's inquiry.

This blog brings together three questions every Qualified Person (QP) and installer should be answering before they drill the first hole:

1. **What kind of wall am I anchoring into**, and is it cracked or uncracked under load?
2. **Which anchor system (Hilti vs Fischer vs generic)** is approved for that substrate, that crack state, and the load case I have?
3. **What size and grade of bolt** matches the cat-ladder material — aluminium 6063-T6, SS304, or galvanised mild steel — without creating galvanic corrosion or under-strength connections?

The content draws on the four Fischer European Technical Assessments attached to this project (FBN II ETA-07/0211, FAZ II Plus ETA-19/0520, FIS V Plus ETA-20/0603, FIS EM Plus ETA-17/0979), the Hilti Singapore product line, the 8B Buroh Street cat-ladder QP report (DWB CS-Engineering, PE Dong Wei Bin reg. #3885), and Singapore Standards / Eurocode practice.

---

## 2. Know Your Wall Before You Know Your Bolt

Anchor selection is **substrate-driven**, not load-driven. A 2-tonne anchor that is "rated" for 2 tonnes in C20/25 concrete will give you maybe 200 kg in AAC and effectively zero in hollow brick.

### 2.1 Reinforced Concrete (RC) — The Gold Standard

Cast in-situ concrete C20/25 to C50/60 is the substrate every European anchor manufacturer designs around. The concrete is the only common substrate that has a full ETA framework covering both the cracked and uncracked states.

- **Suitable for**: All Hilti and Fischer mechanical and chemical anchors.
- **Typical cat-ladder use**: Lift-shaft walls, structural cores, RC perimeter walls, RC roof slabs.
- **Watch for**: Carbonation depth on >30-year-old buildings; rebar location with cover meter before drilling.

### 2.2 Cracked vs Uncracked Concrete — Why It Matters

This is the single most misunderstood concept on Singapore sites. Reinforced concrete is **assumed to be cracked under design loads** unless the engineer can prove otherwise. EN 1992-4 (Eurocode 2 Part 4 — Design of Fastenings) and the ETA framework split anchors into:

- **ETA Option 1 — Cracked & uncracked concrete** (the conservative, default choice for any structural fixing).
- **ETA Options 7–12 — Uncracked concrete only** (cheaper anchors you may use only when the engineer demonstrates the concrete remains uncracked at ULS).

A cracked concrete zone forms wherever the section is in tension under design load — typically the underside of slabs in mid-span, the top of slabs at supports, and the tension face of beams and walls. Cat-ladder brackets are usually fixed to columns, lift-shaft walls, or parapet walls — all areas that **may go into tension under wind or shock load** and must therefore be assumed cracked.

The European Organisation for Technical Assessment (EOTA) explains the cracked-concrete philosophy in EAD 330232-01-0601 ([EOTA EAD library](https://www.eota.eu/eads)), which is the assessment route used by Fischer's FAZ II Plus ETA-19/0520.

**Practical rule for cat ladders in Singapore**: always specify Option 1 (cracked) anchors. The cost premium is small; the safety margin against shock loads (a 100 kg user falling onto a rung and pulling outward on the bracket) is enormous.

### 2.3 AAC Block (Autoclaved Aerated Concrete)

AAC blocks (brand names include Hebel, Ytong, ALC) are very common in Singapore non-loadbearing partition walls and lightweight infill panels. Compressive strength is typically only 3–5 N/mm² versus 25+ for RC — about an order of magnitude weaker.

- **Standard expansion bolts and chemical anchors do not work in AAC.** A wedge anchor will simply crush the cells around it and pull out.
- AAC needs **AAC-specific anchors**: Hilti HRD-K, Fischer FUR or GB plug with mesh sleeve, Fischer FAZ II in AAC only with its specific ETA addendum.
- Cat ladders should **never** be anchored to AAC partition walls as the primary load path. If the only available wall is AAC, the bracket must be backed by a steel angle through-bolted to a structural element behind it, with the AAC acting only as a spacer.

### 2.4 Solid and Hollow Concrete Blockwork

Hollow precast concrete blocks (often used for boundary walls and plant-room walls) and solid cement blocks are a middle ground.

- **Solid blocks** (compressive strength typically 7–20 N/mm²): chemical anchors with mesh sleeves are reliable. Mechanical wedge anchors only with a substrate-specific ETA.
- **Hollow blocks**: never use mechanical expansion anchors — there is no continuous material to expand into. Use injection mortar (Fischer FIS V Plus or Hilti HIT-HY 270) with a perforated sleeve (Fischer FIS H or Hilti HIT-SC).

### 2.5 Brick Walls

Old shophouse brick walls are still encountered in Singapore conservation buildings. Compressive strength is highly variable (5–25 N/mm²) and mortar joints are weaker still.

- Always anchor into the brick face, never the mortar joint.
- Chemical anchors with sleeves are mandatory. Wedge anchors are forbidden — they crack the brick.
- Pull-test on site is essential (BS 8539 procedure — see Section 6).

### 2.6 Steel Substrates

If the cat ladder is fixed to an existing steel column or steel parapet, the connection is bolted steel-to-steel and the substrate concerns above do not apply. Use HSFG bolts to BS EN 14399 or property class 8.8 bolts to BS EN ISO 4014. Welded connections are an alternative but require a qualified welder and visual + dye-penetrant inspection.

---

## 3. The Hilti Range — What You Get for the Premium

Hilti Singapore (hilti.com.sg) carries the most complete approved-anchor catalogue in the region, with full ETA paperwork, the PROFIS Anchor design software, and on-site pull-test support.

| Product | Type | Best Use | Cracked Concrete | Seismic | Indicative SG Price |
|---|---|---|---|---|---|
| **HIT-RE 500 V4** | Epoxy injection mortar | Heavy structural, rebar post-installation, long working life | Yes (ETA Option 1) | C1+C2 | SGD 72.90 trade for 500 ml ([Hilti SG](https://www.hilti.com.sg)) |
| **HIT-HY 200-R V3** | Hybrid mortar | General structural anchoring, fast cure | Yes (Option 1) | C1+C2 | ~SGD 50–60 / 500 ml |
| **HIT-HY 270** | Cementitious hybrid | Hollow brick, solid masonry | Masonry-rated | — | ~SGD 60 / cartridge |
| **HST3 / HST4** | Mechanical wedge | Standard structural fixing in RC | Yes (Option 1) | C1+C2 | SGD 4–12 / pc |
| **HSL-3** | Heavy-duty expansion | Machinery base plates, high static loads | Yes | C1+C2 | SGD 15–40 / pc |
| **HDA / HDA-P** | Undercut anchor | Highest-performance shock & seismic | Yes | C1+C2 | SGD 25–60 / pc |
| **KB-TZ2 / KH-EZ** | Wedge / screw anchor | General fixing | Yes | C1+C2 | SGD 2–8 / pc |
| **HRD-K** | Frame anchor | AAC, hollow & solid masonry | Substrate-specific | — | ~SGD 1–3 / pc |

What you are paying for, in addition to the steel: Hilti's Lifetime Service warranty, site engineer support, free PROFIS Anchor design files for QP submission, and the Authority's general acceptance of the brand on signed-and-sealed drawings.

---

## 4. The Fischer Range — Reading the Attached ETAs

Fischer Singapore's product line is technically identical or very close to Hilti's, but typically 15–25% cheaper at the trade counter. The four ETAs attached to this project tell the story.

### 4.1 FBN II / FBN II R (ETA-07/0211)

Fischer's basic mechanical wedge bolt anchor. Available in zinc-plated steel, hot-dip galvanised steel, and stainless A4. **Important**: this ETA does **not** assess seismic performance — it is a static-only anchor for non-seismic applications. Reaction-to-fire classification is A1 (non-combustible) but no fire-resistance time rating is assessed.

- **Use for**: light-to-medium static loads in cracked or uncracked C20/25 to C50/60 concrete.
- **Avoid for**: cat-ladder brackets carrying user loads with shock effects; seismic-design buildings (rare in SG, but applies to Indonesian and Malaysian projects); fire-rated walls.

### 4.2 FAZ II Plus / R / HCR (ETA-19/0520)

Fischer's premium wedge anchor and the direct competitor to Hilti HST3. Galvanised, stainless A4, and high-corrosion-resistant (HCR — for very aggressive coastal or industrial environments).

- Seismic categories C1 and C2 — both assessed. Fire resistance is also assessed.
- **The default mechanical anchor for cat-ladder brackets in Singapore concrete**, equivalent in performance to Hilti HST3.
- 50-year working life.

### 4.3 FIS V Plus (ETA-20/0603)

Vinylester-based injection bonded anchor system. Used with threaded rod (zinc, A4, HCR) or rebar.

- Seismic C1+C2, fire-resistance assessed.
- **50-year and 100-year working life options** assessed in the same ETA — important for permanent infrastructure.
- **Use for**: general chemical anchoring, hollow masonry with sleeves, when faster cure than epoxy is needed.
- Direct competitor to Hilti HIT-HY 200.

### 4.4 FIS EM Plus (ETA-17/0979)

Pure epoxy injection bonded anchor system — Fischer's heavy-duty offering and the direct competitor to Hilti HIT-RE 500 V4.

- Seismic C1+C2, fire resistance, 50/100-year working life.
- **Approved for steel-fibre-reinforced concrete** — relatively rare and useful for industrial floor slabs.
- Bonded and bonded-expansion installation modes assessed.
- Time-to-failure and alternative drilling methods (hammer, diamond, hollow-drill) all assessed in the ETA.

### 4.5 Fischer Cheat Sheet

| Product | ETA | Type | Seismic | Fire | Working Life | Best For |
|---|---|---|---|---|---|---|
| FBN II | 07/0211 | Mechanical wedge | **No** | A1 only | 50 yr | Light/medium static, non-seismic |
| FAZ II Plus | 19/0520 | Mechanical wedge (premium) | C1+C2 | Yes | 50 yr | Default cat-ladder bracket bolt |
| FIS V Plus | 20/0603 | Vinylester bonded | C1+C2 | — | 50/100 yr | General chemical anchor, hollow masonry |
| FIS EM Plus | 17/0979 | Epoxy bonded | C1+C2 | Yes | 50/100 yr | Heavy duty, post-installed rebar, special concrete |

---

## 5. Hilti vs Fischer — Direct Head-to-Head

Both manufacturers produce technically excellent anchors with full ETA approvals. The choice is rarely about engineering — it is about price, service, and Authority familiarity.

| Criterion | Hilti | Fischer | Practical Comment |
|---|---|---|---|
| Cracked-concrete mechanical anchor | HST3 | FAZ II Plus | Engineering equivalent; Fischer ~15–20% cheaper |
| Heavy-duty epoxy | HIT-RE 500 V4 (SGD 72.90 / 500 ml) | FIS EM Plus (~₹3,800 / 390 ml in regional pricing) | Fischer cheaper per ml; Hilti has stronger SG distribution |
| Seismic C1+C2 ETAs | Across most products | Across most products | Equivalent |
| Design software | PROFIS Anchor (free, well-supported in SG) | FIXPERIENCE / FiXperience (free, less common in SG) | Hilti's QP-submission ecosystem is stronger in Singapore |
| On-site pull-test rig | Yes — Hilti rig + technician | Yes — Fischer rig + technician | Both will turn up; book 2 weeks ahead |
| Site engineer response | <24 h SLA in SG | 1–3 days typical in SG | Hilti faster |
| ETA documentation availability | Excellent online | Excellent online | Equivalent |
| Authority/QP familiarity | Very high | High | Hilti is the "default" name on most signed drawings; Fischer is well-accepted |
| Counterfeit risk | Real (always buy from Hilti SG, not online marketplaces) | Real (always buy from Fischer SG distributor) | Bigger risk with Fischer due to grey-market imports |
| Trade pricing position | Premium (~+15–20%) | Mid-premium | Fischer wins on volume jobs |

**Recommendation for an 8–18 m cat-ladder retrofit**: Fischer FAZ II Plus M12 in galvanised concrete-bracket positions, or Hilti HST3 M12 if the QP is already specifying a Hilti package. For roof-edge fixings exposed to weather, upgrade to A4 stainless across either brand. For chemical anchors into older concrete or into concrete with carbonation, use Hilti HIT-RE 500 V4 or Fischer FIS EM Plus.

---

## 6. Generic / Unbranded Bolts — Why They Don't Belong on a Cat Ladder

A box of "M12 wedge anchors" from a Sungei Kadut hardware shop costs about 30–50 cents per piece, against SGD 4–12 for a Hilti HST3 or Fischer FAZ II Plus. The price difference is not the steel — it is the assurance.

| Risk | Branded Anchor | Generic Anchor |
|---|---|---|
| ETA / EAD certification | Yes — every batch traceable | None |
| Steel grade declared | Yes — usually 8.8 minimum, often property class 10.9 sleeve | Unspecified, often 4.6 grade or unmarked |
| Cracked-concrete suitability | Tested per ETA | Untested — assume **NO** |
| Seismic suitability | C1+C2 assessed | Untested |
| Counterfeit / mismarking | Negligible | Common — A4 markings on A2 steel; "8.8" stamping on grade-4.6 bolts |
| Fire performance | Tested per EAD | Untested |
| Manufacturer's design software | Yes | None |
| Singapore Authority acceptance on QP-signed drawings | Yes | Effectively no — BCA submissions routinely rejected |
| BS 8539 pull-test compliance | Achievable with specified torque, edge, spacing | Achievable in theory, but no published characteristic resistance to compare against |
| Cost over 16-bracket cat-ladder | ~SGD 80–200 | ~SGD 5–10 |

The **legitimate saving from generic bolts on a cat ladder is roughly SGD 75–195**, against a single failure scenario where the bracket pulls out and a maintenance worker falls. This is a false economy that no QP will sign for, and that no BCA inspector will pass.

**BS 8539:2012 (Code of practice for the selection and installation of post-installed anchors in concrete and masonry)** is the British Standard widely adopted in Singapore practice. It requires anchors to have a **declared characteristic resistance** — which generic bolts do not provide. Pull-tests under BS 8539 are conducted at **1.5× the design action** on a minimum of 3 anchors, or 5% of the installed quantity (whichever is greater), with no anchor failing below the proof load. Without a published characteristic resistance, there is nothing to test against.

---

## 7. Bolt Sizing for Cat-Ladder Materials — The Substrate-Independent Half

Once the substrate and anchor system are decided, sizing the bolts depends on the **cat-ladder material** and the **load case**.

### 7.1 Load Case Refresher (BS EN ISO 14122-4)

- **F1 — Vertical rung load**: 1.5 kN at the centre of the rung, factored to 2.25 kN at ULS (γ_F = 1.5).
- **F2 — Stile bracket load**: 1.5 kN horizontal pull-out + self-weight + cage drag.
- **Shock load (SCDF and OSHA-equivalent)**: 12.5 g impact factor where a fall-arrest anchor is integral with the cat-ladder top.

For a typical 8 m cat ladder with brackets at 1.5 m centres (6 brackets total), each bracket sees:

- Static design pull-out: ~1.5 kN ULS per bolt assuming 2 bolts/bracket.
- Shock case pull-out: 4–6 kN per bolt.

These numbers drive minimum bolt diameter and embedment depth.

### 7.2 Embedment Rules — The 8d Principle

For chemical and mechanical anchors, the rule of thumb that holds across both Hilti and Fischer ETAs is:

> **Effective embedment depth h_ef ≥ 8 × bolt diameter d**

| Bolt diameter | Minimum h_ef | Minimum drilled hole depth h₀ (typical) |
|---|---|---|
| M8 | 64 mm | 70 mm |
| M10 | 80 mm | 90 mm |
| M12 | 96 mm | 110 mm |
| M16 | **128 mm** | 140 mm |
| M20 | 160 mm | 175 mm |

The **8B Buroh Street QP drawings showed an 85 mm embedment for M16** — flagged in red ink by the reviewer ("EMBEDMENT 85 mm — NOT TALLY") because the M16 minimum is **128 mm**. This is exactly the kind of detail that fails on a Saturday-morning BCA spot-check.

Other geometric rules from EN 1992-4 / ETA Option 1:

- **Edge distance c1 ≥ h_ef** (so a M16 bolt at h_ef = 128 mm needs to be ≥ 128 mm from any concrete edge).
- **Spacing s ≥ 2 × h_ef** between adjacent anchors in the same bracket.
- **Concrete member thickness h ≥ h_ef + 30 mm minimum cover behind the anchor tip.**

A 200 mm RC wall with a M16 bolt at h_ef = 128 mm leaves only 72 mm of concrete behind — usually adequate, but the QP must confirm there is no rebar in that zone.

### 7.3 Cat-Ladder Material vs Bolt Grade — Galvanic and Strength Matching

Mixing metals at a wet, exposed connection is a well-known route to galvanic corrosion. The galvanic series (in seawater, common reference) ranks metals from anodic (sacrificial) to cathodic (protected):

> Aluminium 6063-T6 (anodic) → Galvanised steel → Mild steel → Stainless 304 → Stainless 316 (cathodic)

The metal lower on the list (more cathodic) draws the metal higher on the list (more anodic) into corrosion. The closer two metals sit in the series, the safer the pair.

#### 7.3.1 Aluminium 6063-T6 / 6061-T6 Stiles (Buroh Street Reference)

The 8B Buroh Street ladder uses **70 × 30 × 3 mm AA 6063-T6 C-channel stiles** with **25 mm aluminium round-bar rungs** — a common Singapore configuration.

- **Use only A4 (stainless 316) bolts.** A2 (304) is acceptable indoors, but A4 is the safer specification.
- **NEVER use galvanised mild steel bolts in direct contact with aluminium.** The galvanising layer is sacrificial and will deplete rapidly; the underlying steel then becomes cathodic to the aluminium and accelerates aluminium pitting.
- **Galvanic isolation**: nylon or EPDM gasket washers between the aluminium stile and the steel bracket; nylon bushings in the bolt hole.
- **Typical sizes**: M10–M12 for stile-to-bracket connections; M12–M16 for bracket-to-wall.
- **Not bolts but worth noting**: the 6063-T6 stile itself has yield strength ~190 N/mm² versus mild steel's 275 N/mm² — sizing must reflect this, not just the bolt.

#### 7.3.2 SS304 Stiles

Increasingly common for premium cat ladders.

- **A4 (SS316) bolts** ideal for marine and outdoor — slightly more corrosion-resistant than the SS304 stile itself.
- **A2 (SS304) bolts** acceptable indoors and for inland Singapore commercial buildings.
- **Avoid HDG bolts** through SS304 stiles — same galvanic issue but milder than aluminium.
- **Typical sizes**: M10–M12 stile connections; M12 minimum bracket-to-wall.

#### 7.3.3 Galvanised Mild Steel Stiles

The Jin Yuan Fa-style, value-engineered cat ladder.

- **HDG bolts** acceptable indoors and for non-coastal external use; both are zinc-protected so galvanic difference is minimal.
- **A4 stainless bolts** mandatory for coastal and roof-edge installations.
- **M12 minimum** for any structural cat-ladder bracket-to-wall connection. M10 is acceptable only for internal, low-cycle, light-duty applications.
- **Re-galvanising at field cuts and drilled holes**: cold-galvanising spray (Zinga or equivalent) to be applied to all field modifications before assembly.

### 7.4 A Practical Sizing Worksheet

For a typical 8 m cat ladder with brackets at 1.5 m centres, 2 bolts per bracket, on RC wall:

| Ladder Material | Bolt Grade (Bracket-to-Wall) | Min Diameter | Min Embedment | Anchor Type | Indicative Cost / Bracket |
|---|---|---|---|---|---|
| Aluminium 6063-T6 (Buroh St) | A4 stainless | M12 | 96 mm | Fischer FAZ II Plus R or Hilti HST3-R | SGD 30–50 |
| SS304 (premium) | A2 or A4 | M12 | 96 mm | FAZ II Plus or HST3 | SGD 25–45 |
| HDG mild steel (value) | HDG steel | M12 | 96 mm | FAZ II Plus or HST3 | SGD 18–30 |
| Any (heavy duty / shock) | A4 | M16 | **128 mm** (not 85 mm) | FIS EM Plus or HIT-RE 500 V4 | SGD 60–100 |
| Any in AAC | A4 | M10–M12 with sleeve | Substrate-specific | Fischer FUR + FIS V Plus | SGD 35–60 |

---

## 8. Pre-Pour Plates vs Post-Installed Anchors

A cat-ladder retrofit will almost always use post-installed anchors (Sections 3–5 above). New build offers the option of cast-in plates with welded studs — which **always beats post-installed anchors** for strength, predictability, and cost-per-tonne-of-resistance. If you have any influence on a new-build programme, push for cast-in plates at every cat-ladder location — typically a 200 × 200 × 10 mm steel plate with four M16 headed studs at 100 mm centres, set to the architectural drawing.

---

## 9. Installation Quality — Where Even Good Bolts Fail

Even Hilti or Fischer ETA-approved anchors fail when the installation is sloppy. The ETA assumes:

1. **The hole is drilled to the correct diameter** — typically d + 2 mm (M12 → 14 mm hole). A 16 mm hole drilled in error reduces the wedge anchor's resistance by 50%+.
2. **The hole is cleaned to manufacturer's procedure** — for chemical anchors, this is critical: 4 blow / 4 brush / 4 blow is the Hilti and Fischer standard. A dusty hole halves the chemical bond.
3. **The hole depth is correct** — a M16 anchor placed at h_ef = 85 mm in a hole drilled to 90 mm gives you the failure mode at Buroh Street.
4. **The torque is applied to specification** — Hilti HST3 M12 requires 80 Nm; Fischer FAZ II Plus M12 requires 70 Nm. Hand-tightening with a Sungei Kadut spanner does not achieve this.
5. **The cure time is respected** for chemical anchors — Fischer FIS EM Plus needs 12 hours at 20 °C before loading. In SG's 30+ °C site temperatures, this drops to ~4 hours, but never zero.
6. **Pull-tests are recorded** under BS 8539 — minimum 3 anchors or 5% of total, whichever greater, at 1.5× design load.

The QP-Endorsed report at Buroh Street references all of these — but the drawing dimensions did not match. That mismatch is what the red-ink reviewer caught, and what every QP needs to catch on every drawing before sealing it.

---

## 10. Specification Wording for the Drawing Notes

For QPs sealing a cat-ladder drawing, the following note block covers most situations and prevents downstream substitutions:

> **ANCHOR SPECIFICATION — CAT LADDER**
>
> 1. All bracket-to-wall anchors shall be **Hilti HST3 M12 / Fischer FAZ II Plus M12** mechanical wedge anchors in A4 stainless steel, or engineer-approved equivalent supported by ETA Option 1 (cracked concrete) and seismic C1+C2 assessment.
> 2. Effective embedment h_ef ≥ 96 mm (M12). For M16 brackets, h_ef ≥ 128 mm.
> 3. Edge distance c1 ≥ h_ef. Spacing s ≥ 2 × h_ef.
> 4. Substrate: minimum C25/30 reinforced concrete. For AAC, hollow block, or brick, refer to Engineer for substrate-specific anchor selection.
> 5. Installation per manufacturer ETA, with installer holding manufacturer's certified-installer card or equivalent.
> 6. Pull-test in accordance with BS 8539:2012, minimum 3 anchors or 5% of installed quantity, at 1.5 × design load.
> 7. Galvanic isolation: nylon / EPDM washers between aluminium ladder stile and steel bracket. No galvanised steel bolt in direct contact with aluminium.
> 8. Generic / unbranded anchors are NOT acceptable on this drawing.

---

## 11. Closing Thoughts

The Singapore market has settled on a comfortable equilibrium where Hilti is the "default" name on most QP-signed drawings and Fischer wins on volume and price. Both are technically excellent; both have full ETA paperwork; both will send a site engineer when you need one. The risk is not in choosing between them — it is in **substituting one of them for a generic bolt at the last minute** to save SGD 5 per bracket, or in drilling 85 mm where the standard required 128 mm.

A cat ladder fails at the anchor, not at the rung. Specify the anchor for the substrate, not for the ladder. Match the bolt grade to the ladder metal. Drill to the embedment the ETA requires. Pull-test under BS 8539. Then sleep at night.

---

*Sources*

- [BS EN ISO 14122-4 — Permanent means of access to machinery — Part 4: Fixed ladders](https://www.iso.org/standard/63771.html)
- [EOTA — European Assessment Documents (EAD library)](https://www.eota.eu/eads)
- [Hilti Singapore — Anchors & Fastening systems](https://www.hilti.com.sg/c/CLS_FASTENER_7135)
- [Fischer International — Fixing Systems](https://www.fischer-international.com/en/products/fixing-systems)
- [BS 8539:2012 — Code of practice for the selection and installation of post-installed anchors in concrete and masonry](https://knowledge.bsigroup.com/products/code-of-practice-for-the-selection-and-installation-of-post-installed-anchors-in-concrete-and-masonry)
- Fischer ETA-07/0211 (FBN II), ETA-19/0520 (FAZ II Plus), ETA-20/0603 (FIS V Plus), ETA-17/0979 (FIS EM Plus) — project file
- DWB CS-Engineering, *QP Report for Cat Ladder — 8B Buroh Street*, 25 February 2026 (PE Dong Wei Bin reg. #3885) — project file
