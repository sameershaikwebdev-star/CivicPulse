import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lenis } from '@studio-freight/lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Particles from './components/Particles';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-hero text-white">
      <Particles />
      <Cursor />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="space-y-24"
        >
          <Hero />
          <Features />
          <Stats />
          <Timeline />
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
