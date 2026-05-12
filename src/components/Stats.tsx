import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: "Vidéos", value: "500+" },
  { label: "Clients", value: "200+" },
  { label: "Années d'expérience", value: "5+" },
  { label: "Lives", value: "50+" },
];

export default function Stats() {
  return (
    <section className="py-12 border-y border-border/50 bg-card/20 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-primary uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
