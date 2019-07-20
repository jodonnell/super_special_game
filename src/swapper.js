class Swapper extends Sprite {
  constructor(x, y) {
    super(x, y, images.img.swapper, 0);
    this.collisionBounds = new CollisionBounds(this);
    this.counter = 0;
  }

  update() {
    this.counter++;

    if (this.counter > 10) {
      this.frame++;
      this.counter = 0;
    }
    if (this.frame === 2)
      this.frame = 0;
  }

  rightSide() {
    return this.x + 10;
  }

  bottomSide() {
    return this.y + 10;
  }
}
