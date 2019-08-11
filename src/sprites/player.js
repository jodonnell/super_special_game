class Player extends Sprite {
  constructor(x, y, sprite) {
    super(x, y, sprite);
    this.resetPlayer();
    this.xCollisionTrim = 5;
    this.dead = false;
    this.collisionBounds = new CollisionBoundsRect(this, this.xCollisionTrim);
    this.jumpBuffer = 0;
  }

  resetPlayer() {
    this.ySpeed = 0;
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
    super.update();
    if (this.dead) {
      return;
    }
    this.jumpBuffer = Math.max(this.jumpBuffer - 1, 0);
    const allwalls = [...args.onscreenSprites.walls, ...args.onscreenSprites.breakCheck()];
    const wallCollider = new SpriteWallCollider(this, allwalls);
    this.updateAnimation();
    this.updateX(args.control, allwalls, wallCollider);
    this.updateY(args.control, allwalls, wallCollider);
    this.updateJump(args.control, args.onscreenSprites, allwalls);
    this.updateSprite(args.control, allwalls);
    if (args.control.x) {
      args.control.canJump = false;
    }
  }

  updateSprite(control, walls) {
    if (this.ySpeed < 0) {
      this.sprite = images.img.jump;
      this.frame = 0;
    } else if (this.canStickToWall(control, walls)) {
      this.sprite = images.img.climb;
    } else {
      this.sprite = images.img.hero;
    }
    if (!this.getInputs(control)) return;
    if (this.xSpeed > 0 || control.right) {
      this.reverse = false;
    } else if (this.xSpeed < 0 || control.left) {
      this.reverse = true;
    }
  }

  getInputs(control) {
    return control.right - control.left;
  }

  updateX(control, walls, wallCollider) {
    const speedmax = 4;
    const vel = 0.4;
    const horizontal = this.getInputs(control);
    this.xSpeed = MathHelpers.clamp(this.xSpeed + vel * horizontal, -speedmax, speedmax);
    if (!horizontal) this.xSpeed = MathHelpers.toZero(this.xSpeed, 1);

    wallCollider.updateX(() => (this.xSpeed = 0));
  }

  updateY(control, walls, wallCollider) {
    wallCollider.updateY(0.5, 10, () => {
      this.jumpBuffer = 5;
    });

    if (this.canStickToWall(control, walls)) {
      this.ySpeed = MathHelpers.toZero(this.ySpeed, 1);
    }
  }

  canStickToWall(control, walls) {
    if (this.ySpeed < 0) {
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

  updateJump(control, onscreenSprites, walls) {
    if (control.x && control.canJump) {
      if (this.jumpBuffer || this.willCollideWithFloors(walls, 5).length > 0) {
        this.ySpeed = -10;
        this.jumpBuffer = 0;
        this.addJumpClouds(onscreenSprites);
      } else if (this.canStickToWall(control, walls)) {
        this.addJumpClouds(onscreenSprites);
        this.ySpeed = -10;
        this.xSpeed = 4 * (control.left - control.right);
      }
    }
    if (this.ySpeed < -5 && !control.x) this.ySpeed = -4;
  }

  addJumpClouds(onscreenSprites) {
    onscreenSprites.addFX(new Cloud(this.x + this.w / 2, this.dimensions.bottomSide(), 1));
    onscreenSprites.addFX(new Cloud(this.x + this.w / 2, this.dimensions.bottomSide(), 1));
    onscreenSprites.addFX(new Cloud(this.x + this.w / 2, this.dimensions.bottomSide(), -1));
    onscreenSprites.addFX(new Cloud(this.x + this.w / 2, this.dimensions.bottomSide(), -1));
  }

  updateAnimation() {
    var timeSpeed;
    if (Math.floor(this.xSpeed) == 0) timeSpeed = 30;
    else timeSpeed = 10;
    this.time++;
    this.time %= timeSpeed;
    if (this.time == 0 && Math.floor(this.ySpeed) == 0) {
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
