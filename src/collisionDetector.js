class CollisionDetector {
  static doesCollideWithSprites(sprite, sprites) {
    return CollisionDetector.willCollideWithSprites(0, 0, sprite, sprites);
  }

  static willCollideWithSprites(projectedVelocityX, projectedVelocityY, sprite, sprites) {
    return sprites.filter(otherSprite => {
      return this.willCollideWith(projectedVelocityX, projectedVelocityY, sprite, otherSprite);
    });
  }

  static willCollideWith(projectedVelocityX, projectedVelocityY, spriteA, spriteB) {
    if (spriteA === spriteB) {
      return false;
    }
    if (
      spriteA.collisionBounds.rightCollisionBound() + projectedVelocityX <=
        spriteB.collisionBounds.leftCollisionBound() ||
      spriteA.collisionBounds.leftCollisionBound() + projectedVelocityX >= spriteB.collisionBounds.rightCollisionBound()
    )
      return false;
    if (
      spriteA.collisionBounds.topCollisionBound() + projectedVelocityY >=
        spriteB.collisionBounds.bottomCollisionBound() ||
      spriteA.collisionBounds.bottomCollisionBound() + projectedVelocityY <= spriteB.collisionBounds.topCollisionBound()
    )
      return false;
    return true;
  }
}
