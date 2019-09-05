class BackgroundHill {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  update() {
  }

  draw() {
    ctx.fillStyle = "#4c1227";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "#291221";
    ctx.strokeStyle = "#291221";
    ctx.lineWidth = 5;

    ctx.fillRect(this.x + 40, this.y + 30, 5, 5);

    ctx.fillRect(this.x + 43, this.y + 140, 10, 10);
    ctx.fillRect(this.x + 64, this.y + 136, 6, 6);
    ctx.fillRect(this.x + 124, this.y + 176, 6, 6);

    ctx.strokeRect(this.x + 100, this.y + 80, 15, 8);
  }
}
