class Sprite {
  constructor() {
    this.pixelSize = 5;
  }

  draw(pallet) {
    const img = this.currentFrame;
    for (let row = 0; row < img.length; row++) {
      let currentrow = img[row];
      for (let col = 0; col < currentrow.length; col++) {
        if (currentrow[col] == ".") continue;
        let color = currentrow[col];
        ctx.fillStyle = pallet[color];

        ctx.fillRect(
          this.x + col * this.pixelSize,
          this.y + row * this.pixelSize,
          this.pixelSize,
          this.pixelSize
        );
      }
    }
  }

  rightSide() {
    return this.x + (this.currentFrame[0].length * this.pixelSize);
  }

  bottomSide() {
    return this.y + (this.currentFrame.length * this.pixelSize);
  }

}