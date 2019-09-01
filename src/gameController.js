class GameController {
  constructor(control) {
    this.control = control;
    this.Level = Level1;
    this.onscreenSprites = new OnscreenSprites(this.Level, 0);
    this.ui = new Ui();
    this.player().ui = this.ui;

    this.swapperCollider = new SwapperCollider();
    this.ui.getScores(this.Level.name);
    this.finishedLevel = false;
    this.levelTime = 0;
  }

  update(tick) {
    this.control.checkJoypad();

    if (!this.finishedLevel) {
      this.levelTime += tick / 1000;
      this.ui.update(this.levelTime);
    }

    if (this.control.hasZBeenTapped()) {
      this.player().swapPallets();
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

    this.swapPalletIfTouchingSwapper();
    //this.swapPalletIfTouchingSwapperField();
    this.checkForDeath();
    this.checkForRegeneration();
    this.checkForFinishedLevel();
  }


  checkForFinishedLevel() {
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
      this.onscreenSprites.advanceLevel();
      this.levelTime = 0;
      this.finishedLevel = false;
      this.player().ui = this.ui;
    }
  }

  checkForDeath() {
    if (this.player().dead) {
      return;
    }
    this.checkForBuzzsawDeath();
    this.checkForElectricPoleDeath();
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

    const isDifferentColor = connectedBuzzSaw.filter(buzzsaw => this.player().pallet !== buzzsaw.pallet).length > 0;
    if (connectedBuzzSaw.length > 0 && isDifferentColor) {
      this.playerDied();
    }
  }

  checkForElectricPoleDeath() {
    const connectedPole = CollisionDetector.doesCollideWithSprites(
      this.onscreenSprites.player,
      this.onscreenSprites.electricPoles
    );

    if (connectedPole.length && !connectedPole[0].burst)
      return;

    const isDifferentColor = connectedPole.filter(buzzsaw => this.player().pallet !== buzzsaw.pallet).length > 0;
    if (connectedPole.length > 0 && isDifferentColor) {
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
      this.levelTime = 0;
    }

    if (!this.onscreenSprites.hasExplodingPlayer() && !isPlayerAtStartSpot) {
      this.onscreenSprites.resetPlayer();
      this.onscreenSprites.addFX(
        new ImplodingPlayer(this.onscreenSprites.player.x, this.onscreenSprites.player.y, this.player().pallet)
      );
    }
  }

  playerDied() {
    this.onscreenSprites.player.dead = true;
    this.explodePlayer();
  }

  explodePlayer() {
    this.onscreenSprites.addFX(
      new ExplodingPlayer(this.onscreenSprites.player.x, this.onscreenSprites.player.y, this.player().pallet)
    );
  }

  swapPalletIfTouchingSwapper() {
    this.swapperCollider.swapPalletIfTouchingSwapper(this.onscreenSprites.player, this.onscreenSprites.swappers);
    this.onscreenSprites.buzzsaws.forEach((buzzsaw) => {
      this.swapperCollider.swapPalletIfTouchingSwapper(buzzsaw, this.onscreenSprites.swappers);
    });
  }

  swapPalletIfTouchingSwapperField() {
    // resetting pallet breaks swapping
    this.onscreenSprites.buzzsaws.forEach(buzzsaw => buzzsaw.resetPallet());

    this.onscreenSprites.fieldSwappers.forEach(fieldSwapper => {
      const isTouchingSwapper = CollisionDetector.doesCollideWithSprites(fieldSwapper, this.onscreenSprites.buzzsaws);

      isTouchingSwapper.forEach(buzzsaw => {
        buzzsaw.pallet = fieldSwapper.player().pallet;
      });
    });
  }

  draw(tick) {
    this.clearScreen(tick);
    this.onscreenSprites.sprites.forEach(sprite => sprite.draw(this.player().pallet));
    this.lighten(230, 520, 100, '#a6a6a633');
  }

  lighten(x, y, radius, color) {
    if (this.onscreenSprites.electricPoles.length === 0)
      return;

    if (!this.onscreenSprites.electricPoles[0].burst)
      return;

    ctx.save();
    var rnd = 0.03 * Math.sin(1.1 * Date.now() / 1000);
    radius = radius * (1 + rnd);
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#0B0B00';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.90 + rnd, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }


  clearScreen(tick) {
    if (tick >= 17)
      ctx.fillStyle = 'red';
    else
      ctx.fillStyle = '#00212d';

    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
