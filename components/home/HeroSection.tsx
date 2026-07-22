'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { OnlinePlayersCounter } from '@/components/home/OnlinePlayersCounter';
import { SeasonCountdown } from '@/components/home/SeasonCountdown';

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <section className="relative mx-auto grid min-h-[780px] max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-secondary">Season 09: Neon Rift</p>
        <h1 className="mt-5 text-5xl font-black tracking-tight text-white md:text-7xl">Outplay eternity in the infinite arena.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Queue into high-velocity battles, unlock radiant gear, climb live leaderboards, and bring your squad into a constantly evolving competitive universe.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/play" className="rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3 font-bold text-white shadow-glow transition hover:scale-105">Play free</Link>
          <Link href="/battle-pass" className="rounded-full border border-white/15 px-7 py-3 font-bold text-white transition hover:border-secondary hover:text-secondary">View battle pass</Link>
        </div>
      </motion.div>
      <motion.div style={{ y }} className="relative">
        <GlassCard className="p-6">
          <div className="rounded-2xl bg-gradient-to-br from-primary/40 via-accent/30 to-secondary/30 p-6">
            <div className="aspect-[4/5] rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.25),transparent_30%),linear-gradient(145deg,rgba(79,70,229,0.6),rgba(6,182,212,0.25))] p-5">
              <div className="h-full rounded-xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-slate-300">Featured mode</p>
                <h2 className="mt-2 text-4xl font-black text-white">Rift Rush</h2>
                <div className="mt-52 grid gap-4 sm:grid-cols-2"><OnlinePlayersCounter /><SeasonCountdown /></div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
