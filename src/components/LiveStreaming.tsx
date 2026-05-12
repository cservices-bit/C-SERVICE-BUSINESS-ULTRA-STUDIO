import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, MessageSquare } from 'lucide-react';

export default function LiveStreaming() {
  const [viewers, setViewers] = useState(142);
  const [platform, setPlatform] = useState('youtube');

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 11) - 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="live" className="py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase inline-block relative mb-12">
          Live en Direct
          <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-red-500 neon-border shadow-[0_0_10px_red]" />
        </h2>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Main Video Area */}
          <div className="flex-grow glass rounded-xl overflow-hidden flex flex-col relative border-red-500/20">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse-glow" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">Live Now</span>
            </div>
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold">
              <Users size={14} className="text-red-400" />
              {viewers}
            </div>
            
            <div className="aspect-video bg-black flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&mute=1"
                title="Live Stream Placeholder"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            <div className="p-4 bg-card/80 border-t border-border flex justify-center gap-4">
              {['youtube', 'facebook', 'tiktok'].map(p => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${
                    platform === p ? 'bg-primary text-primary-foreground' : 'bg-transparent text-muted-foreground hover:bg-white/5'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area (Visual Fake) */}
          <div className="w-full lg:w-80 glass rounded-xl flex flex-col h-[400px] lg:h-auto">
            <div className="p-4 border-b border-border/50 flex items-center gap-2 font-bold uppercase text-sm tracking-wider">
              <MessageSquare size={16} className="text-primary" />
              Chat en direct
            </div>
            
            <div className="flex-grow p-4 flex flex-col gap-3 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-card/20 pointer-events-none z-10" />
              <div className="animate-marquee-vertical flex flex-col gap-3 h-full justify-end">
                {[
                  { name: "Marc", msg: "La qualité d'image est incroyable 🔥", color: "text-blue-400" },
                  { name: "Sophie", msg: "Quel est le modèle de caméra ?", color: "text-pink-400" },
                  { name: "Admin", msg: "Bienvenue à tous sur le live !", color: "text-red-500" },
                  { name: "David", msg: "Le son est parfait 👏", color: "text-green-400" },
                  { name: "Elie", msg: "Cianney le boss du montage", color: "text-yellow-400" }
                ].map((chat, i) => (
                  <div key={i} className="text-sm bg-black/20 p-2 rounded-md border border-white/5">
                    <span className={`font-bold ${chat.color} mr-2`}>{chat.name}:</span>
                    <span className="text-gray-300">{chat.msg}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-3 border-t border-border/50">
              <div className="w-full bg-black/30 border border-border rounded-full py-2 px-4 text-xs text-muted-foreground flex justify-between items-center">
                <span>Dites quelque chose...</span>
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-primary border-b-[4px] border-b-transparent ml-0.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
