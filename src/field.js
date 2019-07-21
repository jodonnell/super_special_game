class Field {
  constructor(x, y, pallet) {
    this.x = x;
    this.y = y;
    this.radius = 60;
    this.collisionBounds = new CollisionBounds(this);
    this.shrink = true;
    this.counter = 0;
    this.pallet = pallet;
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
    ctx.fillStyle = `${this.pallet[0]}99`;
    ctx.fill();
  }

  rightSide() {
    return this.x + 60;
  }

  bottomSide() {
    return this.y + 60;
  }

}
