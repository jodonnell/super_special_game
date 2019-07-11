class CollisionDetector {
  static doesCollideWithSprites(sprite, sprites) {
    return sprites.find(otherSprite => {
      return this.doesCollideWith(sprite, otherSprite);
    });
  }

  static doesCollideWith(spriteA, spriteB) {
    if (spriteA === spriteB) {
      return false;
    }

    const topLeftPointIn =
      spriteA.x > spriteB.x &&
      spriteA.x < spriteB.rightSide() &&
      spriteA.y > spriteB.y &&
      spriteA.y < spriteB.bottomSide();

    const topRightPointIn =
      spriteA.rightSide() > spriteB.x &&
      spriteA.rightSide() < spriteB.rightSide() &&
      spriteA.y > spriteB.y &&
      spriteA.y < spriteB.bottomSide();

    const bottomLeftPointIn =
      spriteA.x > spriteB.x &&
      spriteA.x < spriteB.rightSide() &&
      spriteA.bottomSide() > spriteB.y &&
      spriteA.bottomSide() < spriteB.bottomSide();

    const bottomRightPointIn =
      spriteA.rightSide() > spriteB.x &&
      spriteA.rightSide() < spriteB.rightSide() &&
      spriteA.bottomSide() > spriteB.y &&
      spriteA.bottomSide() < spriteB.bottomSide();

    return (
      topLeftPointIn ||
      topRightPointIn ||
      bottomLeftPointIn ||
      bottomRightPointIn
    );
  }
}
