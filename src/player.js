class Player {
  constructor(x, y) {
    this.moveSpeed = 2;
    this.x = x;
    this.y = y;
    this.verticalSpeed = 0;
  }

  update(control) {
    this.updateX(control);
    this.updateY(control);
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  updateX(control) {
    const horizontal = control.right - control.left;
    this.x += this.moveSpeed * horizontal;
  }

  updateY(control) {
    const gravity = 0.5;
    const speedMax = 10;
    this.verticalSpeed = Math.min(this.verticalSpeed + gravity, speedMax);
    this.y = Math.min(this.y + this.verticalSpeed, canvas.height - 60);
    if (this.y == canvas.height - 60 && control.x) this.verticalSpeed = -10;
  }
}
