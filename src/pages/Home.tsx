import React, { useState, useEffect } from 'react';
import Loader from '@/components/Loader';
import Cursor from '@/components/Cursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import BeforeAfter from '@/components/BeforeAfter';
import News from '@/components/News';
import Formations from '@/components/Formations';
import Applications from '@/components/Applications';
import LiveStreaming from '@/components/LiveStreaming';
import Equipment from '@/components/Equipment';
import Testimonials from '@/components/Testimonials';
import Reservations from '@/components/Reservations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Increment total visitors
  useEffect(() => {
    const visited = sessionStorage.getItem('cservice_visited');
    if (!visited) {
      sessionStorage.setItem('cservice_visited', 'true');
      const count = parseInt(localStorage.getItem('cservice_visitors') || '0');
      localStorage.setItem('cservice_visitors', (count + 1).toString());
    }
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/30 relative">
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Cursor />
          <Navigation />
          <main>
            <Hero />
            <Stats />
            <Services />
            <Portfolio />
            <BeforeAfter />
            <News />
            <Formations />
            <Applications />
            <LiveStreaming />
            <Equipment />
            <Testimonials />
            <Reservations />
            <Contact />
          </main>
          <Footer />
          <FloatingElements />
        </>
      )}
    </div>
  );
}
