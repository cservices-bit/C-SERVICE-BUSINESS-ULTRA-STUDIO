import React from 'react';
import { motion } from 'framer-motion';

const apps = [
  { name: "CapCut", level: "Débutant/Pro", desc: "Le meilleur outil tout-en-un mobile et PC.", color: "from-black to-gray-800" },
  { name: "VN Editor", level: "Débutant", desc: "Interface pro et sans filigrane sur mobile.", color: "from-yellow-600 to-yellow-900" },
  { name: "InShot", level: "Débutant", desc: "Idéal pour formater rapidement pour les réseaux.", color: "from-pink-600 to-red-600" },
  { name: "Alight Motion", level: "Pro", desc: "L'After Effects du mobile pour l'animation.", color: "from-emerald-600 to-teal-900" },
  { name: "KineMaster", level: "Intermédiaire", desc: "Timeline multipistes classique sur smartphone.", color: "from-red-600 to-orange-700" },
  { name: "Open Camera", level: "Pro", desc: "Contrôle manuel total de la caméra Android.", color: "from-blue-600 to-indigo-900" },
  { name: "Blackmagic", level: "Expert", desc: "L'app caméra ultime pour iPhone et Android.", color: "from-gray-700 to-black" }
];

export default function Applications() {
  return (
    <section id="applications" className="py-24 overflow-hidden bg-card/20 border-y border-border/50">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase inline-block relative">
          Applications Recommandées
          <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        </h2>
      </div>

      <div className="flex overflow-x-auto pb-8 pt-4 px-4 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-6 mx-auto">
          {apps.map((app, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="snap-center shrink-0 w-[280px] glass rounded-2xl p-6 flex flex-col group border-t border-t-white/10"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} mb-6 shadow-lg flex items-center justify-center text-white font-bold text-xl`}>
                {app.name.substring(0, 2)}
              </div>
              
              <h3 className="text-xl font-bold mb-1">{app.name}</h3>
              <span className="text-xs font-bold text-primary uppercase tracking-wider mb-3 block">
                {app.level}
              </span>
              <p className="text-sm text-muted-foreground mb-6 flex-grow">
                {app.desc}
              </p>
              
              <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-colors mt-auto">
                Découvrir
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
