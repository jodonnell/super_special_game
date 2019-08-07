class Level {
  buildLevel(oss) {
    for (let row = 0; row <= MAX_Y_GRID_SIZE; row++) {
      for (let col = 0; col <= MAX_X_GRID_SIZE; col++) {
        const index = row * 20 + col;
        this.build(oss, index, col, row);
      }
    }
  }

  build(oss, index, x, y) {
    x = x * 8 * PIXEL_SIZE;
    y = y * 8 * PIXEL_SIZE;
    switch (this.constructor.level[index]) {
      case 0:
        return;
      case "player":
        oss.startX = x;
        oss.startY = y;
        oss.player = new Player(x, y, images.img.hero);
        break;
      case "goal":
        oss.goal = new Swapper(x, y, images.pallet.blue);
        break;
      case "swapYellow":
        oss.swappers.push(new Swapper(x, y, images.pallet.yellow));
        break;
      case "wall":
        oss.walls.push(new Block(x, y, images.img.brick));
        break;
      case "break":
        oss.breakwalls.push(new BreakerBlock(x, y));
        break;
    }
  }
}
