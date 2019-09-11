class Mushrooms {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {}

  draw(pallet) {
    ctx.fillStyle = pallet[2];
    ctx.fillRect(this.x, this.y - 12, 4, 12);

    ctx.fillStyle = pallet[0];
    ctx.fillRect(this.x - 4, this.y - 20, 12, 8);
  }
}
