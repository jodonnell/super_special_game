class LevelMarkVision {
  constructor(onscreenSprites) {
    onscreenSprites.startX = 80;
    onscreenSprites.startY = 300;
    onscreenSprites.player = new Player(onscreenSprites.startX, onscreenSprites.startY, images.img.hero);

    onscreenSprites.goal = new Swapper(...tileToWorld(18, 12), ['#ffffff', '#f6f6f6', '#ececec']);

    this.ground(onscreenSprites.walls);

    this.background(onscreenSprites.BG);
  }

  background(bg) {
    bg.push(
      new BackgroundSquare(10, 10, 150, 2),
      new BackgroundSquare(160, 60, 100, 1, 10),
      new BackgroundSquare(360, 160, 100, -1, 10),
      new BackgroundSquare(500, 280, 80, -2, 40, 6),
      new BackgroundSquare(560, 80, 120, -2, 40, 6),
      new BackgroundSquare(760, 280, 120, -2, 40, 6),
      new BackgroundHill(-10, 120, 160, 250),
      new BackgroundHill(350, 120, 165, 250),
      new BackgroundHill(380, 30, 80, 90),
      new Dither(0, canvas.height, canvas.width, canvas.height, '#00000055', 10),
      new Dither(0, 5, canvas.width, 5, '#00000055', 10, false),
      new Mushrooms(20, 360, 150, 2),
      new Mushrooms(34, 360, 150, 2),
      new Mushrooms(48, 360, 150, 2),

      new Mushrooms(400, 360, 150, 2),
      new Mushrooms(430, 360, 150, 2),
    );
  }

  ground(walls) {
    walls.push(
      new Block(...tileToWorld(3, 4), images.img.brick),
      new Block(...tileToWorld(4, 4), images.img.brick),

      new Block(...tileToWorld(7, 7), images.img.brick),

      new Block(...tileToWorld(10, 5), images.img.brick),
    );

    walls.push(
      new Block(...tileToWorld(0, 9), images.img.brick),
      new BlankBlock(...tileToWorld(1, 9), 8),
      new Block(...tileToWorld(2, 9), images.img.brick),
      new Block(...tileToWorld(3, 9), images.img.brick),
      new Block(...tileToWorld(4, 9), images.img.brick),
      new Block(...tileToWorld(5, 9), images.img.brick),
      new Block(...tileToWorld(6, 9), images.img.brick),
      new Block(...tileToWorld(7, 9), images.img.brick),
      new Block(...tileToWorld(8, 9), images.img.brick),
      new BlankBlock(...tileToWorld(9, 9)),
      new BlankBlock(...tileToWorld(10, 9)),
      new Block(...tileToWorld(11, 9), images.img.brick),
      new BlankBlock(...tileToWorld(12, 9)),
    );

    walls.push(
      new BlankBlock(...tileToWorld(0, 10)),
      new BlankBlock(...tileToWorld(1, 10)),
      new BreakerBlock(...tileToWorld(2, 10)),
      new BreakerBlock(...tileToWorld(3, 10)),
      new BlankBlock(...tileToWorld(4, 10)),
      new BlankBlock(...tileToWorld(5, 10)),
      new BreakerBlock(...tileToWorld(6, 10)),
      new BlankBlock(...tileToWorld(7, 10)),
      new BreakerBlock(...tileToWorld(8, 10)),
      new BlankBlock(...tileToWorld(9, 10)),
      new BlankBlock(...tileToWorld(10, 10)),
      new BreakerBlock(...tileToWorld(11, 10)),
      new BlankBlock(...tileToWorld(12, 10)),
    );

    walls.push(
      new BlankBlock(...tileToWorld(0, 11)),
      new BlankBlock(...tileToWorld(1, 11)),
      new BlankBlock(...tileToWorld(2, 11)),
      new BlankBlock(...tileToWorld(3, 11)),
      new BlankBlock(...tileToWorld(4, 11)),
      new BlankBlock(...tileToWorld(5, 11)),
      new BlankBlock(...tileToWorld(6, 11)),
      new BlankBlock(...tileToWorld(7, 11)),
      new BlankBlock(...tileToWorld(8, 11)),
      new BlankBlock(...tileToWorld(9, 11)),
      new BlankBlock(...tileToWorld(10, 11)),
      new BlankBlock(...tileToWorld(11, 11)),
      new BlankBlock(...tileToWorld(12, 11)),
    );

    walls.push(
      new BlankBlock(...tileToWorld(0, 12)),
      new BreakerBlock(...tileToWorld(1, 12)),
      new BlankBlock(...tileToWorld(2, 12)),
      new BlankBlock(...tileToWorld(3, 12)),
      new BlankBlock(...tileToWorld(4, 12)),
      new BlankBlock(...tileToWorld(5, 12)),
      new BlankBlock(...tileToWorld(6, 12)),
      new BlankBlock(...tileToWorld(7, 12)),
      new BlankBlock(...tileToWorld(8, 12)),
      new BlankBlock(...tileToWorld(9, 12)),
      new BlankBlock(...tileToWorld(10, 12)),
      new BlankBlock(...tileToWorld(11, 12)),
      new BlankBlock(...tileToWorld(12, 12)),
    );

    walls.push(
      new BlankBlock(...tileToWorld(0, 13)),
      new BlankBlock(...tileToWorld(1, 13)),
      new BlankBlock(...tileToWorld(2, 13)),
      new BlankBlock(...tileToWorld(3, 13)),
      new BlankBlock(...tileToWorld(4, 13)),
      new BreakerBlock(...tileToWorld(5, 13)),
      new BlankBlock(...tileToWorld(6, 13)),
      new BlankBlock(...tileToWorld(7, 13)),
      new BlankBlock(...tileToWorld(8, 13)),
      new BlankBlock(...tileToWorld(9, 13)),
      new BlankBlock(...tileToWorld(10, 13)),
      new BlankBlock(...tileToWorld(11, 13)),
      new BlankBlock(...tileToWorld(12, 13)),
    );

    walls.push(
      new BlankBlock(...tileToWorld(0, 14)),
      new BlankBlock(...tileToWorld(1, 14)),
      new BlankBlock(...tileToWorld(2, 14)),
      new BlankBlock(...tileToWorld(3, 14)),
      new BlankBlock(...tileToWorld(4, 14)),
      new BlankBlock(...tileToWorld(5, 14)),
      new BlankBlock(...tileToWorld(6, 14)),
      new BlankBlock(...tileToWorld(7, 14)),
      new BlankBlock(...tileToWorld(8, 14)),
      new Block(...tileToWorld(9, 14), images.img.brick),
      new BlankBlock(...tileToWorld(10, 14)),
      new BlankBlock(...tileToWorld(11, 14)),
      new BlankBlock(...tileToWorld(12, 14)),
    );
  }
}
