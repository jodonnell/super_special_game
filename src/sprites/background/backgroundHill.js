class BackgroundHill {
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
    const offset = this.w / 2;
    ctx.fillStyle = "#1b3535";
    ctx.fillRect(-offset, -offset, this.w, this.w);
    ctx.fillStyle = "#00212d";
    ctx.fillRect(
      -offset + this.thickness,
      -offset + this.thickness,
      this.w - this.thickness * 2,
      this.w - this.thickness * 2
    );
  }
}
