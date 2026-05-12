import React, { useState, useRef } from 'react';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX = 0;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }
    
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = () => {
    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase inline-block relative mb-12">
          Avant / Après Montage
          <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-primary neon-border" />
        </h2>

        <div className="max-w-4xl mx-auto">
          <div 
            ref={containerRef}
            className="relative aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-border/50"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* After (Bottom Layer - Vibrant) */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-violet-900">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider text-white">
                APRÈS
              </div>
            </div>

            {/* Before (Top Layer - Clipped - Desaturated) */}
            <div 
              className="absolute inset-0 bg-neutral-800 grayscale sepia-[0.2]"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-40" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider text-white">
                AVANT
              </div>
            </div>

            {/* Slider Line & Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{ left: `calc(${sliderPosition}% - 2px)` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l-6-6 6-6M15 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
          <p className="mt-6 text-muted-foreground text-sm">Faites glisser pour voir la différence de colorimétrie et d'étalonnage.</p>
        </div>
      </div>
    </section>
  );
}
