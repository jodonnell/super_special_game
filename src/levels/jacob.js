class LevelJacob {
  constructor(onscreenSprites) {
    onscreenSprites.startX = 270;
    onscreenSprites.startY = 200;
    onscreenSprites.player = new Player(
      onscreenSprites.startX,
      onscreenSprites.startY,
      images.img.hero
    );

    onscreenSprites.walls = this.createWalls();
    onscreenSprites.swappers = [
      new Swapper(...tileToWorld(12, 11), images.pallet.yellow),
      new Swapper(...tileToWorld(2, 7), images.pallet.blue)
    ];
    onscreenSprites.fieldSwappers = [new Field(...tileToWorld(5, 8), images.pallet.a)];
    onscreenSprites.buzzsaws = [
      // new BuzzSaw(...tileToWorld(8, 13), images.pallet.yellow, 120),
      // new BuzzSaw(...tileToWorld(13, 13), images.pallet.a, 200),
      // new BuzzSaw(...tileToWorld(12, 13), images.pallet.b, 65),
      // new BuzzSaw(...tileToWorld(-1, 3), images.pallet.a, 205),
      // new BuzzSaw(...tileToWorld(-1, 6.5), images.pallet.b, 205),
      // new BuzzSaw(...tileToWorld(-1, 10), images.pallet.a, 205)
    ];
    onscreenSprites.BG = [
      new BackgroundSquare(...tileToWorld(MAX_X_GRID_SIZE / 2, MAX_Y_GRID_SIZE + 3), 400, -1, 45),
      new BackgroundSquare(...tileToWorld(MAX_X_GRID_SIZE, MAX_Y_GRID_SIZE + 4), 600, 1, 0, 8),
      new BackgroundSquare(...tileToWorld(3.3, 3), 200),
      new BackgroundSquare(...tileToWorld(3, 3), 200),
      new BackgroundSquare(...tileToWorld(0, 6), 150, -2, 0)
    ];
    onscreenSprites.enemies = [new Blob(...tileToWorld(5, 10), images.img.blob)];

  }

  createWalls() {
    const walls = [];
    walls.push(new Block(...tileToWorld(6, MAX_Y_GRID_SIZE - 1), images.img.brick, 1));
    walls.push(new Block(...tileToWorld(8, MAX_Y_GRID_SIZE - 3), images.img.brick));
    walls.push(new Block(...tileToWorld(5, MAX_Y_GRID_SIZE - 3), images.img.brick));

    const wallsWidth = walls[0].width();
    walls.push(new BlankBlock(...tileToWorld(17, 11), wallsWidth));

    const numWallsToFillBottom = canvas.width / wallsWidth;
    const bottomWalls = ArrayHelpers.range(numWallsToFillBottom).map(x => {
      return new Block(...tileToWorld(x, MAX_Y_GRID_SIZE), images.img.brick);
    });

    const numWallsToFillSide = canvas.height / wallsWidth;
    const leftWalls = ArrayHelpers.range(numWallsToFillSide - 1).map(y => {
      return new Block(...tileToWorld(0, y), images.img.brick);
    });

    const moreLeftWalls = ArrayHelpers.range(numWallsToFillSide - 6).map(y => {
      return new Block(...tileToWorld(3, y + 3), images.img.brick);
    });

    walls.push(...bottomWalls);
    walls.push(...leftWalls);
    walls.push(...moreLeftWalls);
    return walls;
  }

}
