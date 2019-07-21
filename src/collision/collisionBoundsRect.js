class CollisionBoundsRect {
  constructor(sprite, trimX = 0) {
    this.sprite = sprite;
    this.trimX = trimX;
    this.type = 'rect';
  }

  leftCollisionBound() {
    return this.sprite.x + this.trimX;
  }

  topCollisionBound() {
    return this.sprite.y;
  }

  rightCollisionBound() {
    return this.sprite.rightSide() - this.trimX;
  }

  bottomCollisionBound() {
    return this.sprite.bottomSide();
  }
}
