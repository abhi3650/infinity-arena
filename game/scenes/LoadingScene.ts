import * as Phaser from 'phaser';
import { AssetLoader } from '../systems/AssetLoader';

export class LoadingScene extends Phaser.Scene {
  private progressBar?: Phaser.GameObjects.Rectangle;

  constructor() {
    super('LoadingScene');
  }

  preload() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2 - 72, 'INFINITY ARENA', {
      color: '#e0f2fe',
      fontFamily: 'Arial Black, sans-serif',
      fontSize: '36px',
    }).setOrigin(0.5);
    this.add.rectangle(width / 2, height / 2, 420, 12, 0xffffff, 0.12);
    this.progressBar = this.add.rectangle(width / 2 - 210, height / 2, 1, 12, 0x22d3ee, 1).setOrigin(0, 0.5);

    this.load.on('progress', (value: number) => {
      this.progressBar?.setDisplaySize(420 * value, 12);
    });

    new AssetLoader(this).preload();
  }

  create() {
    this.scene.start('ArenaScene');
  }
}
