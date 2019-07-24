class Player extends Sprite {
  constructor(x, y, sprite) {
    super(x, y, sprite);
    this.resetPlayer();
    this.xCollisionTrim = 5;
    this.dead = false;
    this.collisionBounds = new CollisionBoundsRect(this, this.xCollisionTrim);
  }

  resetPlayer() {
    this.verticalSpeed = 0;
    this.xSpeed = 0;
    this.time = 0;
    this.reverse = false;
  }

  draw(pallet) {
    if (this.dead) {
      return;
    }
    super.draw(pallet);
  }

  update(args) {
    if (this.dead) {
      return;
    }
    this.updateAnimation();
    this.updateX(args.control, args.onscreenSprites.walls);
    this.updateY(args.control, args.onscreenSprites.walls);
    this.updateJump(args.control, args.onscreenSprites);
    this.updateSprite(args.control, args.onscreenSprites.walls);
    if (args.control.x) {
      args.control.canJump = false;
    }
  }

  updateSprite(control, walls) {
    if (this.verticalSpeed < 0) {
      this.sprite = images.img.jump;
      this.frame = 0;
    } else if (this.canStickToWall(control, walls)) {
      this.sprite = images.img.climb;
    } else {
      this.sprite = images.img.hero;
    }

    if (this.xSpeed > 0 || control.right) {
      this.reverse = false;
    } else if (this.xSpeed < 0 || control.left) {
      this.reverse = true;
    }
  }

  updateX(control, walls) {
    const speedmax = 4;
    const vel = 0.4;
    const horizontal = control.right - control.left;
    this.xSpeed = MathHelpers.clamp(this.xSpeed + vel * horizontal, -speedmax, speedmax);
    if (!horizontal) this.xSpeed = MathHelpers.toZero(this.xSpeed, 1);

    const collidedWithWalls = this.willCollideWithSideWalls(walls, this.xSpeed);
    if (collidedWithWalls.length > 0) {
      this.adjustXToCollide(collidedWithWalls);
      this.xSpeed = 0;
    } else this.x += Math.floor(this.xSpeed);
  }

  updateY(control, walls) {
    const gravity = 0.5;
    const speedMax = 10;
    this.verticalSpeed = Math.min(this.verticalSpeed + gravity, speedMax);

    const collidedWithWalls = this.willCollideWithFloors(walls, this.verticalSpeed);
    if (collidedWithWalls.length > 0) {
      this.adjustYToCollide(collidedWithWalls);
      this.verticalSpeed = 0;
    } else this.y += Math.floor(this.verticalSpeed);

    if (this.canStickToWall(control, walls)) {
      this.verticalSpeed = MathHelpers.toZero(this.verticalSpeed, 1);
    }
  }

  adjustYToCollide(collidedWithWalls) {
    const ydir = Math.sign(this.verticalSpeed);
    if (ydir > 0) {
      const topY = _.minBy(collidedWithWalls, collidedWithWall => collidedWithWall.collisionBounds.top());
      this.y = topY.collisionBounds.top() - this.height();
    } else {
      const topY = _.maxBy(collidedWithWalls, collidedWithWall => collidedWithWall.collisionBounds.bottom());
      this.y = topY.collisionBounds.bottom();
    }
  }

  adjustXToCollide(collidedWithWalls) {
    const xdir = Math.sign(this.xSpeed);
    if (xdir > 0) {
      const leftX = _.minBy(collidedWithWalls, collidedWithWall => collidedWithWall.collisionBounds.left());
      this.x += leftX.collisionBounds.left() - this.collisionBounds.right();
    } else {
      const rightX = _.maxBy(collidedWithWalls, collidedWithWall => collidedWithWall.collisionBounds.right());
      this.x = rightX.collisionBounds.right() - this.xCollisionTrim;
    }
  }

  canStickToWall(control, walls) {
    if (this.verticalSpeed < 0) {
      return false;
    }

    const isMoving = control.left || control.right;
    const couldStickToLeft = isMoving && this.willCollideWithSideWalls(walls, -3).length > 0;
    const couldStickToRight = isMoving && this.willCollideWithSideWalls(walls, 3).length > 0;
    return couldStickToRight || couldStickToLeft;
  }

  willCollideWithFloors(walls, speed) {
    return CollisionDetector.willCollideWithSprites(0, Math.floor(speed), this, walls);
  }

  willCollideWithSideWalls(walls, speed) {
    return CollisionDetector.willCollideWithSprites(Math.floor(speed), 0, this, walls);
  }

  updateJump(control, onscreenSprites) {
    if (control.x && control.canJump) {
      if (this.willCollideWithFloors(onscreenSprites.walls, 1).length > 0) {
        this.verticalSpeed = -10;
        this.addJumpClouds(onscreenSprites);
      } else if (this.canStickToWall(control, onscreenSprites.walls)) {
        this.addJumpClouds(onscreenSprites);
        this.verticalSpeed = -10;
        this.xSpeed = 4 * (control.left - control.right);
      }
    }
    if (this.verticalSpeed < -5 && !control.x) this.verticalSpeed = -4;
  }

  addJumpClouds(onscreenSprites) {
    onscreenSprites.addFX(new Cloud(this.x + this.w / 2, this.bottomSide(), 1));
    onscreenSprites.addFX(new Cloud(this.x + this.w / 2, this.bottomSide(), 1));
    onscreenSprites.addFX(new Cloud(this.x + this.w / 2, this.bottomSide(), -1));
    onscreenSprites.addFX(new Cloud(this.x + this.w / 2, this.bottomSide(), -1));
  }

  updateAnimation() {
    var timeSpeed;
    if (Math.floor(this.xSpeed) == 0) timeSpeed = 30;
    else timeSpeed = 10;
    this.time++;
    this.time %= timeSpeed;
    if (this.time == 0 && Math.floor(this.verticalSpeed) == 0) {
      this.increaseFrame();
    }
  }
  increaseFrame() {
    const maxFrame = this.sprite.length;
    this.frame++;
    this.frame %= maxFrame;
  }

  left() {
    return this.x + 5;
  }

  right() {
    return this.rightSide() - 5;
  }
}
