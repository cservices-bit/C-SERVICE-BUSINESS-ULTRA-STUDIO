import React from 'react';
import { motion } from 'framer-motion';
import { Video, Scissors, Lightbulb, Mic, Smartphone, Play } from 'lucide-react';

const formations = [
  {
    icon: Video,
    title: "Tournage Professionnel",
    description: "Bases caméra, règles de cadrage, et manipulation de la lumière en conditions réelles.",
    level: "Débutant/Pro",
    duration: "4 semaines"
  },
  {
    icon: Scissors,
    title: "Montage Vidéo",
    description: "Maîtrise de CapCut, VN et DaVinci Resolve pour un rendu professionnel rapide.",
    level: "Débutant/Intermédiaire",
    duration: "3 semaines"
  },
  {
    icon: Lightbulb,
    title: "Éclairage Studio",
    description: "Setup lumière pro, colorimétrie, et ambiance visuelle pour vidéos en intérieur.",
    level: "Intermédiaire",
    duration: "2 semaines"
  },
  {
    icon: Mic,
    title: "Audio Pro",
    description: "Choix des microphones, prise de son, et mixage de base pour une qualité optimale.",
    level: "Intermédiaire",
    duration: "2 semaines"
  },
  {
    icon: Smartphone,
    title: "TikTok Growth",
    description: "Stratégie de contenu, hack d'algorithme et montage viral pour exploser vos vues.",
    level: "Tous niveaux",
    duration: "2 semaines"
  },
  {
    icon: Play,
    title: "Création YouTube",
    description: "Lancer sa chaîne, trouver son style, créer des miniatures et monétiser son contenu.",
    level: "Tous niveaux",
    duration: "4 semaines"
  }
];

export default function Formations() {
  return (
    <section id="formations" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase inline-block relative">
            Mes Formations
            <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-primary neon-border" />
          </h2>
          <p className="mt-8 text-muted-foreground max-w-2xl mx-auto">
            Apprenez les secrets de la production vidéo avec des formations pratiques et intensives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-xl border-t-2 border-t-primary/20 hover:border-t-primary transition-all duration-300 relative group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <f.icon size={24} />
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">{f.level}</span>
                  <span className="block text-xs text-muted-foreground">{f.duration}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm mb-6">{f.description}</p>
              
              <a 
                href={`https://wa.me/243848681325?text=Bonjour, je souhaite m'inscrire à la formation : ${f.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-card border border-border rounded-lg font-bold text-sm uppercase tracking-widest text-center block hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              >
                S'inscrire
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
