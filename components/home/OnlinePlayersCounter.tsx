'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

export function OnlinePlayersCounter() {
  const count = useMotionValue(98000);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, 128432, { duration: 2.5, ease: 'easeOut' });
    return controls.stop;
  }, [count]);

  return (
    <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-5">
      <p className="text-sm uppercase tracking-[0.25em] text-secondary">Online now</p>
      <motion.p className="mt-2 text-4xl font-black text-white">{rounded}</motion.p>
    </div>
  );
}
