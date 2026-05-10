import { Link } from 'react-router-dom';
import RouteHead from '../components/RouteHead';
import Breadcrumbs, { breadcrumbJsonLd } from '../components/Breadcrumbs';
import CtaBlock from '../components/CtaBlock';
import { blogPosts } from '../data/blog';
import { CATEGORIES } from '../data/site';

export default function BlogHub() {
  return (
    <>
      <RouteHead
        title="Resources & Blog — MetalSingapore.sg Metal Works Singapore"
        description="Technical write-ups for Singapore metal works — EN 10025 steel grades, SS304 vs SS316, cat ladders, handrails, anchors, fencing and structural metalwork."
        path="/blog"
        jsonLd={breadcrumbJsonLd([{ label: 'Blog', path: '/blog' }])}
      />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Blog', to: '/blog' }]} />
          <h1>Resources &amp; blog</h1>
          <p className="lead" style={{ maxWidth: '62ch' }}>
            Working notes for Singapore designers, fabricators and facility
            managers — EN 10025 steel grades, stainless steel selection, cat
            ladder design, anchors and structural metalwork. References to BCA,
            SCDF, EN and supplier ETAs are drawn from public documents; verify
            the latest edition for your project.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-grid">
            {blogPosts.map((b) => (
              <Link key={b.slug} to={`/blog/${b.slug}`} className="service-card">
                <p className="muted" style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '0 0 0.4rem' }}>
                  {b.categories.map((c) => CATEGORIES[c]?.title || c).join(' · ')}
                  {' · '}{b.readingMinutes} min read
                </p>
                <h3>{b.title}</h3>
                <p>{b.excerpt}</p>
                <span className="service-card__more">Read article →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock heading="Got a project that needs the same approach?" />
    </>
  );
}
