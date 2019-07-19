class OnscreenSprites {
  constructor() {
    this.player = new Player(200, 200, images.img.hero);
    this.walls = this.createWalls();
    this.swappers = [new Swapper(500, 450), new Swapper(75, canvas.height - 340)];
    this.buzzsaws = [
      new BuzzSaw(580, canvas.height - 90, images.pallet.a, 120),
      new BuzzSaw(300, canvas.height - 90, images.pallet.a, 200),
      new BuzzSaw(440, canvas.height - 90, images.pallet.b, 65),
      new BuzzSaw(-40, canvas.height - 200, images.pallet.a, 205),
      new BuzzSaw(-40, canvas.height - 380, images.pallet.b, 205),
      new BuzzSaw(-40, canvas.height - 572, images.pallet.a, 205),
    ];
    this.FX = [];
    this.BG = [
      new BackgroundSquare(canvas.width / 2, canvas.height, 400, -1, 45),
      new BackgroundSquare(canvas.width, canvas.height, 600, 1, 0, 8),
      new BackgroundSquare(150, 120, 200),
      new BackgroundSquare(160, 130, 200),
      new BackgroundSquare(0, 320, 150, -2, 0)
    ];
    this.updateSprites();
  }

  createWalls() {
    const walls = [];
    walls.push(new Block(260, canvas.height - 80, images.img.brick, 1));
    walls.push(new Block(280, canvas.height - 160, images.img.brick));
    walls.push(new Block(200, canvas.height - 200, images.img.brick));

    const wallsWidth = walls[0].width();
    walls.push(new BlankBlock(750, canvas.height - 150, wallsWidth));

    const numWallsToFillBottom = canvas.width / wallsWidth;
    const bottomWalls = ArrayHelpers.range(numWallsToFillBottom).map(x => {
      return new Block(x * wallsWidth, canvas.height - 40, images.img.brick);
    });

    const numWallsToFillSide = canvas.height / wallsWidth;
    const leftWalls = ArrayHelpers.range(numWallsToFillSide - 1).map(y => {
      return new Block(0, y * wallsWidth, images.img.brick);
    });

    const moreLeftWalls = ArrayHelpers.range(numWallsToFillSide - 6).map(y => {
      return new Block(120, (y + 3) * wallsWidth, images.img.brick);
    });

    walls.push(...bottomWalls);
    walls.push(...leftWalls);
    walls.push(...moreLeftWalls);
    return walls;
  }

  addFX(fx) {
    this.FX.push(fx);
    this.updateSprites();
  }

  updateSprites() {
    this.sprites = [...this.BG, ...this.buzzsaws, ...this.walls, ...this.swappers, this.player, ...this.FX];
  }
}
