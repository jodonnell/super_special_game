class Level2 {
  constructor(onscreenSprites) {
    onscreenSprites.startX = 60;
    onscreenSprites.startY = 450;
    onscreenSprites.player = new Player(onscreenSprites.startX, onscreenSprites.startY, images.img.hero);

    onscreenSprites.NextLevel = Level2;
    onscreenSprites.goal = new Swapper(...tileToWorld(18, 12), images.pallet.yellow);
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
        return new Block(...tileToWorld(x, MAX_Y_GRID_SIZE), images.img.brick);
      })
    );

    const wallsWidth = 8 * PIXEL_SIZE;
    const numWallsToFillSide = canvas.height / wallsWidth;
    const leftWalls = ArrayHelpers.range(numWallsToFillSide - 1).map(y => {
      return new Block(...tileToWorld(0, y), images.img.brick);
    });

    const topWalls = ArrayHelpers.range(this.numWallsToFillBottom()).map(x => {
      return new Block(...tileToWorld(x, 0), images.img.brick);
    });

    walls.push(...bottomWalls);
    walls.push(...this.verticalWall(0));
    walls.push(...this.verticalWall(MAX_X_GRID_SIZE));
    walls.push(...this.verticalWall(MAX_X_GRID_SIZE - 1));
    walls.push(...this.verticalWall(MAX_X_GRID_SIZE - 2));
    walls.push(...this.verticalWall(MAX_X_GRID_SIZE - 3));
    walls.push(...topWalls);
    walls.push(new Block(...tileToWorld(11, 13), images.img.brick));
    walls.push(new Block(...tileToWorld(12, 12), images.img.brick));
    walls.push(new Block(...tileToWorld(12, 13), images.img.brick));
    return walls;
  }

  verticalWall(x) {
    const wallsWidth = 8 * PIXEL_SIZE;
    const numWallsToFillSide = canvas.height / wallsWidth;

    return ArrayHelpers.range(numWallsToFillSide - 1).map(y => {
      return new Block(...tileToWorld(x, y), images.img.brick);
    });

  }
}
