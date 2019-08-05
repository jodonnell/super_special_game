class Blob extends Sprite {
  constructor(x, y, sprite) {
    super(x, y, sprite);
    this.dead = false;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.time = 0;
    this.xCollisionTrim = 0;
    this.states = { idle: 0, grounded: 1, bouncing: 2 };
    this.currentState = this.states.bouncing;
    this.hit = false;
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
    super.update();
    const player = args.onscreenSprites.player;

    switch (this.currentState) {
      case this.states.idle:
        this.kickCheck(player,args.onscreenSprites);
        this.updateAnimation();
        break;

      case this.states.sliding:
        this.updateAnimation();
        this.updateX(args.onscreenSprites.walls);
        if (this.onGround(args.onscreenSprites.walls)) this.applyHorizontalFriction();
        else {
          this.currentState = this.states.bouncing;
          break;
        }
        if (this.xSpeed == 0) this.currentState = this.states.idle;
        break;

      case this.states.bouncing:
        this.frame = 1;
        this.updateX(args.onscreenSprites.walls);
        this.updateY(args.onscreenSprites.walls);
        break;
    }
  }

  kickCheck(player,onscreenSprites) {
    if (this.willCollideWithPlayer(player)) {
      if (this.hit == false) {
        this.hit = true;
        this.currentState = this.states.bouncing;
        this.xSpeed = MathHelpers.clamp(player.xSpeed * 1.5 || Math.sign(this.x - player.x), -4, 4);
        this.ySpeed = Math.abs(player.xSpeed) * -1 || -1;
	onscreenSprites.addFX(new Cloud(this.x + this.w / 2, this.dimensions.bottomSide(), Math.sign(this.xSpeed),2));
      }
    } else this.hit = false;
  }

  applyHorizontalFriction() {
    this.xSpeed = MathHelpers.toZero(this.xSpeed, 0.5);
  }

  onGround(walls) {
    if (this.willCollideWithFloors(walls, 1).length > 0) return true;
    else return false;
  }

  updateX(walls) {
    const collidedWithWalls = this.willCollideWithSideWalls(walls, this.xSpeed);
    if (collidedWithWalls.length > 0) {
      this.adjustXToCollide(collidedWithWalls);
      this.xSpeed *= -0.5;
    } else this.x += Math.floor(this.xSpeed);
  }

  updateY(walls) {
    const gravity = 0.2;
    const speedMax = 10;
    this.ySpeed = Math.min(this.ySpeed + gravity, speedMax);

    const collidedWithWalls = this.willCollideWithFloors(walls, this.ySpeed);
    if (collidedWithWalls.length > 0) {
      this.adjustYToCollide(collidedWithWalls);
      if (this.ySpeed > 0) this.currentState = this.states.sliding;
      this.ySpeed = 0;
    } else this.y += Math.floor(this.ySpeed);
  }

  adjustYToCollide(collidedWithWalls) {
    const ydir = Math.sign(this.ySpeed);
    if (ydir > 0) {
      const topY = _.minBy(collidedWithWalls, collidedWithWall => collidedWithWall.collisionBounds.top());
      this.y = topY.collisionBounds.top() - this.dimensions.height();
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
  willCollideWithPlayer(player) {
    return CollisionDetector.doRectsCollide(0, 0, this, player);
  }

  willCollideWithFloors(walls, speed) {
    return CollisionDetector.willCollideWithSprites(0, Math.floor(speed), this, walls);
  }

  willCollideWithSideWalls(walls, speed) {
    return CollisionDetector.willCollideWithSprites(Math.floor(speed), 0, this, walls);
  }

  updateAnimation() {
    var timeSpeed = 30;
    this.time++;
    this.time %= timeSpeed;
    if (this.time == 0) {
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
