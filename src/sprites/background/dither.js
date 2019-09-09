class Dither {
  constructor(x1, y1, x2, y2, color, lineWidth, up=true) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.lineWidth = lineWidth;
    this.up = up;
  }

  update() {}

  draw() {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();

    this.dither();
  }

  dither() {
    ctx.fillStyle = this.color;

    for (let i = 0; i < canvas.width; i += 20) {
      if (this.up)
        ctx.fillRect(this.x1 + i, this.y1 - 15, 10, 10);
      else
        ctx.fillRect(this.x1 + i, this.y1 + 5, 10, 10);
    }

    for (let i = 10; i < canvas.width; i += 20) {
      if (this.up)
        ctx.fillRect(this.x1 + i, this.y1 - 25, 10, 10);
      else
        ctx.fillRect(this.x1 + i, this.y1 + 15, 10, 10);
    }

    for (let i = 0; i < canvas.width; i += 20) {
      if (this.up)
        ctx.fillRect(this.x1 + i, this.y1 - 35, 10, 5);
      else
        ctx.fillRect(this.x1 + i, this.y1 + 25, 10, 5);
    }

    for (let i = 10; i < canvas.width; i += 20) {
      if (this.up)
        ctx.fillRect(this.x1 + i, this.y1 - 50, 5, 5);
      else
        ctx.fillRect(this.x1 + i, this.y1 + 40, 5, 5);
    }
  }
}
