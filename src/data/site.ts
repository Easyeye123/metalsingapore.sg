/**
 * Brand and contact constants for MetalSingapore.sg, the metal works
 * contractor microsite in the Ezzogenics group. Source of truth — confirm
 * details with the client before go-live and keep build/site.py SITE in sync.
 */

export const SITE = {
  name: 'MetalSingapore.sg',
  shortName: 'MetalSingapore',
  legalName: 'Ezzogenics Pte Ltd',
  origin: 'https://metalsingapore.sg',
  tagline:
    'Custom metal works contractor in Singapore — gates, railings, fencing, cat ladders, trellis, stainless steel and structural metalwork.',
  email: 'david@ezzogenics.com',
  phone_display_1: '+65 6968 3098',
  phone_display_2: '+65 9632 0750',
  phone_intl_2: '+6596320750',
  whatsapp: 'https://wa.me/6596320750',
  address1: 'Bartley Biz Centre',
  address2: 'Blk 15 Kaki Bukit Rd 4, #01-44',
  address3: 'Singapore 417808',
  hoursWeekday: 'Mon – Fri: 8:00 AM – 6:00 PM',
  hoursSaturday: 'Sat: 8:00 AM – 1:00 PM',
  hoursSunday: 'Sun & PH: By appointment',
  contactNeedsConfirmation: false,
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Bartley+Biz+Centre%2C+Blk+15+Kaki+Bukit+Rd+4%2C+%2301-44%2C+Singapore+417808&hl=en&z=16&output=embed',
  mapsAddressForTitle:
    'MetalSingapore office at Bartley Biz Centre, Blk 15 Kaki Bukit Rd 4, #01-44, Singapore 417808',
  ogImage: '/assets/images/og-metalsingapore.jpg',
};

/**
 * Sister contractor sites in the Ezzogenics group. Use descriptive anchors
 * and only a brief blurb — outbound links are restrained.
 */
export const SPOKES = [
  {
    href: 'https://ezzogenics.com',
    title: 'Ezzogenics Pte Ltd',
    blurb: 'Group hub — flooring, commercial renovation, work at height, glass & metal.',
    category: 'group',
  },
  {
    href: 'https://metalglassworksingapore.com/',
    title: 'Metal & Glass Work Singapore',
    blurb: 'Glass-and-metal balustrades, doors, partitions and curtain wall.',
    category: 'metal-glass',
  },
  {
    href: 'https://glassexpertsingapore.com',
    title: 'Glass Expert Singapore',
    blurb: 'Glass partitions, railings, skylights and shopfronts.',
    category: 'glass',
  },
  {
    href: 'https://workatheight.sg',
    title: 'Work at Height SG',
    blurb: 'Facade, painting, signage and access works carried out at height.',
    category: 'work-at-height',
  },
  {
    href: 'https://rope-access-singapore.com/',
    title: 'Rope Access Singapore',
    blurb: 'IRATA rope access for facade, waterproofing and inspection.',
    category: 'work-at-height',
  },
];

/**
 * Service categories for MetalSingapore.sg. The slug is also the URL
 * segment under /services/<slug>/. Keep aligned with build/site.py
 * CATEGORIES.
 */
export const CATEGORIES = {
  'custom-metal-works': {
    slug: 'custom-metal-works',
    title: 'Custom Metal Works',
    short: 'Bespoke fabrication for residential, commercial and industrial sites.',
    cover: '/assets/images/cat-custom-metal-works.jpg',
  },
  'stainless-steel-fabrication': {
    slug: 'stainless-steel-fabrication',
    title: 'Stainless Steel Fabrication',
    short: 'SS304 / SS316 railings, frames, counters and structural elements.',
    cover: '/assets/images/cat-stainless-steel-fabrication.jpg',
  },
  'metal-gates': {
    slug: 'metal-gates',
    title: 'Metal Gates',
    short: 'Manual and automatic swing/sliding gates for landed and commercial sites.',
    cover: '/assets/images/cat-metal-gates.jpg',
  },
  'metal-railings': {
    slug: 'metal-railings',
    title: 'Metal Railings',
    short: 'Balcony, staircase, ramp and walkway railings — mild steel and stainless.',
    cover: '/assets/images/cat-metal-railings.jpg',
  },
  'fencing-and-grilles': {
    slug: 'fencing-and-grilles',
    title: 'Fencing & Grilles',
    short: 'Boundary fencing, perimeter security, window grilles and gate panels.',
    cover: '/assets/images/cat-fencing-and-grilles.jpg',
  },
  'cat-ladders-and-access-metalwork': {
    slug: 'cat-ladders-and-access-metalwork',
    title: 'Cat Ladders & Access Metalwork',
    short: 'Fixed vertical ladders, catwalks, ramps and roof-access steel.',
    cover: '/assets/images/cat-cat-ladders-and-access-metalwork.jpg',
  },
  'outdoor-trellis-and-structural-metalwork': {
    slug: 'outdoor-trellis-and-structural-metalwork',
    title: 'Outdoor Trellis & Structural Metalwork',
    short: 'Pergolas, trellis frames, awning frames and exposed structural steel.',
    cover: '/assets/images/cat-outdoor-trellis-and-structural-metalwork.jpg',
  },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

export const CATEGORY_ORDER: CategorySlug[] = [
  'custom-metal-works',
  'stainless-steel-fabrication',
  'metal-gates',
  'metal-railings',
  'fencing-and-grilles',
  'cat-ladders-and-access-metalwork',
  'outdoor-trellis-and-structural-metalwork',
];
