class GameController {
  constructor() {
    this.x = 20;
  }

  update() {
    this.x = Math.floor(Math.random() * canvas.width);
  }

  draw() {
    this.clearScreen();
    this.drawText();
  }

  drawText() {
    ctx.fillStyle = 'red';
    ctx.font = '48px serif';
    ctx.fillText('goodbye world', this.x, canvas.height / 2);
  }

  clearScreen() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
  }
}
