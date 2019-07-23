class CollisionBoundsRect {
  constructor(sprite, trimX = 0) {
    this.sprite = sprite;
    this.trimX = trimX;
    this.type = "rect";
  }

  left() {
    return this.sprite.x + this.trimX;
  }

  top() {
    return this.sprite.y;
  }

  right() {
    return this.sprite.rightSide() - this.trimX;
  }

  bottom() {
    return this.sprite.bottomSide();
  }
}
