class Cloud {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.h = MathHelpers.randomInt(5) + 5;
    this.w = this.h + MathHelpers.randomInt(20);
    this.vsp = 1;
    this.dead = 0;
    this.spd = (MathHelpers.randomInt(2) + 2) * dir;
  }

  update() {
    if (!this.h) {
      this.dead = 1;
      return;
    }
    this.x -= this.spd;
    this.y += Math.abs(this.spd / 4);
    this.w = Math.max(this.h + 5, this.w - 0.5);
    this.h = Math.max(this.h + this.vsp, 0);
    this.spd = MathHelpers.toZero(this.spd, 0.2);
    this.vsp -= 0.1;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x - this.w / 2, this.y, this.w, -this.h);
  }
}
