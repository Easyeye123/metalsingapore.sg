import { Link } from 'react-router-dom';
import RouteHead from '../components/RouteHead';

export default function NotFound() {
  return (
    <>
      <RouteHead
        title="Page not found — Ezzogenics"
        description="The page you requested could not be found on Ezzogenics.com. Browse services, projects or contact us instead."
        path="/404"
        noindex
      />
      <section className="page-hero">
        <div className="container">
          <h1>Page not found</h1>
          <p className="lead" style={{ maxWidth: '60ch' }}>
            The page you requested does not exist. Try the <Link to="/">homepage</Link>,
            our <Link to="/services">services</Link>, the <Link to="/projects">project portfolio</Link>,
            or <Link to="/contact-us">contact us</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
