class LevelJacob3 extends Level {
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
      new BuzzSaw(...tileToWorld(MAX_X_GRID_SIZE, 0), images.pallet.green, 60, [
        new Waypoint(...tileToWorld(0, 0), 1),
        new Waypoint(...tileToWorld(MAX_X_GRID_SIZE, 0), 1)
      ]),
      new BuzzSaw(...tileToWorld(MAX_X_GRID_SIZE, 2), images.pallet.red, 65, [
        new Waypoint(...tileToWorld(0, 2), 1),
        new Waypoint(...tileToWorld(MAX_X_GRID_SIZE, 2), 1)
      ]),
      new BuzzSaw(...tileToWorld(MAX_X_GRID_SIZE, 4), images.pallet.green, 60, [
        new Waypoint(...tileToWorld(0, 4), 1),
        new Waypoint(...tileToWorld(MAX_X_GRID_SIZE, 4), 1)
      ]),
      new BuzzSaw(...tileToWorld(MAX_X_GRID_SIZE, 6), images.pallet.red, 65, [
        new Waypoint(...tileToWorld(0, 6), 1),
        new Waypoint(...tileToWorld(MAX_X_GRID_SIZE, 6), 1)
      ]),
      new BuzzSaw(...tileToWorld(MAX_X_GRID_SIZE, 8), images.pallet.green, 60, [
        new Waypoint(...tileToWorld(0, 8), 1),
        new Waypoint(...tileToWorld(MAX_X_GRID_SIZE, 8), 1)
      ]),
      new BuzzSaw(...tileToWorld(MAX_X_GRID_SIZE, 10), images.pallet.red, 65, [
        new Waypoint(...tileToWorld(0, 10), 1),
        new Waypoint(...tileToWorld(MAX_X_GRID_SIZE, 10), 1)
      ]),
      new BuzzSaw(...tileToWorld(MAX_X_GRID_SIZE, 12), images.pallet.green, 60, [
        new Waypoint(...tileToWorld(0, 12), 1),
        new Waypoint(...tileToWorld(MAX_X_GRID_SIZE, 12), 1)
      ]),

    ];
  }

  numWallsToFillBottom() {
    const wallsWidth = 8 * PIXEL_SIZE;
    return canvas.width / wallsWidth;
  }

  static level = [
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall",0,0,"wall",0,0,0,"wall",0,0,0,0,0,0,0,0,0,0,0,0,"wall",0,0,"wall",0,0,0,"wall",0,0,0,0,0,0,0,0,0,0,0,0,"wall",0,0,"wall",0,0,0,"wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall",0,0,0,"wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall",0,0,0,"wall",0,0,0,"player",0,0,0,0,0,0,0,0,0,0,0,"wall",0,0,0,"wall",0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall","wall",0,0,0,"wall",0,"goal",0,"wall",0,0,0,0,0,0,0,"wall","wall","wall","wall","wall",0,0,0,"wall",0,0,0,"wall","wall","break","break","wall","wall","break","break","wall","wall","wall","wall","wall",0,0,0,"wall",0,0,0
  ];
}
