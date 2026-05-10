import { useState } from 'react';
import RouteHead from '../components/RouteHead';
import Breadcrumbs, { breadcrumbJsonLd } from '../components/Breadcrumbs';
import { SITE, CATEGORIES, CATEGORY_ORDER } from '../data/site';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <RouteHead
        title="Contact MetalSingapore.sg — Singapore Metal Works Enquiries"
        description="Contact MetalSingapore.sg for gates, railings, fencing, cat ladders, stainless steel and structural metalwork in Singapore. Site visit and indicative quotation."
        path="/contact-us"
        jsonLd={breadcrumbJsonLd([{ label: 'Contact', path: '/contact-us' }])}
      />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Contact', to: '/contact-us' }]} />
          <p className="eyebrow">Contact</p>
          <h1>Send a brief — we&apos;ll come back within one working day.</h1>
          <p className="lead" style={{ maxWidth: '64ch' }}>
            Send a short description, drawings or site photos, and we&apos;ll
            respond with site-visit availability and an indicative quotation
            outline. For urgent enquiries, WhatsApp us directly.
          </p>
        </div>
      </section>

      <section className="section">
        <div
          className="container"
          style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}
        >
          <div>
            <h2>Project enquiry form</h2>
            {SITE.contactNeedsConfirmation && (
              <p className="callout callout--warn" role="status">
                Contact details on this site are based on internal records and
                are pending owner confirmation before go-live.
              </p>
            )}
            {submitted ? (
              <div className="callout">
                <h3 style={{ marginTop: 0 }}>
                  Thanks — we&apos;ve received your enquiry.
                </h3>
                <p>
                  A team member will reply to your email within one working day.
                  If your enquiry is urgent, please WhatsApp us directly.
                </p>
              </div>
            ) : (
              <form
                className="form-grid"
                action="/contact-submit.php"
                method="post"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setError(null);
                  const data = new FormData(e.currentTarget);
                  try {
                    const res = await fetch('/contact-submit.php', {
                      method: 'POST',
                      body: data,
                    });
                    if (!res.ok) throw new Error('Server returned ' + res.status);
                    setSubmitted(true);
                  } catch {
                    setError(
                      'Form submission is not yet wired up on this preview. Please email ' +
                        SITE.email +
                        ' instead.',
                    );
                  }
                }}
              >
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone (optional)</label>
                  <input id="phone" name="phone" autoComplete="tel" />
                </div>
                <div className="field">
                  <label htmlFor="category">Service stream</label>
                  <select id="category" name="category" defaultValue="">
                    <option value="" disabled>
                      Choose a service stream
                    </option>
                    {CATEGORY_ORDER.map((slug) => (
                      <option key={slug} value={slug}>
                        {CATEGORIES[slug].title}
                      </option>
                    ))}
                    <option value="other">Other / multiple</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="message">Project description</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Site address, scope summary, target start date, any specified material grade or finish."
                  />
                </div>
                {/* Honeypot — bots fill this; humans never see it. */}
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', top: 'auto', height: 0 }}
                >
                  <label>
                    Leave this field empty
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                {error && (
                  <p className="callout callout--warn" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ justifySelf: 'start' }}
                >
                  Send enquiry
                </button>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0 }}>
                  By sending this form you agree we may use your contact details
                  to reply to your enquiry. We don&apos;t share enquiries with
                  third parties.
                </p>
              </form>
            )}
          </div>

          <aside>
            <h2>Direct contact</h2>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.9 }}>
              <li>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${SITE.phone_intl_2}`}>{SITE.phone_display_1}</a>
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${SITE.phone_intl_2}`}>{SITE.phone_display_2}</a>
              </li>
              <li>
                <strong>WhatsApp:</strong>{' '}
                <a href={SITE.whatsapp} rel="noopener" target="_blank">
                  Open chat
                </a>
              </li>
            </ul>
            <h3>Office</h3>
            <p style={{ color: 'var(--ink-2)' }}>
              {SITE.address1}
              <br />
              {SITE.address2}
              <br />
              {SITE.address3}
            </p>
            <h3>Hours</h3>
            <p style={{ color: 'var(--ink-2)' }}>
              {SITE.hoursWeekday}
              <br />
              {SITE.hoursSaturday}
              <br />
              {SITE.hoursSunday}
            </p>
          </aside>
        </div>
      </section>

      <section className="section section--alt" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <h2>Find us</h2>
          <p style={{ color: 'var(--ink-2)', maxWidth: '62ch' }}>
            {SITE.address1}, {SITE.address2}, {SITE.address3}.
          </p>
          <div
            style={{
              border: '1px solid var(--line, #e5e7eb)',
              borderRadius: 12,
              overflow: 'hidden',
              aspectRatio: '16 / 9',
            }}
          >
            <iframe
              title={SITE.mapsAddressForTitle}
              src={SITE.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ width: '100%', height: '100%', border: 0 }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
