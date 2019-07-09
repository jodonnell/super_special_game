class Player {
  constructor(x, y) {
    this.moveSpeed = 2;
    this.x = x;
    this.y = y;
  }

  update(control) {
    let horizontal = control.right - control.left;
    let vertical = control.down - control.up;
    if (horizontal) {
      this.x += this.moveSpeed * horizontal;
    } else if (vertical) {
      this.y += this.moveSpeed * vertical;
    }
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, 20, 20);
  }
}
