class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(control) {
    if (control.right) {
      this.x += 1;
    } else if (control.left) {
      this.x -= 1;
    } else if (control.up) {
      this.y -= 1;
    } else if (control.down) {
      this.y += 1;
    }
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, 20, 20);
  }
}
