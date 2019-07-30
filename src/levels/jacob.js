class LevelJacob {
  constructor(onscreenSprites) {
    onscreenSprites.startX = 270;
    onscreenSprites.startY = 450;
    onscreenSprites.player = new Player(
      onscreenSprites.startX,
      onscreenSprites.startY,
      images.img.hero
    );

    onscreenSprites.walls = this.createWalls();
    onscreenSprites.swappers = [
      new Swapper(...tileToWorld(16, 12), images.pallet.yellow),
      new Swapper(...tileToWorld(2, 4), images.pallet.blue)
    ];
    //onscreenSprites.fieldSwappers = [new Field(...tileToWorld(5, 8), images.pallet.a)];
    onscreenSprites.buzzsaws = [
      new BuzzSaw(...tileToWorld(0, 8), images.pallet.yellow, 120),
      new BuzzSaw(...tileToWorld(12, 12), images.pallet.a, 120),
    ];
    onscreenSprites.BG = [
      new BackgroundSquare(...tileToWorld(MAX_X_GRID_SIZE / 2, MAX_Y_GRID_SIZE + 3), 400, -1, 45),
      new BackgroundSquare(...tileToWorld(MAX_X_GRID_SIZE, MAX_Y_GRID_SIZE + 4), 600, 1, 0, 8),
      new BackgroundSquare(...tileToWorld(3.3, 3), 200),
      new BackgroundSquare(...tileToWorld(3, 3), 200),
      new BackgroundSquare(...tileToWorld(0, 6), 150, -2, 0)
    ];

    onscreenSprites.uncollidableBackgrounds = [];
    const bottomLava = ArrayHelpers.range(this.numWallsToFillBottom()).map(x => {
      return new BlankBlock(...tileToWorld(x, MAX_Y_GRID_SIZE), 8 * PIXEL_SIZE);
    });
    onscreenSprites.uncollidableBackgrounds.push(...bottomLava);


    onscreenSprites.enemies = [new Blob(...tileToWorld(5, 10), images.img.blob)];

  }

  numWallsToFillBottom() {
    const wallsWidth = 8 * PIXEL_SIZE;
    return canvas.width / wallsWidth;
  }

  createWalls() {
    const walls = [];

    const bottomWalls = _.compact(ArrayHelpers.range(this.numWallsToFillBottom()).map(x => {
      if (x === 10 || x === 11)
        return null;
      return new Block(...tileToWorld(x, MAX_Y_GRID_SIZE - 1), images.img.brick);
    }));

    const wallsWidth = 8 * PIXEL_SIZE;
    const numWallsToFillSide = canvas.height / wallsWidth;
    const leftWalls = ArrayHelpers.range(numWallsToFillSide - 1).map(y => {
      return new Block(...tileToWorld(0, y), images.img.brick);
    });

    const rightWalls = ArrayHelpers.range(numWallsToFillSide - 1).map(y => {
      return new Block(...tileToWorld(MAX_X_GRID_SIZE, y), images.img.brick);
    });

    const topWalls = ArrayHelpers.range(this.numWallsToFillBottom()).map(x => {
      return new Block(...tileToWorld(x, 0), images.img.brick);
    });

    walls.push(...ArrayHelpers.range(8).map(x => {
      return new Block(...tileToWorld(x + 3, 6), images.img.brick);
    }));


    walls.push(...bottomWalls);
    walls.push(...leftWalls);
    walls.push(...rightWalls);
    walls.push(...topWalls);
    walls.push(new Block(...tileToWorld(18, 8), images.img.brick));
    walls.push(new Block(...tileToWorld(17, 8), images.img.brick));
    return walls;
  }

}
