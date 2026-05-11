import { Link } from 'react-router-dom';
import RouteHead from '../components/RouteHead';
import CtaBlock from '../components/CtaBlock';
import ProjectCard from '../components/ProjectCard';
import { SITE, CATEGORIES, SPOKES, type CategorySlug } from '../data/site';
import { services } from '../data/services';
import { useProjects } from '../hooks/useProjects';
import { blogPosts } from '../data/blog';

/**
 * Cover image per service card on the home page. Sourced from the existing
 * project portfolio so the rectangles show real metal works rather than
 * placeholder cards.
 */
const SERVICE_CARD_IMAGES: Record<CategorySlug, { src: string; alt: string }> = {
  'custom-metal-works': {
    src: '/assets/images/projects/proj-arthur-118-metal-bed-2021.jpg',
    alt: 'Custom fabricated metal bed frame for an Arthur Road residence, Singapore',
  },
  'stainless-steel-fabrication': {
    src: '/assets/images/projects/proj-rainbow-centre-stainless-bollards-2024.jpg',
    alt: 'Stainless steel SS304 bollards installed at Rainbow Centre, Singapore',
  },
  'metal-gates': {
    src: '/assets/images/projects/proj-strides-premier-metal-gate-2024.jpg',
    alt: 'Metal gate installation at Strides Premier, Singapore',
  },
  'metal-railings': {
    src: '/assets/images/projects/proj-st-mary-church-railing-2023.jpg',
    alt: "Metal railing installation at Fisherman's Church, Singapore",
  },
  'fencing-and-grilles': {
    src: '/assets/images/projects/proj-grey-lane-metal-works-2022.jpg',
    alt: 'Window grille and metal railing at Grey Lane, Singapore',
  },
  'cat-ladders-and-access-metalwork': {
    src: '/assets/images/projects/proj-wan-lee-cat-ladder-2024.jpg',
    alt: 'Cat ladder and roof access metalwork at Wan Lee, Singapore',
  },
  'outdoor-trellis-and-structural-metalwork': {
    src: '/assets/images/projects/proj-outdoor-trellis-2024.jpg',
    alt: 'Outdoor metal trellis fabricated and installed in Singapore',
  },
};

export default function Home() {
  const { projects } = useProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 6);

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE.origin}/#org`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.origin,
    email: SITE.email,
    telephone: SITE.phone_display_1,
    image: `${SITE.origin}${SITE.ogImage}`,
    logo: `${SITE.origin}/assets/images/metalsg-logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address1}, ${SITE.address2}`,
      addressLocality: 'Singapore',
      postalCode: '417808',
      addressCountry: 'SG',
    },
    areaServed: 'Singapore',
    sameAs: SPOKES.map((s) => s.href),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '13:00',
      },
    ],
    serviceArea: { '@type': 'AdministrativeArea', name: 'Singapore' },
  };

  return (
    <>
      <RouteHead
        title="MetalSingapore.sg — Custom Metal Works Contractor in Singapore"
        description="Custom metal works contractor in Singapore — gates, railings, fencing, cat ladders, trellis, stainless steel and structural metalwork. Site visit and itemised quote."
        path="/"
        image={SITE.ogImage}
        jsonLd={localBusiness}
      />

      {/* HERO — dark forest green gradient, blueprint technical card, orange CTA */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              Metal works · Fabrication · Singapore
            </p>
            <h1>Custom metal works for Singapore buildings — gates, railings, fencing and access metalwork.</h1>
            <p className="lead">
              MetalSingapore.sg is the metal-works arm of Ezzogenics Pte Ltd.
              We design, fabricate and install gates, railings, fencing, cat
              ladders, trellis, stainless steel handrails and structural
              metalwork across Singapore — from site survey to a defect
              walk-through, with scope and material grade confirmed in
              writing for every project.
            </p>
            <div className="hero-ctas">
              <Link to="/contact-us" className="btn btn-primary">Get a quote</Link>
              <a
                href={SITE.whatsapp}
                className="btn btn-outline"
                rel="noopener"
                target="_blank"
              >
                WhatsApp +65 9632 0750
              </a>
            </div>
          </div>
          <div className="hero-media">
            <img
              src="/assets/images/projects/proj-frontier-industrial-mezzanine-2024.jpg"
              alt="Structural steel mezzanine fabrication at Frontier Industrial Building, Singapore"
              width={1200}
              height={900}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE — 3 cols */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Why building owners specify MetalSingapore</p>
            <h2>One contractor for the metal package, from drawing to defect walk.</h2>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <h3>Workshop and on-site team</h3>
              <p>
                Welders, fabricators and installers under one roof — shop drawings,
                workshop QC and site installation are run as a single trade rather
                than handed off between sub-contractors.
              </p>
            </div>
            <div className="why-card">
              <h3>Material grade matched to exposure</h3>
              <p>
                Mild steel S275 / S355, hot-dip galvanised mild steel, stainless
                steel SS304 / SS316 and aluminium 6063 — selected against coastal,
                rooftop, indoor and chemical exposure rather than to a single default.
              </p>
            </div>
            <div className="why-card">
              <h3>Coordinated with the project QP</h3>
              <p>
                Where structural sign-off, fire-rated construction or façade
                interaction is involved, we work to the appointed Professional
                Engineer or Qualified Person and present clear method, anchor and
                weld details for review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT PROJECTS */}
      {featured.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Recent projects</p>
              <h2>A snapshot of recent metal-works projects across Singapore.</h2>
              <p style={{ color: 'var(--muted)', maxWidth: '60ch' }}>
                Railings, gates, lockers, ramps, trellis and structural
                metalwork — drawn from the {SITE.legalName} portfolio.
              </p>
            </div>
            <div className="project-grid">
              {featured.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
            <p className="section-more">
              <Link to="/projects" className="btn btn-ghost">All projects →</Link>
            </p>
          </div>
        </section>
      )}

      {/* CORE SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Core services</p>
            <h2>Seven service lines around the metal-works package.</h2>
          </div>
          <div className="service-grid">
            {Object.values(CATEGORIES).map((c) => {
              const svc = services.find((s) => s.slug === c.slug);
              const card = SERVICE_CARD_IMAGES[c.slug];
              return (
                <Link key={c.slug} to={`/services/${c.slug}`} className="service-card service-card--image">
                  <div className="service-card__media">
                    <img
                      src={card.src}
                      alt={card.alt}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={600}
                    />
                  </div>
                  <div className="service-card__body">
                    <p className="eyebrow">Service</p>
                    <h3>{c.title}</h3>
                    <p>{svc?.lead || c.short}</p>
                    <span className="service-card__more">Read more →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* MATERIALS / PERSONNEL NARRATIVE */}
      <section className="section section--alt">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          <div>
            <p className="eyebrow">Materials and finishes</p>
            <h2>Specifications detailed against exposure, loading and service life.</h2>
            <p style={{ color: 'var(--ink-2)' }}>
              Most of our enquiries arrive with a finished look in mind but no
              firm material grade. We work back from the exposure — coastal,
              rooftop, indoor, chemical — and the loading case to recommend an
              appropriate grade in mild steel, galvanised mild steel, stainless
              steel SS304 / SS316 or aluminium. Finishes range from hot-dip
              galvanising and zinc-rich primer with topcoat, through powder
              coating, to mechanical polishing in #4 satin or mirror.
            </p>
            <p>
              <Link to="/blog/en-10025-steel-grades-comparison-singapore" className="btn btn-ghost">
                Read the EN 10025 steel grades reference →
              </Link>
            </p>
          </div>
          <div>
            <p className="eyebrow">Welders, installers and project coordination</p>
            <h2>Workshop welders, on-site installers and a project-by-project method statement.</h2>
            <p style={{ color: 'var(--ink-2)' }}>
              Workshop welding, anchor selection, edge distances and on-site
              fixings are documented per project with a written method
              statement and a risk assessment. Wall and slab anchors are
              specified with reference to the manufacturer's ETA data
              (typically Hilti or Fischer) and the appointed QP's review.
              Where rope-access or boomlift access is needed for installation,
              the work is coordinated with our sister site Rope Access
              Singapore.
            </p>
            <p>
              <Link to="/blog/wall-anchors-hilti-vs-fischer-bolt-sizing-singapore" className="btn btn-ghost">
                Hilti vs Fischer bolt sizing notes →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Resources</p>
            <h2>Recent technical write-ups</h2>
          </div>
          <div className="service-grid">
            {blogPosts.slice(0, 3).map((b) => (
              <Link key={b.slug} to={`/blog/${b.slug}`} className="service-card">
                <p className="eyebrow">Blog</p>
                <h3>{b.title}</h3>
                <p>{b.excerpt}</p>
                <span className="service-card__more">Read article →</span>
              </Link>
            ))}
          </div>
          <p className="section-more">
            <Link to="/blog" className="btn btn-ghost">All resources →</Link>
          </p>
        </div>
      </section>

      <CtaBlock
        heading="Plan your metal works in Singapore"
        body="Send us your scope, drawings or photos. We respond within one working day with site-visit availability and an indicative quotation outline."
      />
    </>
  );
}
