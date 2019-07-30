class Block extends Sprite {
  constructor(x, y, sprite, frame) {
    super(x, y, sprite, frame);
  }

  update() {}
}

class BlankBlock {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.collisionBounds = new CollisionBoundsRect(this);
  }
  update() {}
  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.width);
  }

  rightSide() {
    return this.x + this.width;
  }

  bottomSide() {
    return this.y + this.width;
  }
}

class BreakerBlock extends Sprite {
  constructor(x, y) {
    super(x, y, images.img.brick, 1);
    this.dead = 0;
    this.break = 0;
  }
  update(args) {
    if (this.dead) return;
    if (CollisionDetector.doRectsCollide(0, -1, this, args.onscreenSprites.player)) this.break = true;
    else if (this.break) {
      this.dead = true;
      this.x = 0;
      this.y = 0;
    }
  }

  draw(pallet) {
    if (this.dead == false) super.draw(pallet);
  }
}
