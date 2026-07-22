import { getSocketClient } from '@/services/socket';
import { createSupabaseBrowserClient } from '@/services/supabase';
import type { PlayerInputState } from './InputManager';

type ProgressPayload = {
  score: number;
  elapsedMs: number;
};

export class NetworkSync {
  private socket = getSocketClient();
  private supabase = createSupabaseBrowserClient();
  private lastInputEmit = 0;

  connect() {
    if (!this.socket.connected) this.socket.connect();
    this.socket.emit('arena:join', { mode: 'practice' });
  }

  disconnect() {
    this.socket.emit('arena:leave');
  }

  emitInput(input: PlayerInputState, time: number) {
    if (time - this.lastInputEmit < 50) return;
    this.lastInputEmit = time;
    this.socket.emit('arena:input', {
      movement: { x: input.movement.x, y: input.movement.y },
      aim: { x: input.aim.x, y: input.aim.y },
      primary: input.primary,
      secondary: input.secondary,
      dash: input.dash,
    });
  }

  emitPause(paused: boolean) {
    this.socket.emit('arena:pause', { paused });
  }

  async saveProgress(payload: ProgressPayload) {
    this.socket.emit('arena:progress', payload);
    await this.supabase.from('game_progress').upsert({
      mode: 'practice',
      score: payload.score,
      elapsed_ms: payload.elapsedMs,
      updated_at: new Date().toISOString(),
    });
  }
}
