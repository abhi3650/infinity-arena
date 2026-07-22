'use client';

type PauseMenuProps = {
  isPaused: boolean;
  onResume: () => void;
  onSave: () => void;
  onToggleFullscreen: () => void;
};

export function PauseMenu({ isPaused, onResume, onSave, onToggleFullscreen }: PauseMenuProps) {
  if (!isPaused) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-arena-panel/95 p-8 text-center shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-arena-cyan">Paused</p>
        <h2 className="mt-3 text-3xl font-black text-white">Arena suspended</h2>
        <div className="mt-8 grid gap-3">
          <button className="rounded-full bg-arena-cyan px-5 py-3 font-bold text-slate-950" onClick={onResume}>Resume</button>
          <button className="rounded-full border border-white/10 px-5 py-3 font-bold text-white" onClick={onSave}>Save progress</button>
          <button className="rounded-full border border-white/10 px-5 py-3 font-bold text-white" onClick={onToggleFullscreen}>Toggle fullscreen</button>
        </div>
      </div>
    </div>
  );
}
