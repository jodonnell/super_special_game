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

    this.onscreenSprites.removeFX();

    this.swapPalletIfTouchingSwapper();
    this.swapPalletIfTouchingSwapperField();
    this.checkForDeath();
    this.checkForRegeneration();
  }

  checkForDeath() {
    this.checkForBuzzsawDeath();
    this.checkForPlayerOutOfBounds();
  }

  checkForPlayerOutOfBounds() {
    const player = this.onscreenSprites.player;

    if (player.x > canvas.width) {
      this.playerDied();
    }
  }

  checkForBuzzsawDeath() {
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
    if (!this.onscreenSprites.player.dead) {
      return;
    }

    const isPlayerAtStartSpot = this.onscreenSprites.isPlayerAtStartSpot();
    if (!this.onscreenSprites.hasImplodingPlayer() && isPlayerAtStartSpot) {
      this.onscreenSprites.player.dead = false;
    }

    if (!this.onscreenSprites.hasExplodingPlayer() && !isPlayerAtStartSpot) {
      this.onscreenSprites.resetPlayer();
      this.onscreenSprites.addFX(
        new ImplodingPlayer(this.onscreenSprites.player.x, this.onscreenSprites.player.y, this.pallet)
      );
    }
  }

  playerDied() {
    this.onscreenSprites.player.dead = true;
    this.onscreenSprites.addFX(
      new ExplodingPlayer(this.onscreenSprites.player.x, this.onscreenSprites.player.y, this.pallet)
    );
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

  swapPalletIfTouchingSwapperField() {
    this.onscreenSprites.buzzsaws.forEach(buzzsaw => buzzsaw.resetPallet());

    this.onscreenSprites.fieldSwappers.forEach(fieldSwapper => {
      const isTouchingSwapper = CollisionDetector.doesCollideWithSprites(fieldSwapper, this.onscreenSprites.buzzsaws);

      isTouchingSwapper.forEach(buzzsaw => {
        buzzsaw.pallet = fieldSwapper.pallet;
      });
    });
  }

  draw() {
    this.clearScreen();
    this.onscreenSprites.sprites.forEach(sprite => sprite.draw(this.pallet));
  }

  clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  swapPallets() {
    if (this.pallet === images.pallet.a) {
      this.pallet = images.pallet.b;
    } else {
      this.pallet = images.pallet.a;
    }
  }
}
