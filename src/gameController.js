class GameController {
  constructor(control) {
    this.control = control;
    this.onscreenSprites = new OnscreenSprites();
    this.pallet = images.pallet.a;
    this.hasTouchedSwapper = false;
  }

  update() {
    this.onscreenSprites.sprites.forEach(sprite => {
      sprite.update({
        control: this.control,
        onscreenSprites: this.onscreenSprites
      });
    });
    this.eliminate(this.onscreenSprites.FX);
    this.swapPalletIfTouchingSwapper();
    this.checkForDeath();
  }

  checkForDeath() {
    const isTouchingBuzzSaw = CollisionDetector.doesCollideWithSprites(
      this.onscreenSprites.player,
      this.onscreenSprites.buzzsaws
    );

    if (isTouchingBuzzSaw) {
      this.onscreenSprites.player.dead = true;
    }
  }

  swapPalletIfTouchingSwapper() {
    const isTouchingSwapper = CollisionDetector.doesCollideWithSprites(
      this.onscreenSprites.player,
      this.onscreenSprites.swappers
    );
    if (!this.hasTouchedSwapper && isTouchingSwapper) {
      this.hasTouchedSwapper = true;
      this.swapPallets();
    } else if (!isTouchingSwapper) {
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
      if (objs[i].dead == 1) objs.splice(i, 1);
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
