class GameController {
  constructor(control) {
    this.control = control;
    this.player = new Player(200, 200);
    this.wall = new Block(50, 50, sprite.img.brick, sprite.pallet.a);
  }

  update() {
    this.player.update(this.control);
  }

  draw() {
    this.clearScreen();
    this.player.draw();
    this.wall.draw();
  }

  clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
