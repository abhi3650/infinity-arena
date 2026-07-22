import Link from 'next/link';
import { appRoutes } from '@/lib/routes';
import type { AppRoute } from '@/types/navigation';

type PageShellProps = {
  route: AppRoute;
};

export function PageShell({ route }: PageShellProps) {
  return (
    <main className="min-h-screen bg-arena-bg text-slate-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10">
        <nav className="flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
          {appRoutes.map((item) => (
            <Link
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-arena-cyan/10 hover:text-arena-cyan"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="rounded-3xl border border-white/10 bg-arena-panel/90 p-10 shadow-glow">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-arena-cyan">Infinity Arena</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">{route.label}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{route.description}</p>
          <div className="mt-8 rounded-2xl border border-dashed border-arena-violet/50 bg-black/20 p-6 text-slate-400">
            Production-ready placeholder for the {route.label.toLowerCase()} experience. Replace this module with feature-specific UI as systems come online.
          </div>
        </div>
      </section>
    </main>
  );
}
