import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultNews = [
  { id: 1, title: "Nouvelle Caméra 4K", description: "Je viens d'acquérir le dernier équipement pour des tournages encore plus époustouflants." },
  { id: 2, title: "Formation Montage Disponible", description: "Inscriptions ouvertes pour la session de ce mois. Places limitées !" },
  { id: 3, title: "Projet Cinéma", description: "En tournage pour un court-métrage indépendant qui sortira bientôt." },
  { id: 4, title: "Live Streaming Concert", description: "Retour sur le live incroyable du week-end dernier avec plus de 5000 spectateurs." }
];

export default function News() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const savedNews = localStorage.getItem('cservice_news');
  const news = savedNews ? JSON.parse(savedNews) : defaultNews;

  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % news.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [news.length]);

  if (news.length === 0) return null;

  return (
    <section className="py-24 bg-card/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase inline-block relative mb-16">
          Actualités
          <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-primary neon-border" />
        </h2>

        <div className="max-w-4xl mx-auto relative h-[400px] rounded-2xl overflow-hidden glass">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col justify-end p-8 text-left bg-gradient-to-t from-black via-black/50 to-transparent"
              style={{
                backgroundImage: news[currentSlide].imageUrl ? `url(${news[currentSlide].imageUrl})` : 'linear-gradient(to bottom right, hsl(var(--card)), hsl(var(--background)))',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="relative z-10">
                <span className="px-3 py-1 bg-primary/80 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-white mb-4 inline-block">
                  News
                </span>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                  {news[currentSlide].title}
                </h3>
                <p className="text-gray-300 max-w-2xl text-lg">
                  {news[currentSlide].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="absolute bottom-6 right-8 z-20 flex gap-2">
            {news.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === i ? 'bg-primary w-8' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
