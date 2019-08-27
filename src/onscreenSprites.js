
const tileToWorld = (tileX, tileY) => {
  return [tileX * 8 * PIXEL_SIZE, tileY * 8 * PIXEL_SIZE];
}

class OnscreenSprites {
  constructor(Level) {
    this.reset();
    new Level(this);
    this.updateSprites();
  }

  reset() {
    this.startX = 0;
    this.startY = 0;
    this.player = null;
    this.goal = null;
    this.walls = [];
    this.breakwalls = [];
    this.swappers = [];
    this.fieldSwappers = [];
    this.buzzsaws = [];
    this.BG = [];
    this.enemies = [];
    this.FX = [];
    this.electricPoles = [];
    this.uncollidableBackgrounds = [];
    this.NextLevel = null;
  }

  addFX(fx) {
    this.FX.push(fx);
    this.updateSprites();
  }

  removeOBJ(obj) {
    for (let i = obj.length - 1; i >= 0; i--) {
      if (obj[i].dead) {
        obj.splice(i, 1);
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
      ...this.breakwalls,
      ...this.uncollidableBackgrounds,
      ...this.swappers,
      ...this.fieldSwappers,
      ...this.enemies,
      ...this.electricPoles,
      this.player,
      this.goal,
      ...this.FX
    ];
  }

  resetPlayer() {
    this.player.x = this.startX;
    this.player.y = this.startY;
    this.player.resetPlayer();
  }

  breakCheck(){
    let walls = [];
    this.breakwalls.forEach(BW => {if (!BW.dead) walls.push(BW)});
    return walls;
  }

  isPlayerAtStartSpot() {
    return this.player.x === this.startX && this.player.y === this.startY;
  }

  advanceLevel() {
    const NextLevel = this.NextLevel;
    this.reset();
    new NextLevel(this);
    this.updateSprites();
  }
}
