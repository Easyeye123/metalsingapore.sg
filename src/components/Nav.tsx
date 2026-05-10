import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { SITE } from '../data/site';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link to="/" className="brand" onClick={close} aria-label={`${SITE.name} home`}>
          <span className="brand-mark" aria-hidden="true"><span>M</span></span>
          <span className="brand-text">
            <strong>MetalSingapore</strong>
            <span>Custom metal works</span>
          </span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden>{open ? '✕' : '☰'}</span>
        </button>
        <nav id="primary-nav" className={`primary-nav${open ? ' is-open' : ''}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/about-us" onClick={close}>About</NavLink>
          <NavLink to="/services" onClick={close}>Services</NavLink>
          <NavLink to="/projects" onClick={close}>Projects</NavLink>
          <NavLink to="/blog" onClick={close}>Blog</NavLink>
          <NavLink to="/faq" onClick={close}>FAQ</NavLink>
          <NavLink to="/contact-us" className="nav-cta" onClick={close}>Get a Quote</NavLink>
        </nav>
      </div>
    </header>
  );
}
