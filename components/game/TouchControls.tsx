'use client';

import { useCallback } from 'react';

type TouchControlsProps = {
  enabled: boolean;
};

export function TouchControls({ enabled }: TouchControlsProps) {
  const emit = useCallback((movement = { x: 0, y: 0 }, primary = false, dash = false) => {
    window.dispatchEvent(new CustomEvent('infinity-arena:touch-input', {
      detail: { movement, primary, dash, aim: { x: movement.x, y: movement.y } },
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex items-end justify-between px-6 md:hidden">
      <div className="pointer-events-auto grid grid-cols-3 gap-2 rounded-3xl bg-black/30 p-3 backdrop-blur">
        <span />
        <button aria-label="Move up" className="h-12 w-12 rounded-full bg-white/15" onTouchStart={() => emit({ x: 0, y: -1 })} onTouchEnd={() => emit()} />
        <span />
        <button aria-label="Move left" className="h-12 w-12 rounded-full bg-white/15" onTouchStart={() => emit({ x: -1, y: 0 })} onTouchEnd={() => emit()} />
        <span />
        <button aria-label="Move right" className="h-12 w-12 rounded-full bg-white/15" onTouchStart={() => emit({ x: 1, y: 0 })} onTouchEnd={() => emit()} />
        <span />
        <button aria-label="Move down" className="h-12 w-12 rounded-full bg-white/15" onTouchStart={() => emit({ x: 0, y: 1 })} onTouchEnd={() => emit()} />
      </div>
      <div className="pointer-events-auto flex gap-3">
        <button aria-label="Dash" className="h-14 w-14 rounded-full bg-arena-violet/80 font-bold" onTouchStart={() => emit(undefined, false, true)} onTouchEnd={() => emit()}>D</button>
        <button aria-label="Fire" className="h-16 w-16 rounded-full bg-arena-cyan/80 font-bold text-slate-950" onTouchStart={() => emit(undefined, true)} onTouchEnd={() => emit()}>F</button>
      </div>
    </div>
  );
}
