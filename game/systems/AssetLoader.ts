import * as Phaser from 'phaser';

export class AssetLoader {
  constructor(private readonly scene: Phaser.Scene) {}

  preload() {
    this.scene.load.setPath('/game-assets');
    this.createGeneratedArenaTexture();
  }

  private createGeneratedArenaTexture() {
    const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false);
    graphics.fillStyle(0x22d3ee, 1);
    graphics.fillCircle(16, 16, 16);
    graphics.generateTexture('player-core', 32, 32);
    graphics.clear();
    graphics.lineStyle(2, 0x8b5cf6, 0.35);
    graphics.strokeRect(0, 0, 128, 128);
    graphics.generateTexture('arena-tile', 128, 128);
    graphics.destroy();
  }
}
