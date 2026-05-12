import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const equipment = [
  {
    icon: "📷",
    title: "Caméras & Capteurs",
    items: ["Smartphone Pro Setup 4K", "Objectifs interchangeables", "Filtres ND & Polarisants", "Stabilisation optique"]
  },
  {
    icon: "🎤",
    title: "Prise de Son",
    items: ["Microphones Rode Pro", "Système sans-fil Boya", "Enregistreur externe", "Micro-cravates HF"]
  },
  {
    icon: "💡",
    title: "Éclairage Studio",
    items: ["Ring Light LED RGB", "Softboxes professionnelles", "Panneaux LED bicolores", "Réflecteurs 5-en-1"]
  },
  {
    icon: "🎬",
    title: "Accessoires & Rigs",
    items: ["Trépieds fluides vidéo", "Gimbal motorisé", "Cage smartphone", "Bras magiques"]
  }
];

export default function Equipment() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % equipment.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 border-y border-border/50 bg-card/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase inline-block relative mb-16">
          Mon Équipement
          <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        </h2>

        <div className="max-w-3xl mx-auto h-[300px] relative flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="absolute w-full"
            >
              <div className="text-7xl mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {equipment[current].icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary neon-text">
                {equipment[current].title}
              </h3>
              <ul className="flex flex-wrap justify-center gap-4">
                {equipment[current].items.map((item, i) => (
                  <li key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
