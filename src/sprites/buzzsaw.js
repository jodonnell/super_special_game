class BuzzSaw {
  constructor(x, y, pallet, diameter, xRange) {
    this.x = x;
    this.y = y;
    this.angle = 20;
    this.speed = 15;

    this.startX = x;
    this.direction = RIGHT;
    this.xRange = xRange;
    this.pallet = pallet;
    this.originalPallet = pallet;

    this.collisionBounds = new CollisionBoundsRect(this);
    this.dimensions = new RectDimensions(
      diameter,
      diameter,
    );
  }

  resetPallet() {
    this.pallet = this.originalPallet;
  }

  update() {
    this.dimensions.setPos(this.x, this.y);
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
    ctx.translate(this.x + this.dimensions.width() / 2, this.y + this.dimensions.height() / 2);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.fillStyle = "white";
    ctx.fillRect(-this.dimensions.width() / 2, -this.dimensions.width() / 2, this.dimensions.width(), this.dimensions.height());
    ctx.rotate((45 * Math.PI) / 180);
    ctx.fillStyle = this.pallet[1];
    ctx.fillRect(-this.dimensions.width() / 2, -this.dimensions.width() / 2, this.dimensions.width(), this.dimensions.height());
    ctx.fillStyle = this.pallet[0];
    ctx.fillRect(-7, -7, 14, 14);
    ctx.restore();
  }
}
