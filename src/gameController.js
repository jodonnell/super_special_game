class GameController {
  constructor(control) {
    this.control = control;
    this.onscreenSprites = new OnscreenSprites(LevelJacob);
    this.pallet = images.pallet.red;
    this.hasTouchedSwapper = false;
    this.heldPallets = [images.pallet.red, images.pallet.green];
  }

  update(numSeconds) {
    document.getElementById('time').innerHTML = numSeconds.toFixed(2);
    if (this.control.hasZBeenTapped()) {
      this.swapPallets();
    }

    this.onscreenSprites.sprites.forEach(sprite => {
      sprite.update({
        control: this.control,
        onscreenSprites: this.onscreenSprites
      });
    });

    this.onscreenSprites.removeOBJ(this.onscreenSprites.FX);
    this.onscreenSprites.removeOBJ(this.onscreenSprites.breakwalls);

    this.swapPalletIfTouchingSwapper();
    this.swapPalletIfTouchingSwapperField();
    this.checkForDeath();
    this.checkForRegeneration();
    this.checkForFinishedLevel();
  }


  checkForFinishedLevel() {
    const isTouchingGoal = CollisionDetector.doesCollideWithSprites(
      this.onscreenSprites.player,
      [this.onscreenSprites.goal]
    );
    if (isTouchingGoal.length > 0) {
      this.onscreenSprites.advanceLevel();
    }
  }

  checkForDeath() {
    if (this.player().dead) {
      return;
    }
    this.checkForBuzzsawDeath();
    this.checkForPlayerOutOfBounds();
  }


  player() {
    return this.onscreenSprites.player;
  }

  checkForPlayerOutOfBounds() {
    if (this.player().collisionBounds.right() < 0) {
      this.playerDied();
    }

    if (this.player().collisionBounds.bottom() < 0) {
      this.playerDied();
    }

    if (this.player().collisionBounds.top() > canvas.height) {
      this.playerDied();
    }

    if (this.player().collisionBounds.left() > canvas.width) {
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
      const currentPallet = this.pallet;
      this.changePrimaryPalleteTo(isTouchingSwapper[0].pallet);
      isTouchingSwapper[0].pallet = currentPallet;
    } else if (!isTouchingSwapper.length > 0) {
      this.hasTouchedSwapper = false;
    }
  }

  changePrimaryPalleteTo(pallet) {
    this.heldPallets[this.selectedPalletIndex()] = pallet;
    this.pallet = pallet;
    document.querySelector('.primary').style.backgroundColor = pallet[1];
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

  selectedPalletIndex() {
    if (this.pallet === this.heldPallets[0])
      return 0;
    return 1;
  }

  swapPallets() {
    if (this.pallet === this.heldPallets[0]) {
      this.pallet = this.heldPallets[1];
      document.getElementById('firstColor').classList.remove('primary');
      document.getElementById('secondColor').classList.add('primary');
    } else {
      this.pallet = this.heldPallets[0];
      document.getElementById('firstColor').classList.add('primary');
      document.getElementById('secondColor').classList.remove('primary');
    }
  }
}
