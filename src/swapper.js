class Swapper {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pallet = images.pallet.a;
    this.frame = 0;
  }

  draw() {
    ctx.fillStyle = this.pallet[0];
    ctx.fillRect(this.x, this.y, 15, 15);
  }

  update() {
    this.frame++;
    if (this.frame % 10 === 0) {
      if (this.pallet === images.pallet.a) {
        this.pallet = images.pallet.b;
      } else {
        this.pallet = images.pallet.a;
      }
      this.frame = 0;
    }
  }

  rightSide() {
    return this.x + 10;
  }

  bottomSide() {
    return this.y + 10;
  }

  leftCollisionBound() {
    return this.x;
  }

  topCollisionBound() {
    return this.y;
  }

  rightCollisionBound() {
    return this.rightSide();
  }

  bottomCollisionBound() {
    return this.bottomSide();
  }
}
