class OnscreenSprites {
  constructor() {
    this.player = new Player(200, 200,images.img.hero);
    this.walls = this.createWalls();
    this.swappers = [new Swapper(500, 450)];
    this.buzzsaws = [
      new BuzzSaw(580, canvas.height - 90, images.pallet.a, 120),
      new BuzzSaw(300, canvas.height - 90, images.pallet.a, 200),
      new BuzzSaw(440, canvas.height - 90, images.pallet.b, 65),
    ];
    this.FX = [];
    this.updateSprites();
  }

  createWalls() {
    const numWallsToFillBottom = canvas.width / 40;
    const walls = ArrayHelpers.range(numWallsToFillBottom).map(x => {
      return new Block(x * 40, canvas.height - 40, images.img.brick);
    });

    walls.push(new Block(260, canvas.height - 80, images.img.brick));
    walls.push(new Block(280, canvas.height - 160, images.img.brick));
    walls.push(new Block(200, canvas.height - 200, images.img.brick));
    return walls;
  }

  addFX(fx) {
    this.FX.push(fx);
    this.updateSprites();
  }

  updateSprites() {
    this.sprites = [...this.buzzsaws, ...this.walls, ...this.swappers, ...this.FX, this.player];
  }
}
