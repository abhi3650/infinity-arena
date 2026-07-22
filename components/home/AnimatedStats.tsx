'use client';
import { motion } from 'framer-motion';
const stats=[['42M','Matches played'],['189','Arenas online'],['99.9%','Server uptime']];
export function AnimatedStats(){return <div className="grid gap-4 md:grid-cols-3">{stats.map(([value,label],i)=><motion.div key={label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-center" initial={{opacity:0,scale:.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*.12}}><p className="text-4xl font-black text-white">{value}</p><p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-400">{label}</p></motion.div>)}</div>}
