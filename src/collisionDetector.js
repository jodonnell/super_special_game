class CollisionDetector {
  static doesCollideWithSprites(x, y, sprite, sprites) {
    return sprites.find(otherSprite => {
      return this.doesCollideWith(x, y, sprite, otherSprite);
    });
  }

  static doesCollideWith(x, y, spriteA, spriteB) {
    if (spriteA === spriteB) {
      return false;
    }
    if (spriteA.rightSide() + x < spriteB.x || spriteA.x + x > spriteB.rightSide()) return 0;
    if (spriteA.y + y > spriteB.bottomSide() || spriteA.bottomSide() + y < spriteB.y) return 0;
    return 1;
  }
}
