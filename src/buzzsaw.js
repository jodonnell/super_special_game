class BuzzSaw {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.sprite = sprite.img.buzzsaw;
  }

  draw(pallet) {
    const pixelSize = 5;
    const img = this.sprite;
    for (let row = 0; row < img.length; row++) {
      let currentrow = img[row];
      for (let col = 0; col < currentrow.length; col++) {
        if (currentrow[col] === ".") continue;
        let color = currentrow[col];
        ctx.fillStyle = pallet[color];

        ctx.fillRect(this.x + col * pixelSize, this.y + row * pixelSize, pixelSize, pixelSize);
      }
    }
  }

  rightSide() {
    return this.x + 120;
  }

  bottomSide() {
    return this.y + 120;
  }

  update() {}
}
