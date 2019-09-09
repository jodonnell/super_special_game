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
    ctx.fillStyle = "#37134d";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "#291221";
    ctx.strokeStyle = "#291221";
    ctx.lineWidth = 5;

    this.dot(this.dots[0].x, this.dots[0].y, 5);
    this.dot(this.dots[1].x, this.dots[1].y, 6);
    this.dot(this.dots[2].x, this.dots[2].y, 6);
    this.dot(this.dots[3].x, this.dots[3].y, 10);

    this.rect(this.rectPos.x, this.rectPos.y, 6);
  }

  dot(x, y, size) {
    ctx.fillRect(x, y, size, size);
  }

  rect(x, y) {
    ctx.strokeRect(x, y, 15, 8);
  }

}
