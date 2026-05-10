import { Link } from 'react-router-dom';
import RouteHead from '../components/RouteHead';
import Breadcrumbs, { breadcrumbJsonLd } from '../components/Breadcrumbs';
import CtaBlock from '../components/CtaBlock';
import { SITE } from '../data/site';

export default function About() {
  return (
    <>
      <RouteHead
        title="About MetalSingapore.sg — Metal Works Contractor Profile"
        description="MetalSingapore.sg is the metal works arm of Ezzogenics Pte Ltd in Singapore — gates, railings, fencing, cat ladders, stainless steel and structural metalwork."
        path="/about-us"
        jsonLd={breadcrumbJsonLd([{ label: 'About', path: '/about-us' }])}
      />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'About', to: '/about-us' }]} />
          <p className="eyebrow">About</p>
          <h1>Singapore metal works contractor — workshop, site, sign-off.</h1>
          <p className="lead" style={{ maxWidth: '64ch' }}>
            {SITE.shortName} is the metal works arm of {SITE.legalName}. We
            fabricate and install gates, railings, fencing, cat ladders,
            stainless steel and structural metalwork for residential, commercial
            and industrial projects across Singapore.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose" style={{ maxWidth: '70ch' }}>
            <h2>What we do</h2>
            <p>
              We carry projects end-to-end — site survey, shop drawings,
              workshop fabrication, surface finishing, on-site installation and
              defect walk-through. Material selection covers mild steel,
              galvanised steel, stainless steel (SS304 / SS316) and aluminium
              alloys. Finish systems include hot-dip galvanising, zinc-rich
              primer plus topcoat, powder coating and stainless mechanical
              polishing. Our seven service streams sit under one roof and are
              listed under{' '}
              <Link to="/services">services</Link>.
            </p>

            <h2>How a project runs</h2>
            <p>
              Every project starts with a site visit — measured sketches,
              condition photos and a written scope summary. Quotations are
              itemised, listing inclusions, exclusions and assumptions so the
              client knows what is and isn&apos;t covered. During execution, we
              maintain a phased programme, weekly progress photos and a
              request-for-information log, and close out with a defect
              walk-through, a manuals pack and any applicable supplier
              warranties.
            </p>

            <h2>Engineering and sign-off</h2>
            <p>
              Where the works require structural sign-off — typically tall cat
              ladders, mid-flight platforms, balustrade load checks or
              external structural metalwork — we coordinate with an appointed
              Professional Engineer or Qualified Person. We do not act as the
              PE / QP ourselves. Anchor selection (for example chemical anchors
              from Hilti or Fischer) is project-specific; bolt size, embedment
              and pull-out testing should reference the supplier technical
              data sheet and the project specification rather than a blanket
              rule.
            </p>

            <h2>Safety on site</h2>
            <p>
              On-site welding, grinding, drilling and access work is carried
              out under a written risk assessment and method statement
              appropriate to the access method and personnel assigned. Where
              work is at height, fall-protection equipment, harness inspection
              and rescue arrangements are confirmed before the lift starts.
              Specific certifications — for example licensed electrical
              workers, qualified persons, IRATA-certified rope-access
              technicians for facade access — are confirmed in writing per
              project.
            </p>

            <h2>Where we serve</h2>
            <p>
              {SITE.shortName} is based at {SITE.address1}, {SITE.address2},{' '}
              {SITE.address3}, and works on sites across Singapore. Site
              coverage extends from CBD commercial properties to landed homes,
              condominiums, schools, places of worship and JTC-zone industrial
              premises. Most enquiries lead to a site visit within one working
              week.
            </p>

            <h2>Group and sister sites</h2>
            <p>
              {SITE.shortName} is operated by {SITE.legalName}, a Singapore
              contractor with sister websites focused on related specialisations
              — flooring, commercial renovation, work at height (rope access
              and boomlift) and glass &amp; metal works. The full set of group
              sites is listed in the footer. For direct project enquiries on
              metal works, use{' '}
              <Link to="/contact-us">our contact form</Link>{' '}or WhatsApp on{' '}
              <a href={SITE.whatsapp} rel="noopener" target="_blank">
                {SITE.phone_display_2}
              </a>.
            </p>

            <h2>What we don&apos;t claim</h2>
            <p>
              References on this site to BCA, SCDF, NEA, Workplace Safety and
              Health regulations, IRATA, Hilti, Fischer or any other standard,
              brand or authority are factual. Specific approvals, licences,
              certifications and load ratings applicable to a given project
              should be verified by the appointed qualified person,
              professional engineer, supplier or authority. Nothing on this
              site constitutes a blanket compliance, performance or load-rating
              guarantee.
            </p>
          </div>
        </div>
      </section>

      <CtaBlock heading="Tell us about your project" />
    </>
  );
}
