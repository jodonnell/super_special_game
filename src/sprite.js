class Sprite {
  constructor(x, y, sprite, frame) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.frame = frame || 0;
    this.currentFrame = this.sprite[this.frame];
    this.w = this.currentFrame[0].length * 5;
    this.pixelSize = 5;
    this.collisionBounds = new CollisionBounds(this);
  }

  draw(pallet, x, y) {
    x = x || this.x;
    y = y || this.y;
    this.currentFrame.forEach((row, i) => {
      row.forEach((pixelCode, j) => {
        if (pixelCode === -1) {
          return;
        }

        ctx.fillStyle = pallet[pixelCode];
        ctx.fillRect(x + j * this.pixelSize, y + i * this.pixelSize, this.pixelSize, this.pixelSize);
      });
    });
  }

  width() {
    return this.currentFrame[0].length * this.pixelSize;
  }

  height() {
    return this.currentFrame.length * this.pixelSize;
  }

  rightSide() {
    return this.x + this.width();
  }

  bottomSide() {
    return this.y + this.height();
  }
}
