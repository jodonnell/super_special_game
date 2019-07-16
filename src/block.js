class Block extends Sprite {
  constructor(x, y, sprite, frame) {
    super(x, y, sprite, frame);
  }

  update() {}
}

class BlankBlock {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
  }
  update() {}
  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.width);
  }

  rightSide() {
    return this.x + this.width;
  }

  bottomSide() {
    return this.y + this.width;
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
