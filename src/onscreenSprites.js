
const tileToWorld = (tileX, tileY) => {
  return [tileX * 8 * PIXEL_SIZE, tileY * 8 * PIXEL_SIZE];
}

class OnscreenSprites {
  constructor() {
    this.startX = 270;
    this.startY = 200;
    this.player = new Player(this.startX, this.startY, images.img.hero);
    this.walls = this.createWalls();
    this.swappers = [new Swapper(...tileToWorld(12, 11)), new Swapper(...tileToWorld(2, 7))];
    this.fieldSwappers = [new Field(...tileToWorld(5, 8), images.pallet.a)];
    this.buzzsaws = [
      new BuzzSaw(...tileToWorld(8, 13), images.pallet.yellow, 120),
      new BuzzSaw(...tileToWorld(13, 13), images.pallet.a, 200),
      new BuzzSaw(...tileToWorld(12, 13), images.pallet.b, 65),
      new BuzzSaw(...tileToWorld(-1, 3), images.pallet.a, 205),
      new BuzzSaw(...tileToWorld(-1, 6.5), images.pallet.b, 205),
      new BuzzSaw(...tileToWorld(-1, 10), images.pallet.a, 205)
    ];
    this.FX = [];
    this.BG = [
      new BackgroundSquare(...tileToWorld(MAX_X_GRID_SIZE / 2, MAX_Y_GRID_SIZE + 3), 400, -1, 45),
      new BackgroundSquare(...tileToWorld(MAX_X_GRID_SIZE, MAX_Y_GRID_SIZE + 4), 600, 1, 0, 8),
      new BackgroundSquare(...tileToWorld(3.3, 3), 200),
      new BackgroundSquare(...tileToWorld(3, 3), 200),
      new BackgroundSquare(...tileToWorld(0, 6), 150, -2, 0)
    ];
    this.enemies = [new Blob(...tileToWorld(5, 10), images.img.blob)];
    this.updateSprites();
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

  addFX(fx) {
    this.FX.push(fx);
    this.updateSprites();
  }

  removeFX() {
    for (let i = this.FX.length - 1; i >= 0; i--) {
      if (this.FX[i].dead) {
        this.FX.splice(i, 1);
      }
    }
    this.updateSprites();
  }

  hasExplodingPlayer() {
    var found = false;
    this.FX.forEach(fx => {
      if (fx instanceof ExplodingPlayer) {
        found = true;
      }
    });

    return found;
  }

  hasImplodingPlayer() {
    var found = false;
    this.FX.forEach(fx => {
      if (fx instanceof ImplodingPlayer) {
        found = true;
      }
    });

    return found;
  }

  updateSprites() {
    this.sprites = [
      ...this.BG,
      ...this.buzzsaws,
      ...this.walls,
      ...this.swappers,
      ...this.fieldSwappers,
      ...this.enemies,
      this.player,
      ...this.FX
    ];
  }

  resetPlayer() {
    this.player.x = this.startX;
    this.player.y = this.startY;
    this.player.resetPlayer();
  }

  isPlayerAtStartSpot() {
    return this.player.x === this.startX && this.player.y === this.startY;
  }
}
