class Player extends Sprite {
  constructor(x, y, sprite) {
    super(x, y, sprite);
    this.verticalSpeed = 0;
    this.xSpeed = 0;
    this.dead = false;
    this.time = 0;
    this.xCollisionTrim = 5;
    this.collisionBounds = new CollisionBounds(this, this.xCollisionTrim);
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
    if (this.verticalSpeed < 0){
      this.sprite = images.img.jump;
      this.frame = 0;
    } else if (this.canStickToRight(control, walls)) {
      this.sprite = images.img.climb;
    } else if (this.canStickToLeft(control, walls)) {
      this.reverse = true;
      this.sprite = images.img.climb;
    } else {
      this.sprite = images.img.hero;
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
      const topY = _.minBy(collidedWithWalls, collidedWithWall => collidedWithWall.collisionBounds.topCollisionBound());
      this.y = topY.collisionBounds.topCollisionBound() - this.height();
    } else {
      const topY = _.maxBy(collidedWithWalls, collidedWithWall =>
        collidedWithWall.collisionBounds.bottomCollisionBound()
      );
      this.y = topY.collisionBounds.bottomCollisionBound();
    }
  }

  adjustXToCollide(collidedWithWalls) {
    const xdir = Math.sign(this.xSpeed);
    if (xdir > 0) {
      const leftX = _.minBy(collidedWithWalls, collidedWithWall =>
        collidedWithWall.collisionBounds.leftCollisionBound()
      );
      this.x += leftX.collisionBounds.leftCollisionBound() - this.collisionBounds.rightCollisionBound();
    } else {
      const rightX = _.maxBy(collidedWithWalls, collidedWithWall =>
        collidedWithWall.collisionBounds.rightCollisionBound()
      );
      this.x = rightX.collisionBounds.rightCollisionBound() - this.xCollisionTrim;
    }
  }

  canStickToWall(control, walls) {
    return this.canStickToRight(control, walls) || this.canStickToLeft(control, walls);
  }

  canStickToRight(control, walls) {
    if (this.verticalSpeed < 0) {
      return false;
    }

    const isMoving = control.left || control.right;
    return isMoving && this.willCollideWithSideWalls(walls, 2).length > 0;
  }

  canStickToLeft(control, walls) {
    if (this.verticalSpeed < 0) {
      return false;
    }

    const isMoving = control.left || control.right;
    return isMoving && this.willCollideWithSideWalls(walls, -2).length > 0;
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
    if (this.time == 0) {
      this.increaseFrame();
    }
  }
  increaseFrame() {
    const maxFrame = this.sprite.length
    this.frame++;
    this.frame %= maxFrame;
  }

  leftCollisionBound() {
    return this.x + 5;
  }

  rightCollisionBound() {
    return this.rightSide() - 5;
  }
}
