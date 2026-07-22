import dynamic from 'next/dynamic';
import { findRouteByHref } from '@/lib/routes';

const GameCanvas = dynamic(() => import('@/components/game/GameCanvas').then((mod) => mod.GameCanvas), {
  ssr: false,
  loading: () => <div className="min-h-[70vh] rounded-3xl border border-white/10 bg-black/60 p-10 text-slate-300">Loading arena client…</div>,
});

export default function Page() {
  const route = findRouteByHref('/play');

  return (
    <main className="min-h-screen bg-arena-bg text-slate-100">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-arena-cyan">Infinity Arena</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">{route.label}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{route.description}</p>
        </div>
        <GameCanvas />
      </section>
    </main>
  );
}
