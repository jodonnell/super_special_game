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

  draw(pallet) {
    ctx.fillStyle = pallet[0];
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
    this.meltingPixels = [];
  }
  update(args) {
    if (this.dead) return;
    if (CollisionDetector.doRectsCollide(0, -1, this, args.onscreenSprites.player)) {
      this.break = true;
      this.updateMeltingPixels();
    } else if (this.break) {
      this.dead = true;
      this.x = 0;
      this.y = 0;
    }
  }

  updateMeltingPixels() {
    for (let i = 0; i < this.meltingPixels.length; i++) {
      this.meltingPixels[i].y += 1;
      this.meltingPixels[i].opacity -= 5;
    }

    _.remove(this.meltingPixels, mp => mp.opacity <= 0);
  }

  draw(pallet) {
    if (this.dead === true) {
      return;
    }

    super.draw(pallet);
    if (this.break) {
      this.drawMelt(pallet);
    }
  }

  drawMelt(pallet) {
    if (MathHelpers.randomInt(25) === 20) {
      const pixel = {
        color: pallet[MathHelpers.randomInt(3)],
        x: MathHelpers.randomRange(this.x, this.rightSide()),
        y: this.bottomSide() + 1,
        opacity: 255
      };
      this.meltingPixels.push(pixel);
    }

    for (let i = 0; i < this.meltingPixels.length; i++) {
      ctx.fillStyle = ColorHelpers.addOpacity(this.meltingPixels[i].color, this.meltingPixels[i].opacity);
      ctx.fillRect(this.meltingPixels[i].x, this.meltingPixels[i].y, this.pixelSize, this.pixelSize);
    }
  }
}
