import type { AdminChartDatum } from '@/types/admin';

export function AdminChartPanel({ data, title }: { data: AdminChartDatum[]; title: string }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-glow">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-arena-cyan">Live telemetry</p>
          <h2 className="mt-2 text-2xl font-black text-white">{title}</h2>
        </div>
        <span className="rounded-full border border-arena-cyan/30 bg-arena-cyan/10 px-3 py-1 text-xs text-arena-cyan">60s refresh</span>
      </div>
      <div className="flex h-64 items-end gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
        {data.map((item) => (
          <div className="flex flex-1 flex-col items-center gap-3" key={item.label}>
            <div className="flex h-44 w-full items-end rounded-full bg-white/5 p-1">
              <div
                className="w-full rounded-full bg-gradient-to-t from-arena-violet via-arena-cyan to-white shadow-[0_0_18px_rgba(54,226,255,0.45)]"
                style={{ height: `${Math.max((item.value / maxValue) * 100, 8)}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
