class Player {
  constructor(x, y) {
    this.moveSpeed = 2;
    this.x = x;
    this.y = y;
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
    const vertical = control.down - control.up;
    if (horizontal) {
      this.x += this.moveSpeed * horizontal;
    } else if (vertical) {
      this.y += this.moveSpeed * vertical;
    }
  }

  updateY(control) {

  }
}
