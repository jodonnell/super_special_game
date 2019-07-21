class ExplodingPlayer {
  constructor(x, y, pallet) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.dead = false;
    this.pallet = pallet;

    this.pixels = ArrayHelpers.range(80).map(x => {
      const velocityX = MathHelpers.randomRange(-5, 5);
      const velocityY = MathHelpers.randomRange(-5, 5);
      const color = MathHelpers.randomRange(0, 3);
      return {
        x: this.x,
        y: this.y,
        velocityX: velocityX,
        velocityY: velocityY,
        startVelocityY: velocityY,
        color: this.pallet[color]
      };
    });
  }

  update() {
    this.pixels.forEach(pixel => {
      pixel.x += pixel.velocityX;
      pixel.y += pixel.velocityY;

      pixel.velocityX = MathHelpers.toZero(pixel.velocityX, 0.09);
      pixel.velocityY = MathHelpers.toZero(pixel.velocityY, 0.09);
    });

    this.checkForFinished();
  }

  checkForFinished() {
    const numLivePixesLeft = this.pixels.filter(pixel => pixel.velocityY !== 0).length;
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
