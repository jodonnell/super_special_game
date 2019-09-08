class Quadrents {
  constructor(x, y, width, height, trim=15) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.trim = trim;
    this.resetPlacer();
  }

  resetPlacer() {
    this.unusedQuadrents = _.shuffle([0, 1, 2, 3]);
  }

  assignPos() {
    let x;
    let y;

    const quadrent = this.unusedQuadrents.pop();
    if (quadrent === 0) {
      // top left
      x = MathHelpers.randomRange(this.x + this.trim, this.x + this.width / 2 - this.trim);
      y = MathHelpers.randomRange(this.y + this.trim, this.y + this.height / 2 - this.trim);
    } else if (quadrent === 1) {
      // top right
      x = MathHelpers.randomRange(
        this.x + this.width / 2 + this.trim,
        this.x + this.width - this.trim
      );
      y = MathHelpers.randomRange(this.y + this.trim, this.y + this.height / 2 - this.trim);
    } else if (quadrent === 2) {
      // bottom left
      x = MathHelpers.randomRange(this.x + this.trim, this.x + this.width / 2 - this.trim);
      y = MathHelpers.randomRange(
        this.y + this.height / 2 + this.trim,
        this.y + this.height - this.trim
      );
    } else if (quadrent === 3) {
      // bottom right
      x = MathHelpers.randomRange(
        this.x + this.width / 2 + this.trim,
        this.x + this.width - this.trim
      );
      y = MathHelpers.randomRange(
        this.y + this.height / 2 + this.trim,
        this.y + this.height - this.trim
      );
    }

    if (this.unusedQuadrents.length === 0) {
      this.resetPlacer();
    }

    return { x: Math.floor(x), y: Math.floor(y) };
  }
}
