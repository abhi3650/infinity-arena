import type { AdminSection } from '@/types/admin';

const statusClasses: Record<AdminSection['status'], string> = {
  Healthy: 'bg-emerald-300/15 text-emerald-200',
  Review: 'bg-arena-gold/15 text-arena-gold',
  'Action needed': 'bg-rose-400/15 text-rose-200',
};

export function AdminSidebar({ sections }: { sections: AdminSection[] }) {
  return (
    <aside className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:overflow-y-auto">
      <div className="mb-5 rounded-2xl bg-gradient-to-br from-arena-cyan/20 to-arena-violet/20 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-arena-cyan">Admin</p>
        <h2 className="mt-3 text-2xl font-black text-white">Control Deck</h2>
      </div>
      <nav className="space-y-2">
        {sections.map((section) => (
          <a className="group block rounded-2xl border border-transparent p-4 transition hover:border-arena-cyan/30 hover:bg-arena-cyan/10" href={`#${section.key}`} key={section.key}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-bold text-slate-100 group-hover:text-arena-cyan">{section.label}</span>
              <span className={`rounded-full px-2 py-1 text-[10px] font-black uppercase ${statusClasses[section.status]}`}>{section.status}</span>
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">{section.description}</p>
          </a>
        ))}
      </nav>
    </aside>
  );
}
