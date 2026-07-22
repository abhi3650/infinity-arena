import type { AdminDashboardData } from '@/types/admin';
import { AdminChartPanel } from './AdminChartPanel';
import { AdminDataTable } from './AdminDataTable';
import { AdminMetricCard } from './AdminMetricCard';
import { AdminSidebar } from './AdminSidebar';

export function AdminShell({ data }: { data: AdminDashboardData }) {
  return (
    <main className="min-h-screen bg-arena-bg text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(54,226,255,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(154,108,255,0.16),transparent_35%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[320px_1fr]">
        <AdminSidebar sections={data.sections} />
        <div className="space-y-6">
          <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-arena-cyan">Infinity Arena operations</p>
            <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">Admin Dashboard</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">Role-gated command center for player safety, economy operations, content scheduling, competitive integrity, and realtime arena health.</p>
              </div>
              <div className="rounded-2xl border border-arena-cyan/30 bg-arena-cyan/10 px-4 py-3 text-sm text-arena-cyan">
                Signed in as <strong>{data.profile.displayName ?? data.profile.email ?? 'Admin'}</strong>
              </div>
            </div>
          </header>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data.metrics.map((metric) => <AdminMetricCard key={metric.label} metric={metric} />)}
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <AdminChartPanel data={data.activity} title="Arena throughput" />
            <AdminDataTable
              title="Audit trail"
              columns={[
                { key: 'area', label: 'Area' },
                { key: 'actor', label: 'Actor' },
                { key: 'action', label: 'Action' },
                { key: 'severity', label: 'Severity' },
                { key: 'updatedAt', label: 'Updated' },
              ]}
              rows={data.auditRows}
            />
          </div>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.sections.map((section) => (
              <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-arena-cyan/40 hover:shadow-glow" id={section.key} key={section.key}>
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-black text-white">{section.label}</h2>
                  <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-bold text-arena-cyan">{section.metric}</span>
                </div>
                <p className="mt-3 min-h-14 text-sm leading-6 text-slate-400">{section.description}</p>
                <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Trend</span>
                  <strong className="text-sm text-slate-100">{section.trend}</strong>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
