import type { CategorySlug } from './site';

export interface Service {
  slug: CategorySlug;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  whatItIs: string;
  whoForBullets: string[];
  scopeBullets: string[];
  processBullets: string[];
  cautions: string[];
  subtopics?: { title: string; body: string }[];
  faqs?: { q: string; a: string }[];
  cover: string;
}

/**
 * Service-page content for MetalSingapore.sg. Tone: factual, contractor,
 * hedged on regulatory and certification claims. No "best/cheapest/QP-endorsed"
 * statements unless attributable to a specific cited document.
 */
export const services: Service[] = [
  {
    slug: 'custom-metal-works',
    h1: 'Custom metal works contractor in Singapore',
    metaTitle: 'Custom Metal Works Singapore — Fabrication & Install',
    metaDescription:
      'Custom metal fabrication in Singapore — gates, railings, frames, doors and structural elements. Site survey, shop drawings, fabrication and on-site install.',
    lead:
      'Bespoke metal fabrication for residential, commercial and industrial projects. We design-assist, fabricate and install gates, railings, frames, doors, lockers and structural elements across Singapore.',
    whatItIs:
      'MetalSingapore is the metal-works arm of Ezzogenics Pte Ltd. We carry projects from a measured site survey, through shop drawings and workshop fabrication, to on-site installation, surface finishing and a defect walk-through. Material selection covers mild steel, galvanised steel, stainless steel (SS304 / SS316) and aluminium alloys depending on exposure and service-life expectations.',
    whoForBullets: [
      'Property owners replacing aged gates, railings, grilles and metal doors.',
      'ID firms, architects and main contractors needing a metal sub-package.',
      'Facility managers commissioning catwalks, locker frames, roof-access steel or service-yard fences.',
      'Industrial and JTC-zone tenants needing fabricated frames, racks, platforms and balustrades.',
    ],
    scopeBullets: [
      'Custom metal fabrication — mild steel, galvanised, stainless steel (SS304 / SS316) and aluminium.',
      'On-site welding, grinding and finishing.',
      'Powder coating, zinc-rich primer / 2K paint and hot-dip galvanising coordination.',
      'Shop drawings and bill-of-materials for client approval before fabrication.',
      'Site protection, debris clearance and post-installation cleaning.',
      'Coordination with appointed Professional Engineer (PE) or Qualified Person (QP) where structural sign-off is required.',
    ],
    processBullets: [
      'Site visit, photographs and dimensioned sketch.',
      'Material recommendation matched to exposure, loading and finish.',
      'Itemised quotation with inclusions, exclusions and assumptions.',
      'Shop drawings issued for client approval.',
      'Workshop fabrication with QC checks before delivery.',
      'On-site installation by our welders / installers and a defect walk-through before sign-off.',
    ],
    cautions: [
      'Structural design, balustrade load capacity, anchor selection and fire performance are project-specific. Where required by the relevant authority or the project consultant, a Professional Engineer or Qualified Person should review and endorse the design.',
      'Material grade choice (e.g. SS304 vs SS316, mild-steel coating systems) depends on exposure conditions and service-life targets. Final selection should reference the supplier technical data sheet and any project specification.',
    ],
    subtopics: [
      {
        title: 'Materials we work with',
        body:
          'Mild steel sections (S275, S355) for structural frames; galvanised mild steel for outdoor scopes; stainless steel SS304 for general service and SS316 for marine / corrosive exposure; aluminium 6063-T6 for lightweight cat ladders, awning and trellis frames.',
      },
      {
        title: 'Finishes',
        body:
          'Hot-dip galvanising, zinc-rich primer plus topcoat, powder coating and stainless-steel mechanical polishing. Finish choice should be matched to service environment and aesthetic requirement on the project specification.',
      },
      {
        title: 'Coordination with other trades',
        body:
          'Where the metalwork forms part of a larger fit-out or A&A renovation, we coordinate with carpentry, glass, electrical and waterproofing trades through the main contractor or ID firm.',
      },
    ],
    cover: '/assets/images/cat-custom-metal-works.jpg',
  },
  {
    slug: 'stainless-steel-fabrication',
    h1: 'Stainless steel fabrication in Singapore',
    metaTitle: 'Stainless Steel Fabrication Singapore — SS304 / SS316',
    metaDescription:
      'Stainless steel fabrication in Singapore — SS304 and SS316 railings, gates, frames, counters and structural elements. Site survey, fabrication and install.',
    lead:
      'Stainless steel fabrication in SS304 and SS316 — railings, balustrades, gates, frames, counters and architectural elements for residential, commercial and industrial sites in Singapore.',
    whatItIs:
      'Stainless steel works are a major part of our scope because of Singapore\'s humid, coastal climate. We fabricate from austenitic SS304 for general indoor / sheltered use and SS316 for marine, pool-side or chemically-exposed environments. Mechanical polishing (#4 satin, mirror polish) and electropolishing are coordinated through partner workshops.',
    whoForBullets: [
      'Homeowners and ID firms specifying balcony, staircase and pool-area railings.',
      'F&B and retail fit-outs requiring stainless counter tops, framing and edge protection.',
      'Industrial sites needing platform handrails, walkway balustrades and process frames.',
      'Building owners replacing aged mild-steel handrails with stainless equivalents.',
    ],
    scopeBullets: [
      'SS304 and SS316 railings, balustrades, handrails, gates and infill panels.',
      'Stainless counter tops, splashbacks and structural framing.',
      'Stainless cat ladders, walkway grilles and access metalwork (corrosive environments).',
      'TIG / MIG welding by qualified welders, mechanical polishing to specified finish.',
      'Glass-and-stainless balustrades — clamp, channel and stand-off systems.',
      'Coordination with the project Professional Engineer for structural sign-off where required.',
    ],
    processBullets: [
      'On-site dimension survey and confirmation of grade (SS304 vs SS316) based on exposure.',
      'Shop drawings showing section sizes, joints, fixings and finish.',
      'Workshop fabrication with TIG-weld pickling and passivation where required.',
      'Site installation, mechanical alignment and defect walk-through before sign-off.',
    ],
    cautions: [
      'SS304 may show tea-staining in coastal or chlorinated environments. SS316 is the conservative choice for marine, pool, kitchen-exhaust and external balustrade applications. Final grade selection should be confirmed against the supplier specification and any project consultant\'s requirement.',
      'Welds should be passivated or pickled to restore corrosion resistance. Surface contamination (carbon-steel particles, grinding dust from non-stainless tooling) accelerates rust and should be controlled in the workshop and on site.',
    ],
    subtopics: [
      {
        title: 'SS304 vs SS316 — when each grade is the right choice',
        body:
          'SS304 covers most indoor and sheltered outdoor scopes. SS316 adds 2–3% molybdenum and is preferred for coastal exposure, swimming pool surrounds, kitchen splash zones and any specification that calls for marine grade. Cost difference is typically 25–40%.',
      },
      {
        title: 'Polish and finish options',
        body:
          'Common finishes include mill (2B), brushed (#4 satin) and mirror (#8). Brushed finish is the default for handrails because it hides scratches; mirror finish is used where appearance is critical and traffic is light.',
      },
      {
        title: 'Glass-and-stainless balustrades',
        body:
          'Frameless glass balustrades use clamp or channel fixings; semi-frameless designs use stainless top rails with glass panels. Glass thickness, post spacing and fixing capacity should be verified against the design loading by the project Professional Engineer.',
      },
    ],
    cover: '/assets/images/cat-stainless-steel-fabrication.jpg',
  },
  {
    slug: 'metal-gates',
    h1: 'Metal gates — supply and installation in Singapore',
    metaTitle: 'Metal Gates Singapore — Manual & Automatic | MetalSingapore',
    metaDescription:
      'Metal gate fabrication and installation in Singapore — swing, sliding, automatic and manual gates for landed homes, condos and industrial premises.',
    lead:
      'Manual and automatic metal gates fabricated and installed across Singapore — swing, sliding and folding configurations, in mild steel, galvanised steel, stainless steel and aluminium.',
    whatItIs:
      'We design, fabricate and install metal gates as a single package: hinges, locks, motors and finishes are coordinated under one scope. Typical applications include landed-home main gates, side gates, condominium service-yard gates and industrial vehicle gates.',
    whoForBullets: [
      'Landed-home owners replacing or upgrading the front gate.',
      'Condominiums, MCSTs and managing agents commissioning service-yard, plant-room or basement-access gates.',
      'Industrial and JTC tenants needing factory and warehouse gates.',
      'Main contractors and ID firms requiring a gate sub-package on a fit-out or A&A.',
    ],
    scopeBullets: [
      'Manual swing, sliding and folding gates in mild steel, galvanised steel and stainless steel.',
      'Automatic swing and sliding gates with reputable motor brands (e.g. FAAC, BFT, CAME, DEA — supplier specification confirmed per project).',
      'Hot-dip galvanising or 2-pack paint finish; stainless steel polished to specified grit.',
      'On-site welding, alignment and final levelling.',
      'Lock, latch, intercom and access-control coordination with the electrical contractor where applicable.',
      'Removal and disposal of existing gates if required.',
    ],
    processBullets: [
      'Site visit — measure post-to-post opening, ground levels, swing clearance and any obstructions.',
      'Material and motor recommendation matched to gate weight, frequency of use and exposure.',
      'Itemised quotation including foundations, motor, accessories and finish.',
      'Shop drawings for client approval before fabrication.',
      'Workshop fabrication; on-site installation, alignment and finishing.',
      'Hand-over with operating manual and supplier warranty card, plus a defect walk-through.',
    ],
    cautions: [
      'For landed homes, check any URA / management corporation rules on gate height, setback and finish before fabrication.',
      'Automatic gates that face public footpaths or driveways must be specified with safety-edge sensors and obstacle-detection logic. Compliance with applicable safety standards is the responsibility of the supplier and installer — confirm in writing per project.',
      'Powder-coat finishes generally need touch-up after 5–8 years; hot-dip galvanising lasts longer in tropical exposure but limits colour options. Confirm finish life expectations against the supplier specification.',
    ],
    subtopics: [
      {
        title: 'Swing gates vs sliding gates',
        body:
          'Swing gates need clear arc space and level ground; they suit residential driveways with shallow set-back. Sliding gates need a runner track or a cantilever arrangement and suit narrow driveways or industrial entrances where swing space is limited.',
      },
      {
        title: 'Automatic gate motors and access control',
        body:
          'Motor selection depends on leaf weight, frequency of use, mains availability and security level. Most residential gates use single-phase 230 V motors with battery back-up; higher-cycle commercial sites may use three-phase motors. Access control (intercom, RFID, mobile app) is wired in by the electrical contractor.',
      },
      {
        title: 'Finishes for outdoor exposure',
        body:
          'Mild-steel gates outdoors should be hot-dip galvanised or zinc-primed before topcoat. Stainless gates are usually SS304 brushed for general use and SS316 if coastal exposure is expected.',
      },
    ],
    cover: '/assets/images/cat-metal-gates.jpg',
  },
  {
    slug: 'metal-railings',
    h1: 'Metal railing fabrication and installation in Singapore',
    metaTitle: 'Metal Railings Singapore — Balcony, Staircase, Ramp',
    metaDescription:
      'Metal railing supply and installation in Singapore — balcony, staircase, ramp and walkway railings in mild steel, stainless steel and aluminium.',
    lead:
      'Custom railings for balconies, staircases, ramps, mezzanines and external walkways in Singapore — fabricated to project drawings and installed by our welders.',
    whatItIs:
      'Railings are one of the highest-volume scopes we deliver. Each project is a balance of safety, code-driven loading, exposure to weather and the architectural style of the property. We fabricate in mild steel (paint or hot-dip galv), stainless steel SS304 / SS316 and aluminium 6063-T6, and coordinate with glass partners for glass-and-metal balustrades.',
    whoForBullets: [
      'Landed-home and condominium owners replacing aged railings or upgrading balcony designs.',
      'ID firms and architects specifying staircase, mezzanine and feature balustrades.',
      'Building owners and MCSTs renewing common-area railings on ramps, walkways and rooftop access points.',
      'Industrial sites needing platform, mezzanine and process-walkway handrails.',
    ],
    scopeBullets: [
      'Balcony, staircase, mezzanine, ramp and external walkway railings.',
      'Mild-steel railings with paint or hot-dip galv finish.',
      'Stainless steel SS304 / SS316 railings, brushed or polished finish.',
      'Aluminium 6063-T6 railings for lightweight or coastal applications.',
      'Glass-and-metal balustrades — frameless, semi-framed, with clamp or channel fixings.',
      'Anchor selection — chemical / mechanical anchors matched to the substrate and design loading.',
    ],
    processBullets: [
      'Site survey, height check and review of the substrate (concrete, screed, kerb).',
      'Recommendation on material, section sizes and fixing pattern.',
      'Shop drawings showing post spacing, top-rail profile and infill design.',
      'Workshop fabrication; on-site installation with anchor fix and weld-up.',
      'Finishing, touch-up and a defect walk-through before sign-off.',
    ],
    cautions: [
      'Balcony and staircase railing height, infill spacing (typically 100 mm sphere rule) and design loading should be confirmed against the project specification, BCA approved-document references and any consultant requirement. Where required, a Professional Engineer should verify the structural capacity.',
      'Anchor capacity into the substrate must be verified — see our blog on anchor selection. Cracked-concrete approval (ETA Option 1) is the conservative default for railing posts on slabs and parapets.',
    ],
    subtopics: [
      {
        title: 'Common railing styles in Singapore',
        body:
          'Vertical-bar, horizontal-bar, perforated mesh, glass infill and laser-cut decorative panels are the most-specified styles. Horizontal bars near children\'s play areas should be reviewed against any climbability concerns raised by the consultant.',
      },
      {
        title: 'Material and finish choices',
        body:
          'Stainless SS304 brushed is the most-popular interior finish; SS316 brushed is used externally near the coast or pool decks. Mild-steel railings are usually 2-pack painted in matte black, dark grey or RAL colours, with hot-dip galvanising for the most demanding outdoor exposures.',
      },
      {
        title: 'Anchor and post-base detailing',
        body:
          'Surface-mount base plates with mechanical anchors are fastest to install but transmit higher tensile load to the slab edge. Side-mount fascia brackets keep the slab edge clear but rely on the slab face strength. Choice should match the slab condition and the design loading.',
      },
    ],
    cover: '/assets/images/cat-metal-railings.jpg',
  },
  {
    slug: 'fencing-and-grilles',
    h1: 'Metal fencing and grilles in Singapore',
    metaTitle: 'Metal Fencing & Grilles Singapore — Boundary & Window',
    metaDescription:
      'Metal fencing and grille fabrication in Singapore — boundary fencing, perimeter security, window grilles, gate panels and security mesh.',
    lead:
      'Boundary fencing, perimeter security, window grilles and gate-panel infill — fabricated and installed across Singapore in mild steel, galvanised steel, stainless steel and aluminium.',
    whatItIs:
      'Fencing protects a property line, controls access and contributes to the architectural character of a site. Grilles add a layer of physical security to windows and openings. We fabricate both, with a focus on durability under tropical exposure and coordination with gate, lighting and CCTV scopes.',
    whoForBullets: [
      'Landed-home and condominium owners installing or replacing boundary fencing.',
      'Industrial and JTC tenants needing perimeter security fencing, palisade fencing or mesh fencing.',
      'Schools, child-care and community spaces requiring child-safe fencing geometry.',
      'Property owners adding window grilles to ground-floor openings or service yards.',
    ],
    scopeBullets: [
      'Boundary fencing — vertical bar, palisade, mesh, perforated panel and laser-cut designs.',
      'Window grilles — fixed, openable, removable for emergency egress; mild steel or aluminium.',
      'Anti-climb and anti-burglary detailing where requested.',
      'Hot-dip galvanising and powder coating for outdoor scopes.',
      'Posts, footings and ground-fix details coordinated with site conditions.',
    ],
    processBullets: [
      'Site walk to mark the fence line, check ground conditions and identify obstructions.',
      'Recommendation on style, height, section sizing and finish.',
      'Shop drawings, panel-set-out and post-spacing for client approval.',
      'Workshop fabrication; site installation with concrete footings or surface fixings.',
      'Touch-up, cleaning and defect walk-through.',
    ],
    cautions: [
      'Boundary lines should be confirmed against the property title and any survey before installation; setbacks and fence height may be regulated by URA, JTC or the management corporation.',
      'Window grilles on residential blocks may need to provide a clear emergency-egress opening per SCDF guidance — confirm with the appointed qualified person where required.',
    ],
    subtopics: [
      {
        title: 'Fencing materials',
        body:
          'Galvanised mild steel with powder coat is the most common Singapore choice. Aluminium fencing offers a lighter weight and naturally corrosion-resistant alternative for coastal sites. Stainless steel fencing is rare except for high-end residential and pool-area applications.',
      },
      {
        title: 'Mesh and perforated panels',
        body:
          'Mesh fencing (welded mesh, expanded metal) and perforated panels suit industrial and institutional sites where airflow and visibility are needed. Mesh aperture and frame stiffness should match the security level and the panel size.',
      },
      {
        title: 'Window grilles and emergency egress',
        body:
          'Fixed grilles are simple and rigid; openable / lockable grilles allow emergency exit. SCDF and BCA requirements for habitable rooms and bedrooms should be verified by the appointed qualified person.',
      },
    ],
    cover: '/assets/images/cat-fencing-and-grilles.jpg',
  },
  {
    slug: 'cat-ladders-and-access-metalwork',
    h1: 'Cat ladders and access metalwork in Singapore',
    metaTitle: 'Cat Ladders Singapore — Roof Access, Catwalks',
    metaDescription:
      'Cat ladders, catwalks, ramps and access metalwork in Singapore — fixed vertical ladders, walkway grilles, ramps and roof-access steel.',
    lead:
      'Fixed vertical ladders, catwalks, ramps and roof-access steel for industrial and commercial sites in Singapore — fabricated to BS EN ISO 14122 references and installed with substrate-matched anchors.',
    whatItIs:
      'Access metalwork is a high-consequence scope: cat ladders, catwalks and roof-access platforms must support climber loads, fall-arrest reactions and substrate movement over a long service life. We work in aluminium 6063-T6, stainless SS304 and galvanised mild steel, and coordinate with the appointed Qualified Person (QP) where structural endorsement is required for the project.',
    whoForBullets: [
      'Industrial and JTC tenants commissioning roof-access cat ladders for plant maintenance.',
      'Facility managers replacing aged access ladders, catwalks or maintenance platforms.',
      'Solar PV installers needing safe roof-access steel as part of an installation package.',
      'Main contractors and consultants needing a metalwork sub-package for an A&A or new build.',
    ],
    scopeBullets: [
      'Fixed vertical cat ladders with safety cage and rest landings (where height requires staged climbs).',
      'Aluminium 6063-T6, SS304 and hot-dip galvanised mild steel construction.',
      'Catwalks, walkway grilles and access ramps — open-mesh or chequer plate decking.',
      'Roof-access hatches, transition guard rails and grab rails.',
      'Anchor selection — Hilti or Fischer chemical / mechanical anchors with European Technical Assessment (ETA) where applicable.',
      'Coordination with QP / Professional Engineer for design endorsement where required by the relevant authority.',
    ],
    processBullets: [
      'Site survey — climb height, substrate type, anchorage points, floor / roof transitions.',
      'Material and standards reference (BS EN ISO 14122-4, OSHA-style guidance, supplier ETAs).',
      'Shop drawings; structural design coordination with the appointed QP / PE where required.',
      'Workshop fabrication; on-site installation with chemical or mechanical anchors.',
      'Pull-out testing where specified, defect walk-through and hand-over.',
    ],
    cautions: [
      'Long fixed ladders (typically above 6 m of single climb) are usually staged with rest landings under BS EN ISO 14122-4. Where the project authority or client requires QP / PE endorsement, design responsibility sits with the appointed engineer — we coordinate but do not act as the QP unless a QP is engaged separately.',
      'Anchor selection depends on substrate (RC, masonry, AAC, hollow brick) and the cracked / uncracked state of the concrete. ETA-Option-1 (cracked concrete) anchors are the conservative default for tension-zone fixings.',
      'Galvanic corrosion between dissimilar metals (e.g. aluminium ladder on galvanised steel anchor) should be controlled with isolating washers / sleeves and confirmed against supplier guidance.',
    ],
    subtopics: [
      {
        title: 'Ladder material — aluminium, stainless or galvanised mild steel',
        body:
          'Aluminium 6063-T6 is light, naturally corrosion-resistant and the typical choice for tall outdoor ladders. SS304 is heavier but has very long service life in chlorinated or coastal environments. Galvanised mild steel is the most cost-effective for sheltered indoor scopes but needs touch-up after extended weather exposure.',
      },
      {
        title: 'When a safety cage is required',
        body:
          'BS EN ISO 14122-4 references — and many internal site rules — require a safety cage above climbs of approximately 3 m. Some jurisdictions are moving to fall-arrest rail systems instead of cages; the choice should be agreed with the appointed QP / safety officer for the site.',
      },
      {
        title: 'Anchors — Hilti vs Fischer, cracked vs uncracked',
        body:
          'Both Hilti and Fischer publish ETA-approved chemical and mechanical anchors with full design data for cracked and uncracked concrete. Anchor capacity is substrate-driven, not load-driven — the substrate type and crack state should be assessed before bolt selection.',
      },
    ],
    cover: '/assets/images/cat-cat-ladders-and-access-metalwork.jpg',
  },
  {
    slug: 'outdoor-trellis-and-structural-metalwork',
    h1: 'Outdoor trellis and structural metalwork in Singapore',
    metaTitle: 'Outdoor Trellis & Structural Metalwork Singapore',
    metaDescription:
      'Outdoor trellis, pergolas, awning frames and exposed structural metalwork — fabricated and installed across Singapore in mild steel, galvanised and aluminium.',
    lead:
      'Pergolas, trellis frames, awning frames and exposed structural metalwork for landed homes, condos, schools and commercial premises in Singapore.',
    whatItIs:
      'Outdoor metalwork lives in a tough environment — UV, monsoon rain, salt-air on coastal sites and heavy expansion / contraction cycles. We fabricate in galvanised mild steel, hot-dip galvanised structural sections, aluminium 6063-T6 and (less often) stainless steel, finished for long outdoor service life.',
    whoForBullets: [
      'Landed-home owners adding pergolas, trellis structures or shaded outdoor seating.',
      'Schools, child-care centres and community spaces commissioning shade structures and play-area canopies.',
      'F&B and retail tenants installing awning frames and shopfront features.',
      'Architects specifying exposed structural steel members for facade or canopy elements.',
    ],
    scopeBullets: [
      'Pergola and trellis frames in mild steel (galv + paint), hot-dip galv structural sections or aluminium.',
      'Awning frames, drop-curtain frames and outdoor shading structures.',
      'Exposed structural metalwork — feature beams, posts, brackets and connection plates.',
      'Coordination with roofing, polycarbonate and fabric-canopy sub-trades.',
      'Hot-dip galvanising and powder coating for long outdoor service life.',
    ],
    processBullets: [
      'Site survey — span, height, foundation conditions and exposure.',
      'Recommendation on member sizes and finish; structural sign-off where required.',
      'Shop drawings, fabrication and finish.',
      'On-site installation, alignment, fixing and finish touch-up.',
      'Hand-over with maintenance notes.',
    ],
    cautions: [
      'Outdoor canopy structures over public or shared areas may need structural endorsement by a Professional Engineer for wind loading. Confirm with the project consultant whether a PE submission is required.',
      'Coatings degrade at different rates depending on micro-climate. Hot-dip galv plus 2-pack topcoat is the most durable system for tropical outdoor exposure but is heavier and more expensive than powder coat alone.',
    ],
    subtopics: [
      {
        title: 'Pergola and trellis design',
        body:
          'Member sizing depends on span, the canopy infill (timber slats, polycarbonate, fabric, climbing plants) and the wind load expected at the site. Stainless cable-tensioned trellis systems are an option for greenery-clad walls.',
      },
      {
        title: 'Awning frames and shading',
        body:
          'Awning frames should be detailed for water shedding and connection to the host building. Coastal sites generally specify SS316 fittings or hot-dip galv steel; inland sheltered sites can use galv mild steel with topcoat.',
      },
      {
        title: 'Exposed structural metalwork',
        body:
          'Architectural steel that remains exposed in service should be detailed for cleanability and corrosion control — radiused outside corners, drainage holes in tubular sections, stainless fasteners where galvanic corrosion is a risk.',
      },
    ],
    cover: '/assets/images/cat-outdoor-trellis-and-structural-metalwork.jpg',
  },
];

export const servicesByCategory = services.reduce<Record<CategorySlug, Service>>(
  (acc, s) => ({ ...acc, [s.slug]: s }),
  {} as Record<CategorySlug, Service>,
);
