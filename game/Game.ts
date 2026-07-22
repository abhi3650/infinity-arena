import * as Phaser from 'phaser';
import { createGameConfig, GAME_PARENT_ID } from './config';

export class InfinityArenaGame {
  private game?: Phaser.Game;

  start(parent = GAME_PARENT_ID) {
    if (this.game) return this.game;
    this.game = new Phaser.Game(createGameConfig(parent));
    return this.game;
  }

  destroy() {
    this.game?.destroy(true);
    this.game = undefined;
  }
}

export const createInfinityArenaGame = (parent?: string) => {
  const arena = new InfinityArenaGame();
  arena.start(parent);
  return arena;
};
