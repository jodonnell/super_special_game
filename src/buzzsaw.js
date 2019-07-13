class BuzzSaw extends Sprite {
  constructor(x, y) {
    super(x, y, images.img.buzzsaw);
    this.angle = 20;
    this.speed = 15;
  }

  update() {
    this.angle += this.speed;
    this.angle %= 360;
  }

  draw(pallet) {
    ctx.save();
    ctx.translate(this.x + this.width() / 2, this.y + this.height() / 2);
    ctx.rotate((this.angle * Math.PI) / 180);
    super.draw(pallet, -this.w / 2, -this.w / 2);
    ctx.restore();
  }
}
