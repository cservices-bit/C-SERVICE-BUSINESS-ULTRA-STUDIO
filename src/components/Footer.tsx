import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black py-12 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <span className="font-display font-bold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary neon-text mb-4">
              C•SERVICE BUSINESS
            </span>
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
              Parole Fortifiante
            </p>
            <p className="text-sm text-gray-500 max-w-xs">
              Studio de production vidéo premium. Tournage, montage, live streaming et création de contenu.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-bold text-white uppercase tracking-wider mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              {['Services', 'Portfolio', 'Formations', 'Live'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => scrollTo(`#${link.toLowerCase()}`)}
                    className="text-sm text-gray-500 hover:text-primary transition-colors uppercase tracking-wider"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-bold text-white uppercase tracking-wider mb-6">Légal</h4>
            <ul className="space-y-3 text-center md:text-right">
              <li><span className="text-sm text-gray-500 uppercase tracking-wider cursor-pointer hover:text-white">Mentions Légales</span></li>
              <li><span className="text-sm text-gray-500 uppercase tracking-wider cursor-pointer hover:text-white">CGV</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 uppercase tracking-widest text-center">
            © {new Date().getFullYear()} C-SERVICE BUSINESS — Tous droits réservés
          </p>
          <p className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1">
            Fait avec <span className="text-red-500 animate-pulse">❤️</span> en RDC
          </p>
        </div>
      </div>
    </footer>
  );
}
