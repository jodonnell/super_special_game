class Field {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 60;
    this.collisionBounds = new CollisionBounds(this);
    this.shrink = true;
    this.counter = 0;
  }

  update() {
    this.counter++;

    if (this.counter < 5)
      return;

    this.counter = 0;
    if (this.shrink) {
      this.radius--;
    }

    if (this.radius < 55) {
      this.shrink = false;
    }

    if (this.radius > 60) {
      this.shrink = true;
    }

    if (!this.shrink) {
      this.radius++;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `${images.pallet.a[0]}99`;
    ctx.fill();
  }

  rightSide() {
    return this.x + this.width;
  }

  bottomSide() {
    return this.y + this.width;
  }

}
