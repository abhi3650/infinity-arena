'use client';

import { motion } from 'framer-motion';

const particles = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 23) % 100}%`,
  size: 2 + (index % 4),
  delay: (index % 7) * 0.35,
}));

export function ParticlesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-secondary/70 shadow-[0_0_18px_rgba(6,182,212,0.8)]"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={{ y: [-16, 16, -16], opacity: [0.25, 0.9, 0.25] }}
          transition={{ duration: 4 + (particle.id % 5), repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
