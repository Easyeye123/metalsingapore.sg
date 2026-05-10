import RouteHead from '../components/RouteHead';
import Breadcrumbs, { breadcrumbJsonLd } from '../components/Breadcrumbs';
import CtaBlock from '../components/CtaBlock';
import { faqs } from '../data/faq';

export default function Faq() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <>
      <RouteHead
        title="Metal Works FAQ — MetalSingapore.sg Singapore Contractor"
        description="Common questions about commissioning metal works in Singapore — materials, structural sign-off, anchors, cat ladder height, warranties and how to brief us."
        path="/faq"
        jsonLd={[faqJsonLd, breadcrumbJsonLd([{ label: 'FAQ', path: '/faq' }])]}
      />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'FAQ', to: '/faq' }]} />
          <p className="eyebrow">FAQ</p>
          <h1>What clients usually ask before commissioning metal works.</h1>
          <p className="lead" style={{ maxWidth: '64ch' }}>
            Materials, anchors, structural sign-off, cat ladder heights and how
            we run a project — answered factually. Project-specific approvals
            and ratings are confirmed in writing per project.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820, margin: '0 auto' }}>
          {faqs.map((f, i) => (
            <details
              key={i}
              style={{ borderBottom: '1px solid var(--line)', padding: '1rem 0' }}
              {...(i === 0 ? { open: true } : {})}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  listStyle: 'revert',
                  fontSize: '1.05rem',
                }}
              >
                {f.q}
              </summary>
              <div style={{ marginTop: '0.6rem', color: 'var(--ink-2)', lineHeight: 1.7 }}>
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <CtaBlock
        heading="Got another question?"
        body="Send it through the contact form — we usually respond within one working day."
      />
    </>
  );
}
