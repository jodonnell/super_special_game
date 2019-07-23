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

    const bothRects = spriteA.collisionBounds.type === "rect" && spriteB.collisionBounds.type === "rect";
    const oneCircleOneRect =
      (spriteA.collisionBounds.type === "rect" && spriteB.collisionBounds.type === "circle") ||
      (spriteB.collisionBounds.type === "rect" && spriteA.collisionBounds.type === "circle");
    if (bothRects) {
      return this.doRectsCollide(projectedVelocityX, projectedVelocityY, spriteA, spriteB);
    } else if (oneCircleOneRect) {
      const circle = spriteA.collisionBounds.type === "circle" ? spriteA : spriteB;
      const rect = spriteA.collisionBounds.type === "rect" ? spriteA : spriteB;
      return this.doCircleAndRectCollide(projectedVelocityX, projectedVelocityY, circle, rect);
    }
    return false;
  }

  static doRectsCollide(projectedVelocityX, projectedVelocityY, spriteA, spriteB) {
    if (
      spriteA.collisionBounds.right() + projectedVelocityX <= spriteB.collisionBounds.left() ||
      spriteA.collisionBounds.left() + projectedVelocityX >= spriteB.collisionBounds.right()
    )
      return false;
    if (
      spriteA.collisionBounds.top() + projectedVelocityY >= spriteB.collisionBounds.bottom() ||
      spriteA.collisionBounds.bottom() + projectedVelocityY <= spriteB.collisionBounds.top()
    )
      return false;
    return true;
  }

  static doCircleAndRectCollide(projectedVelocityX, projectedVelocityY, circle, rect) {
    const rectX = rect.collisionBounds.left();
    const rectY = rect.collisionBounds.top();
    const rectWidth = rect.collisionBounds.width();
    const rectHeight = rect.collisionBounds.height();
    const distX = Math.abs(circle.x - rectX - rectWidth / 2);
    const distY = Math.abs(circle.y - rectY - rectHeight / 2);

    if (distX > rectWidth / 2 + circle.radius) {
      return false;
    }
    if (distY > rectHeight / 2 + circle.radius) {
      return false;
    }

    if (distX <= rectWidth / 2) {
      return true;
    }
    if (distY <= rectHeight / 2) {
      return true;
    }

    var dx = distX - rectWidth / 2;
    var dy = distY - rectHeight / 2;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
  }
}
