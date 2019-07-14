class Player extends Sprite {
  constructor(x, y, sprite) {
    super(x, y, sprite);
    this.verticalSpeed = 0;
    this.xSpeed = 0;
    this.dead = false;
    this.time = 0;
  }

  draw(pallet) {
    if (this.dead) {
      return;
    }
    super.draw(pallet);
  }

  update(args) {
    if (this.dead) {
      return;
    }
    this.updateAnimation();
    this.updateX(args.control, args.onscreenSprites.walls);
    this.updateY(args.control, args.onscreenSprites.walls);
    this.updateJump(args.control, args.onscreenSprites);
  }

  updateX(control, walls) {
    const speedmax = 4;
    const vel = 0.4;
    const horizontal = control.right - control.left;
    this.xSpeed = MathHelpers.clamp(this.xSpeed + vel * horizontal, -speedmax, speedmax);
    if (!horizontal) this.xSpeed = MathHelpers.toZero(this.xSpeed, 1);

    const collidedWithWalls = CollisionDetector.willCollideWithSprites(Math.floor(this.xSpeed), 0, this, walls);
    if (collidedWithWalls.length > 0) {
      const xdir = Math.sign(this.xSpeed);
      while (CollisionDetector.willCollideWithSprites(xdir, 0, this, walls).length === 0) {
        this.x += xdir;
      }
      this.xSpeed = 0;
    } else this.x += Math.floor(this.xSpeed);
  }

  updateY(control, walls) {
    const gravity = 0.5;
    const speedMax = 10;
    this.verticalSpeed = Math.min(this.verticalSpeed + gravity, speedMax);

    const collidedWithWalls = CollisionDetector.willCollideWithSprites(0, Math.floor(this.verticalSpeed), this, walls);
    if (collidedWithWalls.length > 0) {
      const ydir = Math.sign(this.verticalSpeed);
      while (CollisionDetector.willCollideWithSprites(0, ydir, this, walls).length === 0) {
        this.y += ydir;
      }
      this.verticalSpeed = 0;
    } else this.y += Math.floor(this.verticalSpeed);
  }

  updateJump(control, onscreenSprites) {
    if (CollisionDetector.willCollideWithSprites(0, 1, this, onscreenSprites.walls).length > 0) {
      if (control.x) {
        this.verticalSpeed = -10;
        onscreenSprites.addFX(new Cloud(this.x, this.bottomSide(), 1));
        onscreenSprites.addFX(new Cloud(this.x, this.bottomSide(), 1));
        onscreenSprites.addFX(new Cloud(this.x, this.bottomSide(), -1));
        onscreenSprites.addFX(new Cloud(this.x, this.bottomSide(), -1));
      }
    }
    if (this.verticalSpeed < -5 && !control.x) this.verticalSpeed = -4;
  }

  updateAnimation() {
    var timeSpeed;
    if (this.xSpeed == 0) timeSpeed = 30;
    else timeSpeed = 10;
    this.time++;
    this.time %= timeSpeed;
    if (this.time == 0) {
      this.increaseFrame();
    }
  }
  increaseFrame() {
    this.frame++;
    this.frame %= 2;
    this.currentFrame = this.sprite[this.frame];
  }
}
