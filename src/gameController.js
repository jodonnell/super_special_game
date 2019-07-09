class GameController {
  constructor(control) {
    this.control = control;
    this.player = new Player(200, 200);
  }

  update() {
    this.player.update(this.control);
  }

  draw() {
    this.clearScreen();
    this.player.draw();
  }

  clearScreen() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
  }
}
