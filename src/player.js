class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.verticalSpeed = 0;
    this.xSpeed = 0;
  }

  update(control, walls) {
    this.updateX(control, walls);
    this.updateY(control, walls);
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  rightSide() {
    return this.x + 20;
  }

  bottomSide() {
    return this.y + 20;
  }

  updateX(control, walls) {
    const speedmax = 4;
    const vel = 0.2;
    const horizontal = control.right - control.left;
    this.xSpeed = clamp(this.xSpeed + vel * horizontal, -speedmax, speedmax);
    if (!horizontal) this.xSpeed = 0;
    this.x += Math.floor(this.xSpeed);

    if (CollisionDetector.doesCollideWithSprites(this, walls)) {
      this.x -= Math.floor(this.xSpeed);
    }
  }

  updateY(control, walls) {
    const gravity = 0.5;
    const speedMax = 10;
    this.verticalSpeed = Math.min(this.verticalSpeed + gravity, speedMax);

    this.y = this.y + this.verticalSpeed;

    if (CollisionDetector.doesCollideWithSprites(this, walls)) {
      this.y = this.y - this.verticalSpeed;
      this.verticalSpeed = 0;
    }

    if (this.y == canvas.height - 60 && control.x) this.verticalSpeed = -10;
  }
}
