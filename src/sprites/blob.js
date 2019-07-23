class Blob extends Sprite {
  constructor(x, y, sprite) {
    super(x, y, sprite);
    this.dead = false;
    this.xSpeed = 5;
    this.ySpeed = -2;
    this.time = 0;
    this.states = {idle:0, grounded:1, bouncing:2}
    this.currentState = this.states.bouncing
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
    
    switch(this.currentState){
      case this.states.idle:
        this.updateAnimation();
       break;

      case this.states.sliding:
        this.updateAnimation();
        this.updateX(args.onscreenSprites.walls);
        this.ApplyHorizontalFriction()
        if (this.xSpeed == 0) this.currentState = this.states.idle
        break;

      case this.states.bouncing:
        this.updateX(args.onscreenSprites.walls);
        this.updateY(args.onscreenSprites.walls);
        break;
    }
  }
  ApplyHorizontalFriction(){
    this.xSpeed = MathHelpers.toZero(this.xSpeed, .5);
  }

  updateX(walls) {
    const speedmax = 4;
    const vel = 0.4;
    
    const collidedWithWalls = this.willCollideWithSideWalls(walls, this.xSpeed);
    if (collidedWithWalls.length > 0) {
      this.adjustXToCollide(collidedWithWalls);
      this.xSpeed = 0;
    } else this.x += Math.floor(this.xSpeed);
  }

  updateY(walls) {
    const gravity = 0.5;
    const speedMax = 10;
    this.ySpeed = Math.min(this.ySpeed + gravity, speedMax);

    const collidedWithWalls = this.willCollideWithFloors(walls, this.ySpeed);
    if (collidedWithWalls.length > 0) {
      this.adjustYToCollide(collidedWithWalls);
      this.ySpeed = 0;
      this.currentState = this.states.sliding
    } else this.y += Math.floor(this.ySpeed);

   
  }

  adjustYToCollide(collidedWithWalls) {
    const ydir = Math.sign(this.ySpeed);
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
