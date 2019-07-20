class GameController {
  constructor(control) {
    this.control = control;
    this.onscreenSprites = new OnscreenSprites();
    this.pallet = images.pallet.a;
    this.hasTouchedSwapper = false;
  }

  update() {
    if (this.control.hasZBeenTapped()) {
      this.swapPallets();
    }

    this.onscreenSprites.sprites.forEach(sprite => {
      sprite.update({
        control: this.control,
        onscreenSprites: this.onscreenSprites
      });
    });

    this.eliminate(this.onscreenSprites.FX);
    this.swapPalletIfTouchingSwapper();
    this.checkForDeath();
    this.checkForRegeneration();
  }

  checkForDeath() {
    const connectedBuzzSaw = CollisionDetector.doesCollideWithSprites(
      this.onscreenSprites.player,
      this.onscreenSprites.buzzsaws
    );

    const playerIsAlive = !this.onscreenSprites.player.dead;

    const isDifferentColor = connectedBuzzSaw.filter(buzzsaw => this.pallet !== buzzsaw.pallet).length > 0;
    if (playerIsAlive && connectedBuzzSaw.length > 0 && isDifferentColor) {
      this.playerDied();
    }
  }

  checkForRegeneration() {
    if (this.onscreenSprites.player.dead && !this.onscreenSprites.hasExplodingPlayer()) {
      this.onscreenSprites.player.dead = false;
      this.onscreenSprites.resetPlayer();
      this.onscreenSprites.addFX(new ExplodingPlayer(this.onscreenSprites.player.x, this.onscreenSprites.player.y));
    }
  }

  playerDied() {
    this.onscreenSprites.player.dead = true;
    this.onscreenSprites.addFX(new ExplodingPlayer(this.onscreenSprites.player.x, this.onscreenSprites.player.y));
  }

  swapPalletIfTouchingSwapper() {
    const isTouchingSwapper = CollisionDetector.doesCollideWithSprites(
      this.onscreenSprites.player,
      this.onscreenSprites.swappers
    );
    if (!this.hasTouchedSwapper && isTouchingSwapper.length > 0) {
      this.hasTouchedSwapper = true;
      this.swapPallets();
    } else if (!isTouchingSwapper.length > 0) {
      this.hasTouchedSwapper = false;
    }
  }

  draw() {
    this.clearScreen();
    this.onscreenSprites.sprites.forEach(sprite => sprite.draw(this.pallet));
  }

  clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  eliminate(objs) {
    for (let i = objs.length - 1; i >= 0; i--) {
      if (objs[i].dead) {
        objs.splice(i, 1);
      }
    }
  }

  swapPallets() {
    if (this.pallet === images.pallet.a) {
      this.pallet = images.pallet.b;
    } else {
      this.pallet = images.pallet.a;
    }
  }
}
