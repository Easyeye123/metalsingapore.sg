import { Link } from 'react-router-dom';
import { SITE, CATEGORIES, SPOKES } from '../data/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">{SITE.name}</p>
          <p className="footer-tagline">
            Custom metal works contractor in Singapore — gates, railings, fencing,
            cat ladders, trellis, stainless steel and structural metalwork.
            Scope, materials and method are confirmed in writing per project.
          </p>
        </div>
        <div>
          <h2 className="footer-heading">Services</h2>
          <ul className="footer-links">
            {Object.values(CATEGORIES).map((c) => (
              <li key={c.slug}>
                <Link to={`/services/${c.slug}`}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-heading">Company</h2>
          <ul className="footer-links">
            <li><Link to="/about-us">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-heading">Contact</h2>
          <ul className="footer-links">
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href={`tel:${SITE.phone_intl_2}`}>{SITE.phone_display_1}</a></li>
            <li><a href={`tel:${SITE.phone_intl_2}`}>{SITE.phone_display_2}</a></li>
            <li><a href={SITE.whatsapp} rel="noopener noreferrer" target="_blank">WhatsApp</a></li>
            <li>{SITE.address1}</li>
            <li>{SITE.address2}</li>
            <li>{SITE.address3}</li>
          </ul>
        </div>
      </div>
      <div className="container">
        <h2 className="footer-heading">Group sites</h2>
        <ul className="footer-links" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.4rem 1.2rem' }}>
          {SPOKES.map((s) => (
            <li key={s.href}>
              <a href={s.href} rel="noopener" target="_blank">{s.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="container footer-legal">
        <p>&copy; {year} Ezzogenics Pte Ltd. Operating as {SITE.name}. Singapore.</p>
        <p>
          References on this site to BCA, SCDF, NEA, Workplace Safety and Health regulations,
          IRATA, Hilti, Fischer or any other standard, brand or authority are factual.
          Specific approvals, licences, certifications and load ratings applicable to a
          given project should be verified by the appointed qualified person, professional
          engineer, supplier or authority. Nothing on this website constitutes a blanket
          compliance, performance or load-rating guarantee.
        </p>
      </div>
    </footer>
  );
}
