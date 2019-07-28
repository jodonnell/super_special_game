
const tileToWorld = (tileX, tileY) => {
  return [tileX * 8 * PIXEL_SIZE, tileY * 8 * PIXEL_SIZE];
}

class OnscreenSprites {
  constructor(Level) {
    this.startX = 0;
    this.startY = 0;
    this.player = null;
    this.walls = [];
    this.swappers = [];
    this.fieldSwappers = [];
    this.buzzsaws = [];
    this.BG = [];
    this.enemies = [];
    this.FX = [];

    new Level(this);
    this.updateSprites();
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
