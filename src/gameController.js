class GameController {
  constructor(control) {
    this.control = control;
    this.player = new Player(200, 200);
    this.walls = this.createWalls();
  }

  update() {
    this.player.update(this.control, this.walls);
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
    const walls = this.range(numWallsToFillBottom).map(x => {
      return new Block(x * 40, canvas.height - 40, sprite.img.brick, sprite.pallet.a);
    });

    walls.push(new Block(260, canvas.height - 80, sprite.img.brick, sprite.pallet.a));
    return walls;
  }

  range(num) {
    return [...Array(num).keys()];
  }
}
