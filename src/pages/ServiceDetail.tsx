import { Link, useParams } from 'react-router-dom';
import RouteHead from '../components/RouteHead';
import Breadcrumbs, { breadcrumbJsonLd } from '../components/Breadcrumbs';
import CtaBlock from '../components/CtaBlock';
import ProjectCard from '../components/ProjectCard';
import { services } from '../data/services';
import { CATEGORIES, SITE, SPOKES } from '../data/site';
import { useProjects } from '../hooks/useProjects';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const svc = services.find((s) => s.slug === slug);
  const { projects } = useProjects();
  if (!svc) return <NotFound />;

  const cat = CATEGORIES[svc.slug];
  const path = `/services/${svc.slug}`;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: svc.h1,
    description: svc.metaDescription,
    serviceType: cat.title,
    areaServed: 'Singapore',
    provider: { '@id': `${SITE.origin}/#org`, '@type': 'GeneralContractor', name: SITE.name, url: SITE.origin },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { label: 'Services', path: '/services' },
    { label: cat.title, path },
  ]);

  const related = projects.filter((p) => p.category === svc.slug).slice(0, 6);
  const spokeLinks = SPOKES.filter((s) => s.category === svc.slug);

  return (
    <>
      <RouteHead
        title={svc.metaTitle}
        description={svc.metaDescription}
        path={path}
        image={svc.cover}
        jsonLd={[serviceJsonLd, breadcrumbs]}
      />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs
            items={[{ label: 'Services', to: '/services' }, { label: cat.title, to: path }]}
          />
          <h1>{svc.h1}</h1>
          <p className="lead" style={{ maxWidth: '62ch' }}>{svc.lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem' }}>
          <div className="prose">
            <h2>What this scope covers</h2>
            <p>{svc.whatItIs}</p>

            <h2>Who it&apos;s for</h2>
            <ul>
              {svc.whoForBullets.map((b) => <li key={b}>{b}</li>)}
            </ul>

            <h2>Scope of work</h2>
            <ul>
              {svc.scopeBullets.map((b) => <li key={b}>{b}</li>)}
            </ul>

            <h2>How a project runs</h2>
            <ol>
              {svc.processBullets.map((b) => <li key={b}>{b}</li>)}
            </ol>

            {svc.subtopics && svc.subtopics.length > 0 && (
              <>
                <h2>Sub-topics</h2>
                {svc.subtopics.map((t) => (
                  <div key={t.title}>
                    <h3>{t.title}</h3>
                    <p>{t.body}</p>
                  </div>
                ))}
              </>
            )}

            <h2>What we don&apos;t claim</h2>
            <div className="callout callout--warn">
              <ul style={{ margin: 0 }}>
                {svc.cautions.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          </div>

          <aside>
            <div className="callout">
              <h3 style={{ marginTop: 0 }}>Plan this scope with us</h3>
              <p style={{ margin: 0 }}>
                Send the site address, scope summary and any drawings — we
                respond with site-visit availability within one working day.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <Link to="/contact-us" className="btn btn-primary">Request a site visit</Link>
              </p>
            </div>
            {spokeLinks.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3>Specialist spoke sites</h3>
                <ul style={{ paddingLeft: '1.1rem' }}>
                  {spokeLinks.map((s) => (
                    <li key={s.href}><a href={s.href} rel="noopener" target="_blank">{s.title}</a> — {s.blurb}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Recent {cat.title.toLowerCase()} works</p>
              <h2>Projects in this specialisation</h2>
            </div>
            <div className="project-grid">
              {related.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
            <p className="section-more">
              <Link to="/projects" className="btn btn-ghost">All projects →</Link>
            </p>
          </div>
        </section>
      )}

      <CtaBlock heading={`Talk to us about ${cat.title.toLowerCase()}`} />
    </>
  );
}
