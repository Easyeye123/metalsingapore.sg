import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import ServicesHub from './pages/ServicesHub';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import BlogHub from './pages/BlogHub';
import BlogDetail from './pages/BlogDetail';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import SeoDashboard from './pages/SeoDashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/services" element={<ServicesHub />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<BlogHub />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/seo-dashboard" element={<SeoDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
