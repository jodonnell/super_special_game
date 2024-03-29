class Level1 {
  constructor(onscreenSprites) {
    onscreenSprites.startX = 60;
    onscreenSprites.startY = 450;
    onscreenSprites.player = new Player(onscreenSprites.startX, onscreenSprites.startY, images.img.hero);

    onscreenSprites.NextLevel = Level2;
    onscreenSprites.goal = new Swapper(...tileToWorld(18, 12), ['#ffffff33', '#f6f6f6aa', '#ecececee']);
    onscreenSprites.walls = this.createWalls();

    onscreenSprites.electricPoles = [
      new ElectricPoles(
        [
         // new ElectricPole(180, 520),
         // new ElectricPole(290, 520),
         new ElectricPole(...tileToWorld(4,13)),
         new ElectricPole(...tileToWorld(7,13)),
        ],
        120
      ),
    ];
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

    const rightWalls = ArrayHelpers.range(numWallsToFillSide - 1).map(y => {
      return new Block(...tileToWorld(MAX_X_GRID_SIZE, y), images.img.brick);
    });

    const topWalls = ArrayHelpers.range(this.numWallsToFillBottom()).map(x => {
      return new Block(...tileToWorld(x, 0), images.img.brick);
    });

    walls.push(...bottomWalls);
    walls.push(...leftWalls);
    walls.push(...rightWalls);
    walls.push(...topWalls);
    walls.push(new Block(...tileToWorld(11, 13), images.img.brick));
    walls.push(new Block(...tileToWorld(12, 12), images.img.brick));
    walls.push(new Block(...tileToWorld(12, 13), images.img.brick));
    return walls;
  }
}
