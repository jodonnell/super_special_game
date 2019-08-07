class LevelJacob extends Level {
  constructor(onscreenSprites) {
    super();
    this.buildLevel(onscreenSprites);

    onscreenSprites.startX = 270;
    onscreenSprites.startY = 450;
    onscreenSprites.player = new Player(onscreenSprites.startX, onscreenSprites.startY, images.img.hero);

    onscreenSprites.NextLevel = LevelMark;
    onscreenSprites.buzzsaws = [
      new BuzzSaw(...tileToWorld(0, 8), images.pallet.yellow, 80, [
        new Waypoint(...tileToWorld(12, 11), 8),
        new Waypoint(...tileToWorld(0, 8), 3),
      ]),
      new BuzzSaw(...tileToWorld(12, 12), images.pallet.red, 60, [
        new Waypoint(...tileToWorld(12, 11), 1),
        new Waypoint(...tileToWorld(13, 11), 1),
        new Waypoint(...tileToWorld(13, 12), 1),
        new Waypoint(...tileToWorld(12, 12), 1),
      ])
    ];
    onscreenSprites.BG = [
      new BackgroundSquare(...tileToWorld(MAX_X_GRID_SIZE / 2, MAX_Y_GRID_SIZE + 3), 400, -1, 45),
      new BackgroundSquare(...tileToWorld(MAX_X_GRID_SIZE, MAX_Y_GRID_SIZE + 4), 600, 1, 0, 8),
      new BackgroundSquare(...tileToWorld(3.3, 3), 200),
      new BackgroundSquare(...tileToWorld(3, 3), 200),
      new BackgroundSquare(...tileToWorld(0, 6), 150, -2, 0)
    ];

    const bottomLava = ArrayHelpers.range(this.numWallsToFillBottom()).map(x => {
      return new BlankBlock(...tileToWorld(x, MAX_Y_GRID_SIZE), 8 * PIXEL_SIZE);
    });
    onscreenSprites.uncollidableBackgrounds.push(...bottomLava);
  }

  numWallsToFillBottom() {
    const wallsWidth = 8 * PIXEL_SIZE;
    return canvas.width / wallsWidth;
  }

  static level = ["wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall",0,0,"wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall",0,0,"wall","wall","wall","wall",0,0,"wall",0,0,0,0,0,0,0,0,"wall",0,"wall",0,0,"wall","swapYellow","wall","wall",0,0,"wall",0,0,0,0,0,0,0,0,0,0,"wall",0,0,"wall",0,"wall","wall",0,0,"wall",0,0,"wall",0,"wall",0,"wall",0,0,"goal","wall",0,0,"wall",0,"wall","wall",0,0,"wall",0,0,"wall","wall","wall","wall","wall","wall","wall","wall","wall",0,0,"wall",0,"wall","wall",0,0,"wall",0,0,0,0,0,0,0,0,0,0,0,0,0,"wall",0,"wall","wall",0,0,"wall",0,0,0,0,0,0,0,0,0,0,0,0,0,"wall",0,"wall","wall",0,0,"wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall",0,"wall","wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall",0,0,0,0,"player",0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall",0,0,"wall","wall","wall","wall","wall","wall","wall","wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}
