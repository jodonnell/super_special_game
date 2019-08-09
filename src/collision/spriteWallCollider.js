class SpriteWallCollider {
  constructor(sprite, walls) {
    this.sprite = sprite;
    this.walls = walls;
  }

  updateY(gravity, speedMax) {
    this.sprite.ySpeed = Math.min(this.sprite.ySpeed + gravity, speedMax);

    const collidedWithWalls = this.willCollideWithFloors(this.sprite.ySpeed);
    if (collidedWithWalls.length > 0) {
      this.adjustYToCollide(collidedWithWalls);
      if (this.sprite.ySpeed > 0) this.sprite.currentState = this.sprite.states.sliding;
      this.sprite.ySpeed = 0;
    } else this.sprite.y += Math.floor(this.sprite.ySpeed);
  }

  updateX() {
    const collidedWithWalls = this.willCollideWithSideWalls(this.sprite.xSpeed);
    if (collidedWithWalls.length > 0) {
      this.adjustXToCollide(collidedWithWalls);
      this.sprite.xSpeed *= -0.5;
    } else this.sprite.x += Math.floor(this.sprite.xSpeed);
  }

  willCollideWithSideWalls(speed) {
    return CollisionDetector.willCollideWithSprites(Math.floor(speed), 0, this.sprite, this.walls);
  }

  adjustYToCollide(collidedWithWalls) {
    const ydir = Math.sign(this.sprite.ySpeed);
    if (ydir > 0) {
      const topY = _.minBy(collidedWithWalls, collidedWithWall => collidedWithWall.collisionBounds.top());
      this.sprite.y = topY.collisionBounds.top() - this.sprite.dimensions.height();
    } else {
      const topY = _.maxBy(collidedWithWalls, collidedWithWall => collidedWithWall.collisionBounds.bottom());
      this.sprite.y = topY.collisionBounds.bottom();
    }
  }

  adjustXToCollide(collidedWithWalls) {
    const xdir = Math.sign(this.sprite.xSpeed);
    if (xdir > 0) {
      const leftX = _.minBy(collidedWithWalls, collidedWithWall => collidedWithWall.collisionBounds.left());
      this.sprite.x += leftX.collisionBounds.left() - this.sprite.collisionBounds.right();
    } else {
      const rightX = _.maxBy(collidedWithWalls, collidedWithWall => collidedWithWall.collisionBounds.right());
      this.sprite.x = rightX.collisionBounds.right() - this.sprite.xCollisionTrim;
    }
  }

  willCollideWithFloors(speed) {
    return CollisionDetector.willCollideWithSprites(0, Math.floor(speed), this.sprite, this.walls);
  }

  onGround() {
    return this.willCollideWithFloors(this.walls, 1).length > 0;
  }
}
