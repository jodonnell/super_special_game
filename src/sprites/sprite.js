class Sprite {
  constructor(x, y, sprite, frame) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.frame = frame || 0;
    this.w = this.sprite[0].length * PIXEL_SIZE;
    this.pixelSize = PIXEL_SIZE;
    this.collisionBounds = new CollisionBoundsRect(this);
    this.dimensions = new RectDimensions(
      this.sprite[0][0].length * this.pixelSize,
      this.sprite[0].length * this.pixelSize,
    );
  }

  draw(pallet, x, y) {
    x = x || this.x;
    y = y || this.y;
    const currentFrame = this.sprite[this.frame];
    currentFrame.forEach((row, i) => {
      if (this.reverse) {
        row = row.slice().reverse();
      }
      row.forEach((pixelCode, j) => {
        if (pixelCode === -1 || pixelCode === 9) {
          return;
        }

        ctx.fillStyle = pallet[pixelCode];
        ctx.fillRect(x + j * this.pixelSize, y + i * this.pixelSize, this.pixelSize, this.pixelSize);
      });
    });
  }

  update() {
    this.dimensions.setPos(this.x, this.y);
  }
}
