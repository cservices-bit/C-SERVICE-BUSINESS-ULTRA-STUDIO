import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Jean-Paul M.",
    role: "Directeur Marketing",
    quote: "Un travail exceptionnel pour notre campagne publicitaire. La qualité de l'image et le montage dynamique ont largement dépassé nos attentes.",
    initials: "JP",
    color: "bg-blue-600"
  },
  {
    name: "Sarah K.",
    role: "Influenceuse",
    quote: "Cianney a su capturer l'essence de ma chaîne YouTube. Mes vues ont explosé depuis qu'il s'occupe de mon montage. Un vrai pro !",
    initials: "SK",
    color: "bg-pink-600"
  },
  {
    name: "Pasteur David",
    role: "Église de la Grâce",
    quote: "La gestion de notre live streaming dominical est parfaite. Une fluidité et une qualité qui permettent à nos fidèles de suivre à distance dans les meilleures conditions.",
    initials: "PD",
    color: "bg-purple-600"
  },
  {
    name: "Marc E.",
    role: "Artiste Musicien",
    quote: "Le clip qu'il a réalisé pour mon dernier single est juste incroyable. Une vraie vision artistique et un étalonnage digne du cinéma.",
    initials: "ME",
    color: "bg-green-600"
  },
  {
    name: "Aline F.",
    role: "Entrepreneure",
    quote: "Pour mes Reels TikTok, je ne fais confiance qu'à C-Service. Rapide, efficace et toujours au courant des dernières trends.",
    initials: "AF",
    color: "bg-orange-600"
  },
  {
    name: "Thomas R.",
    role: "Organisateur d'Événements",
    quote: "La vidéo récapitulative de notre festival est époustouflante. Il a su capter chaque moment fort avec une précision remarquable.",
    initials: "TR",
    color: "bg-red-600"
  }
];

export default function Testimonials() {
  // Duplicate for infinite scroll
  const extendedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase inline-block relative">
          Ils Me Font Confiance
          <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        </h2>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="flex animate-marquee gap-6 whitespace-nowrap px-6">
          {extendedTestimonials.map((t, i) => (
            <div 
              key={i} 
              className="glass p-8 rounded-2xl w-[350px] md:w-[400px] shrink-0 flex flex-col relative group hover:border-primary/30 transition-colors"
            >
              <div className="flex gap-1 text-primary mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              
              <p className="text-gray-300 mb-8 whitespace-normal flex-grow italic">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <span className="text-xs text-primary uppercase tracking-wider">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
