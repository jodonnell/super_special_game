class GameController {
  constructor(control) {
    this.control = control;
    this.player = new Player(200, 200);
    this.walls = this.createWalls();
  }

  update() {
    this.player.update(this.control);
  }

  draw() {
    this.clearScreen();
    this.player.draw();
    this.walls.forEach(wall => wall.draw());
  }

  clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  createWalls() {
    const numWallsToFillBottom = canvas.width / 40;
    return [...Array(numWallsToFillBottom).keys()].map(x => {
      return new Block(
        x * 40,
        canvas.height - 40,
        sprite.img.brick,
        sprite.pallet.a
      );
    });
  }
}
