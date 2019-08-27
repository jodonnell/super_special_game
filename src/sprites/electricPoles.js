class ElectricPoles {
  constructor(poles, speed) {
    this.poles = poles;
    this.speed = speed;
    this.counter = 0;
    this.burst = false;
  }

  update() {
    this.counter++;
    if (this.counter < this.speed)
      return;

    this.counter = 0;
    this.burst = !this.burst;
  }

  draw(pallet) {
    this.poles.forEach(pole => pole.draw(pallet));

    if (this.burst)
      this.drawBurst(pallet);
  }

  drawBurst(pallet) {
    ctx.strokeStyle = pallet[3];

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.moveTo(this.poles[0].x, this.poles[0].y);

    for (let i = 1; i < this.poles.length; i++) {
      ctx.lineTo(this.poles[i].dimensions.rightSide(), this.poles[i].y);
    }

    ctx.stroke();
  }
}
