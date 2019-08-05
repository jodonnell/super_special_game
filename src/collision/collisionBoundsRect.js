class CollisionBoundsRect {
  constructor(sprite, trimX = 0) {
    this.sprite = sprite;
    this.trimX = trimX;
    this.type = "rect";
  }

  left() {
    return this.sprite.dimensions.x + this.trimX;
  }

  top() {
    return this.sprite.dimensions.y;
  }

  right() {
    return this.sprite.dimensions.rightSide() - this.trimX;
  }

  bottom() {
    return this.sprite.dimensions.bottomSide();
  }

  width() {
    return this.right() - this.left();
  }

  height() {
    return this.bottom() - this.top();
  }
}
