import type { AdminMetric } from '@/types/admin';

const toneClasses: Record<AdminMetric['tone'], string> = {
  cyan: 'from-arena-cyan/30 to-cyan-500/5 text-arena-cyan ring-arena-cyan/30',
  violet: 'from-arena-violet/30 to-purple-500/5 text-arena-violet ring-arena-violet/30',
  gold: 'from-arena-gold/30 to-amber-500/5 text-arena-gold ring-arena-gold/30',
  emerald: 'from-emerald-400/30 to-emerald-500/5 text-emerald-300 ring-emerald-300/30',
  rose: 'from-rose-400/30 to-rose-500/5 text-rose-300 ring-rose-300/30',
};

export function AdminMetricCard({ metric }: { metric: AdminMetric }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur">
      <div className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br p-3 ring-1 ${toneClasses[metric.tone]}`}>
        <span className="h-2 w-2 rounded-full bg-current shadow-[0_0_18px_currentColor]" />
      </div>
      <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{metric.label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <strong className="text-3xl font-black text-white">{metric.value}</strong>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">{metric.delta}</span>
      </div>
    </article>
  );
}
