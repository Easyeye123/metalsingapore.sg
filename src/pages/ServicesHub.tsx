import { Link } from 'react-router-dom';
import RouteHead from '../components/RouteHead';
import Breadcrumbs, { breadcrumbJsonLd } from '../components/Breadcrumbs';
import CtaBlock from '../components/CtaBlock';
import { CATEGORIES, CATEGORY_ORDER } from '../data/site';
import { services } from '../data/services';

export default function ServicesHub() {
  return (
    <>
      <RouteHead
        title="MetalSingapore Services — Metal Works Specialisations in Singapore"
        description="Seven metal works streams from MetalSingapore.sg — custom metal works, stainless steel fabrication, gates, railings, fencing, cat ladders and structural metalwork in Singapore."
        path="/services"
        jsonLd={breadcrumbJsonLd([{ label: 'Services', path: '/services' }])}
      />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Services', to: '/services' }]} />
          <p className="eyebrow">Services</p>
          <h1>Seven metal works streams under one Singapore contractor.</h1>
          <p className="lead" style={{ maxWidth: '64ch' }}>
            Pick a single scope for a sub-package, or combine streams for a
            turnkey project. Each service page sets out what we cover, who it
            suits, how the work runs and what we don&apos;t claim.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="hub-grid">
            {CATEGORY_ORDER.map((slug) => {
              const c = CATEGORIES[slug];
              const svc = services.find((s) => s.slug === slug);
              return (
                <Link key={slug} to={`/services/${slug}`} className="hub-card">
                  <img
                    src={c.cover}
                    alt={`${c.title} — Singapore metal works contractor`}
                    width={600}
                    height={450}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="hub-card__body">
                    <h3>{c.title}</h3>
                    <p>{svc?.lead || c.short}</p>
                    <span className="hub-card__more">Read service detail →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How to brief us</p>
            <h2>What helps us quote faster</h2>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <h3>Site address &amp; access</h3>
              <p>
                Postal code, building type and access constraints (lift size,
                working hours, site induction). For external works, note the
                wall substrate (RC, brick, metal-deck cladding) where you can.
              </p>
            </div>
            <div className="why-card">
              <h3>Drawings or photos</h3>
              <p>
                Architect drawings, dimensioned sketches or a few annotated
                photos of the existing condition are usually enough to start.
                We confirm dimensions on a site visit before fabrication.
              </p>
            </div>
            <div className="why-card">
              <h3>Material &amp; finish</h3>
              <p>
                Tell us if the project specifies a material grade (SS304 /
                SS316, galvanised mild steel, aluminium) or a finish system
                (powder coat, 2K paint, hot-dip galvanising). We&apos;ll match
                or recommend.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBlock heading="Not sure which scope you need?" body="Send drawings, photos or a brief description. We help size the right scope and propose an appropriate fabrication and install plan." />
    </>
  );
}
