class ExplodingPlayer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 2;
    this.height = 2;
    this.dead = false;

    this.pixels = ArrayHelpers.range(30).map(x => {
      const velocityX = MathHelpers.randomRange(-5, 5);
      const velocityY = MathHelpers.randomRange(-5, 5);
      return {
        x: this.x,
        y: this.y,
        velocityX: velocityX,
        velocityY: velocityY,
        startVelocityY: velocityY,
      }
    });
  }

  update() {
    this.pixels.forEach(pixel => {
      pixel.x += pixel.velocityX;
      pixel.y += pixel.velocityY;

      pixel.velocityX = MathHelpers.toZero(pixel.velocityX, 0.1)
      pixel.velocityY = MathHelpers.toZero(pixel.velocityY, 0.1)
    });

    this.checkForFinished();
  }

  checkForFinished() {
    const numLivePixesLeft = this.pixels.filter(pixel => pixel.velocityY !== 0).length;
    if (numLivePixesLeft > 0) {
      this.dead = true;
    }
  }

  draw(pallet) {
    this.pixels.forEach(pixel => {
      ctx.fillStyle = `${pallet[0]}${this.getAlphaHex(pixel)}`;
      ctx.fillRect(pixel.x, pixel.y, this.width, this.height);
    });
  }

  getAlphaHex(pixel) {
    // as velicoticyY approaches zero make more transparent
    const max = Math.abs(pixel.startVelocityY);
    if (max === 0) {
      return '00';
    }
    const percentOpaque = Math.abs(pixel.velocityY) / max;
    const alpha = Math.floor(255 * percentOpaque);
    return ColorHelpers.rgbToHex(alpha);
  }
}
