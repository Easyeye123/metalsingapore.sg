/**
 * Visible FAQ — questions and answers used both on the public FAQ page and
 * the FAQPage JSON-LD on that page. Per protocol, FAQPage schema is only
 * emitted alongside genuinely visible Q&A.
 *
 * Tone: factual, hedged, contractor-voice. No "best/cheapest/QP-endorsed"
 * statements. References to standards or authorities are factual; specific
 * approvals are confirmed per project.
 */

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'What does MetalSingapore.sg do?',
    a: 'MetalSingapore.sg is the metal works arm of Ezzogenics Pte Ltd. We design-assist, fabricate and install metal works in Singapore — custom metal works, stainless steel fabrication, metal gates, metal railings, fencing and grilles, cat ladders and access metalwork, and outdoor trellis and structural metalwork.',
  },
  {
    q: 'Where do you operate?',
    a: 'We work across Singapore. Our office and workshop coordination point is at Bartley Biz Centre, Blk 15 Kaki Bukit Rd 4, #01-44, Singapore 417808. Site coverage extends from CBD commercial properties to landed homes, condominiums, schools, places of worship and JTC-zone industrial premises.',
  },
  {
    q: 'What materials do you fabricate in?',
    a: 'Mild steel sections (S275, S355) for structural frames; galvanised mild steel for outdoor scopes; stainless steel SS304 for general service and SS316 for marine or corrosive exposure; aluminium 6063-T6 for lightweight cat ladders, awning and trellis frames. Final material grade for a project should reference the supplier technical data sheet and any project specification.',
  },
  {
    q: 'Do you provide structural sign-off or PE endorsement?',
    a: 'We do not act as a Professional Engineer or Qualified Person. Where a project needs structural sign-off — for example tall cat ladders with mid-platforms, balustrade load checks or external structural metalwork — we coordinate with an appointed PE / QP engaged for that project. PE involvement, anchor selection and bolt sizing are project-specific and apply to the as-built installation only.',
  },
  {
    q: 'What about wall anchors and bolts? Hilti or Fischer?',
    a: 'Both are commonly used in Singapore. The right anchor type, embedment depth and bolt size depend on the wall substrate (RC, brick, hollow-core, metal-deck cladding), loading and exposure. We follow the supplier technical data sheet (e.g. Hilti or Fischer ETA approvals) and coordinate on-site pull-out testing where the project specification or PE requires it. Our blog has notes on Hilti vs Fischer anchor sizing as a reference, not a project-specific recommendation.',
  },
  {
    q: 'How tall a cat ladder can you build?',
    a: 'We have installed cat ladders up to roughly 18 m with intermediate landing platforms, safety hoop cages and substrate-appropriate wall anchors. Beyond about 6 m, ladders typically carry mid-platforms and additional fall-protection details, and structural sign-off is coordinated with the project PE. Final height, platform spacing and cage detail are confirmed against the project drawings and authority requirements where applicable.',
  },
  {
    q: 'Do you work with main contractors and ID firms?',
    a: 'Yes. We are often engaged as a sub-contractor for the metal-works package within a larger A&A renovation or fit-out, and coordinate through the main contractor or ID firm. We can also act as a direct contractor for owners and facility managers who only need the metal-works scope.',
  },
  {
    q: 'How do I request a site visit and quotation?',
    a: 'Email david@ezzogenics.com or call +65 6968 3098 / +65 9632 0750 (also on WhatsApp). Provide site address, scope summary, photos or drawings if available, and a target start date. We respond within one working day for standard enquiries, and most enquiries lead to a site visit within one working week.',
  },
  {
    q: 'What kind of warranty do you provide?',
    a: 'Workmanship and material warranties depend on the system specified on the project — for example powder-coat suppliers, sealant brands, hot-dip galvanising suppliers and stainless-steel grade specifications carry their own published warranties. The applicable warranty is set out on each quotation. We do not make blanket "guaranteed" claims that go beyond the supplier coverage.',
  },
];
