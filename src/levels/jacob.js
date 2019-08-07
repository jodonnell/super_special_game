class LevelJacob extends Level {
  constructor(onscreenSprites) {
    super();
    this.buildLevel(onscreenSprites);

    onscreenSprites.startX = 270;
    onscreenSprites.startY = 450;
    onscreenSprites.player = new Player(onscreenSprites.startX, onscreenSprites.startY, images.img.hero);

    onscreenSprites.NextLevel = LevelMark;
    onscreenSprites.buzzsaws = [

      // yellow left saws
      new BuzzSaw(...tileToWorld(0, 8), images.pallet.yellow, 30, [
        new Waypoint(...tileToWorld(3, 8), 1),
        new Waypoint(...tileToWorld(0, 8), 1)
      ]),
      new BuzzSaw(...tileToWorld(0, 5), images.pallet.yellow, 30, [
        new Waypoint(...tileToWorld(3, 5), 1),
        new Waypoint(...tileToWorld(0, 5), 1)
      ]),

      new BuzzSaw(...tileToWorld(-1, 6.5), images.pallet.yellow, 25, [
        new Waypoint(...tileToWorld(3, 6.5), 1),
        new Waypoint(...tileToWorld(3, 6.5), 3),
        new Waypoint(...tileToWorld(-1, 6.5), 1),
        new Waypoint(...tileToWorld(-1, 6.5), 3)
      ]),
      // end yellow left saws

      // chaser green saw
      new BuzzSaw(...tileToWorld(3, 1.2), images.pallet.green, 60, [
        new Waypoint(...tileToWorld(15, 1.2), 1),
        new Waypoint(...tileToWorld(15, 8), 0.3),
        new Waypoint(...tileToWorld(4, 8), 1),
        new Waypoint(...tileToWorld(4, 5), 0.5),
        new Waypoint(...tileToWorld(4, 8), 0.5),
        new Waypoint(...tileToWorld(15, 8), 1),
        new Waypoint(...tileToWorld(15, 1.2), 0.3),
        new Waypoint(...tileToWorld(3, 1.2), 1),
      ]),

      new BuzzSaw(...tileToWorld(4, 1), images.pallet.red, 25, [
        new Waypoint(...tileToWorld(4, 10), 1),
        new Waypoint(...tileToWorld(4, 1), 1),
      ]),

      new BuzzSaw(...tileToWorld(6, 1), images.pallet.red, 25, [
        new Waypoint(...tileToWorld(6, 10), 1),
        new Waypoint(...tileToWorld(6, 1), 1),
      ]),

      new BuzzSaw(...tileToWorld(9, 1), images.pallet.red, 25, [
        new Waypoint(...tileToWorld(9, 10), 1),
        new Waypoint(...tileToWorld(9, 1), 1),
      ]),

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
