import * as Phaser from 'phaser';
import { InputManager } from '../systems/InputManager';
import { NetworkSync } from '../systems/NetworkSync';
import { SoundManager } from '../systems/SoundManager';

export class ArenaScene extends Phaser.Scene {
  private inputManager?: InputManager;
  private network?: NetworkSync;
  private sounds?: SoundManager;
  private player?: Phaser.Physics.Arcade.Image;
  private score = 0;
  private startedAt = 0;

  constructor() {
    super('ArenaScene');
  }

  create() {
    this.startedAt = this.time.now;
    this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'arena-tile').setOrigin(0).setAlpha(0.45);
    this.player = this.physics.add.image(this.scale.width / 2, this.scale.height / 2, 'player-core');
    this.player.setCollideWorldBounds(true);

    this.inputManager = new InputManager(this);
    this.inputManager.create();
    this.sounds = new SoundManager(this);
    this.network = new NetworkSync();
    this.network.connect();

    this.scale.on('resize', this.resize, this);
    window.addEventListener('infinity-arena:pause', this.handlePause as EventListener);
    window.addEventListener('infinity-arena:save-progress', this.handleSaveProgress as EventListener);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
  }

  update(time: number) {
    if (!this.player || !this.inputManager || !this.network) return;
    const input = this.inputManager.getState();
    this.player.setVelocity(input.movement.x * 320, input.movement.y * 320);
    if (input.aim.lengthSq() > 0) this.player.setRotation(input.aim.angle());
    if (input.pause) window.dispatchEvent(new CustomEvent('infinity-arena:pause-request'));
    this.network.emitInput(input, time);
    this.score = Math.max(this.score, Math.floor((time - this.startedAt) / 100));
  }

  private resize(gameSize: Phaser.Structs.Size) {
    this.cameras.main.setSize(gameSize.width, gameSize.height);
    this.physics.world.setBounds(0, 0, gameSize.width, gameSize.height);
  }

  private readonly handlePause = (event: CustomEvent<{ paused: boolean }>) => {
    const paused = event.detail.paused;
    this.physics.world.isPaused = paused;
    this.network?.emitPause(paused);
    if (paused) this.sounds?.play('ui-pause');
  };

  private readonly handleSaveProgress = () => {
    void this.network?.saveProgress({ score: this.score, elapsedMs: Math.floor(this.time.now - this.startedAt) });
  };

  private shutdown() {
    this.inputManager?.destroy();
    this.network?.disconnect();
    window.removeEventListener('infinity-arena:pause', this.handlePause as EventListener);
    window.removeEventListener('infinity-arena:save-progress', this.handleSaveProgress as EventListener);
  }
}
