import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Features from '../components/home/Features';
import EventsPreview from '../components/home/EventsPreview';
import CTABand from '../components/home/CTABand';
import Footer from '../components/home/Footer';
import '../styles/global.css';

export default function HomePage() {
  return (
    <div className="uh-root">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <EventsPreview />
      <CTABand />
      <Footer />
    </div>
  );
}
