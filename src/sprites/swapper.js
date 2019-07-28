class Swapper extends Sprite {
  constructor(x, y, pallet) {
    super(x, y, images.img.swapper, 0);
    this.collisionBounds = new CollisionBoundsRect(this);
    this.counter = 0;
    this.pallet = pallet;
  }

  draw(pallet, x, y) {
    super.draw(this.pallet, x, y);
  }

  update() {
    this.counter++;

    if (this.counter > 10) {
      this.frame++;
      this.counter = 0;
    }
    if (this.frame === 2) this.frame = 0;
  }
}
