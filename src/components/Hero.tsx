import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SiInstagram, SiWhatsapp, SiYoutube, SiTiktok, SiFacebook } from 'react-icons/si';

export default function Hero() {
  const words = ["VIDÉASTE", "RÉALISATEUR", "LIVE STREAMING", "MONTAGE PRO"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen" />
        {/* CSS Particles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-7xl font-display font-black mb-6 uppercase tracking-tight">
            <span className="block text-white mb-2">Je suis</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary neon-text h-[1.2em]">
              {words[currentWord]}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium">
            Transformez vos idées en œuvres cinématographiques. Production premium, montage percutant, et diffusion en direct professionnelle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => scrollTo('#portfolio')}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-md hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm"
            >
              Voir mes réalisations
            </button>
            <a 
              href="https://wa.me/243848681325"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-md hover:bg-white/10 transition-colors border-primary/50 uppercase tracking-wider text-sm text-center"
            >
              Me Contacter
            </a>
            <button 
              onClick={() => scrollTo('#live')}
              className="w-full sm:w-auto px-8 py-4 bg-red-600/20 text-red-500 border border-red-600/50 font-bold rounded-md hover:bg-red-600/30 transition-colors uppercase tracking-wider text-sm flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Regarder en direct
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Socials */}
      <div className="hidden lg:flex flex-col gap-6 absolute right-8 top-1/2 -translate-y-1/2 z-20">
        {[
          { Icon: SiInstagram, href: "https://instagram.com/cianney_officiel" },
          { Icon: SiYoutube, href: "#" },
          { Icon: SiTiktok, href: "#" },
          { Icon: SiFacebook, href: "#" }
        ].map(({ Icon, href }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
          >
            <Icon size={24} />
          </a>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <button onClick={() => scrollTo('#services')} className="text-muted-foreground hover:text-primary transition-colors">
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
}
