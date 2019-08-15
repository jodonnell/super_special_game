class GameController {
  constructor(control) {
    this.control = control;
    this.Level = LevelJacob2;
    this.onscreenSprites = new OnscreenSprites(this.Level, 0);
    this.pallet = images.pallet.red;
    this.hasTouchedSwapper = false;
    this.heldPallets = [images.pallet.red, images.pallet.green];
    this.ui = new Ui();
    this.ui.getScores(this.Level.name);
    this.finishedLevel = false;
  }

  update(numSeconds, tick) {
    this.control.checkJoypad();

    if (!this.finishedLevel) {
      this.levelTime = numSeconds - this.onscreenSprites.startTime;
      this.ui.update(this.levelTime);
    }

    if (this.control.hasZBeenTapped()) {
      this.swapPallets();
    }

    if (this.control.isPaused()) {
      return;
    }

    this.onscreenSprites.sprites.forEach(sprite => {
      sprite.update({
        control: this.control,
        onscreenSprites: this.onscreenSprites,
        tick
      });
    });

    this.onscreenSprites.removeOBJ(this.onscreenSprites.FX);
    //this.onscreenSprites.removeOBJ(this.onscreenSprites.breakwalls);

    this.swapPalletIfTouchingSwapper();
    this.swapPalletIfTouchingSwapperField();
    this.checkForDeath();
    this.checkForRegeneration();
    this.checkForFinishedLevel(numSeconds);
  }


  checkForFinishedLevel(numSeconds) {
    const isTouchingGoal = CollisionDetector.doesCollideWithSprites(
      this.onscreenSprites.player,
      [this.onscreenSprites.goal]
    );
    if (!this.player().dead && isTouchingGoal.length > 0) {
      this.ui.postTime(this.Level.name, this.levelTime);
      this.playerDied();
      this.finishedLevel = true;
    }

    const winAnimationComplete = this.finishedLevel && !this.onscreenSprites.hasExplodingPlayer();
    if (winAnimationComplete) {
      this.ui.getScores(this.onscreenSprites.NextLevel.name);
      this.Level = this.onscreenSprites.NextLevel;
      this.ui.getScores(this.Level.name);
      this.onscreenSprites.advanceLevel(numSeconds);
      this.finishedLevel = false;
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
    this.explodePlayer();
  }

  explodePlayer() {
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
      this.ui.makeSecondColorPrimary();
    } else {
      this.pallet = this.heldPallets[0];
      this.ui.makeFirstColorPrimary();
    }
  }
}
