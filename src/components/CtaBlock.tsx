import { Link } from 'react-router-dom';
import { SITE } from '../data/site';

/**
 * Standard call-to-action band used at the bottom of pages.
 * Kept generic so any page can override the heading/body for context.
 */
export default function CtaBlock({ heading, body }: { heading?: string; body?: string }) {
  return (
    <section className="cta-band">
      <div className="container cta-band-row">
        <div>
          <h2 style={{ marginTop: 0 }}>{heading || `Plan your metal works with ${SITE.shortName}`}</h2>
          <p style={{ maxWidth: '60ch', margin: 0 }}>
            {body ||
              'Send a brief, drawings or site photos. We respond within one working day with site-visit availability and an indicative quotation outline. Scope, materials and method are confirmed in writing per project.'}
          </p>
        </div>
        <div className="cta-actions">
          <Link to="/contact-us" className="btn btn-primary">
            Request a site visit
          </Link>
          <a
            href={SITE.whatsapp}
            className="btn btn-outline"
            rel="noopener"
            target="_blank"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
