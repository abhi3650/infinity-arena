import * as Phaser from 'phaser';

export class SoundManager {
  private muted = false;

  constructor(private readonly scene: Phaser.Scene) {}

  setMuted(muted: boolean) {
    this.muted = muted;
    this.scene.sound.mute = muted;
  }

  toggleMuted() {
    this.setMuted(!this.muted);
    return this.muted;
  }

  play(key: string, config?: Phaser.Types.Sound.SoundConfig) {
    if (!this.muted && this.scene.cache.audio.exists(key)) {
      this.scene.sound.play(key, config);
    }
  }
}
