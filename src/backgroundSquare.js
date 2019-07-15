class BackgroundSquare {
  constructor(x, y, w, speed, angle, thickness) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.angle = angle || 0;
    this.speed = speed || 2;
    this.thickness = thickness || 4;
  }

  update() {
    this.angle += this.speed;
    this.angle %= 360;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.angle * Math.PI) / 180);
    this.drawEachPart();
    ctx.restore();
  }

  drawEachPart() {
    const offset = this.w / 2,
      w = this.w,
      th = this.thickness;
    ctx.fillStyle = "#1b3535";
    ctx.fillRect(-offset, -offset, w, w);
    ctx.fillStyle = "#00212d";
    ctx.fillRect(-offset + th, -offset + th, w - th * 2, w - th * 2);
  }
}
