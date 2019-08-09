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
    const wallCollider = new SpriteWallCollider(this, args.onscreenSprites.walls);
    switch (this.currentState) {
      case this.states.idle:
        this.kickCheck(player, args.onscreenSprites);
        this.updateAnimation();
        break;

      case this.states.sliding:
        this.updateAnimation();
        this.updateX(wallCollider);
        if (this.onGround(wallCollider)) this.applyHorizontalFriction();
        else {
          this.currentState = this.states.bouncing;
          break;
        }
        if (this.xSpeed == 0) this.currentState = this.states.idle;
        break;

      case this.states.bouncing:
        this.frame = 1;
        this.updateX(wallCollider);
        this.updateY(wallCollider);
        break;
    }
  }

  kickCheck(player, onscreenSprites) {
    if (this.willCollideWithPlayer(player)) {
      if (this.hit == false) {
        this.hit = true;
        this.currentState = this.states.bouncing;
        this.xSpeed = MathHelpers.clamp(player.xSpeed * 1.5 || Math.sign(this.x - player.x), -4, 4);
        this.ySpeed = Math.abs(player.xSpeed) * -1 || -1;
        onscreenSprites.addFX(new Cloud(this.x + this.w / 2, this.dimensions.bottomSide(), Math.sign(this.xSpeed), 2));
      }
    } else this.hit = false;
  }

  applyHorizontalFriction() {
    this.xSpeed = MathHelpers.toZero(this.xSpeed, 0.5);
  }

  onGround(wallCollider) {
    return wallCollider.onGround();
  }

  updateX(wallCollider) {
    wallCollider.updateX();
  }

  updateY(wallCollider) {
    wallCollider.updateY(0.2, 10);
  }

  willCollideWithPlayer(player) {
    return CollisionDetector.doRectsCollide(0, 0, this, player);
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
