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
      'Buroh Street cat ladder project involving the construction of two fixed vertical cat ladder sets up to 18 m high, each with an intermediate platform. The project included review of the building wall structure and substrate, with planning input from the Professional Engineer team and Fischer Singapore technical support on the M16 bolt grade used. Both flights carry safety hoop cages along the climb and a top cage at the upper landing.',
    note:
      'PE coordination, the wall-substrate review and the Fischer M16 bolt-grade recommendation apply to this installation only. Anchor type, bolt size and structural sign-off are project-specific and depend on the wall, loading and exposure on each site.',
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

  // ---- Metal railings / handrails ----
  {
    id: 'st-mary-church-railing-2023',
    title: 'Railing installation — St Mary Church',
    category: 'metal-railings',
    location: 'St Mary Church, Singapore',
    year: 2023,
    description:
      'Railing installation at St Mary Church providing a durable, functional safety barrier that complements the architectural setting of the property.',
    image: '/assets/images/projects/proj-st-mary-church-railing-2023.jpg',
    alt: 'Timber-finished metal railing installation at St Mary Church, Singapore',
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
    id: 'lorong-23-geylang-locker-2024',
    title: 'Custom locker fabrication — 1 Lorong 23 Geylang',
    category: 'custom-metal-works',
    location: '1 Lorong 23 Geylang, Singapore',
    year: 2024,
    description:
      'Custom locker supply and installation at 1 Lorong 23 Geylang — powder-coated mild-steel cabinet panels with hinges and lock detail coordinated to the client\'s storage layout.',
    image: '/assets/images/projects/proj-lorong-23-geylang-locker-2024.jpg',
    alt: 'Bank of custom mild-steel lockers at 1 Lorong 23 Geylang',
    featured: true,
  },
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
    id: 'parkway-parade-metal-2023',
    title: 'Custom metal works — Parkway Parade',
    category: 'custom-metal-works',
    location: 'Parkway Parade, Singapore',
    year: 2023,
    description:
      'Custom metal fabrication and installation at Parkway Parade — components fabricated to suit the site requirements and integrated with surrounding interior works.',
    image: '/assets/images/projects/proj-parkway-parade-metal-2023.jpg',
    alt: 'Custom metal fabrication work at Parkway Parade',
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

  // ---- Outdoor trellis / structural ----
  {
    id: 'outdoor-trellis-2024',
    title: 'Outdoor trellis fabrication and installation',
    category: 'outdoor-trellis-and-structural-metalwork',
    location: 'TR 6 University Road, Singapore',
    year: 2024,
    description:
      'Fabrication and installation of an outdoor trellis at TR 6 University Road — a functional and decorative metal structure detailed to the architect\'s drawings and finished for outdoor exposure.',
    image: '/assets/images/projects/proj-outdoor-trellis-2024.jpg',
    alt: 'Outdoor metal trellis at TR 6 University Road, Singapore',
    featured: true,
  },
  {
    id: 'park-east-condo-frame-2019',
    title: 'Metal frame installation — Park East Condo',
    category: 'outdoor-trellis-and-structural-metalwork',
    location: 'Park East Condo, Singapore',
    year: 2019,
    description:
      'Metal frame installation at Park East Condo supporting structural and access requirements with fabricated metal components — before-and-after sequence captured on site.',
    image: '/assets/images/projects/proj-park-east-condo-frame-2019.jpg',
    alt: 'Replacement metal frame at Park East Condo, before and after',
  },

  // ---- Cat ladders / access metalwork (ramps) ----
  {
    id: 'supply-fabricate-ramp-2022',
    title: 'Supply and fabrication of metal ramp',
    category: 'cat-ladders-and-access-metalwork',
    location: 'Singapore',
    year: 2022,
    description:
      'Supply and fabrication of a metal access ramp — durable substrate, anti-slip top finish and side handrails detailed for the slope and landing geometry on site.',
    image: '/assets/images/projects/proj-supply-fabricate-ramp-2022.jpg',
    alt: 'White metal access ramp with side handrails',
    featured: true,
  },
  {
    id: 'buroh-lane-ramp-repair-2023',
    title: 'Ramp repair — 7 Buroh Lane',
    category: 'cat-ladders-and-access-metalwork',
    location: '7 Buroh Lane, Singapore',
    year: 2023,
    description:
      'Ramp repair at 7 Buroh Lane — restoration of access using durable replacement metal components, repair welding and protective finish, returning the ramp to working condition.',
    image: '/assets/images/projects/proj-buroh-lane-ramp-repair-2023.jpg',
    alt: 'Ramp repair work at 7 Buroh Lane',
  },

  // ---- Aluminium frame / glass door ----
  {
    id: 'aluminium-glass-door-2019',
    title: 'Aluminium frame glass door installation',
    category: 'custom-metal-works',
    location: 'Singapore',
    year: 2019,
    description:
      'Aluminium frame glass door installation — a durable, functional entry solution with a clean finished appearance, sized and fitted to suit the existing opening.',
    image: '/assets/images/projects/proj-aluminium-glass-door-2019.jpg',
    alt: 'Aluminium frame glass door installation in Singapore',
  },
];
