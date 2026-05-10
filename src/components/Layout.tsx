import { ReactNode } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
