import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Radio, Smartphone, Megaphone, Zap, Monitor, Play, Layers } from 'lucide-react';

const services = [
  {
    icon: Camera,
    title: "Tournage Vidéo",
    description: "Captation professionnelle 4K pour vos événements, clips, et corporate avec matériel haut de gamme."
  },
  {
    icon: Film,
    title: "Montage Professionnel",
    description: "Post-production experte, color grading cinématographique et sound design immersif."
  },
  {
    icon: Radio,
    title: "Live Streaming",
    description: "Diffusion multi-caméras en direct sur YouTube, Facebook et autres plateformes avec habillage."
  },
  {
    icon: Smartphone,
    title: "Création TikTok/Reels",
    description: "Vidéos courtes, dynamiques et optimisées pour l'algorithme des réseaux sociaux."
  },
  {
    icon: Megaphone,
    title: "Publicité Business",
    description: "Spots publicitaires percutants pour promouvoir vos produits et services."
  },
  {
    icon: Zap,
    title: "Vidéos Motivantes",
    description: "Montage inspirant avec discours impactants et musique épique pour créateurs."
  },
  {
    icon: Monitor,
    title: "Projection Église",
    description: "Gestion complète de l'image et réalisation en direct pour les cultes et conférences."
  },
  {
    icon: Play,
    title: "Création YouTube",
    description: "Production d'émissions, vlogs et concepts originaux pour votre chaîne."
  },
  {
    icon: Layers,
    title: "Branding Vidéo",
    description: "Création d'intros, outros, synthés et identité visuelle animée pour vos contenus."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase inline-block relative">
            Mes Services
            <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-primary neon-border" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass p-8 rounded-xl flex flex-col items-start group hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary group-hover:text-secondary transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
              
              <a 
                href={`https://wa.me/243848681325?text=Bonjour, je suis intéressé par votre service de ${service.title}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold text-primary hover:text-secondary uppercase tracking-wider transition-colors mt-auto"
              >
                Commander
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
