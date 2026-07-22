'use client';

import { useEffect, useState } from 'react';

const targetDate = new Date('2026-08-15T18:00:00Z').getTime();

export function SeasonCountdown() {
  const [remaining, setRemaining] = useState(targetDate - Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(targetDate - Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const safe = Math.max(remaining, 0);
  const days = Math.floor(safe / 86_400_000);
  const hours = Math.floor((safe / 3_600_000) % 24);
  const minutes = Math.floor((safe / 60_000) % 60);

  return (
    <div className="rounded-2xl border border-accent/30 bg-accent/10 p-5">
      <p className="text-sm uppercase tracking-[0.25em] text-accent">Season reset</p>
      <p className="mt-2 text-3xl font-black text-white">{days}d {hours}h {minutes}m</p>
    </div>
  );
}
