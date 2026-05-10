import { Link, useParams } from 'react-router-dom';
import RouteHead from '../components/RouteHead';
import Breadcrumbs, { breadcrumbJsonLd } from '../components/Breadcrumbs';
import CtaBlock from '../components/CtaBlock';
import Markdown from '../components/Markdown';
import { blogPosts, getBlogMarkdown } from '../data/blog';
import { SITE } from '../data/site';
import NotFound from './NotFound';

// PDFs that are bundled alongside the Markdown body. Pages whose baseFile
// is NOT in this set hide the "Download the PDF version" link to avoid
// linking to a missing asset.
const PDF_AVAILABLE = new Set([
  'Blog_18m_CatLadder_Design_Engineering',
  'Blog_CatLadder_Aluminium_vs_SS304_vs_GalvMS',
  'Blog_CatLadder_WallEmbedment_Engineering',
  'Blog_Wall_Anchors_Hilti_vs_Fischer_BoltSizing',
  'Blog_Handrail_SS304_vs_MildSteel',
  'Blog_Lifespan_GalvMS_vs_SS304_vs_SS316',
  'Blog_SCDF_CatLadder_Solar_RoofAccess',
  'Blog_Floor_Loading_Singapore_BCA_SCDF_JTC',
]);

function SteelGradesExtras() {
  return (
    <>
      <figure
        className="blog-gallery"
        style={{ margin: '2rem 0', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
      >
        <img
          src="/assets/images/blog/steel-grades/04_ms_hbeam_stack.jpg"
          alt="Stacked S275 and S355 mild-steel H-beams ready for fabrication"
          width={652}
          height={558}
          loading="lazy"
          style={{ width: '100%', height: 'auto', borderRadius: 6 }}
        />
        <img
          src="/assets/images/blog/steel-grades/01_s355_hbeam.jpg"
          alt="S355 structural mild-steel H-beam — primary frame steel"
          width={500}
          height={500}
          loading="lazy"
          style={{ width: '100%', height: 'auto', borderRadius: 6 }}
        />
        <img
          src="/assets/images/blog/steel-grades/02_ss316_handrail.jpg"
          alt="Marine-grade SS316 stainless steel handrail and fittings"
          width={1024}
          height={1024}
          loading="lazy"
          style={{ width: '100%', height: 'auto', borderRadius: 6 }}
        />
        <figcaption style={{ gridColumn: '1 / -1', fontSize: '0.9rem', color: 'var(--muted)' }}>
          Reference photos — mild-steel H-section stacks and an SS316 marine handrail.
        </figcaption>
      </figure>
    </>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find((b) => b.slug === slug);
  if (!post) return <NotFound />;

  const md = getBlogMarkdown(post.baseFile);
  const path = `/blog/${post.slug}`;
  const ogImagePath = post.image || SITE.ogImage;
  const articleJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedISO,
    dateModified: post.publishedISO,
    description: post.metaDescription,
    image: `${SITE.origin}${ogImagePath}`,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.origin },
    publisher: { '@id': `${SITE.origin}/#org`, '@type': 'Organization', name: SITE.name },
    mainEntityOfPage: `${SITE.origin}${path}`,
  };
  const breadcrumbs = breadcrumbJsonLd([
    { label: 'Blog', path: '/blog' },
    { label: post.title, path },
  ]);
  const showPdf = PDF_AVAILABLE.has(post.baseFile);

  return (
    <>
      <RouteHead
        title={post.metaTitle}
        description={post.metaDescription}
        path={path}
        image={ogImagePath}
        jsonLd={[articleJsonLd, breadcrumbs]}
      />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[
            { label: 'Blog', to: '/blog' },
            { label: post.title, to: path },
          ]} />
          <h1>{post.title}</h1>
          <p className="muted" style={{ color: 'var(--muted)' }}>
            Published {new Date(post.publishedISO).toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric' })}
            {' · '}{post.readingMinutes} min read
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article>
            {md ? (
              <Markdown source={md} />
            ) : (
              <div className="prose">
                <p>The full Markdown for this post is bundled with the project
                  source. If you are viewing this in production and the body
                  is empty, please check that <code>/assets/data/blogs/{post.baseFile}.md</code> is
                  deployed alongside the static HTML.</p>
              </div>
            )}
            {post.slug === 'en-10025-steel-grades-comparison-singapore' && <SteelGradesExtras />}
            {post.downloads && post.downloads.length > 0 && (
              <aside
                style={{
                  margin: '2rem 0',
                  padding: '1rem 1.25rem',
                  background: 'var(--surface, #FBFBF9)',
                  border: '1px solid var(--border, #D4D1CA)',
                  borderLeft: '3px solid var(--accent, #E76A2B)',
                  borderRadius: 6,
                }}
              >
                <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>Downloads</p>
                <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                  {post.downloads.map((d) => (
                    <li key={d.href}>
                      <a href={d.href} rel="noopener">{d.label}</a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
            {showPdf && (
              <p style={{ marginTop: '2rem' }}>
                Download the PDF version: <a href={`/assets/data/blogs/${post.baseFile}.pdf`} rel="noopener" target="_blank">{post.baseFile}.pdf</a>
              </p>
            )}
            <p>
              <Link to="/blog" className="btn btn-ghost">← All resources</Link>
            </p>
          </article>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
