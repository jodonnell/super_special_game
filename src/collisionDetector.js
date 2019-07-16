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
      spriteA.rightCollisionBound() + projectedVelocityX <= spriteB.leftCollisionBound() ||
      spriteA.leftCollisionBound() + projectedVelocityX >= spriteB.rightCollisionBound()
    )
      return false;
    if (
      spriteA.topCollisionBound() + projectedVelocityY >= spriteB.bottomCollisionBound() ||
      spriteA.bottomCollisionBound() + projectedVelocityY <= spriteB.topCollisionBound()
    )
      return false;
    return true;
  }
}
