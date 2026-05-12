import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] mix-blend-screen"
      animate={{
        x: position.x - 8,
        y: position.y - 8,
        scale: isPointer ? 1.5 : 1,
        backgroundColor: isPointer ? 'hsl(var(--secondary))' : 'hsl(var(--primary))',
        boxShadow: isPointer 
          ? '0 0 20px hsl(var(--secondary))' 
          : '0 0 10px hsl(var(--primary))'
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 2 }}
    />
  );
}
