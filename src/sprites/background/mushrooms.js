class Mushrooms {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.stemHeight = MathHelpers.randomRange(4, 16);
    this.mushroomHeight = MathHelpers.randomRange(4, 12);
  }

  update() {}

  draw(pallet) {
    ctx.fillStyle = pallet[2];
    ctx.fillRect(this.x, this.y - this.stemHeight, 4, this.stemHeight);

    ctx.fillStyle = pallet[0];
    ctx.fillRect(this.x - 4, this.y - this.stemHeight - this.mushroomHeight, 12, this.mushroomHeight);
  }
}
