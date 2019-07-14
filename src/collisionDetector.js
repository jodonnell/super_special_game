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
    if (spriteA.rightSide() + projectedVelocityX <= spriteB.x || spriteA.x + projectedVelocityX >= spriteB.rightSide())
      return false;
    if (
      spriteA.y + projectedVelocityY >= spriteB.bottomSide() ||
      spriteA.bottomSide() + projectedVelocityY <= spriteB.y
    )
      return false;
    return true;
  }
}
