'use client';

import { motion } from 'framer-motion';

export function AnimatedGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
        animate={{ x: [0, 80, 10], y: [0, 40, -20], scale: [1, 1.15, 0.95] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-0 top-1/4 h-[28rem] w-[28rem] rounded-full bg-secondary/20 blur-3xl"
        animate={{ x: [0, -70, 20], y: [0, -30, 50], scale: [1, 0.9, 1.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent/25 blur-3xl"
        animate={{ x: [0, 50, -40], y: [0, -50, 20], rotate: [0, 45, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
