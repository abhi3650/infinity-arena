import * as Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { LoadingScene } from './scenes/LoadingScene';
import { ArenaScene } from './scenes/ArenaScene';

export const GAME_PARENT_ID = 'infinity-arena-phaser';
export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export const createGameConfig = (parent: string = GAME_PARENT_ID): Phaser.Types.Core.GameConfig => ({
  type: Phaser.AUTO,
  parent,
  backgroundColor: '#070A13',
  scene: [BootScene, LoadingScene, ArenaScene],
  fps: {
    target: 60,
    forceSetTimeOut: false,
    panicMax: 120,
    smoothStep: true,
  },
  render: {
    antialias: true,
    pixelArt: false,
    powerPreference: 'high-performance',
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: process.env.NODE_ENV === 'development',
      fps: 60,
    },
  },
  input: {
    gamepad: true,
    keyboard: true,
    mouse: true,
    touch: true,
  },
});
