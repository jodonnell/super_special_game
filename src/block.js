class Block {
  constructor(x, y, sprite, colors) {
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.colors = colors;
    this.sprite = sprite;
  }

  draw() {
    const pixelSize = 5;
    const img = this.sprite[this.frame];
    for (let row = 0; row < img.length; row++) {
      let currentrow = img[row];
      for (let col = 0; col < currentrow.length; col++) {
        if (currentrow[col] == ".") continue;
        let color = currentrow[col];
        ctx.fillStyle = this.colors[color];

        ctx.fillRect(this.x + col * pixelSize, this.y + row * pixelSize, pixelSize, pixelSize);
      }
    }
  }

  rightSide() {
    return this.x + 40;
  }

  bottomSide() {
    return this.y + 40;
  }

  increaseFrame() {
    this.frame++;
    this.frame %= 2;
  }
}
