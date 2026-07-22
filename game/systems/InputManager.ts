import * as Phaser from 'phaser';

export type PlayerInputState = {
  movement: Phaser.Math.Vector2;
  aim: Phaser.Math.Vector2;
  primary: boolean;
  secondary: boolean;
  dash: boolean;
  pause: boolean;
};

export class InputManager {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys?: Record<'w' | 'a' | 's' | 'd' | 'space' | 'shift' | 'esc', Phaser.Input.Keyboard.Key>;
  private touchMovement = new Phaser.Math.Vector2();
  private touchAim = new Phaser.Math.Vector2();
  private touchPrimary = false;
  private touchDash = false;

  constructor(private readonly scene: Phaser.Scene) {}

  create() {
    this.cursors = this.scene.input.keyboard?.createCursorKeys();
    this.keys = this.scene.input.keyboard?.addKeys('W,A,S,D,SPACE,SHIFT,ESC') as InputManager['keys'];

    window.addEventListener('infinity-arena:touch-input', this.handleTouchInput as EventListener);
  }

  destroy() {
    window.removeEventListener('infinity-arena:touch-input', this.handleTouchInput as EventListener);
  }

  getState(): PlayerInputState {
    const movement = new Phaser.Math.Vector2(
      Number(Boolean(this.cursors?.right.isDown || this.keys?.d.isDown)) - Number(Boolean(this.cursors?.left.isDown || this.keys?.a.isDown)),
      Number(Boolean(this.cursors?.down.isDown || this.keys?.s.isDown)) - Number(Boolean(this.cursors?.up.isDown || this.keys?.w.isDown)),
    ).add(this.touchMovement);

    if (movement.lengthSq() > 1) movement.normalize();

    const pad = this.scene.input.gamepad?.getPad(0);
    if (pad) {
      movement.add(new Phaser.Math.Vector2(pad.leftStick.x, pad.leftStick.y));
      if (movement.lengthSq() > 1) movement.normalize();
    }

    const pointer = this.scene.input.activePointer;
    const aim = this.touchAim.clone();
    if (pointer.isDown) {
      aim.set(pointer.worldX - this.scene.scale.width / 2, pointer.worldY - this.scene.scale.height / 2).normalize();
    } else if (pad) {
      aim.set(pad.rightStick.x, pad.rightStick.y);
    }

    return {
      movement,
      aim,
      primary: pointer.isDown || this.touchPrimary || Boolean(pad?.buttons[7]?.pressed),
      secondary: Boolean(pad?.buttons[6]?.pressed),
      dash: Boolean(this.keys?.shift.isDown || this.keys?.space.isDown || pad?.buttons[0]?.pressed || this.touchDash),
      pause: Phaser.Input.Keyboard.JustDown(this.keys?.esc as Phaser.Input.Keyboard.Key) || Boolean(pad?.buttons[9]?.pressed),
    };
  }

  private readonly handleTouchInput = (event: CustomEvent<Partial<PlayerInputState>>) => {
    const detail = event.detail;
    this.touchMovement.copy(detail.movement ?? new Phaser.Math.Vector2());
    this.touchAim.copy(detail.aim ?? new Phaser.Math.Vector2());
    this.touchPrimary = Boolean(detail.primary);
    this.touchDash = Boolean(detail.dash);
  };
}
