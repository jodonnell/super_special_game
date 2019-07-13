class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.verticalSpeed = 0;
    this.xSpeed = 0;
    this.dead = false;
  }

  update(args) {
    if (this.dead) {
      return;
    }
    this.updateX(args.control, args.onscreenSprites.walls);
    this.updateY(args.control, args.onscreenSprites.walls);
    this.updateJump(args.control, args.onscreenSprites);
  }

  draw(pallet) {
    if (this.dead) {
      return;
    }
    this.drawBody(pallet);
    this.drawEyes(pallet);
  }

  drawBody(pallet) {
    ctx.fillStyle = pallet[1];
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  drawEyes(pallet) {
    ctx.fillStyle = pallet[2];
    ctx.fillRect(this.x + 4, this.y + 4, 4, 8);
    ctx.fillRect(this.x + 12, this.y + 4, 4, 8);
  }

  rightSide() {
    return this.x + 20;
  }

  bottomSide() {
    return this.y + 20;
  }

  updateX(control, walls) {
    const speedmax = 4;
    const vel = 0.4;
    const horizontal = control.right - control.left;
    this.xSpeed = clamp(this.xSpeed + vel * horizontal, -speedmax, speedmax);
    if (!horizontal) this.xSpeed = toZero(this.xSpeed, 1);

    if (CollisionDetector.willCollideWithSprites(Math.floor(this.xSpeed), 0, this, walls)) {
      const xdir = Math.sign(this.xSpeed);
      while (!CollisionDetector.willCollideWithSprites(xdir, 0, this, walls)) {
        this.x += xdir;
      }
      this.xSpeed = 0;
    } else this.x += Math.floor(this.xSpeed);
  }

  updateY(control, walls) {
    const gravity = 0.5;
    const speedMax = 10;
    this.verticalSpeed = Math.min(this.verticalSpeed + gravity, speedMax);

    if (CollisionDetector.willCollideWithSprites(0, Math.floor(this.verticalSpeed), this, walls)) {
      const ydir = Math.sign(this.verticalSpeed);
      while (!CollisionDetector.willCollideWithSprites(0, ydir, this, walls)) {
        this.y += ydir;
      }
      this.verticalSpeed = 0;
    } else this.y += Math.floor(this.verticalSpeed);
  }

  updateJump(control, onscreenSprites) {
    if (CollisionDetector.willCollideWithSprites(0, 1, this, onscreenSprites.walls)) {
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
}
