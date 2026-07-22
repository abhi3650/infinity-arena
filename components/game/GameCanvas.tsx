'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { InfinityArenaGame } from '@/game/Game';
import { PauseMenu } from './PauseMenu';
import { TouchControls } from './TouchControls';

const GAME_PARENT_ID = 'infinity-arena-phaser';

export function GameCanvas() {
  const shellRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<InfinityArenaGame>();
  const [isPaused, setIsPaused] = useState(false);

  const setPaused = useCallback((paused: boolean) => {
    setIsPaused(paused);
    window.dispatchEvent(new CustomEvent('infinity-arena:pause', { detail: { paused } }));
  }, []);

  const toggleFullscreen = useCallback(() => {
    const element = shellRef.current;
    if (!element) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void element.requestFullscreen();
  }, []);

  useEffect(() => {
    let mounted = true;
    void import('@/game/Game').then(({ createInfinityArenaGame }) => {
      if (mounted) gameRef.current = createInfinityArenaGame(GAME_PARENT_ID);
    });

    const pauseRequested = () => setPaused(true);
    window.addEventListener('infinity-arena:pause-request', pauseRequested);
    return () => {
      mounted = false;
      window.removeEventListener('infinity-arena:pause-request', pauseRequested);
      gameRef.current?.destroy();
    };
  }, [setPaused]);

  return (
    <section ref={shellRef} className="relative min-h-[70vh] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-glow">
      <div id={GAME_PARENT_ID} className="h-[70vh] min-h-[520px] w-full" />
      <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
        <button className="rounded-full bg-white/10 px-4 py-2 backdrop-blur" onClick={() => setPaused(!isPaused)}>{isPaused ? 'Resume' : 'Pause'}</button>
        <button className="rounded-full bg-white/10 px-4 py-2 backdrop-blur" onClick={toggleFullscreen}>Fullscreen</button>
      </div>
      <TouchControls enabled />
      <PauseMenu isPaused={isPaused} onResume={() => setPaused(false)} onSave={() => window.dispatchEvent(new CustomEvent('infinity-arena:save-progress'))} onToggleFullscreen={toggleFullscreen} />
    </section>
  );
}
