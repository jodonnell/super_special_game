class OnscreenSprites {
  constructor() {
    this.player = new Player(200, 200);
    this.walls = this.createWalls();
    this.swappers = [new Swapper(400, 400)];
    this.buzzsaws = [new BuzzSaw(600, canvas.height - 90)];
    this.FX = [];
    this.updateSprites();
  }

  createWalls() {
    const numWallsToFillBottom = canvas.width / 40;
    const walls = this.range(numWallsToFillBottom).map(x => {
      return new Block(x * 40, canvas.height - 40, images.img.brick);
    });

    walls.push(new Block(260, canvas.height - 80, images.img.brick));
    walls.push(new Block(280, canvas.height - 160, images.img.brick));
    walls.push(new Block(200, canvas.height - 200, images.img.brick));
    return walls;
  }

  range(num) {
    return [...Array(num).keys()];
  }

  addFX(fx) {
    this.FX.push(fx);
    this.updateSprites();
  }

  updateSprites() {
    this.sprites = [...this.buzzsaws, ...this.walls, ...this.swappers, ...this.FX, this.player];
  }
}
