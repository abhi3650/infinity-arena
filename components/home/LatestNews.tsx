import { GlassCard } from '@/components/ui/GlassCard';

const news = [
  ['Patch 9.1', 'New dash cancel tuning, anti-cheat telemetry, and ranked rewards arrive this week.'],
  ['Creator Cup', 'Watch 32 captains draft squads for a weekend of no-mercy arena chaos.'],
  ['Map rotation', 'Skyforge, Prism Yard, and Ion Temple headline the next competitive playlist.'],
];

export function LatestNews() {
  return <GlassCard className="p-6"><h2 className="text-2xl font-black text-white">Latest news</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{news.map(([title, body]) => <article key={title} className="rounded-2xl bg-white/5 p-5"><p className="font-bold text-secondary">{title}</p><p className="mt-2 text-sm leading-6 text-slate-300">{body}</p></article>)}</div></GlassCard>;
}
