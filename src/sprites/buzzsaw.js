class BuzzSaw extends Sprite {
  constructor(x, y, pallet, xRange) {
    super(x, y, images.img.buzzsaw);
    this.angle = 20;
    this.speed = 15;

    this.startX = x;
    this.direction = RIGHT;
    this.xRange = xRange;
    this.pallet = pallet;
    this.originalPallet = pallet;
  }

  resetPallet() {
    this.pallet = this.originalPallet;
  }

  update() {
    this.updateAngle();
    this.updateX();
  }

  updateX() {
    if (this.direction === RIGHT) {
      this.x += 2;
    } else {
      this.x -= 2;
    }

    if (this.xRange + this.startX <= this.x) {
      this.direction = LEFT;
    }

    if (this.x <= this.startX) {
      this.direction = RIGHT;
    }
  }

  updateAngle() {
    this.angle += this.speed;
    this.angle %= 360;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x + this.width() / 2, this.y + this.height() / 2);
    ctx.rotate((this.angle * Math.PI) / 180);
    //super.draw(this.pallet, -this.w / 2, -this.w / 2);
    ctx.fillStyle = 'white'
    ctx.fillRect(-this.width()/2,-this.width()/2,this.width(),this.height())
    ctx.rotate((45 * Math.PI) / 180);
    ctx.fillStyle = this.pallet[1]
    ctx.fillRect(-this.width()/2,-this.width()/2,this.width(),this.height())
    ctx.fillStyle = this.pallet[0]
    ctx.fillRect(-7,-7,14,14)
    ctx.restore();
  }
}
