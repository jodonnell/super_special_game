class GameController {
  constructor(control) {
    this.control = control;
    this.player = new Player(200, 200);
    this.walls = this.createWalls();
    this.swappers = [new Swapper(400, 400)];
    this.buzzsaws = [new BuzzSaw(600, canvas.height - 110)];
    this.FX = [];
    this.sprites = [...this.buzzsaws, ...this.walls, ...this.swappers, this.player];
    this.pallet = images.pallet.a;
    this.hasTouchedSwapper = false;
  }

  update() {
    this.sprites.forEach(sprite =>
      sprite.update({
        control: this.control,
        walls: this.walls,
        FX: this.FX
      })
    );
    this.FX.forEach(sprite => sprite.update());
    this.eliminate(this.FX);
    this.swapPalletIfTouchingSwapper();
  }

  swapPalletIfTouchingSwapper() {
    const isTouchingSwapper = CollisionDetector.doesCollideWithSprites(this.player, this.swappers)
    if (!this.hasTouchedSwapper && isTouchingSwapper) {
      this.hasTouchedSwapper = true;
      this.swapPallets();
    } else if (!isTouchingSwapper) {
      this.hasTouchedSwapper = false;
    }
  }

  draw() {
    this.clearScreen();
    this.sprites.forEach(sprite => sprite.draw(this.pallet));
    this.FX.forEach(sprite => sprite.draw());
  }

  clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  createWalls() {
    const numWallsToFillBottom = canvas.width / 40;
    const walls = this.range(numWallsToFillBottom).map(x => {
      return new Block(x * 40, canvas.height - 40, images.img.brick);
    });

    walls.push(new Block(260, canvas.height - 80, images.img.brick));
    walls.push(new Block(280, canvas.height - 160, images.img.brick));
    walls.push(new Block(200, canvas.height - 200, images.img.brick));
    return walls;
  }

  range(num) {
    return [...Array(num).keys()];
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
