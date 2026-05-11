import type { CategorySlug } from './site';

export interface ProjectGalleryImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  category: CategorySlug;
  /** Where the work was carried out, where stated in the source material. */
  location?: string;
  year?: number;
  /** Concise description, factual. */
  description: string;
  image: string;
  alt: string;
  /** Optional supporting photos. Each gets descriptive alt text. */
  gallery?: ProjectGalleryImage[];
  /** Optional related links (e.g. service page, blog post). */
  related?: { label: string; to: string }[];
  /** Free-form note rendered next to the description (kept short). */
  note?: string;
  needsConfirmation?: boolean;
  featured?: boolean;
}

/**
 * Project gallery — sourced from EZZ_Metal_Work_Portfolio.pdf (Ezzogenics
 * metal works portfolio), pages 3 to 7. Spelling has been normalised
 * ("Railing", "Metal works") and descriptions trimmed of marketing
 * superlatives. Photos are cropped from the corresponding portfolio page
 * and stored under /assets/images/projects/. Where a project benefits from
 * a re-shoot or higher-resolution image, the file can be replaced in place
 * without changing the manifest.
 *
 * The portfolio admin uploader writes additional entries to
 * /assets/data/projects.json which is fetched at runtime and merged into
 * this seed list.
 */
export const seedProjects: Project[] = [
  // ---- Cat ladders / access metalwork (Buroh Street) ----
  {
    id: 'buroh-street-cat-ladder-2024',
    title: 'Cat ladder installation — Buroh Street',
    category: 'cat-ladders-and-access-metalwork',
    location: 'Buroh Street, Singapore',
    year: 2024,
    description:
      'Buroh Street cat ladder project involving the construction of two fixed vertical cat ladder sets up to 18 m high, each with an intermediate platform. The project included review of the building wall structure and substrate, with planning input from the Professional Engineer team and Fischer Singapore technical support on the M16 bolt grade used. Both flights carry safety hoop cages along the climb and a top cage at the upper landing. A later add-on extended the scope to a cat ladder for the ancillary building on the same site, providing additional fixed vertical access metalwork connected to the broader cat ladder installation.',
    note:
      'PE coordination, the wall-substrate review and the Fischer M16 bolt-grade recommendation apply to this installation only. Anchor type, bolt size and structural sign-off are project-specific and depend on the wall, loading and exposure on each site. Gallery photos 9–13 show the ancillary building cat ladder add-on.',
    image: '/assets/images/projects/proj-buroh-street-cat-ladder-2024.jpg',
    alt: 'Two cat ladder sets with intermediate landing platform and safety hoop cages on the exterior of an industrial building at Buroh Street, Singapore',
    gallery: [
      {
        src: '/assets/images/projects/gallery/buroh-street-cat-ladder/01.jpg',
        alt: 'Wider yard view of the Buroh Street cat ladder installation showing the lower flight, intermediate platform and upper flight against the building facade',
      },
      {
        src: '/assets/images/projects/gallery/buroh-street-cat-ladder/02.jpg',
        alt: 'Two cat ladder sets at Buroh Street — lower flight rising to the mid-platform, upper flight continuing to the roof, both with hoop cages',
      },
      {
        src: '/assets/images/projects/gallery/buroh-street-cat-ladder/03.jpg',
        alt: 'Full-height portrait of the Buroh Street cat ladder showing both flights and the mid-landing, with a worker at the base for scale',
      },
      {
        src: '/assets/images/projects/gallery/buroh-street-cat-ladder/04.jpg',
        alt: 'Tall view of the upper cat ladder flight at Buroh Street with the safety hoop cage and roof landing visible against neighbouring industrial buildings',
      },
      {
        src: '/assets/images/projects/gallery/buroh-street-cat-ladder/05.jpg',
        alt: 'Side context view of the Buroh Street cat ladder with the mid-platform and supporting brackets, photographed from the loading yard',
      },
      {
        src: '/assets/images/projects/gallery/buroh-street-cat-ladder/06.jpg',
        alt: 'On-site anchor pull-out test on a Fischer chemical anchor with a hydraulic load gauge and reaction frame at the Buroh Street installation',
      },
      {
        src: '/assets/images/projects/gallery/buroh-street-cat-ladder/07.jpg',
        alt: 'Fabricator welding the cat ladder structure on site at Buroh Street while wearing a full-body harness with lanyard for fall protection',
      },
      {
        src: '/assets/images/projects/gallery/buroh-street-cat-ladder/08.jpg',
        alt: 'Top of the upper cat ladder at Buroh Street showing the hoop cage exit and stainless-finish ladder rails at the roof landing',
      },
      // Ancillary building cat ladder add-on
      {
        src: '/assets/images/projects/gallery/buroh-street-cat-ladder-ancillary/01.jpg',
        alt: 'Ancillary building cat ladder add-on at Buroh Street — fixed vertical access ladder mounted on the smaller building wall',
      },
      {
        src: '/assets/images/projects/gallery/buroh-street-cat-ladder-ancillary/02.jpg',
        alt: 'Side view of the ancillary building cat ladder add-on at Buroh Street showing wall-mounting brackets and rung spacing',
      },
      {
        src: '/assets/images/projects/gallery/buroh-street-cat-ladder-ancillary/03.jpg',
        alt: 'Ancillary building cat ladder add-on at Buroh Street with hoop cage detail and top mounting against the parapet',
      },
      {
        src: '/assets/images/projects/gallery/buroh-street-cat-ladder-ancillary/04.jpg',
        alt: 'Lower section and base anchorage of the Buroh Street ancillary building cat ladder add-on',
      },
      {
        src: '/assets/images/projects/gallery/buroh-street-cat-ladder-ancillary/05.jpg',
        alt: 'Completed ancillary building cat ladder add-on at Buroh Street viewed from the yard, alongside the main cat ladder installation',
      },
    ],
    related: [
      { label: 'Cat ladders & access metalwork service', to: '/services/cat-ladders-and-access-metalwork' },
      { label: '18 m cat ladder design and engineering — Singapore', to: '/blog/18m-cat-ladder-design-engineering-singapore' },
      { label: 'Cat ladder wall embedment — engineering notes', to: '/blog/cat-ladder-wall-embedment-engineering-singapore' },
      { label: 'Wall anchors — Hilti vs Fischer and bolt sizing', to: '/blog/wall-anchors-hilti-vs-fischer-bolt-sizing-singapore' },
      { label: 'Cat ladder material comparison — aluminium vs SS304 vs galvanised mild steel', to: '/blog/cat-ladder-aluminium-vs-ss304-vs-galvanised-mild-steel' },
      { label: 'SCDF cat ladder, solar and roof access notes', to: '/blog/scdf-cat-ladder-solar-roof-access-singapore' },
    ],
    featured: true,
  },

  // ---- Cat ladders / access metalwork (Wan Lee — cat ladder + roof access) ----
  {
    id: 'wan-lee-cat-ladder-2024',
    title: 'Cat ladder and roof access — Wan Lee',
    category: 'cat-ladders-and-access-metalwork',
    location: 'Wan Lee, Singapore',
    year: 2024,
    description:
      'Cat ladder and roof access project at Wan Lee involving the construction of fixed vertical access metalwork and a roof access hatch/panel arrangement on a metal-deck roof. The project gallery shows fabrication, ladder positioning and roof-level access details, presented as site-specific cat ladder and roof access metalwork for maintenance use.',
    image: '/assets/images/projects/proj-wan-lee-cat-ladder-2024.jpg',
    alt: 'Wan Lee cat ladder and roof access installation',
    gallery: [
      {
        src: '/assets/images/projects/gallery/wan-lee-cat-ladder/01.jpg',
        alt: 'Roof access hatch panel installed on the metal-deck roof at Wan Lee with worker visible at the opening',
      },
      {
        src: '/assets/images/projects/gallery/wan-lee-cat-ladder/02.jpg',
        alt: 'Looking up through the roof access opening at Wan Lee showing the cat ladder hoop cage above the hatch',
      },
      {
        src: '/assets/images/projects/gallery/wan-lee-cat-ladder/03.jpg',
        alt: 'Interior cat ladder at Wan Lee rising between racking to the underside of the roof access opening',
      },
      {
        src: '/assets/images/projects/gallery/wan-lee-cat-ladder/04.jpg',
        alt: 'Full-height view of the Wan Lee interior cat ladder with hoop cage along the climb',
      },
      {
        src: '/assets/images/projects/gallery/wan-lee-cat-ladder/05.jpg',
        alt: 'Roof-level view of the open access hatch at Wan Lee with worker emerging onto the metal-deck roof',
      },
      {
        src: '/assets/images/projects/gallery/wan-lee-cat-ladder/06.jpg',
        alt: 'Roof access hatch panel laid out on workbench during fabrication for the Wan Lee project',
      },
      {
        src: '/assets/images/projects/gallery/wan-lee-cat-ladder/07.jpg',
        alt: 'Workers fitting the roof access hatch frame onto the metal-deck roof at Wan Lee',
      },
      {
        src: '/assets/images/projects/gallery/wan-lee-cat-ladder/08.jpg',
        alt: 'Worker preparing the roof access panel on the metal-deck roof at Wan Lee with grinding and fit-up tools',
      },
      {
        src: '/assets/images/projects/gallery/wan-lee-cat-ladder/09.jpg',
        alt: 'Open roof access hatch on the metal-deck roof at Wan Lee with the cat ladder visible inside the opening',
      },
      {
        src: '/assets/images/projects/gallery/wan-lee-cat-ladder/10.jpg',
        alt: 'Close-up of the Wan Lee open roof access hatch showing the panel hinge, frame and ladder top below',
      },
    ],
    related: [
      { label: 'Cat ladders & access metalwork service', to: '/services/cat-ladders-and-access-metalwork' },
      { label: '18 m cat ladder design and engineering — Singapore', to: '/blog/18m-cat-ladder-design-engineering-singapore' },
      { label: 'Cat ladder wall embedment — engineering notes', to: '/blog/cat-ladder-wall-embedment-engineering-singapore' },
      { label: 'SCDF cat ladder, solar and roof access notes', to: '/blog/scdf-cat-ladder-solar-roof-access-singapore' },
      { label: 'Cat ladder material comparison — aluminium vs SS304 vs galvanised mild steel', to: '/blog/cat-ladder-aluminium-vs-ss304-vs-galvanised-mild-steel' },
      { label: 'Wall anchors — Hilti vs Fischer and bolt sizing', to: '/blog/wall-anchors-hilti-vs-fischer-bolt-sizing-singapore' },
      { label: 'Fischer concrete anchor comparison — Singapore', to: '/blog/fischer-concrete-anchor-comparison-singapore' },
    ],
  },

  // ---- Outdoor trellis / structural metalwork (Frontier — mezzanine construction) ----
  {
    id: 'frontier-industrial-mezzanine-2024',
    title: 'Mezzanine level construction — Frontier Industrial Building',
    category: 'outdoor-trellis-and-structural-metalwork',
    location: 'Frontier Industrial Building, Singapore',
    year: 2024,
    description:
      'Mezzanine level construction at Frontier Industrial Building involving fabricated steel framing and installation works for an elevated working/storage platform. The project photos show frame setting-out, welding, steel member installation and site coordination, presented as custom structural metalwork subject to project requirements and relevant professional checks where required.',
    note:
      'Floor loading, beam sizing and any required professional endorsement are project-specific and depend on the building structure, intended use and authority requirements on each site.',
    image: '/assets/images/projects/proj-frontier-industrial-mezzanine-2024.jpg',
    alt: 'Frontier Industrial Building mezzanine steel frame construction',
    gallery: [
      {
        src: '/assets/images/projects/gallery/frontier-industrial-mezzanine/01.jpg',
        alt: 'Completed mezzanine steel frame at Frontier Industrial Building viewed from the lower floor with the elevated platform set against the existing wall',
      },
      {
        src: '/assets/images/projects/gallery/frontier-industrial-mezzanine/02.jpg',
        alt: 'Top view of the mezzanine steel frame at Frontier Industrial Building showing the perimeter beams and intermediate joist layout',
      },
      {
        src: '/assets/images/projects/gallery/frontier-industrial-mezzanine/03.jpg',
        alt: 'Mezzanine joists installed across the steel frame at Frontier Industrial Building before deck/floor finish',
      },
      {
        src: '/assets/images/projects/gallery/frontier-industrial-mezzanine/04.jpg',
        alt: 'Welder fabricating mezzanine steel members at Frontier Industrial Building',
      },
      {
        src: '/assets/images/projects/gallery/frontier-industrial-mezzanine/05.jpg',
        alt: 'Long view down the Frontier Industrial Building unit showing the mezzanine framing aligned along the side wall during installation',
      },
      {
        src: '/assets/images/projects/gallery/frontier-industrial-mezzanine/06.jpg',
        alt: 'Worker on a ladder installing mezzanine steel members at Frontier Industrial Building',
      },
      {
        src: '/assets/images/projects/gallery/frontier-industrial-mezzanine/07.jpg',
        alt: 'Side context view of the Frontier Industrial Building mezzanine steel frame during construction',
      },
      {
        src: '/assets/images/projects/gallery/frontier-industrial-mezzanine/08.jpg',
        alt: 'Mezzanine framing extending into the rear bay at Frontier Industrial Building with mobile platform alongside',
      },
      {
        src: '/assets/images/projects/gallery/frontier-industrial-mezzanine/09.jpg',
        alt: 'Underside view of the installed mezzanine framing and overhead services at Frontier Industrial Building',
      },
      {
        src: '/assets/images/projects/gallery/frontier-industrial-mezzanine/10.jpg',
        alt: 'Edge of the mezzanine opening at Frontier Industrial Building showing the steel frame against the existing wall',
      },
      {
        src: '/assets/images/projects/gallery/frontier-industrial-mezzanine/11.jpg',
        alt: 'Wide internal view of the Frontier Industrial Building unit showing the mezzanine steel frame in place along the side wall',
      },
      {
        src: '/assets/images/projects/gallery/frontier-industrial-mezzanine/12.jpg',
        alt: 'Long corridor view of the Frontier Industrial Building unit during the mezzanine construction works',
      },
      {
        src: '/assets/images/projects/gallery/frontier-industrial-mezzanine/13.jpg',
        alt: 'Worker on a step ladder fitting mezzanine steel framing at Frontier Industrial Building',
      },
    ],
    related: [
      { label: 'Outdoor trellis & structural metalwork service', to: '/services/outdoor-trellis-and-structural-metalwork' },
      { label: 'Custom metal works service', to: '/services/custom-metal-works' },
      { label: 'Stainless steel fabrication service', to: '/services/stainless-steel-fabrication' },
      { label: 'EN 10025 steel grades comparison — Singapore', to: '/blog/en-10025-steel-grades-comparison-singapore' },
      { label: 'Floor loading in Singapore — BCA, SCDF, JTC notes', to: '/blog/floor-loading-singapore-bca-scdf-jtc' },
    ],
    featured: true,
  },

  // ---- Stainless steel fabrication (Jalan Penhas — SS304 residential mailboxes) ----
  {
    id: 'jalan-penhas-ss304-mailbox-2024',
    title: 'SS304 mailbox installation — Jalan Penhas',
    category: 'stainless-steel-fabrication',
    location: 'Jalan Penhas, Singapore',
    year: 2024,
    description:
      'SS304 mailbox installation at Jalan Penhas for residential use, involving fitting and alignment of a stainless steel mailbox set within the site’s wall/fixture area. The project highlights custom stainless steel fabrication, durable mailbox hardware and practical installation detailing for daily residential use.',
    image: '/assets/images/projects/proj-jalan-penhas-ss304-mailbox-2024.jpg',
    alt: 'SS304 mailbox installation at Jalan Penhas for residential use',
    gallery: [
      {
        src: '/assets/images/projects/gallery/jalan-penhas-ss304-mailbox/01.jpg',
        alt: 'Completed SS304 mailbox bank installed against the residential wall at Jalan Penhas with rows of letter slots and locker doors',
      },
      {
        src: '/assets/images/projects/gallery/jalan-penhas-ss304-mailbox/02.jpg',
        alt: 'Wide front view of the Jalan Penhas mailbox installation with a worker fitting a slot panel in the lower row',
      },
      {
        src: '/assets/images/projects/gallery/jalan-penhas-ss304-mailbox/03.jpg',
        alt: 'Single SS304 mailbox unit being measured during fabrication for the Jalan Penhas project',
      },
      {
        src: '/assets/images/projects/gallery/jalan-penhas-ss304-mailbox/04.jpg',
        alt: 'Angled view of the Jalan Penhas mailbox bank showing the slot row, framing trim and stainless steel door alignment',
      },
      {
        src: '/assets/images/projects/gallery/jalan-penhas-ss304-mailbox/05.jpg',
        alt: 'Low-angle close-up of the mid-section SS304 mailbox slots at Jalan Penhas showing slot opening detail and trim',
      },
      {
        src: '/assets/images/projects/gallery/jalan-penhas-ss304-mailbox/06.jpg',
        alt: 'Hand demonstrating a letter slot opening on the Jalan Penhas SS304 mailbox for scale',
      },
      {
        src: '/assets/images/projects/gallery/jalan-penhas-ss304-mailbox/07.jpg',
        alt: 'Resident operating an opened SS304 mailbox door at the Jalan Penhas installation',
      },
      {
        src: '/assets/images/projects/gallery/jalan-penhas-ss304-mailbox/08.jpg',
        alt: 'Side context view of the Jalan Penhas SS304 mailbox panel during installation with site materials in the foreground',
      },
    ],
    related: [
      { label: 'Stainless steel fabrication service', to: '/services/stainless-steel-fabrication' },
      { label: 'Custom metal works service', to: '/services/custom-metal-works' },
    ],
  },

  // ---- Stainless steel fabrication (Outram Road — SS304 mailbox + entrance door painting) ----
  {
    id: 'outram-road-ss304-mailbox-door-2024',
    title: 'SS304 mailbox and entrance door painting — Outram Road',
    category: 'stainless-steel-fabrication',
    location: 'Outram Road, Singapore',
    year: 2024,
    description:
      'Supply and installation of an SS304 stainless steel mailbox at Outram Road, together with painting works for the main entrance door. The project combined custom stainless steel mailbox installation with practical finishing works to refresh the entrance area for daily residential use.',
    image: '/assets/images/projects/proj-outram-road-ss304-mailbox-door-2024.jpg',
    alt: 'SS304 stainless steel mailbox installation and main entrance door painting at Outram Road',
    gallery: [
      {
        src: '/assets/images/projects/gallery/outram-road-ss304-mailbox-door/01.jpg',
        alt: 'SS304 stainless steel mailbox installed against the wall beside the main entrance corridor at Outram Road',
      },
      {
        src: '/assets/images/projects/gallery/outram-road-ss304-mailbox-door/02.jpg',
        alt: 'Wider front view of the Outram Road entrance area with the SS304 stainless steel mailbox unit in place',
      },
      {
        src: '/assets/images/projects/gallery/outram-road-ss304-mailbox-door/03.jpg',
        alt: 'Completed SS304 stainless steel mailbox unit wrapped for protection prior to delivery for the Outram Road project',
      },
      {
        src: '/assets/images/projects/gallery/outram-road-ss304-mailbox-door/04.jpg',
        alt: 'Painter applying paint to the entrance door surround at Outram Road with masking sheet and spray equipment in place',
      },
      {
        src: '/assets/images/projects/gallery/outram-road-ss304-mailbox-door/05.jpg',
        alt: 'Repainted main entrance door at Outram Road with the SS304 stainless steel mailbox installed alongside',
      },
    ],
    related: [
      { label: 'Stainless steel fabrication service', to: '/services/stainless-steel-fabrication' },
      { label: 'Custom metal works service', to: '/services/custom-metal-works' },
    ],
  },

  // ---- Cat ladders / access metalwork (Tuas View) ----
  {
    id: 'tuas-view-cat-ladder-2024',
    title: 'Cat ladder with roof access panel — Tuas View',
    category: 'cat-ladders-and-access-metalwork',
    location: 'Tuas View, Singapore',
    year: 2024,
    description:
      'Cat ladder installation at Tuas View with a roof access panel on a metal-deck roof. Scope covered fabrication and installation of the ladder, the access hatch and supporting brackets, with a Professional Engineer load calculation and endorsement issued for this specific installation.',
    note:
      'PE load calculation and endorsement applies to this project only and was carried out for the as-built ladder/access arrangement on site.',
    image: '/assets/images/projects/proj-tuas-view-cat-ladder-2024.jpg',
    alt: 'Cat ladder transitioning into a roof access panel on a metal-deck roof at Tuas View, Singapore',
    gallery: [
      {
        src: '/assets/images/projects/gallery/tuas-view-cat-ladder/01.jpg',
        alt: 'Cat ladder rising into the open roof access panel from inside the Tuas View building',
      },
      {
        src: '/assets/images/projects/gallery/tuas-view-cat-ladder/02.jpg',
        alt: 'Wall-mounted cat ladder secured to the interior wall at Tuas View, viewed through glass partition',
      },
      {
        src: '/assets/images/projects/gallery/tuas-view-cat-ladder/03.jpg',
        alt: 'Full-height view of the wall-fixed cat ladder at Tuas View showing top and bottom mounting brackets',
      },
      {
        src: '/assets/images/projects/gallery/tuas-view-cat-ladder/04.jpg',
        alt: 'Open roof access hatch at Tuas View showing the ladder structure below and gas-strut stays',
      },
      {
        src: '/assets/images/projects/gallery/tuas-view-cat-ladder/05.jpg',
        alt: 'Closed roof access panel on the metal-deck roof at Tuas View with stainless pull handle',
      },
      {
        src: '/assets/images/projects/gallery/tuas-view-cat-ladder/06.jpg',
        alt: 'Roof-level view of the closed access panel and surrounding metal-deck roof at Tuas View',
      },
    ],
    related: [
      { label: 'Cat ladders & access metalwork service', to: '/services/cat-ladders-and-access-metalwork' },
      { label: 'Cat ladder design and engineering (18m)', to: '/blog/18m-cat-ladder-design-engineering-singapore' },
      { label: 'SCDF cat ladder solar / roof access notes', to: '/blog/scdf-cat-ladder-solar-roof-access-singapore' },
      { label: 'Cat ladder material comparison', to: '/blog/cat-ladder-aluminium-vs-ss304-vs-galvanised-mild-steel' },
    ],
    featured: true,
  },

  // ---- Cat ladders / access metalwork (Ng Teng Fong Hospital — M&E ancillary) ----
  {
    id: 'ng-teng-fong-hospital-cat-ladder-2024',
    title: 'Cat ladder — Ng Teng Fong Hospital M&E ancillary building',
    category: 'cat-ladders-and-access-metalwork',
    location: 'Ng Teng Fong Hospital, Singapore',
    year: 2024,
    description:
      'Cat ladder project for the M&E ancillary building at Ng Teng Fong Hospital, involving fixed vertical access metalwork for maintenance access. The project gallery shows installation and completed ladder details, with the scope presented as site-specific cat ladder and access metalwork.',
    image: '/assets/images/projects/proj-ng-teng-fong-hospital-cat-ladder-2024.jpg',
    alt: 'Ng Teng Fong Hospital M&E ancillary building cat ladder installation',
    gallery: [
      {
        src: '/assets/images/projects/gallery/ng-teng-fong-hospital-cat-ladder/01.jpg',
        alt: 'Completed cat ladder on the M&E ancillary building at Ng Teng Fong Hospital — front elevation showing the full vertical access run',
      },
      {
        src: '/assets/images/projects/gallery/ng-teng-fong-hospital-cat-ladder/02.jpg',
        alt: 'Side context view of the Ng Teng Fong Hospital M&E ancillary cat ladder against the building facade',
      },
      {
        src: '/assets/images/projects/gallery/ng-teng-fong-hospital-cat-ladder/03.jpg',
        alt: 'Mid-section detail of the Ng Teng Fong Hospital cat ladder showing the rungs and wall-fixing brackets',
      },
      {
        src: '/assets/images/projects/gallery/ng-teng-fong-hospital-cat-ladder/04.jpg',
        alt: 'Top landing and exit detail of the M&E ancillary cat ladder at Ng Teng Fong Hospital',
      },
      {
        src: '/assets/images/projects/gallery/ng-teng-fong-hospital-cat-ladder/05.jpg',
        alt: 'Lower section and base anchorage of the Ng Teng Fong Hospital M&E ancillary cat ladder',
      },
      {
        src: '/assets/images/projects/gallery/ng-teng-fong-hospital-cat-ladder/06.jpg',
        alt: 'Cat ladder rungs and stringer detail at Ng Teng Fong Hospital M&E ancillary building',
      },
      {
        src: '/assets/images/projects/gallery/ng-teng-fong-hospital-cat-ladder/07.jpg',
        alt: 'Wall-fixing bracket and anchor detail on the Ng Teng Fong Hospital M&E cat ladder',
      },
      {
        src: '/assets/images/projects/gallery/ng-teng-fong-hospital-cat-ladder/08.jpg',
        alt: 'On-site installation view of the Ng Teng Fong Hospital M&E ancillary cat ladder',
      },
      {
        src: '/assets/images/projects/gallery/ng-teng-fong-hospital-cat-ladder/09.jpg',
        alt: 'Finished cat ladder with surrounding M&E ancillary building works at Ng Teng Fong Hospital',
      },
    ],
    related: [
      { label: 'Cat ladders & access metalwork service', to: '/services/cat-ladders-and-access-metalwork' },
      { label: '18 m cat ladder design and engineering — Singapore', to: '/blog/18m-cat-ladder-design-engineering-singapore' },
      { label: 'Cat ladder wall embedment — engineering notes', to: '/blog/cat-ladder-wall-embedment-engineering-singapore' },
      { label: 'Cat ladder material comparison — aluminium vs SS304 vs galvanised mild steel', to: '/blog/cat-ladder-aluminium-vs-ss304-vs-galvanised-mild-steel' },
      { label: 'SCDF cat ladder, solar and roof access notes', to: '/blog/scdf-cat-ladder-solar-roof-access-singapore' },
    ],
  },

  // ---- Stainless steel fabrication (Rainbow Centre bollards) ----
  {
    id: 'rainbow-centre-stainless-bollards-2024',
    title: 'Stainless steel bollard installation — Rainbow Centre',
    category: 'stainless-steel-fabrication',
    location: 'Rainbow Centre, Singapore',
    year: 2024,
    description:
      'Stainless steel bollard installation at Rainbow Centre for durable access control and pedestrian/vehicle separation. The project involved site fitting, alignment and installation of stainless steel bollards suited for daily facility use, with practical attention to spacing, finished appearance and long-term corrosion resistance.',
    image: '/assets/images/projects/proj-rainbow-centre-stainless-bollards-2024.jpg',
    alt: 'Stainless steel bollard installation at Rainbow Centre',
    gallery: [
      {
        src: '/assets/images/projects/gallery/rainbow-centre-stainless-bollards/01.jpg',
        alt: 'Completed line of stainless steel bollards at Rainbow Centre defining the pedestrian/vehicle boundary at the facility entrance',
      },
      {
        src: '/assets/images/projects/gallery/rainbow-centre-stainless-bollards/02.jpg',
        alt: 'Close-up of an installed stainless steel bollard at Rainbow Centre showing the polished finish and base fixing',
      },
      {
        src: '/assets/images/projects/gallery/rainbow-centre-stainless-bollards/03.jpg',
        alt: 'Detail of stainless steel bollard alignment and spacing at Rainbow Centre',
      },
      {
        src: '/assets/images/projects/gallery/rainbow-centre-stainless-bollards/04.jpg',
        alt: 'Wider context view of the stainless steel bollard run at Rainbow Centre',
      },
      {
        src: '/assets/images/projects/gallery/rainbow-centre-stainless-bollards/05.jpg',
        alt: 'On-site fitting and installation view of stainless steel bollards at Rainbow Centre',
      },
    ],
    related: [
      { label: 'Stainless steel fabrication service', to: '/services/stainless-steel-fabrication' },
      { label: 'Custom metal works service', to: '/services/custom-metal-works' },
    ],
    featured: true,
  },

  // ---- Metal gates (featured: Strides Premier) ----
  {
    id: 'strides-premier-metal-gate-2024',
    title: 'Metal gate installation — Strides Premier',
    category: 'metal-gates',
    location: 'Strides Premier, Singapore',
    year: 2024,
    description:
      'Metal gate project at Strides Premier — fabrication and installation of a mesh-panel metal gate for controlled access and site separation in a commercial / industrial setting. Scope covered site measurement, frame fabrication, mesh panel assembly and on-site fitting, with attention to swing/slide clearance, frame alignment and durable daily use.',
    image: '/assets/images/projects/proj-strides-premier-metal-gate-2024.jpg',
    alt: 'Metal gate installation at Strides Premier with mesh panel and steel frame',
    gallery: [
      {
        src: '/assets/images/projects/gallery/strides-premier-metal-gate/01.jpg',
        alt: 'Finished metal gate at Strides Premier — wide front view of the installed mesh-panel gate across the warehouse opening',
      },
      {
        src: '/assets/images/projects/gallery/strides-premier-metal-gate/02.jpg',
        alt: 'Side view of the full sliding mesh-panel metal gate at Strides Premier showing the steel frame and rolling track',
      },
      {
        src: '/assets/images/projects/gallery/strides-premier-metal-gate/03.jpg',
        alt: 'Site context during installation of the Strides Premier metal gate with the team checking alignment of the mesh panels',
      },
      {
        src: '/assets/images/projects/gallery/strides-premier-metal-gate/04.jpg',
        alt: 'Open metal gate at Strides Premier showing the welded mesh panel and steel frame detail at the leaf edge',
      },
      {
        src: '/assets/images/projects/gallery/strides-premier-metal-gate/05.jpg',
        alt: 'Mid-installation view of the Strides Premier metal gate panel offered up to the opening for fit-up',
      },
    ],
    related: [
      { label: 'Metal gates service', to: '/services/metal-gates' },
      { label: 'Custom metal works service', to: '/services/custom-metal-works' },
      { label: 'Fencing & grilles service', to: '/services/fencing-and-grilles' },
    ],
    featured: true,
  },

  // ---- Metal railings / handrails ----
  {
    id: 'st-mary-church-railing-2023',
    title: 'Railing installation — Fisherman\'s Church',
    category: 'metal-railings',
    location: 'Fisherman\'s Church, Singapore',
    year: 2023,
    description:
      'Railing installation at Fisherman\'s Church providing a durable, functional safety barrier that complements the architectural setting of the property.',
    image: '/assets/images/projects/proj-st-mary-church-railing-2023.jpg',
    alt: 'Timber-finished metal railing installation at Fisherman\'s Church, Singapore',
    featured: true,
  },
  {
    id: 'macpherson-road-railing-2022',
    title: 'Railing installation — MacPherson Road',
    category: 'metal-railings',
    location: 'MacPherson Road, Singapore',
    year: 2022,
    description:
      'Railing installation at a MacPherson Road property — site measurement, fabrication and on-site installation tailored to the existing structure and surrounding finishes.',
    image: '/assets/images/projects/proj-macpherson-road-railing-2022.jpg',
    alt: 'Black metal railing fronting a MacPherson Road property',
    featured: true,
  },
  {
    id: 'wis-changi-railing-2022',
    title: 'Exterior metal railing — WIS@Changi',
    category: 'metal-railings',
    location: 'WIS@Changi, Singapore',
    year: 2022,
    description:
      'Exterior metal railing at WIS@Changi — custom fabrication and installation for outdoor use on a commercial / institutional facade, finished for tropical exposure.',
    image: '/assets/images/projects/proj-wis-changi-railing-2022.jpg',
    alt: 'Exterior white metal railing at WIS@Changi commercial facade',
    featured: true,
  },
  {
    id: '434-macpherson-railing-ramp-2021',
    title: 'Railing and ramp installation — 434 MacPherson',
    category: 'metal-railings',
    location: '434 MacPherson, Singapore',
    year: 2021,
    description:
      'Railing and access ramp installation at 434 MacPherson — fabricated metal components installed to improve access and provide a continuous safety barrier along the walkway edge.',
    image: '/assets/images/projects/proj-434-macpherson-railing-ramp-2021.jpg',
    alt: 'Railing and ramp installation at 434 MacPherson, Singapore',
  },

  // ---- Metal barriers ----
  {
    id: 'pasir-panjang-balcony-barrier-2025',
    title: 'Metal barrier installation — Pasir Panjang balcony',
    category: 'metal-railings',
    location: 'Pasir Panjang, Singapore',
    year: 2025,
    description:
      'Fabrication and installation of metal barriers for a balcony at a Pasir Panjang property — sturdy post-and-rail design suited to the balcony layout and access requirements.',
    image: '/assets/images/projects/proj-pasir-panjang-balcony-barrier-2025.jpg',
    alt: 'White metal balcony barrier at a Pasir Panjang residence',
    featured: true,
  },
  {
    id: 'spire-metal-glass-2024',
    title: 'Metal barrier with glass infill — Spire',
    category: 'stainless-steel-fabrication',
    location: 'Spire, Singapore',
    year: 2024,
    description:
      'Metal barrier installation with glass infill at Spire — combining a fabricated steel frame with glass panels to provide a clean architectural finish around an interior edge.',
    image: '/assets/images/projects/proj-spire-metal-glass-2024.jpg',
    alt: 'Metal barrier with glass infill at the Spire interior',
    featured: true,
  },

  // ---- Custom metal works ----
  {
    id: 'arthur-118-metal-bed-2021',
    title: 'Metal bed fabrication — Arthur 118',
    category: 'custom-metal-works',
    location: 'Arthur 118, Singapore',
    year: 2021,
    description:
      'Fabrication and installation of metal beds at Arthur 118 — sturdy, space-efficient bed frames built to match the room layouts and the client\'s use case.',
    image: '/assets/images/projects/proj-arthur-118-metal-bed-2021.jpg',
    alt: 'Metal bed frames installed at Arthur 118 dormitory rooms',
  },
  {
    id: 'grey-lane-metal-works-2022',
    title: 'Window grille and metal railing — Grey Lane',
    category: 'fencing-and-grilles',
    location: 'Grey Lane, Singapore',
    year: 2022,
    description:
      'Metal works at Grey Lane — replacement of an existing window grille with a metal railing detail. Scope covered material supply, fabrication and on-site installation.',
    image: '/assets/images/projects/proj-grey-lane-metal-works-2022.jpg',
    alt: 'Window grille replaced with metal railing at a Grey Lane property',
  },

  // ---- Metal gates ----
  {
    id: 'collapsible-gate-2021',
    title: 'Collapsible gate installation',
    category: 'metal-gates',
    location: 'Singapore',
    year: 2021,
    description:
      'Supply and installation of collapsible gates — a space-saving access solution detailed to the client\'s opening dimensions and security requirements.',
    image: '/assets/images/projects/proj-collapsible-gate-2021.jpg',
    alt: 'Collapsible metal gate installed at a Singapore property entrance',
  },

];
