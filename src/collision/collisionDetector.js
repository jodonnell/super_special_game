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
      spriteA.collisionBounds.right() + projectedVelocityX <=
        spriteB.collisionBounds.left() ||
      spriteA.collisionBounds.left() + projectedVelocityX >= spriteB.collisionBounds.right()
    )
      return false;
    if (
      spriteA.collisionBounds.top() + projectedVelocityY >=
        spriteB.collisionBounds.bottom() ||
      spriteA.collisionBounds.bottom() + projectedVelocityY <= spriteB.collisionBounds.top()
    )
      return false;
    return true;
  }

  static doCircleAndRectCollide(projectedVelocityX, projectedVelocityY, circle, rect) {
    const topLeftPoint = { x: rect.collisionBounds.left(), y: rect.collisionBounds.top() };
    if (this.pointInCircle(topLeftPoint, circle)) {
      return true;
    }

    const topRightPoint = {
      x: rect.collisionBounds.right(),
      y: rect.collisionBounds.top()
    };
    if (this.pointInCircle(topRightPoint, circle)) {
      return true;
    }

    const bottomLeftPoint = {
      x: rect.collisionBounds.left(),
      y: rect.collisionBounds.bottom()
    };
    if (this.pointInCircle(bottomLeftPoint, circle)) {
      return true;
    }

    const bottomRightPoint = {
      x: rect.collisionBounds.right(),
      y: rect.collisionBounds.bottom()
    };
    if (this.pointInCircle(bottomRightPoint, circle)) {
      return true;
    }
    return false;
  }

  static pointInCircle(point, circle) {
    return (
      Math.sqrt((point.x - circle.x) * (point.x - circle.x) + (point.y - circle.y) * (point.y - circle.y)) <
      circle.radius
    );
  }
}
