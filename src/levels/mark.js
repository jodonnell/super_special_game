class LevelMark {
  constructor(onscreenSprites) {
    onscreenSprites.startX = 270;
    onscreenSprites.startY = 450;
    onscreenSprites.player = new Player(onscreenSprites.startX, onscreenSprites.startY, images.img.hero);

    onscreenSprites.NextLevel = LevelJacob;
    onscreenSprites.goal = new Swapper(...tileToWorld(18, 6), images.pallet.yellow);
    onscreenSprites.walls = this.createWalls();
  }

  numWallsToFillBottom() {
    const wallsWidth = 8 * PIXEL_SIZE;
    return canvas.width / wallsWidth;
  }

  createWalls() {
    const walls = [];

    const bottomWalls = _.compact(
      ArrayHelpers.range(this.numWallsToFillBottom()).map(x => {
        if (x === 10 || x === 11) return null;
        return new Block(...tileToWorld(x, MAX_Y_GRID_SIZE - 1), images.img.brick);
      })
    );

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

    walls.push(
      ...ArrayHelpers.range(8).map(x => {
        return new Block(...tileToWorld(x + 3, 6), images.img.brick);
      })
    );

    walls.push(...bottomWalls);
    walls.push(...leftWalls);
    walls.push(...rightWalls);
    walls.push(...topWalls);
    walls.push(new Block(...tileToWorld(18, 8), images.img.brick));
    walls.push(new Block(...tileToWorld(17, 8), images.img.brick));
    walls.push(new Block(...tileToWorld(14, 8), images.img.brick));
    return walls;
  }
}
