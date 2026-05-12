import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const categories = ["Tous", "Tournage", "Montage", "TikTok/Reels", "Live", "Église", "Motivation"];

const defaultProjects = [
  { id: 1, title: "Clip Officiel - Artiste Local", category: "Tournage", videoId: "dQw4w9WgXcQ" },
  { id: 2, title: "Highlight Mariage", category: "Montage", videoId: "dQw4w9WgXcQ" },
  { id: 3, title: "Trend Danse", category: "TikTok/Reels", videoId: "dQw4w9WgXcQ" },
  { id: 4, title: "Culte Dominical en Direct", category: "Église", videoId: "dQw4w9WgXcQ" },
  { id: 5, title: "Conférence Business", category: "Live", videoId: "dQw4w9WgXcQ" },
  { id: 6, title: "Discours Inspirant", category: "Motivation", videoId: "dQw4w9WgXcQ" },
  { id: 7, title: "Publicité Restaurant", category: "Tournage", videoId: "dQw4w9WgXcQ" },
  { id: 8, title: "Vlog Voyage", category: "Montage", videoId: "dQw4w9WgXcQ" },
  { id: 9, title: "Story Time", category: "TikTok/Reels", videoId: "dQw4w9WgXcQ" },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("Tous");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // In a real app, we'd fetch this from localStorage if Admin added items
  const savedPortfolio = localStorage.getItem('cservice_portfolio');
  const projects = savedPortfolio ? JSON.parse(savedPortfolio) : defaultProjects;

  const filteredProjects = activeTab === "Tous" 
    ? projects 
    : projects.filter((p: any) => p.category === activeTab);

  return (
    <section id="portfolio" className="py-24 bg-card/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase inline-block relative mb-8">
            Mon Portfolio
            <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-primary neon-border" />
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === cat 
                    ? 'bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]' 
                    : 'bg-card/50 text-muted-foreground hover:text-white hover:bg-card border border-border/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project: any) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setActiveVideo(project.videoId || "dQw4w9WgXcQ")}
              >
                {/* Thumbnail Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-card to-background">
                  {project.thumbnailUrl ? (
                    <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-primary/20 to-secondary/20" />
                  )}
                </div>
                
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-semibold border border-white/10 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_hsl(var(--primary)/0.6)]">
                      <Play className="w-5 h-5 text-white ml-1" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      Voir le projet
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-primary rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full bg-black"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
