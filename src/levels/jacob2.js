class LevelJacob2 extends Level {
  constructor(onscreenSprites) {
    super();
    this.buildLevel(onscreenSprites);

    onscreenSprites.NextLevel = LevelMark;

    onscreenSprites.BG = [
      new BackgroundSquare(...tileToWorld(MAX_X_GRID_SIZE / 2, MAX_Y_GRID_SIZE + 3), 400, -1, 45),
      new BackgroundSquare(...tileToWorld(MAX_X_GRID_SIZE, MAX_Y_GRID_SIZE + 4), 600, 1, 0, 8),
      new BackgroundSquare(...tileToWorld(3.3, 3), 200),
      new BackgroundSquare(...tileToWorld(3, 3), 200),
      new BackgroundSquare(...tileToWorld(0, 6), 150, -2, 0)
    ];

    onscreenSprites.buzzsaws = [

      // yellow left saws
      new BuzzSaw(...tileToWorld(0, 8), images.pallet.yellow, 30, [
        new Waypoint(...tileToWorld(4, 8), 1),
        new Waypoint(...tileToWorld(0, 8), 1)
      ]),

      new BuzzSaw(300,500, images.pallet.red, 100, [
        new Waypoint(400, 400, 1),
        new Waypoint(300, 300, 1),
        new Waypoint(300, 500, 1)
      ]),
      new BuzzSaw(300,300, images.pallet.blue, 100, [
        new Waypoint(200, 400, 1),
        new Waypoint(300, 500, 1),
        new Waypoint(300, 300, 1)
      ]),
      new BuzzSaw(0, 50, images.pallet.yellow, 100, [
        new Waypoint(650, 50, 1),
        new Waypoint(300, 50, 1),
        new Waypoint(300, 50, 1),
        new Waypoint(0, 50, 1),
      ]),
      new BuzzSaw(500, 250, images.pallet.green, 100, [
        new Waypoint(650, 250, 1),
        new Waypoint(500, 250, 1),
      ]),

      new BuzzSaw(0, 50, images.pallet.green, 100, [
        new Waypoint(650, 450, 5),
        new Waypoint(0, 50, 5),
      ]),
    ];
  }

  numWallsToFillBottom() {
    const wallsWidth = 8 * PIXEL_SIZE;
    return canvas.width / wallsWidth;
  }

  static level = ["wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall",0,0,0,0,0,0,0,"wall",0,0,0,"swapYellow",0,0,0,0,0,0,"wall","wall",0,0,0,0,0,0,0,"wall",0,0,0,0,0,0,0,0,0,0,"wall","wall",0,0,0,"swapYellow",0,0,0,"wall",0,0,0,0,0,0,0,0,0,0,"wall","wall",0,0,0,"wall",0,0,0,"wall",0,0,0,"wall",0,0,0,0,0,0,"wall","wall",0,0,0,"wall",0,0,0,"wall",0,0,0,"wall",0,0,"swapRed",0,0,0,"wall","wall",0,0,"swapGreen","wall",0,0,"swapRed","wall","swapGreen",0,0,"wall",0,0,"wall",0,0,0,"wall","wall",0,0,0,"wall",0,0,0,"wall",0,0,0,"wall",0,0,0,0,0,0,"wall","wall","swapRed",0,0,"wall",0,0,0,"wall",0,0,0,"wall",0,0,0,0,0,0,"wall","wall",0,0,0,"wall",0,0,0,"wall",0,0,"swapBlue","wall",0,0,0,0,"wall",0,"wall","wall",0,0,"swapYellow","wall",0,0,0,"wall",0,0,0,"wall",0,0,0,0,0,0,"wall","wall",0,0,0,"wall",0,0,0,0,0,0,0,"wall",0,"wall",0,0,0,0,"wall","wall",0,0,0,"wall",0,0,0,0,0,0,0,"wall",0,0,0,0,0,0,"wall","wall","player",0,0,"wall",0,0,0,"swapBlue",0,0,0,"wall",0,0,0,0,0,"goal","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall"]
}
