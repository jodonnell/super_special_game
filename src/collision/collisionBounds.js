class CollisionBounds {
  constructor(sprite, trimX = 0) {
    this.sprite = sprite;
    this.trimX = trimX;
  }

  leftCollisionBound() {
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
}
