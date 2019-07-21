class ImplodingPlayer {
  constructor(x, y, pallet) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.dead = false;
    this.pallet = pallet;

    this.pixels = ArrayHelpers.range(80).map(x => {
      const xChange = MathHelpers.randomRange(-141, 141);
      const yChange = MathHelpers.randomRange(-141, 141);

      const xWidth = MathHelpers.randomRange(0, 20);
      const yWidth = MathHelpers.randomRange(0, 20);

      const color = MathHelpers.randomRange(0, 3);
      return {
        x: xChange + this.x + xWidth,
        y: yChange + this.y + yWidth,
        velocityX: xChange / 14 * -1,
        velocityY: yChange / 14 * -1,
        startVelocityY: yChange / 10,
        color: this.pallet[color]
      };
    });
  }

  update() {
    this.pixels.forEach((pixel, i) => {
      pixel.x += pixel.velocityX;
      pixel.y += pixel.velocityY;

      pixel.velocityX = MathHelpers.toZero(pixel.velocityX, 0.12);
      pixel.velocityY = MathHelpers.toZero(pixel.velocityY, 0.12);
    });

    this.checkForFinished();
  }

  checkForFinished() {
    const numLivePixesLeft = this.pixels.filter((pixel, i) => {
      // TODO: very bad way to check
      const yDone = MathHelpers.between(pixel.y, this.y - 35, this.y + 35);
      const xDone = MathHelpers.between(pixel.x, this.x - 35, this.x + 35);

      return !(xDone && yDone);
    }).length;

    if (numLivePixesLeft === 0) {
      this.dead = true;
    }
  }

  draw() {
    this.pixels.forEach(pixel => {
      ctx.fillStyle = `${pixel.color}${this.getAlphaHex(pixel)}`;
      ctx.fillRect(pixel.x, pixel.y, this.width, this.height);
    });
  }

  getAlphaHex(pixel) {
    // as velicoticyY approaches zero make more transparent
    const max = Math.abs(pixel.startVelocityY);
    if (max === 0) {
      return "00";
    }
    const percentOpaque = Math.abs(pixel.velocityY) / max;
    const alpha = Math.floor(255 * percentOpaque);
    return ColorHelpers.rgbToHex(alpha);
  }
}
