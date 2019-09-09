class BackgroundHill {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    const quadrents = new Quadrents(x, y, width, height);
    this.dots = [
      quadrents.assignPos(),
      quadrents.assignPos(),
      quadrents.assignPos(),
      quadrents.assignPos(),
    ];
    this.rectPos = quadrents.assignPos();
  }

  update() {}

  draw() {
    this.hill();
    this.shadow();

    ctx.fillStyle = "#291221";
    ctx.strokeStyle = "#291221";
    ctx.lineWidth = 5;

    this.dot(this.dots[0].x, this.dots[0].y, 5);
    this.dot(this.dots[1].x, this.dots[1].y, 6);
    this.dot(this.dots[2].x, this.dots[2].y, 6);
    this.dot(this.dots[3].x, this.dots[3].y, 10);

    if (this.width > 100 && this.height > 100)
      this.rect(this.rectPos.x, this.rectPos.y, 6);
  }

  hill() {
    ctx.fillStyle = "#37134d";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  shadow() {
    ctx.fillStyle = "#000";
    ctx.fillRect(this.x - 10, this.y + 10, 10, this.height - 10);
  }

  dot(x, y, size) {
    ctx.fillRect(x, y, size, size);
  }

  rect(x, y) {
    ctx.strokeRect(x, y, 15, 8);
  }

}
